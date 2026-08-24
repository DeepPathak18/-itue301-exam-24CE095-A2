const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
    {
        itemName: {
            type: String,
            required: [true, "Item name is required"]
        },

        quantity: {
            type: Number,
            required: [true, "Quantity is required"],
            min: [1, "Quantity must be at least 1"]
        }
    },
    {
        _id: false
    }
);

const orderSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: [true, "Customer ID is required"]
        },

        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant",
            required: [true, "Restaurant ID is required"]
        },

        items: {
            type: [orderItemSchema],
            required: [true, "Items are required"],
            validate: {
                validator: function (value) {
                    return value.length > 0;
                },
                message: "Order must contain at least one item"
            }
        },

        totalAmount: {
            type: Number,
            required: [true, "Total amount is required"],
            min: [0, "Total amount cannot be negative"]
        },

        status: {
            type: String,
            enum: {
                values: [
                    "pending",
                    "preparing",
                    "out-for-delivery",
                    "delivered",
                    "cancelled"
                ],
                message: "Invalid order status"
            },
            default: "pending"
        }
    },
    {
        timestamps: true,
        collection: "Order"
    }
);

module.exports = mongoose.model("Order", orderSchema);