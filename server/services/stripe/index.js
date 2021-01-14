const stripeConfig = require('stripe');

const stripe = stripeConfig(process.env.STRIPE_KEY);

module.exports = stripe;