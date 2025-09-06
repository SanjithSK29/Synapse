// geminiService.js (Corrected Browser-Compatible Version)

class GeminiService {
  constructor(apiKey) {
      this.apiKey = apiKey;
      // CORRECTED: The model name is 1.5, not 2.5
      this.modelName = "gemini-2.5-flash";
      this.apiUrl = `https://generativelanguage.googleapis.com/v1/models/${this.modelName}:generateContent?key=${this.apiKey}`;
  }

  async getAnalysis(initialAssessment, dailyCheckin) {
      const prompt = this.createAnalysisPrompt(initialAssessment, dailyCheckin);
    
      const requestBody = {
          "contents": [{
              "parts": [{ "text": prompt }]
          }]
      };

      try {
          const response = await fetch(this.apiUrl, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestBody),
          });

          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(`API call failed with status: ${response.status}. ${errorData.error.message}`);
          }

          const data = await response.json();
          const text = data.candidates[0].content.parts[0].text;
          const cleanedJsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
          
          return JSON.parse(cleanedJsonString);

      } catch (error) {
          console.error("Error in getAnalysis:", error);
          throw error;
      }
  }

  createAnalysisPrompt(assessment, checkin) {
      return `
          You are "Synapse AI," an expert productivity and wellness coach. Your goal is to analyze user data to generate a personalized, optimized daily timetable.
          Analyze the following user data:
          **1. Initial Assessment (User's Core Profile):**
          \`\`\`json
          ${JSON.stringify(assessment, null, 2)}
          \`\`\`
          **2. Today's Check-in (User's Current State):**
          \`\`\`json
          ${JSON.stringify(checkin, null, 2)}
          \`\`\`
          **Your Task:**
          Based on BOTH the initial assessment and today's check-in, generate a personalized timetable for today. 
          **Output Requirements:**
          - **Return a single, valid JSON object.** Do NOT include any text before or after the JSON object.
          - The JSON object must have a root key named "timetable".
          - The "timetable" value should be an array of objects, where each object has "time", "activity", and "reason" keys.
          - Incorporate the user's "most_important_task".
          Example of the required JSON output format:
          {
            "timetable": [
              {
                "time": "9:00 AM - 9:30 AM",
                "activity": "Morning Review & Planning",
                "reason": "Ease into the day and align with your standard start time preference."
              }
            ]
          }
      `;
  }

  async testConnection() {
      const testBody = { "contents": [{ "parts": [{ "text": "Hello" }] }] };
      try {
          const response = await fetch(this.apiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(testBody),
          });
          return response.ok;
      } catch (error) {
          console.error('API connection test failed:', error);
          return false;
      }
  }
}