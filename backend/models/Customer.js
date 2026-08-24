const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [2, "Name must contain at least 2 characters"]
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true
        },

        phone: {
            type: String,
            required: [true, "Phone is required"],
            minlength: [10, "Phone must contain at least 10 characters"]
        },

        address: {
            type: String,
            required: [true, "Address is required"],
            minlength: [5, "Address must contain at least 5 characters"]
        }
    },
    {
        timestamps: true,
        collection: "Customer"
    }
);

module.exports = mongoose.model("Customer", customerSchema);