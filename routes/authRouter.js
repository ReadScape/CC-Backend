const express = require("express");
const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } = require('firebase/auth');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQTC4irRMHRRaipl6mfLgokbxuHAQqNVM",
    authDomain: "testing-25102023.firebaseapp.com",
    projectId: "testing-25102023",
    storageBucket: "testing-25102023.appspot.com",
    messagingSenderId: "263306699641",
    appId: "1:263306699641:web:8f7bbdb9a200e9d12cc5a8"
  };
  
// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
  
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        

        console.log("User signed up:", user.uid);
        res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
        console.error("Sign-up error:", error.message);
        res.status(400).json({ error: 'Error signing up user' });
    }
});
    
// Sign-in route

router.post('/signin', async (req, res) => {
  const { email, password, googleToken } = req.body;
  try {
    if (googleToken) {
      const googleProvider = new GoogleAuthProvider();
      const googleCredential = await signInWithPopup(auth, googleProvider);
      const user = googleCredential.user;

      console.log("User signed in with Google:", user.uid);
      res.json({ message: 'User signed in successfully'});
    } else {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("User signed in with email and password:", user.uid);
      res.json({ message: 'User signed in successfully'});
    }
  } catch (error) {
    console.error("Sign-in error:", error.message);
    res.status(401).json({ error: 'Error signing in user' });
  }
});

router.get('/check-auth', (req, res) => {
    onAuthStateChanged(auth, user => {
      if (user) {
        res.json({ authenticated: true, uid: user.uid, email: user.email });
      } else {
        res.json({ authenticated: false });
      }
    }); // Assuming you attach the user token to the request object during authentication
});

module.exports = router;