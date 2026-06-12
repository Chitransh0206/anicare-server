const express = require('express')
const router = express.Router()
const { registerVolunteer, getVolunteers } = require('../controllers/volunteer.controller')

router.post('/', registerVolunteer)
router.get('/', getVolunteers)

module.exports = router