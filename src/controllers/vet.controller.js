const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getVets = async (req, res) => {
  try {
    const vets = await prisma.vet.findMany()
    res.json(vets)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const addVet = async (req, res) => {
  try {
    const { name, email, phone, city } = req.body
    const vet = await prisma.vet.create({
      data: { name, email, phone, city }
    })
    res.json({ message: 'Vet added!', vet })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { getVets, addVet }