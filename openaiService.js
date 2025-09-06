// openaiService.js

class OpenAIService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        // This is the new API endpoint for OpenAI
        this.apiUrl = 'https://api.openai.com/v1/chat/completions';
    }

    /**
     * Sends the assessment and daily check-in data to the OpenAI API for analysis.
     * @param {object} initialAssessment - The user's answers from the initial assessment.
     * @param {object} dailyCheckin - The user's answers from the latest daily check-in.
     * @returns {Promise<object>} - The parsed JSON response from the OpenAI API.
     */
    async getAnalysis(initialAssessment, dailyCheckin) {
        const userPrompt = this.createAnalysisPrompt(initialAssessment, dailyCheckin);

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // OpenAI uses a Bearer token for authorization
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    // The model to use (gpt-3.5-turbo is fast and effective)
                    model: 'gpt-3.5-turbo', 
                    // The messages array tells the AI its role and the user's request
                    messages: [
                        {
                            role: 'system',
                            content: 'You are "Synapse AI," an expert productivity and wellness coach. Your goal is to analyze user data to generate a personalized, optimized daily timetable. Return your response ONLY as a valid JSON object.'
                        },
                        {
                            role: 'user',
                            content: userPrompt
                        }
                    ],
                    // This tells the AI to output in JSON format
                    response_format: { "type": "json_object" }
                }),
            });

            if (!response.ok) {
                const errorBody = await response.json();
                console.error('API Error Response:', errorBody);
                throw new Error(`API call failed with status: ${response.status}. ${errorBody.error?.message || ''}`);
            }

            const data = await response.json();
            const responseText = data.choices[0]?.message?.content;
            if (!responseText) {
                throw new Error('Invalid response structure from OpenAI API.');
            }
            
            return JSON.parse(responseText);

        } catch (error) {
            console.error('Error in getAnalysis:', error);
            throw error;
        }
    }

    /**
     * Creates a structured prompt for the AI. (This part is the same as before)
     * @param {object} assessment - The user's initial assessment data.
     * @param {object} checkin - The user's daily check-in data.
     * @returns {string} - A detailed prompt for the AI.
     */
    createAnalysisPrompt(assessment, checkin) {
        return `
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
     * A simple test to check if the OpenAI API key is valid.
     * @returns {Promise<boolean>} - True if the connection is successful, false otherwise.
     */
    async testConnection() {
        try {
            const response = await fetch('https://api.openai.com/v1/models', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`
                }
            });
            return response.ok;
        } catch (error) {
            console.error('API connection test failed:', error);
            return false;
        }
    }
}