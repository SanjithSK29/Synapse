# Synapse - AI Timetable Generator

![Synapse Logo](5.png)

## 🧠 Overview

Synapse is an intelligent timetable generator that leverages AI to create personalized schedules by analyzing your energy levels and task intensity preferences. Through an interactive MCQ-based assessment, Synapse understands your productivity patterns and optimizes your daily routine for maximum efficiency.

## ✨ Features

### 🎯 Smart Task Analysis
- **Energy Level Assessment**: Comprehensive MCQ-based evaluation of your energy patterns throughout the day
- **Task Intensity Classification**: Automatic categorization of tasks based on complexity and mental/physical demands
- **Personalized Scheduling**: AI-driven optimization that matches high-energy tasks with your peak performance hours

### 🔐 Google OAuth Authentication
- **Secure Login**: Google OAuth 2.0 integration for safe and easy authentication
- **User Profile Management**: Automatic profile creation and management
- **Session Management**: Secure session handling with JWT tokens

### 🎨 Modern Dark Mode UI
- **Beautiful Design**: Dark mode interface with custom background images
- **Responsive Layout**: Works perfectly on all device sizes
- **Custom Branding**: Personalized logo and color scheme

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Google Cloud Console account for OAuth setup

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SanjithSK29/Synapse.git
   cd Synapse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Google OAuth**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `http://localhost:3000/auth/google/callback`

4. **Configure environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` with your credentials:
   ```
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here
   GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
   PORT=3000
   NODE_ENV=development
   SESSION_SECRET=your_session_secret_here
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎮 How It Works

### Step 1: Authentication
- Click "Continue with Google" to authenticate
- Grant necessary permissions for profile access
- Automatic account creation and session management

### Step 2: Energy Assessment (Coming Soon)
Complete a series of multiple-choice questions about:
- Your typical energy levels throughout the day
- Preferred work times and break patterns
- Task complexity preferences
- Environmental factors affecting productivity

### Step 3: AI Analysis (Coming Soon)
Synapse processes your data to:
- Map your energy patterns
- Classify task intensities
- Identify optimal scheduling windows
- Generate personalized recommendations

### Step 4: Schedule Generation (Coming Soon)
Receive your optimized timetable featuring:
- Energy-matched task placement
- Strategic break scheduling
- Flexible time buffers
- Real-time adjustments

## 🛠️ Technology Stack

- **Backend**: Node.js with Express
- **Authentication**: Passport.js with Google OAuth 2.0
- **Session Management**: Express-session
- **Frontend**: HTML5, CSS3, JavaScript
- **Styling**: Custom CSS with dark mode theme
- **Static Files**: Express static middleware

## 📱 Current Features

### Authentication System
- **Google OAuth Integration**: Secure login with Google accounts
- **Session Management**: Persistent user sessions
- **User Profile Display**: Shows authenticated user information
- **Logout Functionality**: Secure session termination

### UI/UX Features
- **Dark Mode Theme**: Modern, eye-friendly interface
- **Custom Background**: Personalized background image support
- **Responsive Design**: Works on desktop and mobile
- **Custom Logo**: Branded logo display
- **Smooth Animations**: Hover effects and transitions

## 🔧 Configuration

### Environment Variables
```env
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
PORT=3000
NODE_ENV=development
SESSION_SECRET=your_session_secret_here
```

### File Structure
```
Synapse/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── env.example           # Environment variables template
├── background.png        # Background image
├── 5.png                # Logo image
├── client/              # Frontend files (for future React integration)
└── README.md            # This file
```

## 🚧 Roadmap

### Version 1.1 (Current)
- ✅ Google OAuth authentication
- ✅ Dark mode UI
- ✅ Custom branding
- ✅ Session management

### Version 1.2 (Next)
- [ ] Energy assessment questionnaire
- [ ] Task input interface
- [ ] Basic AI analysis
- [ ] Simple timetable generation

### Version 2.0 (Future)
- [ ] Advanced AI recommendations
- [ ] Calendar integration
- [ ] Mobile app
- [ ] Team collaboration features

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google OAuth 2.0 for secure authentication
- Express.js community for excellent documentation
- Modern web design principles for UI/UX

## 📞 Support

- **Documentation**: [Wiki](https://github.com/SanjithSK29/Synapse/wiki)
- **Issues**: [GitHub Issues](https://github.com/SanjithSK29/Synapse/issues)
- **Discussions**: [GitHub Discussions](https://github.com/SanjithSK29/Synapse/discussions)

---

**Made with ❤️ by the Synapse Team**

*Transform your productivity with AI-powered scheduling*

## 🎨 Customization

### Changing the Background
Replace `background.png` with your own image to customize the login page background.

### Updating the Logo
Replace `5.png` with your own logo file to brand the application.

### Color Scheme
The current theme uses a purple/pink color scheme. You can modify the colors in `server.js` by updating the CSS variables.

---

**Current Status**: Authentication system complete, AI features in development