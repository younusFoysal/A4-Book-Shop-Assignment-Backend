import express from 'express';
import config from '../../config';
import Stripe from 'stripe';

const router = express.Router();

const stripe = new Stripe(config.stripe_scret_key as string);

// router.post('/create-payment-intent', async (req, res) => {
//   try {
//     const { amount } = req.body;
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: 'usd',
//     });
//     res.status(200).json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
});


export const stripeRouter = router;
