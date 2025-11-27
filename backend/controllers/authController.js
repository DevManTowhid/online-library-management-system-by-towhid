// backend/controllers/authController.js
const { auth, db } = require('../config/firebaseAdmin');

/**
 * Handles the login request: 
 * 1. Takes email/password. 
 * 2. Firebase Auth handles security (in the frontend). 
 * 3. Server-side, we get the UID and fetch the custom role from Firestore.
 */
const loginUser = async (req, res) => {
    // IMPORTANT: Actual Firebase Auth sign-in happens on the client (frontend). 
    // The frontend should send the successfully generated ID Token here for verification, 
    // OR we can assume the client sends email/password and exchange it for a token.
    
    // For simplicity and common practice with separate backends, we'll assume 
    // the client sends a UID/email and requests its custom claims/role data.

    const { email, password } = req.body; // Assuming client sends credentials
    
    // --- THIS IS A SIMPLIFIED MOCK OF TOKEN EXCHANGE FOR DEMO PURPOSES ---
    // In production, the client must use Firebase SDK to sign in and then send the ID Token.
    // The server then verifies the ID Token (as in authMiddleware).

    try {
        // --- Mock Fetching User Role from Firestore based on Email ---
        const usersRef = db.collection('users');
        const userQuery = await usersRef.where('email', '==', email).limit(1).get();
        
        if (userQuery.empty) {
            return res.status(404).json({ message: 'User not found or role not assigned.' });
        }
        
        const userData = userQuery.docs[0].data();

        // In a real scenario, the client sends the token, and the server verifies it. 
        // We simulate returning the necessary user data here.
        return res.status(200).json({
            message: 'Authentication successful (Role fetched)',
            user: {
                uid: userQuery.docs[0].id, // UID from Firestore document ID
                email: userData.email,
                role: userData.role, // 'Student', 'Admin', 'Super Admin'
                name: userData.name
            }
        });

    } catch (error) {
        console.error('Server-side login error:', error.message);
        return res.status(500).json({ message: 'Internal server error during login processing.' });
    }
};

module.exports = { loginUser };