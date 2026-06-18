const express = require('express')
const router = express.Router()
const { createRescue, getRescues, getRescueById, updateStatus } = require('../controllers/rescue.controller')

router.post('/', createRescue)
router.get('/', getRescues)
router.get('/:id', getRescueById)
router.put('/:id', updateStatus)

module.exports = router