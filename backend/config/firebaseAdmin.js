// backend/config/firebaseAdmin.js
const admin = require('firebase-admin');

// Load environment variables for the service account path
require('dotenv').config();

// Ensure the service account path is defined
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

if (!serviceAccountPath) {
  console.error("FATAL ERROR: FIREBASE_SERVICE_ACCOUNT_PATH not set in .env");
  process.exit(1);
}

// Initialize the Firebase Admin SDK
try {
  const serviceAccount = require(serviceAccountPath);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // Optionally add databaseURL if using Realtime Database
    // databaseURL: "https://your-project-id.firebaseio.com" 
  });

  console.log("Firebase Admin SDK initialized successfully.");
} catch (error) {
  console.error("Firebase Initialization Error. Check service account path:", error.message);
  process.exit(1);
}

// Export Firestore and Auth references for use across controllers
const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };