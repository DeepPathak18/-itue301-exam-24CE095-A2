const errorHandler = (err, req, res, next) => {
    console.error(err.message);

    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map(
            (error) => error.message
        );

        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors
        });
    }

    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            message: "Duplicate value already exists"
        });
    }

    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
};

module.exports = errorHandler;