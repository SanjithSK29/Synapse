const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://your-domain.com' : 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.static('client/build'));
app.use(express.static('.'));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL || "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  // Simple user object - no database needed for basic login
  const user = {
    id: profile.id,
    email: profile.emails[0].value,
    name: profile.displayName,
    picture: profile.photos[0].value
  };
  return done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Routes
app.get('/auth/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Simple success page - user is logged in
    res.send(`
      <html>
        <head>
          <title>Login Successful</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              text-align: center; 
              padding: 50px;
              background: url('/background.png') center center / cover no-repeat fixed;
              background-attachment: fixed;
              min-height: 100vh;
              margin: 0;
              color: white;
            }
            .container {
              background: rgba(30, 30, 30, 0.95);
              border: 1px solid rgba(255, 255, 255, 0.1);
              color: #ffffff;
              padding: 40px;
              border-radius: 16px;
              max-width: 500px;
              margin: 0 auto;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
              backdrop-filter: blur(10px);
            }
            .success { color:rgb(225, 123, 210); font-size: 24px; margin-bottom: 20px; }
            .user-info { margin: 20px 0; color: #b0b0b0; }
            .btn {
              background:rgb(138, 36, 228);
              color: white;
              padding: 12px 24px;
              border: none;
              border-radius: 8px;
              text-decoration: none;
              display: inline-block;
              margin-top: 20px;
              transition: all 0.3s ease;
            }
            .btn:hover {
              background:rgb(240, 82, 177);
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="success">✅ Login Successful!</div>
            <div class="user-info">
              <h3>Welcome, ${req.user.name}!</h3>
              <p>Email: ${req.user.email}</p>
            </div>
            <p>You have successfully authenticated with Google OAuth.</p>
            <a href="/" class="btn">Back to Login</a>
          </div>
        </body>
      </html>
    `);
  }
);

app.get('/auth/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.redirect('/');
  });
});

// Serve simple login page for all other routes
app.get('*', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Synapse - AI Timetable Generator</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background: url('/background.png') center center / cover no-repeat fixed;
          background-attachment: fixed;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          margin: 0;
        }
        .login-container {
          background: rgba(30, 30, 30, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 48px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          max-width: 500px;
          width: 100%;
          text-align: center;
        }
        .logo {
          width: 200px;
          height: 200px;
          margin: 0 auto 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
        }
        .logo img {
          width: 150%;
          height: 150%;
          object-fit: contain;
          border-radius: 30px;
        }
        .title {
          font-size: 32px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 12px;
        }
        .subtitle {
          font-size: 16px;
          color: #b0b0b0;
          line-height: 1.5;
          margin-bottom: 40px;
        }
        .google-btn {
          width: 100%;
          padding: 16px;
          background:rgb(227, 110, 240);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          text-decoration: none;
        }
        .google-btn:hover {
          background:rgb(195, 36, 244);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(66, 133, 244, 0.4);
        }
        .google-icon {
          width: 20px;
          height: 20px;
        }
        .privacy-note {
          font-size: 12px;
          color: #888;
          margin-top: 24px;
          line-height: 1.4;
        }
      </style>
    </head>
    <body>
      <div class="login-container">
        <div class="logo">
          <img src="/5.png" alt="Synapse Logo" />
        </div>
        
        <h1 class="title">Synapse</h1>
        
        <p class="subtitle">
          AI-powered timetable generator that analyzes your energy levels and optimizes your schedule
        </p>

        <a href="/auth/google" class="google-btn">
          <svg class="google-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </a>

        <p class="privacy-note">
          By signing in, you agree to our Terms of Service and Privacy Policy. 
          We only access your basic profile information to personalize your experience.
        </p>
      </div>
    </body>
    </html>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Login page available at: http://localhost:${PORT}`);
});
