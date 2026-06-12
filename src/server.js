const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/auth.routes')
const rescueRoutes = require('./routes/rescue.routes')
const volunteerRoutes = require('./routes/volunteer.routes')
const donationRoutes = require('./routes/donation.routes')
const vetRoutes = require('./routes/vet.routes')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/rescues', rescueRoutes)
app.use('/api/volunteers', volunteerRoutes)
app.use('/api/donations', donationRoutes)
app.use('/api/vets', vetRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'ANIcare backend running!' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))