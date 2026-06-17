const express = require('express')
const router = express.Router()
const { getVets, getVetById, addVet, updateAvailability } = require('../controllers/vet.controller')

router.get('/', getVets)
router.get('/:id', getVetById)
router.post('/', addVet)
router.put('/:id/availability', updateAvailability)

module.exports = routers