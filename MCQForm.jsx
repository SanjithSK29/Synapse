import React, { useState, useEffect } from 'react';

const MCQForm = () => {
  // Sample MCQ data - replace with your actual questions
  const questions = [
    {
      id: 1,
      question: "What time of day do you feel most energetic?",
      options: [
        { id: 'morning', text: 'Early morning (6-9 AM)' },
        { id: 'mid-morning', text: 'Mid-morning (9-12 PM)' },
        { id: 'afternoon', text: 'Afternoon (12-3 PM)' },
        { id: 'evening', text: 'Evening (3-6 PM)' },
        { id: 'night', text: 'Night (6-9 PM)' }
      ]
    },
    {
      id: 2,
      question: "How do you prefer to handle complex tasks?",
      options: [
        { id: 'immediately', text: 'Tackle them immediately when assigned' },
        { id: 'planned', text: 'Plan them for high-energy periods' },
        { id: 'broken', text: 'Break them into smaller chunks' },
        { id: 'delegated', text: 'Delegate when possible' }
      ]
    },
    {
      id: 3,
      question: "What type of work environment helps you focus best?",
      options: [
        { id: 'quiet', text: 'Completely quiet' },
        { id: 'background', text: 'Background music' },
        { id: 'busy', text: 'Busy coffee shop atmosphere' },
        { id: 'nature', text: 'Natural sounds (rain, ocean)' }
      ]
    }
  ];

  // Initialize state from localStorage or empty object
  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem('mcqAnswers');
    return savedAnswers ? JSON.parse(savedAnswers) : {};
  });

  // Save to localStorage whenever answers change
  useEffect(() => {
    localStorage.setItem('mcqAnswers', JSON.stringify(answers));
  }, [answers]);

  // Handle answer selection
  const handleAnswerChange = (questionId, answerId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  // Clear all answers
  const clearAnswers = () => {
    setAnswers({});
    localStorage.removeItem('mcqAnswers');
  };

  // Get completion percentage
  const completionPercentage = Math.round((Object.keys(answers).length / questions.length) * 100);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Energy & Productivity Assessment
        </h1>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {completionPercentage}% complete ({Object.keys(answers).length}/{questions.length} questions)
        </p>
      </div>

      <form className="space-y-8">
        {questions.map((question) => (
          <div key={question.id} className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {question.id}. {question.question}
            </h3>
            <div className="space-y-3">
              {question.options.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    answers[question.id] === option.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option.id}
                    checked={answers[question.id] === option.id}
                    onChange={() => handleAnswerChange(question.id, option.id)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                    answers[question.id] === option.id
                      ? 'border-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {answers[question.id] === option.id && (
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    )}
                  </div>
                  <span className="text-gray-700">{option.text}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </form>

      <div className="mt-8 flex justify-between items-center">
        <button
          type="button"
          onClick={clearAnswers}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Clear All Answers
        </button>
        
        <div className="text-sm text-gray-600">
          <p>Answers are automatically saved to your browser</p>
        </div>
      </div>

      {/* Debug section - remove in production */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h4 className="font-semibold text-gray-700 mb-2">Debug Info (Remove in production):</h4>
        <pre className="text-xs text-gray-600 overflow-auto">
          {JSON.stringify(answers, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default MCQForm;
