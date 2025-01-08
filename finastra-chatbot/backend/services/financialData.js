const axios = require('axios');

class FinancialDataService {
    constructor() {
        this.apiKey = process.env.ALPHA_VANTAGE_API_KEY;
        this.baseUrl = 'https://www.alphavantage.co/query';
    }

    async getStockPrice(symbol) {
        try {
            const response = await axios.get(this.baseUrl, {
                params: {
                    function: 'GLOBAL_QUOTE',
                    symbol,
                    apikey: this.apiKey
                }
            });
            return response.data['Global Quote'];
        } catch (error) {
            console.error('Error fetching stock price:', error);
            throw error;
        }
    }

    async getStockTimeSeries(symbol) {
        try {
            const response = await axios.get(this.baseUrl, {
                params: {
                    function: 'TIME_SERIES_DAILY',
                    symbol,
                    outputsize: 'compact',
                    apikey: this.apiKey
                }
            });
            return response.data['Time Series (Daily)'];
        } catch (error) {
            console.error('Error fetching time series:', error);
            throw error;
        }
    }

    async getCompanyOverview(symbol) {
        try {
            const response = await axios.get(this.baseUrl, {
                params: {
                    function: 'OVERVIEW',
                    symbol,
                    apikey: this.apiKey
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching company overview:', error);
            throw error;
        }
    }
}

module.exports = FinancialDataService;