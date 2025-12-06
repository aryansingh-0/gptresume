const User = require('../models/User')
const Profile = require('../models/Profile')
const jwt = require('../services/jwt')
const { authValidation } = require('../utils/validators')
const env = require("../config/env");
const nodemailer = require("nodemailer");
const EmailVerification = require('../../public/EmailVerification')
const axios = require("axios");


// ====================== SEND VERIFY EMAIL ======================
const sendVerifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      })
    }

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    // Already verified?
    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email already verified"
      })
    }

    // Generate new email verification token
    const emailToken = jwt.generateEmailToken(user._id, user.email)
    const verificationUrl = `${env.FRONTEND_URL}/auth/verify-email/${emailToken}`

     

    // Send email
    await axios.post(`${env.EMAIL_HOST}/send-email`, {
      to: user.email,
      subject: "Verify your email - Gpt Resume",
      text: `Verify your email here: ${verificationUrl}`,
      html: EmailVerification(verificationUrl),
    });

    res.json({
      success: true,
      message: "Verification email sent successfully. Please check your inbox.",
    })
  } catch (error) {
    next(error)
  }
}

// ====================== VERIFY EMAIL ======================
const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params
    if (!token) {
      return res.status(400).json({ success: false, message: "Verification token missing" })
    }

    // Verify token
    let decoded
    try {
      decoded = await jwt.verifyEmailToken(token)

    } catch (err) {
      return res.status(400).json({ success: false, message: "Invalid or expired token" })
    }

    // Find user and update isEmailVerified
    const user = await User.findById(decoded.userId)
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    if (user.isEmailVerified) {
      return res.status(200).json({ success: true, message: "Email already verified" })
    }

    user.isEmailVerified = true
    await user.save()

    res.json({
      success: true,
      message: "Email verified successfully. You can now log in.",
    })
  } catch (error) {
    next(error)
  }
}

// ====================== SIGNUP ======================
const signup = async (req, res, next) => {
  try {
    const { error, value } = authValidation.signup.validate(req.body)
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      })
    }

    const { name, email, password, username, referralCode, deviceFingerprint } = value
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
      })
    }
    

    // Referral logic (same as before)
    let referredBy = null
    if (referralCode) { 
      referredBy = await User.findOne({ username: referralCode })
      if (referredBy.deviceFingerprint === deviceFingerprint) {
        return res.status(400).json({
          success: false,
          message: "Don't missuse refferal"
        })
      }
      if (!referredBy) {
        return res.status(400).json({ success: false, message: 'Invalid referral code' })
      }
    }
    // Create user with isEmailVerified = false
    let user = new User({
      name,
      email,
      password,
      username,
      ipAddress,
      deviceFingerprint,
      credits: referredBy ? 20 : 10,
      referral: { referredBy: referredBy?._id },
      isEmailVerified: false
    }) 
    user = await user.save()

 
    const emailToken = jwt.generateEmailToken(user._id, user.email)
    const verificationUrl = `${env.FRONTEND_URL}/auth/verify-email/${emailToken}`

await axios.post(`${env.EMAIL_HOST}/send-email`, {
      to: user.email,
      subject: "Verify your email - Gpt Resume",
      text: `Verify your email here: ${verificationUrl}`,
      html: EmailVerification(verificationUrl),
    });
    const accessToken = jwt.generateAccessToken(user._id)
    

    const refreshToken = jwt.generateRefreshToken(user._id)

    // Set cookies
    jwt.setTokenCookies(res, accessToken, refreshToken)

    
    res.status(201).json({
      success: true,
      user: user.toJSON(),
      message: 'Signup successful! Please check your email to verify your account.',
    })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { error, value } = authValidation.login.validate(req.body)
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      })
    }

    const { email, password } = value

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    // Update last login
    user.lastLoginAt = new Date()
    await user.save()

    // Generate tokens
    const accessToken = jwt.generateAccessToken(user._id)
    const refreshToken = jwt.generateRefreshToken(user._id)

    // Set cookies
    jwt.setTokenCookies(res, accessToken, refreshToken)

    res.json({
      success: true,
      message: 'Login successful',
      user: user.toJSON(),
    })
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res) => {
  jwt.clearTokenCookies(res)

  res.json({
    success: true,
    message: 'Logout successful',
  })
}

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token not provided',
      })
    }

    const decoded = jwt.verifyRefreshToken(refreshToken)
    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      })
    }

    // Generate new access token
    const accessToken = jwt.generateAccessToken(user._id)
    jwt.setAccessTokenCookie(res, accessToken)

    res.json({
      success: true,
      message: 'Token refreshed successfully',
      user: user.toJSON(),
    })
  } catch (error) {
    jwt.clearTokenCookies(res)
    res.status(401).json({
      success: false,
      message: 'Invalid refresh token',
    })
  }
}

const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId)
      .select("-updatedAt -createdAt -__v -password") // ❌ exclude unwanted fields
      .lean(); // ✅ return plain JS object (faster, easier to modify)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Only keep last 5 payments (sorted by createdAt descending)
    if (user.payments && user.payments.length > 0) {
      user.payments = user.payments
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// ====================== FORGOT PASSWORD =================

const forgot = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Generate reset token
    const resetToken = jwt.generateResetToken(user.email);
    const resetUrl = `${env.FRONTEND_URL}/auth/reset-password/${resetToken}`;

    // Call external email microservice
    await axios.post(`${env.EMAIL_HOST}/send-email`, {
      to: user.email,
      subject: "Reset your password - Gpt Resume",
      text: `Reset your password by clicking here: ${resetUrl}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Password Reset Request</h2>
          <p>You requested to reset your password. Click the link below to reset:</p>
          <a href="${resetUrl}" target="_blank"
             style="display:inline-block; padding:10px 20px;
                    background:#4CAF50; color:#fff; text-decoration:none;
                    border-radius:5px;">
            Reset Password
          </a>
          <p style="margin-top:20px;">If you didn’t request this, please ignore this email.</p>
        </div>
      `,
    });

    return res.json({
      success: true,
      message: "Password reset email sent successfully. Please check your inbox.",
    });
  } catch (error) {
    console.error("❌ Forgot password error:", error);
    next(error);
  }
};



// ====================== RESET PASSWORD ======================
const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body
    if (!token || !password) {
      return res.status(400).json({ success: false, message: 'Token and password are required' })
    }

    // Verify token
    let decoded
    try {
      decoded = jwt.verifyResetToken(token)
    } catch (err) {
      return res.status(400).json({ success: false, message: 'Invalid or expired token' })
    }

    // Find user by decoded email
    const user = await User.findOne({ email: decoded.email })
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    // Update password
    user.password = password
    await user.save()

    // Auto login after reset
    const accessToken = jwt.generateAccessToken(user._id)
    const refreshToken = jwt.generateRefreshToken(user._id)

    jwt.setTokenCookies(res, accessToken, refreshToken)

    res.json({
      success: true,
      message: 'Password reset successful, you are now logged in',
      user: user.toJSON(),
    })
  } catch (error) {
    next(error)
  }
}


module.exports = {
  signup,
  login,
  logout,
  refresh,
  me,
  verifyEmail,
  sendVerifyEmail,
  forgot,
  resetPassword,




}