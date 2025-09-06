import React, { useState, useEffect } from 'react';
import './styles/App.css';
import LoginPage from './components/LoginPage';
import InitialAssessment from './components/InitialAssessment';
import DailyCheckin from './components/DailyCheckin';
import Dashboard from './components/Dashboard';
import GeminiService from './geminiService';

function IntegratedApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('login'); // 'login', 'initial', 'daily', 'dashboard'
  const [userData, setUserData] = useState(null);
  const [geminiService, setGeminiService] = useState(null);
  const [isSendingToGemini, setIsSendingToGemini] = useState(false);
  const [geminiResponse, setGeminiResponse] = useState(null);
  const [apiKey, setApiKey] = useState('');

  // Check for existing authentication on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('synapse_auth');
    const savedUserData = localStorage.getItem('synapse_user_data');
    
    if (savedAuth === 'true' && savedUserData) {
      setIsAuthenticated(true);
      setUserData(JSON.parse(savedUserData));
      setCurrentView('dashboard');
    }
  }, []);

  // Initialize Gemini service when API key is provided
  useEffect(() => {
    if (apiKey) {
      setGeminiService(new GeminiService(apiKey));
    }
  }, [apiKey]);

  const handleGoogleLogin = () => {
    // Simulate OAuth login (replace with actual OAuth flow)
    const mockUser = {
      id: 'user123',
      name: 'John Doe',
      email: 'john@example.com',
      picture: 'https://via.placeholder.com/150'
    };
    
    setIsAuthenticated(true);
    setUserData(mockUser);
    setCurrentView('initial');
    
    // Save to localStorage
    localStorage.setItem('synapse_auth', 'true');
    localStorage.setItem('synapse_user_data', JSON.stringify(mockUser));
  };

  const handleInitialComplete = (data) => {
    const updatedUserData = {
      ...userData,
      initialAssessment: data,
      completedAt: new Date().toISOString()
    };
    
    setUserData(updatedUserData);
    setCurrentView('dashboard');
    
    // Save to localStorage
    localStorage.setItem('synapse_user_data', JSON.stringify(updatedUserData));
  };

  const handleDailyComplete = (data) => {
    const updatedUserData = {
      ...userData,
      dailyCheckins: [...(userData.dailyCheckins || []), {
        ...data,
        completedAt: new Date().toISOString()
      }]
    };
    
    setUserData(updatedUserData);
    setCurrentView('dashboard');
    
    // Save to localStorage
    localStorage.setItem('synapse_user_data', JSON.stringify(updatedUserData));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    setCurrentView('login');
    setGeminiResponse(null);
    
    // Clear localStorage
    localStorage.removeItem('synapse_auth');
    localStorage.removeItem('synapse_user_data');
    localStorage.removeItem('mcqAnswers');
  };

  // Send data to Gemini API
  const sendToGemini = async () => {
    if (!geminiService || !userData?.initialAssessment) {
      alert('Please complete the initial assessment and enter your Gemini API key first');
      return;
    }

    setIsSendingToGemini(true);
    try {
      // Convert assessment data to MCQ format for Gemini
      const mcqData = formatAssessmentForGemini(userData.initialAssessment);
      const response = await geminiService.sendMCQData(mcqData.answers, mcqData.questions);
      setGeminiResponse(response);
      console.log('Gemini API Response:', response);
    } catch (error) {
      console.error('Failed to send data to Gemini:', error);
      alert('Failed to send data to Gemini. Please check your API key and try again.');
    } finally {
      setIsSendingToGemini(false);
    }
  };

  // Test Gemini API connection
  const testGeminiConnection = async () => {
    if (!geminiService) {
      alert('Please enter your Gemini API key first');
      return;
    }

    try {
      const isConnected = await geminiService.testConnection();
      if (isConnected) {
        alert('✅ Gemini API connection successful!');
      } else {
        alert('❌ Gemini API connection failed. Please check your API key.');
      }
    } catch (error) {
      console.error('Connection test failed:', error);
      alert('❌ Connection test failed. Please check your API key.');
    }
  };

  // Format assessment data for Gemini
  const formatAssessmentForGemini = (assessmentData) => {
    const questions = [];
    const answers = {};
    
    // Convert assessment data to MCQ format
    Object.entries(assessmentData).forEach(([key, value], index) => {
      questions.push({
        id: index + 1,
        question: `Assessment Question ${index + 1}: ${key}`,
        options: [
          { id: value, text: value }
        ]
      });
      answers[index + 1] = value;
    });

    return { questions, answers };
  };

  const renderCurrentView = () => {
    if (!isAuthenticated) {
      return <LoginPage onGoogleLogin={handleGoogleLogin} />;
    }

    switch (currentView) {
      case 'initial':
        return <InitialAssessment onComplete={handleInitialComplete} />;
      case 'daily':
        return <DailyCheckin onComplete={handleDailyComplete} />;
      case 'dashboard':
        return (
          <Dashboard 
            userData={userData} 
            onStartDaily={() => setCurrentView('daily')}
            onRestart={() => setCurrentView('initial')}
          />
        );
      default:
        return <InitialAssessment onComplete={handleInitialComplete} />;
    }
  };

  return (
    <div className="app">
      {isAuthenticated && (
        <div className="header">
          <h1 className="logo">SYNAPSE</h1>
          <p className="tagline">Your mind, optimized</p>
          <div className="header-actions">
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      )}
      
      {renderCurrentView()}

      {/* Gemini AI Integration - Show only when authenticated and on dashboard */}
      {isAuthenticated && currentView === 'dashboard' && userData?.initialAssessment && (
        <div className="gemini-integration">
          <div className="gemini-section">
            <h3>🤖 AI Analysis with Gemini</h3>
            
            <div className="gemini-controls">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Gemini API key"
                className="api-key-input"
              />
              
              <div className="gemini-buttons">
                <button
                  onClick={testGeminiConnection}
                  disabled={!apiKey}
                  className="test-btn"
                >
                  Test Connection
                </button>
                
                <button
                  onClick={sendToGemini}
                  disabled={!geminiService || isSendingToGemini}
                  className="send-btn"
                >
                  {isSendingToGemini ? 'Sending...' : 'Analyze with AI'}
                </button>
              </div>
            </div>
            
            {geminiResponse && (
              <div className="gemini-response">
                <h4>AI Analysis Results:</h4>
                <pre>{JSON.stringify(geminiResponse, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default IntegratedApp;
