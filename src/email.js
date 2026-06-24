const axios = require('axios')

const sendRescueAlert = async (rescueData) => {
  try {
    await axios.post('https://api.brevo.com/v3/smtp/email', {
      sender: { name: 'ANIcare', email: process.env.EMAIL_USER },
      to: [{ email: process.env.EMAIL_USER }],
      subject: `🚨 New Rescue Request — ${rescueData.animalType} in ${rescueData.location}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #15803d; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">🐾 ANIcare</h1>
            <p style="color: #86efac; margin: 5px 0;">New Rescue Alert</p>
          </div>
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #dc2626;">🚨 New Animal Rescue Request</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #374151;">Animal Type:</td>
                <td style="padding: 10px; color: #6b7280;">${rescueData.animalType}</td>
              </tr>
              <tr style="background: #f3f4f6;">
                <td style="padding: 10px; font-weight: bold; color: #374151;">Location:</td>
                <td style="padding: 10px; color: #6b7280;">📍 ${rescueData.location}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #374151;">Description:</td>
                <td style="padding: 10px; color: #6b7280;">${rescueData.description}</td>
              </tr>
            </table>
            <div style="text-align: center; margin-top: 25px;">
              <a href="https://anicare-client.vercel.app/feed" style="background: #15803d; color: white; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: bold;">
                View Rescue Feed →
              </a>
            </div>
          </div>
        </div>
      `
    }, {
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json'
      }
    })
    console.log('Rescue alert email sent!')
  } catch (err) {
    console.log('Email error:', err.response?.data || err.message)
  }
}

module.exports = { sendRescueAlert }