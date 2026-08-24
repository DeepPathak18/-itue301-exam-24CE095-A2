const express = require("express");

const Restaurant = require("../models/Restaurant");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const restaurants = await Restaurant.find();

        res.status(200).json({
            success: true,
            count: restaurants.length,
            data: restaurants
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;