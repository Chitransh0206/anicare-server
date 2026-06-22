const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Get all users
router.get('/users', authMiddleware, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true }
    })
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get all volunteers
router.get('/volunteers', authMiddleware, async (req, res) => {
  try {
    const volunteers = await prisma.volunteer.findMany()
    res.json(volunteers)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Approve volunteer
router.put('/volunteers/:id/approve', authMiddleware, async (req, res) => {
  try {
    const volunteer = await prisma.volunteer.update({
      where: { id: parseInt(req.params.id) },
      data: { approved: true }
    })
    res.json({ message: 'Volunteer approved!', volunteer })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get all donations
router.get('/donations', authMiddleware, async (req, res) => {
  try {
    const donations = await prisma.donation.findMany({ orderBy: { createdAt: 'desc' } })
    res.json(donations)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get stats
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const [users, volunteers, rescues, donations, vets] = await Promise.all([
      prisma.user.count(),
      prisma.volunteer.count(),
      prisma.rescue.count(),
      prisma.donation.findMany(),
      prisma.vet.count()
    ])
    const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0)
    res.json({ users, volunteers, rescues, vets, totalDonations })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update user role
router.put('/users/:id/role', authMiddleware, async (req, res) => {
  try {
    const { role } = req.body
    const user = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: { role }
    })
    res.json({ message: 'Role updated!', user })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router