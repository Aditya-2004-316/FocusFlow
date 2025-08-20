import express from 'express';
import {
    startTimer,
    pauseTimer,
    resumeTimer,
    completeTimer,
    getActiveTimer,
    getTimerHistory,
    getTimerStats,
    deleteTimer
} from '../controllers/timerController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected and require authentication
router.use(protect);

// Timer management routes
router.post('/start', startTimer);
router.put('/pause/:id', pauseTimer);
router.put('/resume/:id', resumeTimer);
router.put('/complete/:id', completeTimer);
router.get('/active', getActiveTimer);
router.get('/history', getTimerHistory);
router.get('/stats', getTimerStats);
router.delete('/:id', deleteTimer);

export default router;
