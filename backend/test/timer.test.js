import request from 'supertest';
import app from '../src/app.js';
import mongoose from 'mongoose';
import Timer from '../src/models/Timer.js';
import User from '../src/models/User.js';
import jwt from 'jsonwebtoken';

let testUser;
let authToken;

// Test data
const testTimerData = {
    type: 'pomodoro',
    duration: 25,
    title: 'Test Timer',
    description: 'This is a test timer',
    tags: ['test', 'pomodoro']
};

describe('Timer API', () => {
    beforeAll(async () => {
        // Connect to test database
        await mongoose.connect(process.env.MONGODB_URI + '_test');
        
        // Create a test user
        testUser = await User.create({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            isEmailVerified: true
        });

        // Generate JWT token
        authToken = jwt.sign(
            { userId: testUser._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );
    });

    afterAll(async () => {
        // Clean up test data
        await Timer.deleteMany({});
        await User.deleteMany({});
        await mongoose.connection.close();
    });

    describe('POST /api/timers/start', () => {
        it('should start a new timer', async () => {
            const res = await request(app)
                .post('/api/timers/start')
                .set('Authorization', `Bearer ${authToken}`)
                .send(testTimerData);

            expect(res.statusCode).toEqual(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toHaveProperty('_id');
            expect(res.body.data.isActive).toBe(true);
        });
    });

    describe('GET /api/timers/active', () => {
        it('should get the active timer', async () => {
            const res = await request(app)
                .get('/api/timers/active')
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toHaveProperty('_id');
            expect(res.body.data.isActive).toBe(true);
        });
    });

    describe('PUT /api/timers/complete/:id', () => {
        it('should complete the active timer', async () => {
            // First get the active timer
            const activeTimer = await Timer.findOne({ user: testUser._id, isActive: true });
            
            const res = await request(app)
                .put(`/api/timers/complete/${activeTimer._id}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.isActive).toBe(false);
            expect(res.body.data.completedAt).toBeDefined();
        });
    });
});
