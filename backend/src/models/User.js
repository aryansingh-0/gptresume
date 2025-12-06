const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const paymentSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  paymentId: { type: String, required: true },
  amount: { type: Number, required: true }, // stored in paise (₹100 = 10000)
  currency: { type: String, default: "INR" },
  credit: { type: Number, default: 0 },
  plan: { type: String, required: true },
  status: { type: String, enum: ["success", "failed", "pending"], default: "success" },
  invoiceFile: { type: String }, // optional if you store invoice path/URL
  createdAt: { type: Date, default: Date.now },
})

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, // ✅ used as referral code
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  ipAddress: String,
  deviceFingerprint: String,
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  credits: {
    type: Number,
    default: 10, // free credits on signup
  },
  payments: [paymentSchema],

  referral: {
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    referredUsers: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        date: { type: Date, default: Date.now }
      }
    ],
  }
  ,

  isEmailVerified: {
    type: Boolean,
    default: false, // set false if email verification is needed
  },
  lastLoginAt: Date,
}, { timestamps: true })

// 🔑 Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  try {
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// 🔑 Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

// 🔑 Remove password from JSON output
userSchema.methods.toJSON = function () {
  const userObject = this.toObject()
  delete userObject.password
  return userObject
}

module.exports = mongoose.model('User', userSchema)
