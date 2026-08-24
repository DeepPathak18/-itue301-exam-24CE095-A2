const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Restaurant name is required"],
            trim: true,
            minlength: [2, "Restaurant name must contain at least 2 characters"]
        },

        cuisine: {
            type: String,
            required: [true, "Cuisine is required"],
            trim: true
        },

        rating: {
            type: Number,
            required: [true, "Rating is required"],
            min: [0, "Rating cannot be less than 0"],
            max: [5, "Rating cannot be greater than 5"]
        },

        isOpen: {
            type: Boolean,
            default: true,
            required: true
        }
    },
    {
        timestamps: true,
        collection: "Restaurant"
    }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);