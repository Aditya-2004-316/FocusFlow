import mongoose from 'mongoose';

const timerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    type: {
      type: String,
      enum: ['pomodoro', 'shortBreak', 'longBreak', 'custom'],
      required: [true, 'Timer type is required'],
      default: 'pomodoro',
    },
    duration: {
      type: Number, // in minutes
      required: [true, 'Duration is required'],
      min: [1, 'Duration must be at least 1 minute'],
      max: [480, 'Duration cannot exceed 8 hours'],
    },
    title: {
      type: String,
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    startTime: {
      type: Date,
      default: null,
    },
    endTime: {
      type: Date,
      default: null,
    },
    completedAt: {
      type: Date,
      default: null,
    },
    interruptedAt: {
      type: Date,
      default: null,
    },
    tags: [{
      type: String,
      trim: true,
    }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
timerSchema.index({ user: 1, isActive: 1 });
timerSchema.index({ user: 1, startTime: -1 });

// Instance methods
timerSchema.methods.start = function() {
  this.isActive = true;
  this.startTime = new Date();
  this.interruptedAt = null;
  return this.save();
};

timerSchema.methods.pause = function() {
  this.isActive = false;
  this.interruptedAt = new Date();
  return this.save();
};

timerSchema.methods.complete = function() {
  this.isActive = false;
  this.completedAt = new Date();
  this.endTime = this.completedAt;
  return this.save();
};

// Calculate duration in seconds
timerSchema.virtual('elapsedTime').get(function() {
  if (!this.startTime) return 0;
  const end = this.endTime || new Date();
  return Math.floor((end - this.startTime) / 1000); // in seconds
});

const Timer = mongoose.model('Timer', timerSchema);

export default Timer;
