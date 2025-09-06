import React, { useState, useEffect } from 'react';

const DailyCheckin = ({ onComplete }) => {
  const [formData, setFormData] = useState(() => {
    // Initialize from localStorage if available
    const savedData = localStorage.getItem('synapse_daily_checkin');
    return savedData ? JSON.parse(savedData) : {};
  });

  // Save to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem('synapse_daily_checkin', JSON.stringify(formData));
  }, [formData]);

  const questions = [
    {
      id: "mental_drain",
      text: "On a scale of 1-10, how mentally drained did you feel at the end of yesterday?",
      type: "slider",
      min: 1,
      max: 10,
      labels: {
        1: "Fresh and energized",
        5: "Moderately tired", 
        10: "Completely exhausted"
      }
    },
    {
      id: "focused_work_hours",
      text: "How many hours of focused, deep work did you complete yesterday?",
      type: "number",
      min: 0,
      max: 16
    },
    {
      id: "productivity",
      text: "On a scale of 1-10, how productive did you feel yesterday overall?",
      type: "slider",
      min: 1,
      max: 10,
      labels: {
        1: "Very unproductive",
        5: "Moderately productive",
        10: "Highly productive"
      }
    },
    {
      id: "schedule_adherence",
      text: "How well did you stick to your planned schedule yesterday?",
      type: "slider",
      min: 1,
      max: 10,
      labels: {
        1: "Completely off track",
        5: "Somewhat on track",
        10: "Perfectly on schedule"
      }
    },
    {
      id: "sleep_hours",
      text: "How many hours did you sleep last night?",
      type: "number",
      min: 0,
      max: 12
    },
    {
      id: "sleep_quality",
      text: "On a scale of 1-10, how would you rate your sleep quality last night?",
      type: "slider",
      min: 1,
      max: 10,
      labels: {
        1: "Terrible, restless",
        5: "Average, some interruptions",
        10: "Deep, refreshing sleep"
      }
    },
    {
      id: "energy_level",
      text: "On a scale of 1-10, how energized do you feel right now?",
      type: "slider",
      min: 1,
      max: 10,
      labels: {
        1: "Completely drained",
        5: "Moderate energy",
        10: "Highly energized"
      }
    },
    {
      id: "motivation",
      text: "On a scale of 1-10, how motivated do you feel for today?",
      type: "slider",
      min: 1,
      max: 10,
      labels: {
        1: "No motivation",
        5: "Some motivation",
        10: "Extremely motivated"
      }
    },
    {
      id: "stress_level",
      text: "On a scale of 1-10, how stressed/anxious do you feel right now?",
      type: "slider",
      min: 1,
      max: 10,
      labels: {
        1: "Very calm and relaxed",
        5: "Slightly stressed",
        10: "Very stressed/anxious"
      }
    },
    {
      id: "caffeine_today",
      text: "How much caffeine have you had/planned for today?",
      type: "mcq",
      options: [
        { value: "none", label: "None - Low (1 cup)" },
        { value: "moderate", label: "Moderate (2-3 cups)" },
        { value: "high", label: "High (4+ cups)" }
      ]
    },
    {
      id: "meals_planned",
      text: "How many meals do you plan to eat today?",
      type: "number",
      min: 1,
      max: 6
    },
    {
      id: "health_feeling",
      text: "On a scale of 1-10, how healthy do you feel today?",
      type: "slider",
      min: 1,
      max: 10,
      labels: {
        1: "Unwell/sluggish",
        5: "Average health",
        10: "Very healthy/vibrant"
      }
    },
    {
      id: "college_hours",
      text: "College/Class Hours Today:",
      type: "time_range"
    },
    {
      id: "other_commitments",
      text: "Other Fixed Commitments (meetings, appointments):",
      type: "time_range"
    },
    {
      id: "workload_demand",
      text: "On a scale of 1-10, how challenging/demanding is your workload today?",
      type: "slider",
      min: 1,
      max: 10,
      labels: {
        1: "Light, easy day",
        5: "Moderate workload",
        10: "Very demanding day"
      }
    },
    {
      id: "most_important_task",
      text: "What is your single most important/demanding task for today?",
      type: "text"
    }
  ];

  const handleAnswer = (questionId, answer) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = () => {
    const checkinData = {
      ...formData,
      timestamp: new Date().toISOString(),
      date: new Date().toDateString()
    };
    onComplete(checkinData);
  };

  const isFormComplete = () => {
    return questions.every(q => formData[q.id] !== undefined && formData[q.id] !== '');
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case 'slider':
        return (
          <div key={question.id} className="question">
            <div className="question-text">{question.text}</div>
            <div className="slider-container">
              <input
                type="range"
                min={question.min}
                max={question.max}
                value={formData[question.id] || question.min}
                onChange={(e) => handleAnswer(question.id, parseInt(e.target.value))}
                className="slider"
              />
              <div className="slider-value">{formData[question.id] || question.min}</div>
              <div className="slider-labels">
                <span>{question.labels[question.min]}</span>
                <span>{question.labels[Math.floor((question.min + question.max) / 2)]}</span>
                <span>{question.labels[question.max]}</span>
              </div>
            </div>
          </div>
        );

      case 'number':
        return (
          <div key={question.id} className="question">
            <div className="question-text">{question.text}</div>
            <input
              type="number"
              min={question.min}
              max={question.max}
              value={formData[question.id] || ''}
              onChange={(e) => handleAnswer(question.id, parseInt(e.target.value) || 0)}
              className="input-field"
              placeholder={`Enter number between ${question.min} and ${question.max}`}
            />
          </div>
        );

      case 'mcq':
        return (
          <div key={question.id} className="question">
            <div className="question-text">{question.text}</div>
            <div className="options">
              {question.options.map((option) => (
                <div
                  key={option.value}
                  className={`option ${formData[question.id] === option.value ? 'selected' : ''}`}
                  onClick={() => handleAnswer(question.id, option.value)}
                >
                  <div className="option-label">{option.label}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'text':
        return (
          <div key={question.id} className="question">
            <div className="question-text">{question.text}</div>
            <input
              type="text"
              value={formData[question.id] || ''}
              onChange={(e) => handleAnswer(question.id, e.target.value)}
              className="input-field"
              placeholder="Enter your answer..."
            />
          </div>
        );

      case 'time_range':
        return (
          <div key={question.id} className="question">
            <div className="question-text">{question.text}</div>
            <div className="time-input">
              <input
                type="time"
                value={formData[`${question.id}_start`] || ''}
                onChange={(e) => handleAnswer(`${question.id}_start`, e.target.value)}
                className="input-field"
              />
              <span className="time-separator">to</span>
              <input
                type="time"
                value={formData[`${question.id}_end`] || ''}
                onChange={(e) => handleAnswer(`${question.id}_end`, e.target.value)}
                className="input-field"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="section">
        <h2 className="section-title">Daily Check-in</h2>
        <p style={{ textAlign: 'center', marginBottom: '30px', opacity: 0.8 }}>
          Let's check in on how you're feeling today and plan your day ahead.
        </p>
        
        {questions.map(renderQuestion)}
      </div>

      <div className="button-container">
        <button 
          className="button" 
          onClick={handleSubmit}
          disabled={!isFormComplete()}
        >
          Complete Daily Check-in
        </button>
      </div>
    </div>
  );
};

export default DailyCheckin;
