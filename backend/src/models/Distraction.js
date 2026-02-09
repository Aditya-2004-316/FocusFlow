import mongoose from 'mongoose';

const distractionSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
        index: true
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
        trim: true,
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    category: {
        type: String,
        required: [true, 'Please select a category'],
        enum: {
            values: [
                'social_media',
                'entertainment',
                'communication',
                'browsing',
                'noise',
                'people',
                'thoughts',
                'other'
            ],
            message: 'Please select a valid category'
        }
    },
    duration: {
        type: Number, // in minutes
        min: [0, 'Duration cannot be negative'],
        max: [240, 'Duration cannot be more than 4 hours']
    },
    severity: {
        type: String,
        enum: {
            values: ['low', 'medium', 'high'],
            message: 'Please select a valid severity level'
        },
        default: 'medium'
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    context: {
        task: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        },
        timer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Timer'
        },
        location: String,
        device: String
    },
    notes: {
        type: String,
        maxlength: [1000, 'Notes cannot be more than 1000 characters']
    },
    resolved: {
        type: Boolean,
        default: false
    },
    resolution: {
        type: String,
        enum: {
            values: ['ignored', 'addressed', 'scheduled', 'delegated', 'other'],
            message: 'Please select a valid resolution'
        }
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Index for faster querying
distractionSchema.index({ user: 1, timestamp: -1 });
distractionSchema.index({ category: 1 });
distractionSchema.index({ resolved: 1 });

// Virtual for duration in seconds
distractionSchema.virtual('durationSeconds').get(function() {
    return this.duration ? this.duration * 60 : 0;
});

// Pre-save hook to ensure timestamps are set
distractionSchema.pre('save', function(next) {
    if (!this.timestamp) {
        this.timestamp = new Date();
    }
    next();
});

const Distraction = mongoose.model('Distraction', distractionSchema);

export default Distraction;
