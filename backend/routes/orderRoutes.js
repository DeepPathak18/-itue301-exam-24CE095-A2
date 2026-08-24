const express = require("express");

const Order = require("../models/Order");

const router = express.Router();

// POST /api/v1/orders
router.post("/", async (req, res, next) => {
    try {
        const {
            items,
            totalAmount
        } = req.body;

        const order = new Order({
            customerId: req.user.customerId,
            items,
            totalAmount
        });

        const savedOrder = await order.save();

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: savedOrder
        });
    } catch (error) {
        next(error);
    }
});

// GET /api/v1/orders
router.get("/", async (req, res, next) => {
    try {
        const orders = await Order.find({
            customerId: req.user.customerId
        })
            .populate("customerId", "name email");

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        next(error);
    }
});

// PATCH /api/v1/orders/:id/status
router.patch("/:id/status", async (req, res, next) => {
    try {
        const { status } = req.body;

        const order = await Order.findOneAndUpdate(
            {
                _id: req.params.id,
                customerId: req.user.customerId
            },
            {
                status
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!order) {
            return res.status(400).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order status updated",
            data: order
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;