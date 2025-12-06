require('dotenv').config()
const app = require('./app')
const { connectDB } = require('./config/db')
const { client } = require('./config/redis');

const PORT = process.env.PORT || 5000 
async function startServer() {
  try {
    await connectDB()
    console.log('✅ MongoDB connected successfully')
   
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
      console.log(`📊 Environment: ${process.env.NODE_ENV}`)
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

startServer()