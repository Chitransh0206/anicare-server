const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getVets = async (req, res) => {
  try {
    const { city, available } = req.query
    const filter = {}
    if (city) filter.city = { contains: city }
    if (available) filter.available = available === 'true'
    const vets = await prisma.vet.findMany({ where: filter, orderBy: { createdAt: 'desc' } })
    res.json(vets)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getVetById = async (req, res) => {
  try {
    const vet = await prisma.vet.findUnique({ where: { id: parseInt(req.params.id) } })
    if (!vet) return res.status(404).json({ error: 'Vet not found' })
    res.json(vet)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const addVet = async (req, res) => {
  try {
    const { name, email, phone, city, address, specialization, experience, timing, image } = req.body
    const vet = await prisma.vet.create({
      data: { name, email, phone, city, address, specialization, experience: parseInt(experience) || 0, timing, image }
    })
    res.json({ message: 'Vet added!', vet })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const updateAvailability = async (req, res) => {
  try {
    const { available } = req.body
    const vet = await prisma.vet.update({
      where: { id: parseInt(req.params.id) },
      data: { available }
    })
    res.json({ message: 'Availability updated!', vet })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { getVets, getVetById, addVet, updateAvailability }