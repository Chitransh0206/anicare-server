const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const registerVolunteer = async (req, res) => {
  try {
    const { name, email, phone, city, skills } = req.body
    const volunteer = await prisma.volunteer.create({
      data: { name, email, phone, city, skills }
    })
    res.json({ message: 'Volunteer registered!', volunteer })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getVolunteers = async (req, res) => {
  try {
    const volunteers = await prisma.volunteer.findMany()
    res.json(volunteers)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { registerVolunteer, getVolunteers }