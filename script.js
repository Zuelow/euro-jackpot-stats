// Euro Jackpot Statistics Website
class EuroJackpotStats {
    constructor() {
        this.results = [];
        this.numberFrequency = {};
        this.euroNumberFrequency = {};
        this.init();
    }

    async init() {
        await this.loadSampleData();
        this.createPixelVisualization();
        this.displayLatestResults();
        this.createCharts();
        this.calculateStats();
        this.setupInteractivity();
    }

    // Load sample data and attempt to fetch real data from Veikkaus
    async loadSampleData() {
        // Extended sample Euro Jackpot results for better statistics
        this.results = [
            { date: '2024-01-26', numbers: [7, 23, 27, 42, 45], euroNumbers: [1, 9], jackpot: 17000000 },
            { date: '2024-01-23', numbers: [3, 12, 15, 25, 43], euroNumbers: [2, 8], jackpot: 15000000 },
            { date: '2024-01-19', numbers: [8, 19, 31, 38, 49], euroNumbers: [4, 7], jackpot: 13000000 },
            { date: '2024-01-16', numbers: [5, 14, 22, 35, 47], euroNumbers: [3, 6], jackpot: 11000000 },
            { date: '2024-01-12', numbers: [2, 18, 29, 41, 50], euroNumbers: [1, 5], jackpot: 90000000 },
            { date: '2024-01-09', numbers: [11, 16, 24, 33, 46], euroNumbers: [2, 10], jackpot: 85000000 },
            { date: '2024-01-05', numbers: [9, 21, 28, 37, 44], euroNumbers: [5, 11], jackpot: 80000000 },
            { date: '2024-01-02', numbers: [6, 17, 26, 39, 48], euroNumbers: [3, 7], jackpot: 75000000 },
            { date: '2023-12-29', numbers: [4, 13, 20, 34, 41], euroNumbers: [1, 8], jackpot: 70000000 },
            { date: '2023-12-26', numbers: [1, 10, 22, 35, 49], euroNumbers: [4, 12], jackpot: 65000000 },
            { date: '2023-12-22', numbers: [15, 25, 30, 40, 47], euroNumbers: [2, 6], jackpot: 60000000 },
            { date: '2023-12-19', numbers: [12, 19, 32, 38, 45], euroNumbers: [9, 11], jackpot: 55000000 },
            { date: '2023-12-15', numbers: [8, 14, 27, 36, 43], euroNumbers: [1, 10], jackpot: 50000000 },
            { date: '2023-12-12', numbers: [3, 18, 23, 31, 42], euroNumbers: [5, 7], jackpot: 45000000 },
            { date: '2023-12-08', numbers: [7, 16, 29, 37, 46], euroNumbers: [3, 8], jackpot: 40000000 },
            { date: '2023-12-05', numbers: [2, 11, 24, 33, 44], euroNumbers: [2, 12], jackpot: 35000000 },
            { date: '2023-12-01', numbers: [5, 20, 26, 39, 48], euroNumbers: [4, 9], jackpot: 30000000 },
            { date: '2023-11-28', numbers: [9, 17, 28, 34, 41], euroNumbers: [1, 6], jackpot: 25000000 },
            { date: '2023-11-24', numbers: [13, 21, 30, 38, 47], euroNumbers: [7, 11], jackpot: 20000000 },
            { date: '2023-11-21', numbers: [6, 15, 25, 35, 49], euroNumbers: [5, 10], jackpot: 18000000 }
        ];

        // Try to fetch real data (this would need a CORS proxy in production)
        try {
            await this.fetchRealData();
        } catch (error) {
            console.log('Using sample data as real data fetch failed:', error.message);
        }

        // Calculate number frequencies
        this.calculateFrequencies();
    }

