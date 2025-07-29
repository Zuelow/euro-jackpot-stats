// Language Manager for Euro Jackpot Statistics Website
class LanguageManager {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = {};
        this.init();
    }

    async init() {
        // Load translations
        await this.loadTranslations();
        
        // Set up language toggler
        this.setupLanguageToggler();
        
        // Load saved language preference
        this.loadSavedLanguage();
        
        // Apply initial translation
        this.applyTranslations();
    }

    async loadTranslations() {
        // In a real application, you might load this from an external file
        // For now, we'll use the translations object from translations.js
        if (typeof translations !== 'undefined') {
            this.translations = translations;
        } else {
            console.error('Translations not loaded');
        }
    }

    setupLanguageToggler() {
        const toggler = document.getElementById('languageToggler');
        const dropdown = document.getElementById('languageDropdown');
        const options = document.querySelectorAll('.language-option');

        // Toggle dropdown
        toggler.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
            toggler.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            dropdown.classList.remove('show');
            toggler.classList.remove('active');
        });

        // Handle language selection
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const lang = option.dataset.lang;
                const flag = option.dataset.flag;
                this.changeLanguage(lang, flag);
                dropdown.classList.remove('show');
                toggler.classList.remove('active');
            });
        });
    }

    changeLanguage(lang, flag) {
        this.currentLanguage = lang;
        
        // Update current language display
        document.getElementById('currentFlag').textContent = flag;
        document.getElementById('currentLang').textContent = this.getLanguageName(lang);
        
        // Update active option
        document.querySelectorAll('.language-option').forEach(opt => {
            opt.classList.remove('active');
            if (opt.dataset.lang === lang) {
                opt.classList.add('active');
            }
        });
        
        // Save language preference
        localStorage.setItem('euroJackpotLanguage', lang);
        
        // Apply translations
        this.applyTranslations();
        
        // Update charts and dynamic content
        this.updateDynamicContent();
    }

    getLanguageName(lang) {
        const names = {
            en: 'English',
            de: 'Deutsch',
            es: 'Español',
            fr: 'Français',
            it: 'Italiano',
            nl: 'Nederlands',
            sv: 'Svenska',
            no: 'Norsk',
            da: 'Dansk',
            fi: 'Suomi',
            pl: 'Polski',
            cs: 'Čeština',
            hu: 'Magyar',
            hr: 'Hrvatski',
            et: 'Eesti',
            el: 'Ελληνικά',
            is: 'Íslenska',
            lv: 'Latviešu',
            lt: 'Lietuvių',
            sk: 'Slovenčina',
            sl: 'Slovenščina'
        };
        return names[lang] || 'English';
    }

    loadSavedLanguage() {
        const saved = localStorage.getItem('euroJackpotLanguage');
        if (saved && this.translations[saved]) {
            const option = document.querySelector(`[data-lang="${saved}"]`);
            if (option) {
                const flag = option.dataset.flag;
                this.changeLanguage(saved, flag);
            }
        }
    }

    applyTranslations() {
        const currentTranslations = this.translations[this.currentLanguage];
        if (!currentTranslations) {
            console.warn(`Translations not found for language: ${this.currentLanguage}`);
            return;
        }

        // Apply translations to elements with data-translate attributes
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            const translation = this.getNestedTranslation(currentTranslations, key);

            if (translation) {
                // Handle different element types
                if (element.tagName === 'INPUT' || element.tagName === 'BUTTON') {
                    if (element.type === 'button' || element.tagName === 'BUTTON') {
                        element.textContent = translation;
                    } else {
                        element.placeholder = translation;
                    }
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Update page title
        document.title = `${currentTranslations.hero?.title || 'Euro Jackpot Statistics'} - ${this.getLanguageName(this.currentLanguage)}`;
    }

    getNestedTranslation(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] ? current[key] : null;
        }, obj);
    }

    updateDynamicContent() {
        // Update any dynamic content that needs language-specific formatting
        this.updateNumberFormats();
        this.updateDateFormats();
        this.updateDynamicText();
    }

    updateDynamicText() {
        const currentTranslations = this.translations[this.currentLanguage];
        if (!currentTranslations) return;

        // Update button text that might be changed by JavaScript
        const generateBtn = document.getElementById('generateNumbers');
        if (generateBtn && currentTranslations.interactive?.generateBtn) {
            generateBtn.textContent = currentTranslations.interactive.generateBtn;
        }

        // Update any other dynamic text elements
        this.updateSimulationText();
        this.updateMarketingText();
    }

    updateSimulationText() {
        // This will be called when simulation results are generated
        // to ensure they're in the correct language
    }

    updateMarketingText() {
        // Update marketing trick revelations and other dynamic content
        const currentTranslations = this.translations[this.currentLanguage];
        // This can be expanded to translate dynamic marketing content
    }

    updateNumberFormats() {
        // Update number formatting based on locale
        const locale = this.getLocaleFromLanguage(this.currentLanguage);
        
        // Update odds display
        const oddsNumber = document.querySelector('.odds-number');
        if (oddsNumber) {
            const number = 139838160;
            oddsNumber.textContent = `1 ${this.getLocalizedSeparator()} ${number.toLocaleString(locale)}`;
        }

        // Update any other numbers that need localization
        document.querySelectorAll('.fact-number').forEach(element => {
            const text = element.textContent;
            const numbers = text.match(/[\d,]+/g);
            if (numbers) {
                numbers.forEach(num => {
                    const cleanNum = num.replace(/,/g, '');
                    if (!isNaN(cleanNum)) {
                        const formatted = parseInt(cleanNum).toLocaleString(locale);
                        element.textContent = text.replace(num, formatted);
                    }
                });
            }
        });
    }

    updateDateFormats() {
        // Update date formatting based on locale
        const locale = this.getLocaleFromLanguage(this.currentLanguage);
        
        document.querySelectorAll('.draw-date').forEach(element => {
            const dateText = element.textContent;
            // This would need more sophisticated date parsing and formatting
            // For now, we'll keep the existing format
        });
    }

    getLocaleFromLanguage(lang) {
        const locales = {
            en: 'en-US',
            de: 'de-DE',
            es: 'es-ES',
            fr: 'fr-FR',
            it: 'it-IT',
            nl: 'nl-NL',
            sv: 'sv-SE',
            no: 'nb-NO',
            da: 'da-DK',
            fi: 'fi-FI',
            pl: 'pl-PL',
            cs: 'cs-CZ',
            hu: 'hu-HU',
            hr: 'hr-HR',
            et: 'et-EE',
            el: 'el-GR',
            is: 'is-IS',
            lv: 'lv-LV',
            lt: 'lt-LT',
            sk: 'sk-SK',
            sl: 'sl-SI'
        };
        return locales[lang] || 'en-US';
    }

    getLocalizedSeparator() {
        const separators = {
            en: 'in',
            de: 'zu',
            es: 'en',
            fr: 'sur',
            it: 'su',
            nl: 'op',
            sv: 'på',
            no: 'på',
            da: 'på',
            fi: 'kohti',
            pl: 'na',
            cs: 'ku',
            hu: 'a',
            hr: 'na',
            et: 'vastu',
            el: 'σε',
            is: 'á',
            lv: 'no',
            lt: 'iš',
            sk: 'ku',
            sl: 'na'
        };
        return separators[this.currentLanguage] || 'in';
    }

    // Method to get current language for other components
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // Method to get current translations for other components
    getCurrentTranslations() {
        return this.translations[this.currentLanguage] || this.translations.en;
    }
}

// Initialize language manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
});
