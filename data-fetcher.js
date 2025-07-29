// Data Fetcher for Veikkaus Euro Jackpot Results
// This script demonstrates how to fetch real data from Veikkaus API

class VeikkausDataFetcher {
    constructor() {
        this.baseUrl = 'https://www.veikkaus.fi/api/draw-games/v1/games/EUROJACKPOT';
        this.proxyUrl = 'https://api.allorigins.win/raw?url=';
    }

    /**
     * Fetch the latest Euro Jackpot results
     * @param {number} limit - Number of results to fetch
     * @returns {Promise<Array>} Array of draw results
     */
    async fetchLatestResults(limit = 20) {
        try {
            const url = `${this.baseUrl}/draws?limit=${limit}`;
            const response = await fetch(this.proxyUrl + encodeURIComponent(url));
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return this.processDrawData(data);
        } catch (error) {
            console.error('Error fetching data from Veikkaus:', error);
            return this.getFallbackData();
        }
    }

    /**
     * Process raw draw data from Veikkaus API
     * @param {Object} rawData - Raw API response
     * @returns {Array} Processed draw results
     */
    processDrawData(rawData) {
        if (!rawData || !rawData.draws) {
            throw new Error('Invalid data structure');
        }

        return rawData.draws.map(draw => {
            const results = draw.results[0]; // First result set
            
            return {
                date: draw.drawTime.split('T')[0], // Extract date part
                numbers: results.primary.sort((a, b) => a - b),
                euroNumbers: results.secondary.sort((a, b) => a - b),
                jackpot: this.extractJackpotAmount(draw.prizePool),
                drawId: draw.id
            };
        });
    }

    /**
     * Extract jackpot amount from prize pool data
     * @param {Array} prizePool - Prize pool array from API
     * @returns {number} Jackpot amount in euros
     */
    extractJackpotAmount(prizePool) {
        if (!prizePool || !Array.isArray(prizePool)) {
            return 0;
        }

        // Find the jackpot tier (usually tier 1)
        const jackpotTier = prizePool.find(tier => tier.tier === 1);
        return jackpotTier ? jackpotTier.shareAmount : 0;
    }

    /**
     * Fetch historical data for a specific date range
     * @param {string} startDate - Start date (YYYY-MM-DD)
     * @param {string} endDate - End date (YYYY-MM-DD)
     * @returns {Promise<Array>} Historical draw results
     */
    async fetchHistoricalData(startDate, endDate) {
        try {
            const url = `${this.baseUrl}/draws?startDate=${startDate}&endDate=${endDate}`;
            const response = await fetch(this.proxyUrl + encodeURIComponent(url));
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return this.processDrawData(data);
        } catch (error) {
            console.error('Error fetching historical data:', error);
            return [];
        }
    }

    /**
     * Get fallback data when API is unavailable
     * @returns {Array} Sample data for development/testing
     */
    getFallbackData() {
        return [
            {
                date: '2024-01-26',
                numbers: [7, 23, 27, 42, 45],
                euroNumbers: [1, 9],
                jackpot: 17000000,
                drawId: 'fallback-1'
            },
            {
                date: '2024-01-23',
                numbers: [3, 12, 15, 25, 43],
                euroNumbers: [2, 8],
                jackpot: 15000000,
                drawId: 'fallback-2'
            },
            {
                date: '2024-01-19',
                numbers: [8, 19, 31, 38, 49],
                euroNumbers: [4, 7],
                jackpot: 13000000,
                drawId: 'fallback-3'
            }
        ];
    }

    /**
     * Validate draw result data
     * @param {Object} draw - Draw result object
     * @returns {boolean} True if valid
     */
    validateDrawData(draw) {
        return (
            draw &&
            draw.date &&
            Array.isArray(draw.numbers) &&
            draw.numbers.length === 5 &&
            Array.isArray(draw.euroNumbers) &&
            draw.euroNumbers.length === 2 &&
            typeof draw.jackpot === 'number'
        );
    }

    /**
     * Get statistics from draw results
     * @param {Array} draws - Array of draw results
     * @returns {Object} Statistics object
     */
    calculateStatistics(draws) {
        const stats = {
            totalDraws: draws.length,
            numberFrequency: {},
            euroNumberFrequency: {},
            jackpotStats: {
                min: Math.min(...draws.map(d => d.jackpot)),
                max: Math.max(...draws.map(d => d.jackpot)),
                average: draws.reduce((sum, d) => sum + d.jackpot, 0) / draws.length
            }
        };

        // Calculate number frequencies
        for (let i = 1; i <= 50; i++) {
            stats.numberFrequency[i] = 0;
        }
        for (let i = 1; i <= 12; i++) {
            stats.euroNumberFrequency[i] = 0;
        }

        draws.forEach(draw => {
            draw.numbers.forEach(num => {
                stats.numberFrequency[num]++;
            });
            draw.euroNumbers.forEach(num => {
                stats.euroNumberFrequency[num]++;
            });
        });

        return stats;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VeikkausDataFetcher;
}

// Usage example:
/*
const fetcher = new VeikkausDataFetcher();

// Fetch latest results
fetcher.fetchLatestResults(10).then(results => {
    console.log('Latest results:', results);
    
    // Calculate statistics
    const stats = fetcher.calculateStatistics(results);
    console.log('Statistics:', stats);
});

// Fetch historical data
const startDate = '2023-01-01';
const endDate = '2023-12-31';
fetcher.fetchHistoricalData(startDate, endDate).then(historical => {
    console.log('Historical data:', historical);
});
*/
