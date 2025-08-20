import mongoose from "mongoose";

export const checkDBConnection = (req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({
            success: false,
            error: "Database connection not available",
            message: "Please ensure MongoDB is running and try again",
        });
    }
    next();
};
