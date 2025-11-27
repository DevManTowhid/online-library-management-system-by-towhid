// backend/middleware/authMiddleware.js
const { auth } = require('../config/firebaseAdmin');

/**
 * Middleware to verify Firebase ID Token from the Authorization header.
 * Attaches the decoded user token and role to the request (req.user and req.role).
 */
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access Denied. No token provided or token format is invalid.' });
  }

  const idToken = authHeader.split(' ')[1];

  try {
    // Verify the ID token using the Firebase Admin SDK
    const decodedToken = await auth.verifyIdToken(idToken);
    
    // Attach user information to the request object
    req.user = decodedToken;
    req.role = decodedToken.role || 'Student'; // Assuming role is set in custom claims
    
    next(); // Proceed to the next middleware or controller
  } catch (error) {
    console.error('Error verifying Firebase token:', error.message);
    return res.status(401).json({ message: 'Invalid or expired token.', details: error.message });
  }
};

module.exports = { verifyToken };