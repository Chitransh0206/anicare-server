const { PrismaClient } = require('@prisma/client')
const { sendRescueAlert } = require('../email')

const prisma = new PrismaClient()

const createRescue = async (req, res) => {
  try {
    const { animalType, description, location, imageUrl } = req.body
    const rescue = await prisma.rescue.create({
      data: { animalType, description, location, imageUrl }
    })
    
    // Send email notification
    await sendRescueAlert({ animalType, description, location })
    
    res.json({ message: 'Rescue request created!', rescue })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getRescues = async (req, res) => {
  try {
    const rescues = await prisma.rescue.findMany({ orderBy: { createdAt: 'desc' } })
    res.json(rescues)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getRescueById = async (req, res) => {
  try {
    const rescue = await prisma.rescue.findUnique({
      where: { id: parseInt(req.params.id) }
    })
    if (!rescue) return res.status(404).json({ error: 'Rescue not found' })
    res.json(rescue)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const rescue = await prisma.rescue.update({
      where: { id: parseInt(id) },
      data: { status }
    })
    res.json({ message: 'Status updated!', rescue })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { createRescue, getRescues, getRescueById, updateStatus }