const express = require('express')
const router = express.Router()
const { getVets, addVet } = require('../controllers/vet.controller')

router.get('/', getVets)
router.post('/', addVet)

module.exports = router