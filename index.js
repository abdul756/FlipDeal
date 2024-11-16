const express = require('express');
const cors = require('cors')
const { resolve } = require('path');

const app = express();
app.use(cors());
const port = 3000;


let taxRate = 5;
let discountPercentage = 10;
let loyalityRate = 2;
// Endpoint 1: Calculate the total price of items in the cart
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  const total = newItemPrice + cartTotal;
  res.send(total.toString());
});

// Endpoint 2: Apply a discount based on membership status
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';

  if (isMember) {
    cartTotal = cartTotal - (cartTotal * discountPercentage) / 100; // Apply a 10% discount
  }

  res.send(cartTotal.toString());
});

// Endpoint 3: Calculate tax on the cart total
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  const tax = cartTotal * (taxRate / 100); // Assume tax rate is 5%
  res.send(tax.toString());
});

// Endpoint 4: Estimate delivery time based on shipping method
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod.toLowerCase();
  let distance = parseFloat(req.query.distance);
  let deliveryDays;

  if (shippingMethod === 'standard') {
    deliveryDays = Math.ceil(distance / 50);
  } else if (shippingMethod === 'express') {
    deliveryDays = Math.ceil(distance / 100);
  } else {
    return res.status(400).send('Invalid shipping method');
  }

  res.send(deliveryDays.toString());
});

// Endpoint 5: Calculate the shipping cost based on weight and distance
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  const shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

// Endpoint 6: Calculate loyalty points earned from a purchase
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  const loyaltyPoints = purchaseAmount * loyalityRate; // Assume 2 loyalty points per currency unit
  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
