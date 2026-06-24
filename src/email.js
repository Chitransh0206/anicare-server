const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

const sendRescueAlert = async (rescueData) => {
  try {
    await transporter.sendMail({
      from: `"ANIcare 🐾" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `🚨 New Rescue Request — ${rescueData.animalType} in ${rescueData.location}`,
      html: `
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
              <tr style="background: #f3f4f6;">
                <td style="padding: 10px; font-weight: bold; color: #374151;">Status:</td>
                <td style="padding: 10px;"><span style="background: #fef2f2; color: #dc2626; padding: 3px 10px; border-radius: 20px; font-size: 12px;">Pending</span></td>
              </tr>
            </table>
            <div style="text-align: center; margin-top: 25px;">
              <a href="https://anicare-client.vercel.app/feed" style="background: #15803d; color: white; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: bold;">
                View Rescue Feed →
              </a>
            </div>
            <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 20px;">
              © 2026 ANIcare — Protecting Animals Across India 🐾
            </p>
          </div>
        </div>
      `
    })
    console.log('Rescue alert email sent!')
  } catch (err) {
    console.log('Email error:', err.message)
  }
}

module.exports = { sendRescueAlert }