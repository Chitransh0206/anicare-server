const { PrismaClient } = require('@prisma/client')
const Razorpay = require('razorpay')
const crypto = require('crypto')

const prisma = new PrismaClient()

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

const createOrder = async (req, res) => {
  try {
    const { amount } = req.body
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: 'INR',
      receipt: 'receipt_' + Date.now()
    })
    res.json(order)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, name, email, amount } = req.body

    const body = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: 'Invalid payment signature' })
    }

    const donation = await prisma.donation.create({
      data: {
        name,
        email,
        amount: parseFloat(amount),
        orderId: razorpay_order_id,
        status: 'completed'
      }
    })

    res.json({ message: 'Payment verified!', donation })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getDonations = async (req, res) => {
  try {
    const donations = await prisma.donation.findMany()
    res.json(donations)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { createOrder, verifyPayment, getDonations }