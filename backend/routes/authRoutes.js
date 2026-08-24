const express = require("express");
const jwt = require("jsonwebtoken");

const Customer = require("../models/Customer");

const router = express.Router();

router.post("/login", async (req, res, next) => {
    try {
        const name = String(req.body.name || "").trim();
        const email = String(req.body.email || "").trim().toLowerCase();
        const phone = String(req.body.phone || "").trim();
        const address = String(req.body.address || "").trim();

        if (!name || !email || !phone || !address) {
            return res.status(400).json({
                success: false,
                message: "name, email, phone and address are required"
            });
        }

        let customer = await Customer.findOne({ email });

        if (!customer) {
            customer = await Customer.create({
                name,
                email,
                phone,
                address
            });
        }

        const token = jwt.sign(
            {
                customerId: customer._id,
                email: customer.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            customer
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;