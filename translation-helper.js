// Translation Helper for Euro Jackpot Website
// This script helps organize and validate translations for all 19 languages

const euroJackpotCountries = [
    { code: 'en', name: 'English', flag: '🇬🇧', country: 'United Kingdom' },
    { code: 'hr', name: 'Hrvatski', flag: '🇭🇷', country: 'Croatia' },
    { code: 'cs', name: 'Čeština', flag: '🇨🇿', country: 'Czechia' },
    { code: 'da', name: 'Dansk', flag: '🇩🇰', country: 'Denmark' },
    { code: 'et', name: 'Eesti', flag: '🇪🇪', country: 'Estonia' },
    { code: 'fi', name: 'Suomi', flag: '🇫🇮', country: 'Finland' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪', country: 'Germany' },
    { code: 'el', name: 'Ελληνικά', flag: '🇬🇷', country: 'Greece' },
    { code: 'hu', name: 'Magyar', flag: '🇭🇺', country: 'Hungary' },
    { code: 'is', name: 'Íslenska', flag: '🇮🇸', country: 'Iceland' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹', country: 'Italy' },
    { code: 'lv', name: 'Latviešu', flag: '🇱🇻', country: 'Latvia' },
    { code: 'lt', name: 'Lietuvių', flag: '🇱🇹', country: 'Lithuania' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱', country: 'Netherlands' },
    { code: 'no', name: 'Norsk', flag: '🇳🇴', country: 'Norway' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱', country: 'Poland' },
    { code: 'sk', name: 'Slovenčina', flag: '🇸🇰', country: 'Slovakia' },
    { code: 'sl', name: 'Slovenščina', flag: '🇸🇮', country: 'Slovenia' },
    { code: 'es', name: 'Español', flag: '🇪🇸', country: 'Spain' },
    { code: 'sv', name: 'Svenska', flag: '🇸🇪', country: 'Sweden' }
];

// Complete translation keys structure
const translationKeys = {
    hero: ['title', 'subtitle', 'odds'],
    sections: ['oddsTitle', 'realWinnersTitle', 'interactiveTitle', 'statsTitle', 'latestResults'],
    results: ['todaysDraw'],
    odds: ['morelikely', 'lightning', 'moviestar', 'supermodel', 'astronaut', 'clover', 'shark', 'perspective', 'multiplier', 'visualized', 'explanation'],
    comparisons: ['lightning', 'lightningOdds', 'shark', 'sharkOdds', 'astronaut', 'astronautOdds', 'famous', 'famousOdds'],
    extremeComparisons: ['title', 'lightning7', 'coins27', 'combinations', 'russia'],
    reality: ['whoWins', 'lotteryCompanies', 'marketingAgencies', 'government', 'player', 'keepPercent', 'marketingContracts', 'taxes', 'losePercent'],
    stats: ['frequentNumbers', 'jackpotHistory', 'heatMap', 'funFacts', 'totalDraws', 'biggestJackpot', 'averageJackpot'],
    interactive: ['generateBtn'],
    marketing: ['revealTricks', 'manipulationTactics', 'trick1', 'trick2', 'trick3', 'trick4', 'trick5', 'trick6', 'trick7', 'trick8', 'marketingTruth', 'understand'],
    calculator: ['lossCalculator', 'monthlySpending', 'calculateLoss', 'perYear', 'lifetime', 'spent', 'lost', 'houseTakes', 'ofYourMoney'],
    randomFacts: ['generateFact', 'fact1', 'fact2', 'fact3', 'fact4', 'fact5', 'fact6', 'fact7', 'fact8'],
    footer: ['dataSource', 'disclaimer']
};

// Template for new language translation
function generateLanguageTemplate(languageCode, languageName) {
    return `
    ${languageCode}: { // ${languageName}
        hero: {
            title: "Euro Jackpot Statistics",
            subtitle: "Discover the mind-blowing odds and fascinating data behind Europe's biggest lottery",
            odds: "odds of winning the jackpot"
        },
        sections: {
            oddsTitle: "How Small Are Your Chances?",
            realWinnersTitle: "The Real Winners 💰",
            interactiveTitle: "Try Your Luck (Virtually)",
            statsTitle: "Number Statistics",
            latestResults: "Latest Results"
        },
        results: {
            todaysDraw: "Today's Draw"
        },
        odds: {
            morelikely: "Things More Likely Than Winning",
            lightning: "Being struck by lightning",
            moviestar: "Becoming a movie star",
            supermodel: "Dating a supermodel",
            astronaut: "Becoming an astronaut",
            clover: "Finding a four-leaf clover",
            shark: "Being attacked by a shark",
            perspective: "Put It In Perspective",
            multiplier: "Euro Jackpot is 140× less likely than being struck by lightning!",
            visualized: "Your Odds Visualized",
            explanation: "Each dot represents 250,000 people. The red dot shows your 1-in-140-million chance!"
        },
        comparisons: {
            lightning: "Lightning Strike",
            lightningOdds: "140× more likely than jackpot",
            shark: "Shark Attack",
            sharkOdds: "12× more likely than jackpot",
            astronaut: "Becoming an Astronaut",
            astronautOdds: "12× more likely than jackpot",
            famous: "Becoming Famous",
            famousOdds: "93× more likely than jackpot"
        },
        extremeComparisons: {
            title: "Even More Ridiculous Comparisons",
            lightning7: "You're more likely to be struck by lightning 140 times than win the jackpot",
            coins27: "You could flip a coin 27 times and get all heads more easily (1 in 134 million)",
            combinations: "There are 139,838,160 possible combinations - you need the exact one!",
            russia: "If everyone in Russia bought a ticket, only 1 person would win"
        },
        reality: {
            whoWins: "🎯 Who Actually Wins?",
            lotteryCompanies: "Lottery Companies",
            marketingAgencies: "Marketing Agencies",
            government: "Government",
            player: "You (The Player)",
            keepPercent: "Keep ~50% of all ticket sales",
            marketingContracts: "Millions in advertising contracts",
            taxes: "Taxes and \\"good causes\\" funding",
            losePercent: "Lose ~50% of money spent"
        },
        stats: {
            frequentNumbers: "Most Frequent Numbers",
            jackpotHistory: "Jackpot History",
            heatMap: "Number Heat Map",
            funFacts: "Fun Facts",
            totalDraws: "Total Draws",
            biggestJackpot: "Biggest Jackpot",
            averageJackpot: "Average Jackpot"
        },
        interactive: {
            generateBtn: "Generate Random Numbers"
        },
        marketing: {
            revealTricks: "🎭 Reveal Marketing Tricks",
            manipulationTactics: "🎭 Marketing Manipulation Tactics",
            trick1: "🎯 They show winners, never the millions of losers",
            trick2: "💭 'You could be next!' - but statistically, you won't be",
            trick3: "🎪 Bright colors and exciting music to trigger dopamine",
            trick4: "📺 Ads during financial stress periods (end of month)",
            trick5: "🎭 Celebrity endorsements to make it seem 'normal'",
            trick6: "💸 'Only €2!' - hiding the real cost of regular playing",
            trick7: "🎲 'Someone has to win!' - ignoring the 139 million who don't",
            trick8: "🌟 'Dreams come true!' - selling hope, not realistic odds",
            marketingTruth: "Marketing agencies make millions by making you forget these odds exist!",
            understand: "I Understand Now"
        },
        calculator: {
            lossCalculator: "💸 Your Loss Calculator",
            monthlySpending: "Monthly lottery spending:",
            calculateLoss: "Calculate My Losses",
            perYear: "Per year",
            lifetime: "Lifetime",
            spent: "spent",
            lost: "lost",
            houseTakes: "The house keeps",
            ofYourMoney: "of your money!"
        },
        randomFacts: {
            generateFact: "🎲 Generate Random Fact",
            fact1: "If every person on Earth bought one ticket, only about 56 people would win the jackpot!",
            fact2: "You're more likely to find a specific needle in 1,000 haystacks than win this lottery!",
            fact3: "The odds (1 in 139,838,160) are smaller than randomly guessing a stranger's phone number!",
            fact4: "You could flip 27 coins and get all heads more easily than winning this jackpot!",
            fact5: "You're more likely to be struck by lightning 7 times in your lifetime!",
            fact6: "It's more probable that you'll randomly meet your exact doppelganger today!",
            fact7: "You have better odds of becoming an Olympic champion in a sport you've never tried!",
            fact8: "There are 139,838,160 possible number combinations - you need to pick the exact one!"
        },
        footer: {
            dataSource: "Data sourced from Veikkaus.fi | Built for educational purposes",
            disclaimer: "Remember: Gambling can be addictive. Play responsibly."
        }
    },`;
}

// Function to validate translation completeness
function validateTranslation(translation) {
    const missing = [];
    
    for (const [section, keys] of Object.entries(translationKeys)) {
        if (!translation[section]) {
            missing.push(`Missing section: ${section}`);
            continue;
        }
        
        for (const key of keys) {
            if (!translation[section][key]) {
                missing.push(`Missing key: ${section}.${key}`);
            }
        }
    }
    
    return missing;
}

// Function to count total translation keys
function countTranslationKeys() {
    let total = 0;
    for (const keys of Object.values(translationKeys)) {
        total += keys.length;
    }
    return total;
}

// Export functions for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        euroJackpotCountries,
        translationKeys,
        generateLanguageTemplate,
        validateTranslation,
        countTranslationKeys
    };
}

console.log(`Total translation keys needed: ${countTranslationKeys()}`);
console.log('Euro Jackpot countries:', euroJackpotCountries.length);
console.log('Languages to translate:', euroJackpotCountries.map(c => `${c.flag} ${c.name}`).join(', '));
