import React, { useState } from 'react';
import './styles/App.css';
import InitialAssessment from './components/InitialAssessment';
import DailyCheckin from './components/DailyCheckin';
import Dashboard from './components/Dashboard';

function App() {
  const [currentView, setCurrentView] = useState('initial'); // 'initial', 'daily', 'dashboard'
  const [userData, setUserData] = useState(null);

  const handleInitialComplete = (data) => {
    setUserData(data);
    setCurrentView('dashboard');
  };

  const handleDailyComplete = (data) => {
    // Update user data with daily checkin
    setUserData(prev => ({
      ...prev,
      dailyCheckins: [...(prev.dailyCheckins || []), data]
    }));
    setCurrentView('dashboard');
  };

  const renderCurrentView = () => {
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
      <div className="header">
        <h1 className="logo">Synapse</h1>
        <p className="tagline">Your mind, optimized</p>
      </div>
      {renderCurrentView()}
    </div>
  );
}

export default App;