    // Attempt to fetch real data from Veikkaus (would need CORS proxy in production)
    async fetchRealData() {
        // This is a placeholder for real API integration
        // In production, you'd need to either:
        // 1. Use a CORS proxy
        // 2. Create a backend service to fetch the data
        // 3. Use web scraping with a headless browser

        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const targetUrl = 'https://www.veikkaus.fi/api/draw-games/v1/games/EUROJACKPOT/draws';

        try {
            const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
            if (response.ok) {
                const data = await response.json();
                // Process the real data here
                console.log('Real data fetched:', data);
                // this.processRealData(data);
            }
        } catch (error) {
            throw new Error('Failed to fetch real data');
        }
    }

    calculateFrequencies() {
        // Initialize frequency objects
        for (let i = 1; i <= 50; i++) {
            this.numberFrequency[i] = 0;
        }
        for (let i = 1; i <= 12; i++) {
            this.euroNumberFrequency[i] = 0;
        }

        // Count frequencies from results
        this.results.forEach(result => {
            result.numbers.forEach(num => {
                this.numberFrequency[num]++;
            });
            result.euroNumbers.forEach(num => {
                this.euroNumberFrequency[num]++;
            });
        });
    }

    generateTodaysDraw(date) {
        // Generate realistic numbers for today's draw
        // Use date as seed for consistent results on the same day
        const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();

        // Seeded random number generator for consistent results
        const seededRandom = (seed) => {
            let x = Math.sin(seed) * 10000;
            return x - Math.floor(x);
        };

        // Generate main numbers (5 numbers from 1-50)
        const mainNumbers = [];
        let currentSeed = seed;
        while (mainNumbers.length < 5) {
            currentSeed++;
            const num = Math.floor(seededRandom(currentSeed) * 50) + 1;
            if (!mainNumbers.includes(num)) {
                mainNumbers.push(num);
            }
        }
        mainNumbers.sort((a, b) => a - b);

        // Generate euro numbers (2 numbers from 1-12)
        const euroNumbers = [];
        while (euroNumbers.length < 2) {
            currentSeed++;
            const num = Math.floor(seededRandom(currentSeed) * 12) + 1;
            if (!euroNumbers.includes(num)) {
                euroNumbers.push(num);
            }
        }
        euroNumbers.sort((a, b) => a - b);

        // Generate realistic jackpot amount (between 10M and 120M)
        currentSeed++;
        const baseJackpot = 10000000; // 10 million minimum
        const maxExtra = 110000000; // up to 120 million total
        const jackpot = baseJackpot + Math.floor(seededRandom(currentSeed) * maxExtra);

        return {
            date: date.toISOString().split('T')[0],
            numbers: mainNumbers,
            euroNumbers: euroNumbers,
            jackpot: jackpot,
            drawId: `today-${seed}`
        };
    }

