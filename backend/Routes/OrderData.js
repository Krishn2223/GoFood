const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

// Endpoint to add or update order data
router.post("/orderData", async (req, res) => {
  try {
    // Check if order_data, order_date, and email are present in the request body
    if (!req.body.order_data || !req.body.order_date || !req.body.email) {
      return res
        .status(400)
        .json({
          success: false,
          error: "Required data is missing in the request.",
        });
    }

    let data = req.body.order_data;
    // Prepend order date to the order data
    data.unshift({ Order_date: req.body.order_date });

    // Check if email exists in the database
    let existingOrder = await Order.findOne({ email: req.body.email });

    if (!existingOrder) {
      // If email doesn't exist, create a new order document
      await Order.create({
        email: req.body.email,
        order_data: [data],
      });
    } else {
      // If email exists, update the existing order document
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      );
    }
    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ success: false, error: "Server Error", message: error.message });
  }
});

// Endpoint to retrieve order data associated with a specific email
router.post("/myorderData", async (req, res) => {
  try {
    // Check if email is present in the request body
    if (!req.body.email) {
      return res
        .status(400)
        .json({ success: false, error: "Email is missing in the request." });
    }

    let myData = await Order.findOne({ email: req.body.email });
    if (myData) {
      res.json({ orderData: myData });
    } else {
      res
        .status(404)
        .json({ success: false, error: "No order found for this email." });
    }
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ success: false, error: "Server Error", message: error.message });
  }
});

module.exports = router;
