// geminiService.js

class GeminiService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        // FINAL FIX: Changed model name to gemini-1.5-flash-latest
        this.apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent?key=${this.apiKey}`;
    }

    /**
     * Sends the assessment and daily check-in data to the Gemini API for analysis.
     * @param {object} initialAssessment - The user's answers from the initial assessment.
     * @param {object} dailyCheckin - The user's answers from the latest daily check-in.
     * @returns {Promise<object>} - The parsed JSON response from the Gemini API.
     */
    async getAnalysis(initialAssessment, dailyCheckin) {
        // Construct a detailed prompt for the AI
        const prompt = this.createAnalysisPrompt(initialAssessment, dailyCheckin);

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                }),
            });

            if (!response.ok) {
                const errorBody = await response.json();
                console.error('API Error Response:', errorBody);
                throw new Error(`API call failed with status: ${response.status}. ${errorBody.error?.message || ''}`);
            }

            const data = await response.json();
            
            // Extract and parse the JSON from the model's response text
            const responseText = data.candidates[0]?.content?.parts[0]?.text;
            if (!responseText) {
                throw new Error('Invalid response structure from Gemini API.');
            }

            // Clean the response text to ensure it's valid JSON
            const cleanedJsonString = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            
            return JSON.parse(cleanedJsonString);

        } catch (error) {
            console.error('Error in getAnalysis:', error);
            throw error;
        }
    }

    /**
     * Creates a structured prompt for the Gemini API.
     * @param {object} assessment - The user's initial assessment data.
     * @param {object} checkin - The user's daily check-in data.
     * @returns {string} - A detailed prompt for the AI.
     */
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
            The timetable should be structured into logical blocks (e.g., Morning, Mid-Day, Afternoon, Evening).

            **Output Requirements:**
            - **Return a single, valid JSON object.** Do NOT include any text before or after the JSON object.
            - The JSON object must have a root key named "timetable".
            - The "timetable" value should be an array of objects, where each object represents a time block and has the following keys: "time" (string, e.g., "9:00 AM - 11:00 AM"), "activity" (string, e.g., "Deep Work on Priority Task"), and "reason" (string, a brief explanation of why this activity is scheduled at this time based on user data).
            - Include at least 5-7 time blocks, covering the main parts of the user's day.
            - Incorporate the user's "most_important_task" from the check-in data into a "Deep Work" block.
            - Schedule breaks and meals according to the user's preferences in the assessment.
            - Schedule the most demanding tasks during the user's self-reported peak productivity time ("alert_time" from assessment).

            Example of the required JSON output format:
            {
              "timetable": [
                {
                  "time": "9:00 AM - 9:30 AM",
                  "activity": "Morning Review & Planning",
                  "reason": "Ease into the day and align with your standard start time preference."
                },
                {
                  "time": "9:30 AM - 11:30 AM",
                  "activity": "Deep Work on: [User's most important task]",
                  "reason": "Scheduled during your peak 'Mid-Morning Warrior' energy window for maximum focus."
                }
              ]
            }
        `;
    }

    /**
     * A simple test to check if the API key is valid.
     * @returns {Promise<boolean>} - True if the connection is successful, false otherwise.
     */
    async testConnection() {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: "Hello" }] }],
                }),
            });
            return response.ok;
        } catch (error) {
            console.error('API connection test failed:', error);
            return false;
        }
    }
}