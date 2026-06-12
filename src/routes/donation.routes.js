const express = require('express')
const router = express.Router()
const { createOrder, verifyPayment, getDonations } = require('../controllers/donation.controller')

router.post('/create-order', createOrder)
router.post('/verify', verifyPayment)
router.get('/', getDonations)

module.exports = router