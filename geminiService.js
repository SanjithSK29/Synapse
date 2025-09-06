// Gemini API Service for sending MCQ data
class GeminiService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
  }

  // Send MCQ answers to Gemini API
  async sendMCQData(answers, questions) {
    try {
      // Prepare the data for Gemini
      const mcqData = this.formatMCQData(answers, questions);
      
      console.log('Sending data to Gemini:', mcqData);
      console.log('API Key (first 10 chars):', this.apiKey.substring(0, 10) + '...');
      
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: mcqData
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}. Details: ${errorText}`);
      }

      const result = await response.json();
      console.log('Success! Gemini response:', result);
      return result;
    } catch (error) {
      console.error('Error sending data to Gemini:', error);
      
      // Provide more specific error messages
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to Gemini API. This might be a CORS issue when running from file://. Try using a local server.');
      } else if (error.message.includes('401')) {
        throw new Error('Invalid API key. Please check your Gemini API key.');
      } else if (error.message.includes('403')) {
        throw new Error('API access forbidden. Please check if your API key has the correct permissions.');
      } else if (error.message.includes('429')) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      
      throw error;
    }
  }

  // Format MCQ data for Gemini API
  formatMCQData(answers, questions) {
    let formattedData = "MCQ Assessment Results:\n\n";
    
    questions.forEach(question => {
      const answerId = answers[question.id];
      const selectedOption = question.options.find(opt => opt.id === answerId);
      
      formattedData += `Question ${question.id}: ${question.question}\n`;
      formattedData += `Answer: ${selectedOption ? selectedOption.text : 'Not answered'}\n\n`;
    });

    // Add summary
    formattedData += `Summary:\n`;
    formattedData += `Total Questions: ${questions.length}\n`;
    formattedData += `Answered: ${Object.keys(answers).length}\n`;
    formattedData += `Completion Rate: ${Math.round((Object.keys(answers).length / questions.length) * 100)}%\n\n`;
    
    formattedData += "Please analyze this data and provide insights about the user's productivity patterns and energy levels.";
    
    return formattedData;
  }

  // Test API connection
  async testConnection() {
    try {
      console.log('Testing Gemini API connection...');
      console.log('API Key (first 10 chars):', this.apiKey.substring(0, 10) + '...');
      
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: "Hello, this is a test message to verify Gemini API connection."
            }]
          }]
        })
      });

      console.log('Test response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Test API Error Response:', errorText);
        return false;
      }

      const result = await response.json();
      console.log('Test successful! Response:', result);
      return true;
    } catch (error) {
      console.error('Gemini API connection test failed:', error);
      return false;
    }
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GeminiService;
} else {
  window.GeminiService = GeminiService;
}
