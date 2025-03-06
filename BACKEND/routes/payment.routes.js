const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

const razorpay = new Razorpay({
    key_id: process.env.KEY_ID, // Use Test Key ID
    key_secret: process.env.KEY_SECRET, // Use Test Key Secret
});

// Route to create an order (for testing)
router.post("/create-order", async (req, res) => {
    try {
        const { amount, currency = "INR" } = req.body;

        const options = {
            amount: amount * 100, // Convert amount to paise
            currency,
            payment_capture: 1, // Auto-capture payment
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error("Order Creation Error:", error);
        res.status(500).json({ error: "Failed to create order" });
    }
});

// Route to verify payment (for testing)
router.post("/verify-payment", authMiddleware.authUser, async (req, res) => {
    try {
        const { order_id, payment_id, signature,  } = req.body;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.KEY_SECRET)
            .update(order_id + "|" + payment_id)
            .digest("hex");

        if (expectedSignature === signature) {
            res.json({ success: true, message: "Payment successful" });
        } else {
            res.status(400).json({ success: false, message: "Invalid signature" });
        }
    } catch (error) {
        console.error("Payment Verification Error:", error);
        res.status(500).json({ error: "Failed to verify payment" });
    }
});

module.exports = router;
