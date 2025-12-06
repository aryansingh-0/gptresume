const mongoose = require('mongoose')
const env = require('./env')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI)
    console.log(`MongoDB Connected`)
  } catch (error) {
    console.error('Database connection error:', error)
    throw error
  }
}

module.exports = { connectDB }