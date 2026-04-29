export const errorHandler = (err, req, res, next) => {
    console.error("Error: ", err.message);

    // Mongoose Validation Error
    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({
            success: false,
            message: messages.join(", "),
        });
    }

    // Mongoose Duplicate Key Error
    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            message: "Duplicate field value entered",
        });
    }

    // Mongoose Invalid ObjectID Error
    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid ID format",
        });
    }

    // Default Error
    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};
