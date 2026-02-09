import Timer from '../models/Timer.js';
import { ErrorResponse } from '../utils/errorResponse.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @desc    Start a new timer
// @route   POST /api/timers/start
// @access  Private
export const startTimer = asyncHandler(async (req, res, next) => {
    const { type = 'pomodoro', duration, title, description, tags } = req.body;
    const userId = req.user.id;

    // Check if user already has an active timer
    const activeTimer = await Timer.findOne({ user: userId, isActive: true });
    if (activeTimer) {
        return next(new ErrorResponse('You already have an active timer', 400));
    }

    const timer = await Timer.create({
        user: userId,
        type,
        duration: duration || (type === 'pomodoro' ? 25 : type === 'shortBreak' ? 5 : 15),
        title,
        description,
        tags,
        isActive: true,
        startTime: new Date()
    });

    res.status(201).json({
        success: true,
        data: timer
    });
});

// @desc    Pause the active timer
// @route   PUT /api/timers/pause/:id
// @access  Private
export const pauseTimer = asyncHandler(async (req, res, next) => {
    const timer = await Timer.findOne({
        _id: req.params.id,
        user: req.user.id,
        isActive: true
    });

    if (!timer) {
        return next(new ErrorResponse('No active timer found', 404));
    }

    await timer.pause();

    res.status(200).json({
        success: true,
        data: timer
    });
});

// @desc    Resume a paused timer
// @route   PUT /api/timers/resume/:id
// @access  Private
export const resumeTimer = asyncHandler(async (req, res, next) => {
    const timer = await Timer.findOne({
        _id: req.params.id,
        user: req.user.id,
        isActive: false
    });

    if (!timer) {
        return next(new ErrorResponse('No paused timer found', 404));
    }

    await timer.start();

    res.status(200).json({
        success: true,
        data: timer
    });
});

// @desc    Complete a timer
// @route   PUT /api/timers/complete/:id
// @access  Private
export const completeTimer = asyncHandler(async (req, res, next) => {
    const timer = await Timer.findOne({
        _id: req.params.id,
        user: req.user.id,
        isActive: true
    });

    if (!timer) {
        return next(new ErrorResponse('No active timer found', 404));
    }

    await timer.complete();

    res.status(200).json({
        success: true,
        data: timer
    });
});

// @desc    Get active timer
// @route   GET /api/timers/active
// @access  Private
export const getActiveTimer = asyncHandler(async (req, res, next) => {
    const timer = await Timer.findOne({
        user: req.user.id,
        isActive: true
    });

    res.status(200).json({
        success: true,
        data: timer
    });
});

// @desc    Get timer history
// @route   GET /api/timers/history
// @access  Private
export const getTimerHistory = asyncHandler(async (req, res, next) => {
    const { page = 1, limit = 10, type } = req.query;
    const skip = (page - 1) * limit;

    const query = { user: req.user.id, isActive: false };
    if (type) {
        query.type = type;
    }

    const timers = await Timer.find(query)
        .sort({ startTime: -1 })
        .skip(skip)
        .limit(parseInt(limit));

    const total = await Timer.countDocuments(query);

    res.status(200).json({
        success: true,
        count: timers.length,
        total,
        data: timers,
        pages: Math.ceil(total / limit),
        currentPage: parseInt(page)
    });
});

// @desc    Get timer statistics
// @route   GET /api/timers/stats
// @access  Private
export const getTimerStats = asyncHandler(async (req, res, next) => {
    const stats = await Timer.aggregate([
        {
            $match: {
                user: req.user._id,
                isActive: false,
                completedAt: { $exists: true }
            }
        },
        {
            $group: {
                _id: {
                    $dateToString: { format: '%Y-%m-%d', date: '$completedAt' }
                },
                totalSessions: { $sum: 1 },
                totalDuration: { $sum: {
                    $divide: [
                        { $subtract: ['$endTime', '$startTime'] },
                        60000 // Convert ms to minutes
                    ]
                }},
                types: {
                    $push: {
                        type: '$type',
                        duration: {
                            $divide: [
                                { $subtract: ['$endTime', '$startTime'] },
                                60000 // Convert ms to minutes
                            ]
                        }
                    }
                }
            }
        },
        { $sort: { _id: -1 } },
        { $limit: 30 } // Last 30 days
    ]);

    res.status(200).json({
        success: true,
        data: stats
    });
});

// @desc    Delete a timer
// @route   DELETE /api/timers/:id
// @access  Private
export const deleteTimer = asyncHandler(async (req, res, next) => {
    const timer = await Timer.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id
    });

    if (!timer) {
        return next(new ErrorResponse('Timer not found', 404));
    }

    res.status(200).json({
        success: true,
        data: {}
    });
});
