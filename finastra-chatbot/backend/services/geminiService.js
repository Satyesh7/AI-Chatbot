// backend/services/geminiService.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

class GeminiService {
    constructor() {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error('GEMINI_API_KEY is not configured');
        }
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    }

    async generateResponse(message, userProfile) {
        try {
            const prompt = `
            You are a financial AI assistant helping a user with their investments and financial queries.
            
            User Profile:
            - Monthly Income: ₹${userProfile.monthlyIncome}
            - Risk Tolerance: ${userProfile.riskTolerance}
            - Investment Goals: ${userProfile.investmentGoals?.join(', ') || 'Not specified'}
            - Time Horizon: ${userProfile.timeHorizon}
            
            User Query: "${message}"
            
            Provide a helpful, personalized response based on their profile. If they ask about:
            1. Stocks: Include current market insights
            2. Investment advice: Consider their risk tolerance and time horizon
            3. Financial planning: Factor in their monthly income
            4. General queries: Provide educational and informative responses
            
            Keep responses clear, practical, and tailored to their profile.
            `;

            console.log('Generating response with prompt:', prompt);
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            console.log('Generated response:', response.text());
            
            return {
                type: 'TEXT',
                message: response.text()
            };
        } catch (error) {
            console.error('Error generating response:', error);
            throw new Error('Failed to generate response');
        }
    }

    async analyzeIntent(message) {
        try {
            const prompt = `
            Analyze this financial query: "${message}"
            Return JSON with:
            {
                "type": "INTENT_TYPE",
                "details": "brief description",
                "category": "stocks|mutual_funds|general"
            }
            `;

            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return JSON.parse(response.text());
        } catch (error) {
            console.error('Error analyzing intent:', error);
            return {
                type: 'GENERAL_QUERY',
                details: 'Failed to analyze intent',
                category: 'general'
            };
        }
    }
}

module.exports = GeminiService;