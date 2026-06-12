const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const createRescue = async (req, res) => {
  try {
    const { animalType, description, location, imageUrl } = req.body
    const rescue = await prisma.rescue.create({
      data: { animalType, description, location, imageUrl }
    })
    res.json({ message: 'Rescue request created!', rescue })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getRescues = async (req, res) => {
  try {
    const rescues = await prisma.rescue.findMany()
    res.json(rescues)
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

module.exports = { createRescue, getRescues, updateStatus }