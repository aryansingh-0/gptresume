const jwt = require('../services/jwt')

const authenticate = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies
    
    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: 'Access token not provided',
      })
    }
 
    const decoded = jwt.verifyAccessToken(accessToken)
    req.user = decoded 
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Access token expired',
        code: 'TOKEN_EXPIRED',
      })
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid access token',
    })
  }
}

module.exports = { authenticate }