const express = require('express')
const router = express.Router()
const { register, login } = require('../controllers/auth.controller')
const authMiddleware = require('../middleware/authMiddleware')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

router.post('/register', register)
router.post('/login', login)

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, role: true, createdAt: true }
    })
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router