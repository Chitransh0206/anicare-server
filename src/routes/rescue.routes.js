const express = require('express')
const router = express.Router()
const { createRescue, getRescues, updateStatus } = require('../controllers/rescue.controller')

router.post('/', createRescue)
router.get('/', getRescues)
router.put('/:id', updateStatus)

module.exports = router