    createPixelVisualization() {
        const grid = document.getElementById('pixelGrid');
        const totalPixels = 560; // Representing ~140 million (4x more pixels for bigger grid)
        const pixelsPerRow = 40; // More pixels per row for larger area

        // Clear existing content
        grid.innerHTML = '';

        // Add title and counter
        const title = document.createElement('div');
        title.style.cssText = `
            position: absolute;
            top: -35px;
            left: 0;
            font-size: 16px;
            font-weight: bold;
            color: #333;
        `;
        title.textContent = 'Visualization: 1 in 139,838,160 odds';
        grid.appendChild(title);

        for (let i = 0; i < totalPixels; i++) {
            const pixel = document.createElement('div');
            pixel.style.cssText = `
                position: absolute;
                width: 8px;
                height: 8px;
                background: ${i === 0 ? '#ff6b6b' : '#e0e0e0'};
                left: ${(i % pixelsPerRow) * 10}px;
                top: ${Math.floor(i / pixelsPerRow) * 10 + 20}px;
                border-radius: 50%;
                transition: all 0.3s ease;
                cursor: pointer;
            `;

            if (i === 0) {
                pixel.style.animation = 'pulse 2s infinite';
                pixel.style.boxShadow = '0 0 15px rgba(255, 107, 107, 0.7)';
                pixel.style.zIndex = '10';
                pixel.title = 'This is YOU! 1 winning ticket out of 139,838,160 possible combinations';
            } else {
                pixel.title = `Dot ${i + 1}: Represents 250,000 losing combinations`;
            }

            // Add hover effect
            pixel.addEventListener('mouseenter', () => {
                if (i !== 0) {
                    pixel.style.background = '#667eea';
                    pixel.style.transform = 'scale(1.5)';
                    pixel.style.zIndex = '5';
                }
            });

            pixel.addEventListener('mouseleave', () => {
                if (i !== 0) {
                    pixel.style.background = '#e0e0e0';
                    pixel.style.transform = 'scale(1)';
                    pixel.style.zIndex = '1';
                }
            });

            grid.appendChild(pixel);
        }

        // Add interactive counter
        const counter = document.createElement('div');
        counter.style.cssText = `
            position: absolute;
            bottom: -50px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 14px;
            color: #666;
            background: rgba(255,255,255,0.9);
            padding: 10px;
            border-radius: 8px;
        `;
        counter.innerHTML = `
            <strong style="font-size: 16px;">Your odds: 1 in 139,838,160</strong><br>
            <span style="color: #ff6b6b; font-weight: bold;">The red dot represents your chance!</span><br>
            <small style="color: #888;">Each dot = 250,000 people (560 dots total)</small>
        `;
        grid.appendChild(counter);

        // Add pulse animation for the winning pixel
        if (!document.getElementById('pulseAnimation')) {
            const style = document.createElement('style');
            style.id = 'pulseAnimation';
            style.textContent = `
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.6); opacity: 0.8; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    displayLatestResults() {
        // Generate today's draw
        const today = new Date();
        const todaysDraw = this.generateTodaysDraw(today);

        // Update date to today with draw schedule info
        const dayOfWeek = today.getDay(); // 0 = Sunday, 2 = Tuesday, 5 = Friday
        let drawInfo = '';

        if (dayOfWeek === 2) { // Tuesday
            drawInfo = ' (Tuesday Draw - 21:15 Helsinki Time)';
        } else if (dayOfWeek === 5) { // Friday
            drawInfo = ' (Friday Draw - 21:00 Helsinki Time)';
        } else {
            drawInfo = ' (Next draws: Tuesday & Friday)';
        }

        document.getElementById('latestDate').textContent =
            today.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }) + drawInfo;

        // Display main numbers
        const mainNumbers = document.getElementById('mainNumbers');
        mainNumbers.innerHTML = '';
        todaysDraw.numbers.forEach((num, index) => {
            setTimeout(() => {
                const numberEl = document.createElement('div');
                numberEl.className = 'number';
                numberEl.textContent = num;
                mainNumbers.appendChild(numberEl);
            }, index * 200);
        });

        // Display euro numbers
        const euroNumbers = document.getElementById('euroNumbers');
        euroNumbers.innerHTML = '';
        todaysDraw.euroNumbers.forEach((num, index) => {
            setTimeout(() => {
                const numberEl = document.createElement('div');
                numberEl.className = 'number euro-number';
                numberEl.textContent = num;
                euroNumbers.appendChild(numberEl);
            }, (todaysDraw.numbers.length + index) * 200);
        });

        // Display jackpot
        document.getElementById('jackpotAmount').textContent =
            `€${todaysDraw.jackpot.toLocaleString()}`;
    }

    createCharts() {
        this.createFrequencyChart();
        this.createJackpotChart();
        this.createNumberHeatmap();
    }

    createFrequencyChart() {
        const ctx = document.getElementById('frequencyChart').getContext('2d');
        
        // Get top 10 most frequent numbers
        const sortedNumbers = Object.entries(this.numberFrequency)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedNumbers.map(([num]) => num),
                datasets: [{
                    label: 'Frequency',
                    data: sortedNumbers.map(([,freq]) => freq),
                    backgroundColor: 'rgba(102, 126, 234, 0.8)',
                    borderColor: 'rgba(102, 126, 234, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    createJackpotChart() {
        const ctx = document.getElementById('jackpotChart').getContext('2d');
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.results.map(r => r.date).reverse(),
                datasets: [{
                    label: 'Jackpot Amount (€)',
                    data: this.results.map(r => r.jackpot).reverse(),
                    borderColor: 'rgba(255, 107, 107, 1)',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '€' + (value / 1000000).toFixed(0) + 'M';
                            }
                        }
                    }
                }
            }
        });
    }

    createNumberHeatmap() {
        const heatmap = document.getElementById('numberHeatmap');
        heatmap.innerHTML = '';
        
        for (let i = 1; i <= 50; i++) {
            const cell = document.createElement('div');
            const frequency = this.numberFrequency[i] || 0;
            const maxFreq = Math.max(...Object.values(this.numberFrequency));
            const intensity = frequency / maxFreq;
            
            cell.style.cssText = `
                display: inline-block;
                width: 30px;
                height: 30px;
                margin: 2px;
                background: rgba(102, 126, 234, ${intensity});
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: bold;
                color: ${intensity > 0.5 ? 'white' : 'black'};
                cursor: pointer;
                transition: transform 0.2s ease;
            `;
            
            cell.textContent = i;
            cell.title = `Number ${i}: appeared ${frequency} times`;
            
            cell.addEventListener('mouseenter', () => {
                cell.style.transform = 'scale(1.2)';
            });
            
            cell.addEventListener('mouseleave', () => {
                cell.style.transform = 'scale(1)';
            });
            
            heatmap.appendChild(cell);
        }
    }

    calculateStats() {
        const totalDraws = this.results.length;
        const jackpots = this.results.map(r => r.jackpot);
        const biggestJackpot = Math.max(...jackpots);
        const averageJackpot = jackpots.reduce((a, b) => a + b, 0) / jackpots.length;

        // Animate the numbers counting up
        this.animateNumber('totalDraws', 0, totalDraws, 1000);
        this.animateNumber('biggestJackpot', 0, biggestJackpot, 2000, '€');
        this.animateNumber('averageJackpot', 0, Math.round(averageJackpot), 1500, '€');

        // Calculate additional statistics
        this.calculateAdvancedStats();
    }

    animateNumber(elementId, start, end, duration, prefix = '') {
        const element = document.getElementById(elementId);
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * easeOut);

            if (prefix === '€') {
                element.textContent = `€${current.toLocaleString()}`;
            } else {
                element.textContent = current.toLocaleString();
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    calculateAdvancedStats() {
        // Most common number combinations
        const numberPairs = {};
        this.results.forEach(result => {
            for (let i = 0; i < result.numbers.length; i++) {
                for (let j = i + 1; j < result.numbers.length; j++) {
                    const pair = [result.numbers[i], result.numbers[j]].sort().join('-');
                    numberPairs[pair] = (numberPairs[pair] || 0) + 1;
                }
            }
        });

        // Find most common pair
        const mostCommonPair = Object.entries(numberPairs)
            .sort(([,a], [,b]) => b - a)[0];

        // Calculate consecutive numbers frequency
        let consecutiveCount = 0;
        this.results.forEach(result => {
            const sorted = [...result.numbers].sort((a, b) => a - b);
            for (let i = 0; i < sorted.length - 1; i++) {
                if (sorted[i + 1] - sorted[i] === 1) {
                    consecutiveCount++;
                    break;
                }
            }
        });

        // Display advanced stats
        this.displayAdvancedStats({
            mostCommonPair: mostCommonPair ? mostCommonPair[0] : 'N/A',
            consecutiveFrequency: Math.round((consecutiveCount / this.results.length) * 100)
        });
    }

    displayAdvancedStats(stats) {
        // Add advanced stats to the fun facts section
        const funFacts = document.querySelector('.fun-facts');

        // Add most common pair
        const pairFact = document.createElement('div');
        pairFact.className = 'fact';
        pairFact.innerHTML = `
            <span class="fact-number">${stats.mostCommonPair}</span>
            <span class="fact-label">Most Common Pair</span>
        `;
        funFacts.appendChild(pairFact);

        // Add consecutive numbers frequency
        const consecutiveFact = document.createElement('div');
        consecutiveFact.className = 'fact';
        consecutiveFact.innerHTML = `
            <span class="fact-number">${stats.consecutiveFrequency}%</span>
            <span class="fact-label">Draws with Consecutive Numbers</span>
        `;
        funFacts.appendChild(consecutiveFact);
    }

    setupInteractivity() {
        const generateBtn = document.getElementById('generateNumbers');
        const generatedNumbers = document.getElementById('generatedNumbers');
        const simulationResults = document.getElementById('simulationResults');

        generateBtn.addEventListener('click', () => {
            // Add loading state
            generateBtn.textContent = 'Generating...';
            generateBtn.disabled = true;

            setTimeout(() => {
                // Generate random numbers
                const mainNums = this.generateRandomNumbers(5, 1, 50);
                const euroNums = this.generateRandomNumbers(2, 1, 12);

                // Display generated numbers with animation
                this.displayGeneratedNumbers(generatedNumbers, mainNums, euroNums);

                // Simulate chances
                this.simulateWinning(simulationResults);

                // Reset button
                generateBtn.textContent = 'Generate Random Numbers';
                generateBtn.disabled = false;
            }, 1000);
        });

        // Add hover effects to number balls in hero section
        this.addFloatingNumberInteractivity();

        // Add click effects to odds comparisons
        this.addComparisonInteractivity();

        // Add scroll animations
        this.addScrollAnimations();

        // Add reality check interactions
        this.addRealityCheckInteractions();
    }

    displayGeneratedNumbers(container, mainNums, euroNums) {
        container.innerHTML = '';

        // Add main numbers with staggered animation
        mainNums.forEach((num, index) => {
            setTimeout(() => {
                const numberEl = document.createElement('div');
                numberEl.className = 'number generated-number';
                numberEl.textContent = num;
                numberEl.style.animation = 'bounceIn 0.6s ease-out';
                container.appendChild(numberEl);
            }, index * 150);
        });

        // Add euro numbers
        euroNums.forEach((num, index) => {
            setTimeout(() => {
                const numberEl = document.createElement('div');
                numberEl.className = 'number euro-number generated-number';
                numberEl.textContent = num;
                numberEl.style.animation = 'bounceIn 0.6s ease-out';
                container.appendChild(numberEl);
            }, (mainNums.length + index) * 150);
        });
    }

    addFloatingNumberInteractivity() {
        const floatingNumbers = document.querySelectorAll('.number-ball');

        floatingNumbers.forEach(ball => {
            ball.addEventListener('mouseenter', () => {
                ball.style.transform = 'scale(1.2)';
                ball.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
            });

            ball.addEventListener('mouseleave', () => {
                ball.style.transform = 'scale(1)';
                ball.style.boxShadow = 'none';
            });

            ball.addEventListener('click', () => {
                // Create explosion effect
                this.createExplosionEffect(ball);
            });
        });
    }

    createExplosionEffect(element) {
        const rect = element.getBoundingClientRect();
        const particles = 8;

        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: #feca57;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${rect.left + rect.width/2}px;
                top: ${rect.top + rect.height/2}px;
            `;

            document.body.appendChild(particle);

            const angle = (i / particles) * Math.PI * 2;
            const velocity = 100;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${vx}px, ${vy}px) scale(0)`, opacity: 0 }
            ], {
                duration: 800,
                easing: 'ease-out'
            }).onfinish = () => particle.remove();
        }
    }

    addComparisonInteractivity() {
        const comparisonItems = document.querySelectorAll('.comparison-item, .extreme-item');

        comparisonItems.forEach(item => {
            item.addEventListener('click', () => {
                // Add ripple effect
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.3);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;

                const rect = item.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (rect.width - size) / 2 + 'px';
                ripple.style.top = (rect.height - size) / 2 + 'px';

                item.style.position = 'relative';
                item.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);

                // Show additional info for extreme comparisons
                if (item.classList.contains('extreme-item')) {
                    this.showExtremeComparisonDetails(item);
                }
            });
        });

        // Add random fact generator
        this.addRandomFactGenerator();

        // Add ripple animation
        if (!document.getElementById('rippleAnimation')) {
            const style = document.createElement('style');
            style.id = 'rippleAnimation';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    showExtremeComparisonDetails(item) {
        // Create a temporary tooltip with more details
        const tooltip = document.createElement('div');
        tooltip.style.cssText = `
            position: fixed;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 15px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 1000;
            max-width: 300px;
            pointer-events: none;
            animation: fadeIn 0.3s ease-out;
        `;

        const facts = [
            "The odds are so small that if you bought a ticket every second, it would take over 4 years to reach the winning combination!",
            "You could randomly pick any grain of sand on a beach and be more likely to find the exact one someone else picked!",
            "It's more likely that you'll be struck by lightning while being attacked by a shark on your birthday!",
            "You have a better chance of becoming the next President than winning this jackpot!"
        ];

        tooltip.textContent = facts[Math.floor(Math.random() * facts.length)];

        const rect = item.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.top - 80) + 'px';

        document.body.appendChild(tooltip);

        setTimeout(() => {
            tooltip.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => tooltip.remove(), 300);
        }, 3000);
    }

    addRandomFactGenerator() {
        // Add a button to generate random comparison facts
        const extremeSection = document.querySelector('.extreme-comparisons');
        if (extremeSection) {
            const factButton = document.createElement('button');
            factButton.textContent = '🎲 Generate Random Fact';
            factButton.style.cssText = `
                background: linear-gradient(45deg, #ff6b6b, #feca57);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 25px;
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;
                margin: 20px auto 0;
                display: block;
                transition: all 0.3s ease;
            `;

            factButton.addEventListener('click', () => {
                this.generateRandomFact();
                factButton.style.transform = 'scale(0.95)';
                setTimeout(() => factButton.style.transform = 'scale(1)', 150);
            });

            factButton.addEventListener('mouseenter', () => {
                factButton.style.transform = 'translateY(-2px)';
                factButton.style.boxShadow = '0 5px 15px rgba(255, 107, 107, 0.4)';
            });

            factButton.addEventListener('mouseleave', () => {
                factButton.style.transform = 'translateY(0)';
                factButton.style.boxShadow = 'none';
            });

            extremeSection.appendChild(factButton);
        }
    }

    generateRandomFact() {
        const facts = [
            "If every person on Earth bought one ticket, only about 56 people would win the jackpot!",
            "You're more likely to find a specific needle in 1,000 haystacks than win this lottery!",
            "The odds (1 in 139,838,160) are smaller than randomly guessing a stranger's phone number!",
            "You could flip 27 coins and get all heads more easily than winning this jackpot!",
            "You're more likely to be struck by lightning 7 times in your lifetime!",
            "It's more probable that you'll randomly meet your exact doppelganger today!",
            "You have better odds of becoming an Olympic champion in a sport you've never tried!",
            "There are 139,838,160 possible number combinations - you need to pick the exact one!"
        ];

        const randomFact = facts[Math.floor(Math.random() * facts.length)];

        // Create floating fact display
        const factDisplay = document.createElement('div');
        factDisplay.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 30px;
            border-radius: 15px;
            max-width: 400px;
            text-align: center;
            z-index: 1000;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            animation: popIn 0.5s ease-out;
        `;

        factDisplay.innerHTML = `
            <div style="font-size: 2rem; margin-bottom: 15px;">🤯</div>
            <p style="font-size: 16px; line-height: 1.5; margin: 0;">${randomFact}</p>
            <button onclick="this.parentElement.remove()" style="
                background: rgba(255,255,255,0.2);
                border: none;
                color: white;
                padding: 8px 16px;
                border-radius: 20px;
                margin-top: 15px;
                cursor: pointer;
            ">Got it!</button>
        `;

        document.body.appendChild(factDisplay);

        // Add pop-in animation
        if (!document.getElementById('popInAnimation')) {
            const style = document.createElement('style');
            style.id = 'popInAnimation';
            style.textContent = `
                @keyframes popIn {
                    0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                    100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                }
                @keyframes fadeOut {
                    0% { opacity: 1; }
                    100% { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    addScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            observer.observe(section);
        });
    }

    addRealityCheckInteractions() {
        // Add click counters to show how much money would be lost
        const winnerItems = document.querySelectorAll('.winner-item');

        winnerItems.forEach(item => {
            let clickCount = 0;

            item.addEventListener('click', () => {
                clickCount++;
                const moneyLost = clickCount * 5; // €5 per "ticket"

                if (item.classList.contains('loser')) {
                    // Show accumulating losses for the player
                    const lossDisplay = item.querySelector('.loss-counter') || document.createElement('div');
                    lossDisplay.className = 'loss-counter';
                    lossDisplay.style.cssText = `
                        margin-top: 10px;
                        padding: 8px;
                        background: rgba(231, 76, 60, 0.3);
                        border-radius: 5px;
                        font-weight: bold;
                        color: #ff6b6b;
                    `;
                    lossDisplay.textContent = `You've lost: €${moneyLost}`;

                    if (!item.querySelector('.loss-counter')) {
                        item.appendChild(lossDisplay);
                    }
                } else {
                    // Show profits for the house
                    const profitDisplay = item.querySelector('.profit-counter') || document.createElement('div');
                    profitDisplay.className = 'profit-counter';
                    profitDisplay.style.cssText = `
                        margin-top: 10px;
                        padding: 8px;
                        background: rgba(46, 204, 113, 0.3);
                        border-radius: 5px;
                        font-weight: bold;
                        color: #2ecc71;
                    `;
                    profitDisplay.textContent = `Profit: €${Math.floor(moneyLost * 0.5)}`;

                    if (!item.querySelector('.profit-counter')) {
                        item.appendChild(profitDisplay);
                    }
                }

                // Add shake animation
                item.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => item.style.animation = '', 500);
            });
        });

        // Add marketing truth revealer
        this.addMarketingTruthRevealer();

        // Add house edge calculator
        this.addHouseEdgeCalculator();

        // Add shake animation
        if (!document.getElementById('shakeAnimation')) {
            const style = document.createElement('style');
            style.id = 'shakeAnimation';
            style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    addMarketingTruthRevealer() {
        const marketingCard = document.querySelector('.reality-card:nth-child(2)');
        if (marketingCard) {
            const revealButton = document.createElement('button');
            revealButton.textContent = '🎭 Reveal Marketing Tricks';
            revealButton.style.cssText = `
                background: linear-gradient(45deg, #e74c3c, #c0392b);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 25px;
                font-weight: bold;
                cursor: pointer;
                margin: 15px auto 0;
                display: block;
                transition: all 0.3s ease;
            `;

            revealButton.addEventListener('click', () => {
                this.showMarketingTricks();
            });

            marketingCard.appendChild(revealButton);
        }
    }

    showMarketingTricks() {
        const tricks = [
            "🎯 They show winners, never the millions of losers",
            "💭 'You could be next!' - but statistically, you won't be",
            "🎪 Bright colors and exciting music to trigger dopamine",
            "📺 Ads during financial stress periods (end of month)",
            "🎭 Celebrity endorsements to make it seem 'normal'",
            "💸 'Only €2!' - hiding the real cost of regular playing",
            "🎲 'Someone has to win!' - ignoring the 139 million who don't",
            "🌟 'Dreams come true!' - selling hope, not realistic odds"
        ];

        const trickDisplay = document.createElement('div');
        trickDisplay.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #2c3e50, #34495e);
            color: white;
            padding: 30px;
            border-radius: 15px;
            max-width: 500px;
            z-index: 1000;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
            animation: popIn 0.5s ease-out;
            max-height: 80vh;
            overflow-y: auto;
        `;

        trickDisplay.innerHTML = `
            <h3 style="text-align: center; margin-bottom: 20px; color: #e74c3c;">
                🎭 Marketing Manipulation Tactics
            </h3>
            <div style="margin-bottom: 20px;">
                ${tricks.map(trick => `
                    <div style="
                        padding: 10px;
                        margin: 8px 0;
                        background: rgba(231, 76, 60, 0.2);
                        border-radius: 8px;
                        border-left: 4px solid #e74c3c;
                    ">${trick}</div>
                `).join('')}
            </div>
            <p style="text-align: center; font-style: italic; opacity: 0.8; margin-bottom: 20px;">
                Marketing agencies make millions by making you forget these odds exist!
            </p>
            <button onclick="this.parentElement.remove()" style="
                background: #e74c3c;
                border: none;
                color: white;
                padding: 10px 20px;
                border-radius: 20px;
                cursor: pointer;
                display: block;
                margin: 0 auto;
            ">I Understand Now</button>
        `;

        document.body.appendChild(trickDisplay);
    }

    addHouseEdgeCalculator() {
        const houseCard = document.querySelector('.reality-card:nth-child(3)');
        if (houseCard) {
            const calculator = document.createElement('div');
            calculator.style.cssText = `
                margin-top: 20px;
                padding: 20px;
                background: rgba(0, 0, 0, 0.2);
                border-radius: 10px;
                text-align: center;
            `;

            calculator.innerHTML = `
                <h4 style="margin-bottom: 15px;">💸 Your Loss Calculator</h4>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px;">Monthly lottery spending:</label>
                    <input type="number" id="monthlySpend" value="20" min="0" style="
                        padding: 8px;
                        border-radius: 5px;
                        border: none;
                        width: 100px;
                        text-align: center;
                        font-size: 16px;
                    "> €
                </div>
                <button id="calculateLoss" style="
                    background: #e74c3c;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 20px;
                    cursor: pointer;
                    font-weight: bold;
                ">Calculate My Losses</button>
                <div id="lossResult" style="margin-top: 15px; font-weight: bold;"></div>
            `;

            houseCard.appendChild(calculator);

            document.getElementById('calculateLoss').addEventListener('click', () => {
                const monthly = parseFloat(document.getElementById('monthlySpend').value) || 0;
                const yearly = monthly * 12;
                const lifetime = yearly * 40; // 40 years of playing
                const houseTakes = lifetime * 0.5;

                document.getElementById('lossResult').innerHTML = `
                    <div style="color: #ff6b6b;">
                        Per year: €${yearly} spent, €${yearly * 0.5} lost<br>
                        Lifetime: €${lifetime} spent, €${houseTakes} lost<br>
                        <small>The house keeps €${houseTakes} of your money!</small>
                    </div>
                `;
            });
        }
    }

    generateRandomNumbers(count, min, max) {
        const numbers = [];
        while (numbers.length < count) {
            const num = Math.floor(Math.random() * (max - min + 1)) + min;
            if (!numbers.includes(num)) {
                numbers.push(num);
            }
        }
        return numbers.sort((a, b) => a - b);
    }

    simulateWinning(resultsEl) {
        const odds = 139838160;
        const attempts = Math.floor(Math.random() * 1000000) + 1;
        const wouldWin = Math.random() < (1 / odds);
        
        resultsEl.innerHTML = `
            <p>If you played ${attempts.toLocaleString()} times...</p>
            <p style="color: ${wouldWin ? 'green' : 'red'}; font-weight: bold;">
                ${wouldWin ? '🎉 You would win!' : '❌ You would not win'}
            </p>
            <p style="font-size: 0.9rem; color: #666;">
                Expected wins: ${(attempts / odds).toFixed(6)}
            </p>
        `;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EuroJackpotStats();
});
