import React from 'react';

const Dashboard = ({ userData, onStartDaily, onRestart }) => {
  const latestCheckin = userData?.dailyCheckins?.[userData.dailyCheckins.length - 1];

  const getEnergyLevel = (level) => {
    if (level >= 8) return { text: "High Energy", color: "#4ecdc4" };
    if (level >= 5) return { text: "Moderate Energy", color: "#ffd93d" };
    return { text: "Low Energy", color: "#ff6b9d" };
  };

  const getMotivationLevel = (level) => {
    if (level >= 8) return { text: "Highly Motivated", color: "#4ecdc4" };
    if (level >= 5) return { text: "Moderately Motivated", color: "#ffd93d" };
    return { text: "Low Motivation", color: "#ff6b9d" };
  };

  const getStressLevel = (level) => {
    if (level <= 3) return { text: "Very Calm", color: "#4ecdc4" };
    if (level <= 6) return { text: "Moderate Stress", color: "#ffd93d" };
    return { text: "High Stress", color: "#ff6b9d" };
  };

  return (
    <div className="container">
      <div className="section">
        <h2 className="section-title">Your SYNAPSE Dashboard</h2>
        
        {latestCheckin ? (
          <div>
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.1)', 
              borderRadius: '16px', 
              padding: '20px', 
              marginBottom: '30px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h3 style={{ marginBottom: '20px', color: '#4ecdc4' }}>Today's Status</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: getEnergyLevel(latestCheckin.energy_level).color }}>
                    {latestCheckin.energy_level}/10
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Energy Level</div>
                  <div style={{ fontSize: '0.8rem', color: getEnergyLevel(latestCheckin.energy_level).color, marginTop: '5px' }}>
                    {getEnergyLevel(latestCheckin.energy_level).text}
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: getMotivationLevel(latestCheckin.motivation).color }}>
                    {latestCheckin.motivation}/10
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Motivation</div>
                  <div style={{ fontSize: '0.8rem', color: getMotivationLevel(latestCheckin.motivation).color, marginTop: '5px' }}>
                    {getMotivationLevel(latestCheckin.motivation).text}
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: getStressLevel(latestCheckin.stress_level).color }}>
                    {latestCheckin.stress_level}/10
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Stress Level</div>
                  <div style={{ fontSize: '0.8rem', color: getStressLevel(latestCheckin.stress_level).color, marginTop: '5px' }}>
                    {getStressLevel(latestCheckin.stress_level).text}
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4ecdc4' }}>
                    {latestCheckin.sleep_hours}h
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Sleep Last Night</div>
                  <div style={{ fontSize: '0.8rem', color: '#4ecdc4', marginTop: '5px' }}>
                    Quality: {latestCheckin.sleep_quality}/10
                  </div>
                </div>
              </div>
            </div>

            {latestCheckin.most_important_task && (
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.1)', 
                borderRadius: '16px', 
                padding: '20px', 
                marginBottom: '30px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <h3 style={{ marginBottom: '15px', color: '#4ecdc4' }}>Today's Priority Task</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.5' }}>{latestCheckin.most_important_task}</p>
              </div>
            )}

            <div style={{ 
              background: 'rgba(255, 255, 255, 0.1)', 
              borderRadius: '16px', 
              padding: '20px', 
              marginBottom: '30px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h3 style={{ marginBottom: '15px', color: '#4ecdc4' }}>Your Profile Insights</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                <div>
                  <strong>Alert Time:</strong> {userData.alert_time?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </div>
                <div>
                  <strong>Work Style:</strong> {userData.project_approach?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </div>
                <div>
                  <strong>Learning Style:</strong> {userData.learning_style?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </div>
                <div>
                  <strong>Exercise Frequency:</strong> {userData.exercise_frequency?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.1)', 
            borderRadius: '16px', 
            padding: '40px', 
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{ marginBottom: '20px', color: '#4ecdc4' }}>Welcome to SYNAPSE!</h3>
            <p style={{ marginBottom: '30px', fontSize: '1.1rem', lineHeight: '1.5' }}>
              Your initial assessment is complete. Start your daily check-in to begin tracking your productivity patterns and optimizing your mind.
            </p>
          </div>
        )}

        <div className="button-container">
          <button className="button" onClick={onStartDaily}>
            {latestCheckin ? 'Daily Check-in' : 'Start Daily Check-in'}
          </button>
          <button className="button secondary" onClick={onRestart}>
            Retake Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
