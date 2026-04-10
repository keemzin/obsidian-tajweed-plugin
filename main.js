const { Plugin, PluginSettingTab, Setting } = require('obsidian');

// Tajweed color mapping
const TAJWEED_COLORS = {
    'ham_wasl': '#AAAAAA',
    'slnt': '#AAAAAA',
    'madda_normal': '#537FFF',
    'madda_permissible': '#4050FF',
    'madda_necessary': '#000EBC',
    'madda_obligatory': '#2144C1',
    'qlq': '#DD0008',
    'ikhf_shfw': '#D500B7',
    'ikhf': '#9400A8',
    'idghm_shfw': '#58B800',
    'iqlb': '#26BFFD',
    'idgh_ghn': '#169777',
    'idgh_w_ghn': '#169200',
    'idgh_mus': '#A1A1A1',
    'ghn': '#FF7E1E'
};

// Rule code to class name mapping
const RULE_MAP = {
    'h': 'ham_wasl',
    'l': 'slnt',
    's': 'slnt',
    'n': 'madda_normal',
    'p': 'madda_permissible',
    'm': 'madda_necessary',
    'o': 'madda_obligatory',
    'q': 'qlq',
    'g': 'ghn',
    'f': 'ikhf',
    'c': 'ikhf_shfw',
    'w': 'idghm_shfw',
    'i': 'iqlb',
    'a': 'idgh_ghn',
    'u': 'idgh_w_ghn',
    'd': 'idgh_mus',
    'b': 'idgh_mus'
};

// Default reciter
const DEFAULT_RECITER = 'ar.alafasy';

// Available reciters with audio (using Quran.com CDN)
// Source: https://api.quran.com/api/v4/resources/recitations
const AVAILABLE_RECITERS = [
    { identifier: 'ar.alafasy', name: 'Mishary Rashid Alafasy', quranComName: 'Alafasy' },
    { identifier: 'ar.abdulbasit', name: 'Abdul Basit (Mujawwad)', quranComName: 'Abdul_Basit_Mujawwad' },
    { identifier: 'ar.abdulsamad', name: 'Abdul Samad (Murattal)', quranComName: 'Abdulsamad' },
    { identifier: 'ar.husary', name: 'Mahmoud Khalil Al-Husary', quranComName: 'Husary' },
    { identifier: 'ar.hudhaify', name: 'Ali Al-Hudhaify', quranComName: 'Hudhaify' },
    { identifier: 'ar.sudais', name: 'Abdur-Rahman as-Sudais', quranComName: 'Sudais' },
    { identifier: 'ar.shuraim', name: 'Saud Al-Shuraim', quranComName: 'Shuraim' },
    { identifier: 'ar.mahermuaiqly', name: 'Maher Al Muaiqly', quranComName: 'Maher_Al_Muaiqly' },
    { identifier: 'ar.ahmedajmy', name: 'Ahmed ibn Ali al-Ajamy', quranComName: 'Ahmed_ibn_Ali_al-Ajamy' },
    { identifier: 'ar.hanirifai', name: 'Hani ar-Rifai', quranComName: 'Hani_Rifai' },
    { identifier: 'ar.minshawi', name: 'Mohamed Siddiq al-Minshawi (Mujawwad)', quranComName: 'Minshawi_Mujawwad' },
    { identifier: 'ar.minshawi.murattal', name: 'Mohamed Siddiq al-Minshawi (Murattal)', quranComName: 'Minshawi' },
    { identifier: 'ar.tablawi', name: 'Mohamed al-Tablawi', quranComName: 'Tablawi' },
    { identifier: 'ar.shatri', name: 'Abu Bakr al-Shatri', quranComName: 'Shatri' }
];

module.exports = class QuranTajweedPlugin extends Plugin {
    async onload() {
        console.log('✅ Loading Quran Tajweed Plugin');

        // Plugin settings
        this.settings = {
            reciter: DEFAULT_RECITER,
            reciterName: 'Mishary Rashid Alafasy',
            fontSize: 1.8,
            defaultAudio: false,
            defaultTranslation: false,
            defaultTransliteration: false,
            defaultRepeatCount: 1,
            showVerseNumbers: true,
            lineSpacing: 1.8
        };

        // Load saved settings
        await this.loadSettings();

        // Add settings tab
        this.addSettingTab(new QuranTajweedSettingTab(this.app, this));

        // Add CSS for Uthmanic Hafs font
        this.addStyles();

        // Register markdown post processor for code blocks with language "quran"
        this.registerMarkdownCodeBlockProcessor('quran', async (source, el, ctx) => {
            console.log('📖 Processing quran code block:', source);
            // Parse optional parameters: ```quran reciter="ar.alafasy" audio="on" translation="on" transliteration="on"
            const reciter = this.parseReciterFromSource(source);
            const audioEnabled = this.parseAudioFromSource(source);
            const translationEnabled = this.parseTranslationFromSource(source);
            const transliterationEnabled = this.parseTransliterationFromSource(source);
            const actualSource = this.removeParameters(source);
            await this.renderQuranWithTajweed(actualSource, el, false, reciter, audioEnabled, translationEnabled, transliterationEnabled);
        });

        // Register markdown post processor for code blocks with language "tajweed"
        this.registerMarkdownCodeBlockProcessor('tajweed', async (source, el, ctx) => {
            console.log('📖 Processing tajweed code block:', source);
            await this.renderQuranWithTajweed(source, el, false, this.settings.reciter, false);
        });

        // Register markdown post processor for inline words with language "word"
        this.registerMarkdownCodeBlockProcessor('word', async (source, el, ctx) => {
            console.log('📝 Processing word code block:', source);
            await this.renderQuranWithTajweed(source, el, true, this.settings.reciter, false);
        });

        console.log('✅ Quran Tajweed Plugin loaded successfully');
    }

    parseReciterFromSource(source) {
        // Parse: ```quran reciter="ar.alafasy"
        const match = source.match(/reciter="([^"]+)"/);
        if (match) {
            console.log('🎵 Custom reciter:', match[1]);
            return match[1];
        }
        return this.settings.reciter;
    }

    parseAudioFromSource(source) {
        // Parse: ```quran audio="on" or audio="off"
        const match = source.match(/audio="(on|off)"/i);
        if (match) {
            console.log('🔊 Audio setting:', match[1]);
            return match[1].toLowerCase() === 'on';
        }
        // Default: use user setting
        return this.settings.defaultAudio;
    }

    parseTranslationFromSource(source) {
        // Parse: ```quran translation="on" or translation="off"
        const match = source.match(/translation="(on|off)"/i);
        if (match) {
            console.log('📚 Translation setting:', match[1]);
            return match[1].toLowerCase() === 'on';
        }
        // Default: use user setting
        return this.settings.defaultTranslation;
    }

    parseTransliterationFromSource(source) {
        // Parse: ```quran transliteration="on" or transliteration="off"
        const match = source.match(/transliteration="(on|off)"/i);
        if (match) {
            console.log('🔤 Transliteration setting:', match[1]);
            return match[1].toLowerCase() === 'on';
        }
        // Default: use user setting
        return this.settings.defaultTransliteration;
    }

    removeParameters(source) {
        // Remove all parameter patterns: reciter="..." audio="..." translation="..." transliteration="..."
        return source.replace(/reciter="[^"]+"\s*/g, '')
                    .replace(/audio="(on|off)"\s*/gi, '')
                    .replace(/translation="(on|off)"\s*/gi, '')
                    .replace(/transliteration="(on|off)"\s*/gi, '')
                    .trim();
    }

    extractVerseReference(source) {
        // Find the first line that matches verse reference pattern like "55:15" or "55:1-5"
        const lines = source.trim().split('\n');
        for (const line of lines) {
            const refMatch = line.trim().match(/^(\d+):(\d+)(?:-(\d+))?$/);
            if (refMatch) {
                return {
                    reference: line.trim(),
                    surah: parseInt(refMatch[1]),
                    startVerse: parseInt(refMatch[2]),
                    endVerse: refMatch[3] ? parseInt(refMatch[3]) : parseInt(refMatch[2])
                };
            }
        }
        return null;
    }

    async loadSettings() {
        const saved = await this.loadData();
        if (saved) {
            this.settings.reciter = saved.reciter || DEFAULT_RECITER;
            this.settings.reciterName = saved.reciterName || 'Mishary Rashid Alafasy';
            this.settings.fontSize = saved.fontSize !== undefined ? saved.fontSize : 1.8;
            this.settings.defaultAudio = saved.defaultAudio || false;
            this.settings.defaultTranslation = saved.defaultTranslation || false;
            this.settings.defaultTransliteration = saved.defaultTransliteration || false;
            this.settings.defaultRepeatCount = saved.defaultRepeatCount || 1;
            this.settings.showVerseNumbers = saved.showVerseNumbers !== undefined ? saved.showVerseNumbers : true;
            this.settings.lineSpacing = saved.lineSpacing !== undefined ? saved.lineSpacing : 1.8;
        }
    }

    async saveSettings() {
        await this.saveData({
            reciter: this.settings.reciter,
            reciterName: this.settings.reciterName,
            fontSize: this.settings.fontSize,
            defaultAudio: this.settings.defaultAudio,
            defaultTranslation: this.settings.defaultTranslation,
            defaultTransliteration: this.settings.defaultTransliteration,
            defaultRepeatCount: this.settings.defaultRepeatCount,
            showVerseNumbers: this.settings.showVerseNumbers,
            lineSpacing: this.settings.lineSpacing
        });
    }

    addStyles() {
        const style = document.createElement('style');
        style.id = 'quran-tajweed-styles';
        style.textContent = `
            @font-face {
                font-family: 'UthmanicHafs';
                src: url('https://verses.quran.foundation/fonts/quran/hafs/uthmanic_hafs/UthmanicHafs1Ver18.woff2') format('woff2');
                font-display: swap;
            }

            /* Light theme styles */
            .quran-tajweed-container {
                font-family: 'UthmanicHafs', 'Amiri Quran', serif;
                direction: rtl;
                text-align: right;
                font-size: var(--quran-font-size, 1.8em);
                line-height: var(--quran-line-height, 1.8);
                padding: 8px 6px;
                background: var(--background-secondary);
                border-radius: 8px;
                border-right: 3px solid var(--interactive-accent);
                margin: 10px 0;
            }

            .quran-verse {
                margin-bottom: 6px;
                padding: 6px 4px;
                background: var(--background-primary);
                border-radius: 6px;
            }

            .quran-verse:last-child {
                margin-bottom: 0;
            }

            /* Text container - keeps text and verse number inline */
            .quran-text-container {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                gap: 8px;
            }

            /* Audio player styles */
            .quran-audio-container {
                margin-top: 8px;
                margin-bottom: 4px;
            }

            .quran-audio-player {
                width: 100%;
                height: 32px;
            }

            /* Range playback controls */
            .quran-range-controls {
                margin-bottom: 10px;
                padding: 6px 8px;
                background: var(--background-primary-alt);
                border-radius: 5px;
                border: 1px solid var(--background-modifier-border);
            }

            .quran-control-bar {
                display: flex;
                align-items: center;
                gap: 6px;
                flex-wrap: wrap;
                direction: ltr;
            }

            .quran-play-btn,
            .quran-stop-btn {
                padding: 4px 8px;
                border: 1px solid var(--background-modifier-border);
                border-radius: 3px;
                background: var(--interactive-normal);
                color: var(--text-normal);
                cursor: pointer;
                font-size: 0.65em;
                font-family: Arial, sans-serif;
                transition: all 0.2s ease;
                white-space: nowrap;
            }

            .quran-play-btn:hover,
            .quran-stop-btn:hover {
                background: var(--interactive-hover);
                border-color: var(--interactive-accent);
            }

            .quran-play-btn {
                background: var(--interactive-accent);
                color: var(--text-on-accent);
            }

            .quran-repeat-controls {
                display: flex;
                align-items: center;
                gap: 3px;
                margin-left: auto;
            }

            .quran-repeat-label {
                font-size: 0.65em;
                color: var(--text-muted);
                font-family: Arial, sans-serif;
            }

            .quran-repeat-input {
                width: 40px;
                padding: 3px 4px;
                border: 1px solid var(--background-modifier-border);
                border-radius: 3px;
                background: var(--background-primary);
                color: var(--text-normal);
                font-size: 0.65em;
                text-align: center;
            }

            .quran-repeat-display {
                font-size: 0.6em;
                color: var(--interactive-accent);
                font-weight: 600;
                font-family: Arial, sans-serif;
                min-width: 35px;
            }

            /* Active verse highlighting */
            .quran-verse-active {
                background: var(--background-modifier-hover) !important;
                border-left: 3px solid var(--interactive-accent);
                transition: all 0.3s ease;
            }

            .verse-number {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                background: var(--interactive-accent);
                color: var(--text-on-accent);
                border-radius: 50%;
                min-width: 28px;
                height: 28px;
                line-height: 28px;
                text-align: center;
                font-size: 0.6em;
                font-family: Arial, sans-serif;
                flex-shrink: 0;
                margin: 0;
            }

            /* Translation styles */
            .quran-translation {
                margin-top: 8px;
                padding-top: 8px;
                border-top: 1px solid var(--background-modifier-border);
                direction: ltr;
                text-align: left;
                font-family: Arial, sans-serif;
                font-size: 0.7em;
                line-height: 1.6;
                color: var(--text-muted);
            }

            .quran-translation-prefix {
                font-weight: 600;
                color: var(--text-normal);
                margin-right: 4px;
            }

            /* Transliteration styles */
            .quran-transliteration {
                margin-top: 6px;
                padding-top: 6px;
                border-top: 1px solid var(--background-modifier-border);
                direction: ltr;
                text-align: left;
                font-family: Arial, sans-serif;
                font-size: 0.75em;
                line-height: 1.6;
                color: var(--text-muted);
                font-style: italic;
            }

            .quran-transliteration-prefix {
                font-weight: 600;
                color: var(--text-normal);
                margin-right: 4px;
            }

            /* Inline word style - for single words in tables */
            .quran-word-inline {
                font-family: 'UthmanicHafs', 'Amiri Quran', serif;
                direction: rtl;
                display: inline-block;
                font-size: 1.5em;
            }

            .quran-loading {
                text-align: center;
                padding: 15px;
                color: var(--interactive-accent);
                font-family: Arial, sans-serif;
                font-size: 0.9em;
            }

            .quran-error {
                text-align: center;
                padding: 15px;
                color: var(--text-error);
                font-family: Arial, sans-serif;
                font-size: 0.9em;
            }

            /* Tajweed colors - Light theme */
            .theme-light .quran-tajweed-container .tajweed-ham_wasl,
            .theme-light .quran-tajweed-container .tajweed-slnt {
                color: #AAAAAA;
            }
            .theme-light .quran-tajweed-container .tajweed-madda_normal {
                color: #537FFF;
            }
            .theme-light .quran-tajweed-container .tajweed-madda_permissible {
                color: #4050FF;
            }
            .theme-light .quran-tajweed-container .tajweed-madda_necessary {
                color: #000EBC;
            }
            .theme-light .quran-tajweed-container .tajweed-madda_obligatory {
                color: #2144C1;
            }
            .theme-light .quran-tajweed-container .tajweed-qlq {
                color: #DD0008;
            }
            .theme-light .quran-tajweed-container .tajweed-ikhf_shfw {
                color: #D500B7;
            }
            .theme-light .quran-tajweed-container .tajweed-ikhf {
                color: #9400A8;
            }
            .theme-light .quran-tajweed-container .tajweed-idghm_shfw {
                color: #58B800;
            }
            .theme-light .quran-tajweed-container .tajweed-iqlb {
                color: #26BFFD;
            }
            .theme-light .quran-tajweed-container .tajweed-idgh_ghn {
                color: #169777;
            }
            .theme-light .quran-tajweed-container .tajweed-idgh_w_ghn {
                color: #169200;
            }
            .theme-light .quran-tajweed-container .tajweed-idgh_mus {
                color: #A1A1A1;
            }
            .theme-light .quran-tajweed-container .tajweed-ghn {
                color: #FF7E1E;
            }

            /* Tajweed colors - Dark theme (brighter, more visible) */
            .theme-dark .quran-tajweed-container .tajweed-ham_wasl,
            .theme-dark .quran-tajweed-container .tajweed-slnt,
            body.theme-dark .quran-tajweed-container .tajweed-ham_wasl,
            body.theme-dark .quran-tajweed-container .tajweed-slnt {
                color: #555555 !important;
            }
            .theme-dark .quran-tajweed-container .tajweed-madda_normal,
            body.theme-dark .quran-tajweed-container .tajweed-madda_normal {
                color: #7BA3FF;
            }
            .theme-dark .quran-tajweed-container .tajweed-madda_permissible,
            body.theme-dark .quran-tajweed-container .tajweed-madda_permissible {
                color: #6B7FFF;
            }
            .theme-dark .quran-tajweed-container .tajweed-madda_necessary,
            body.theme-dark .quran-tajweed-container .tajweed-madda_necessary {
                color: #4D6FFF;
            }
            .theme-dark .quran-tajweed-container .tajweed-madda_obligatory,
            body.theme-dark .quran-tajweed-container .tajweed-madda_obligatory {
                color: #5B7FE8;
            }
            .theme-dark .quran-tajweed-container .tajweed-qlq,
            body.theme-dark .quran-tajweed-container .tajweed-qlq {
                color: #FF4D4D;
            }
            .theme-dark .quran-tajweed-container .tajweed-ikhf_shfw,
            body.theme-dark .quran-tajweed-container .tajweed-ikhf_shfw {
                color: #FF5FD7;
            }
            .theme-dark .quran-tajweed-container .tajweed-ikhf,
            body.theme-dark .quran-tajweed-container .tajweed-ikhf {
                color: #C850D8;
            }
            .theme-dark .quran-tajweed-container .tajweed-idghm_shfw,
            body.theme-dark .quran-tajweed-container .tajweed-idghm_shfw {
                color: #7FD850;
            }
            .theme-dark .quran-tajweed-container .tajweed-iqlb,
            body.theme-dark .quran-tajweed-container .tajweed-iqlb {
                color: #5FD7FF;
            }
            .theme-dark .quran-tajweed-container .tajweed-idgh_ghn,
            body.theme-dark .quran-tajweed-container .tajweed-idgh_ghn {
                color: #4FC7A7;
            }
            .theme-dark .quran-tajweed-container .tajweed-idgh_w_ghn,
            body.theme-dark .quran-tajweed-container .tajweed-idgh_w_ghn {
                color: #4FC250;
            }
            .theme-dark .quran-tajweed-container .tajweed-idgh_mus,
            body.theme-dark .quran-tajweed-container .tajweed-idgh_mus {
                color: #C0C0C0;
            }
            .theme-dark .quran-tajweed-container .tajweed-ghn,
            body.theme-dark .quran-tajweed-container .tajweed-ghn {
                color: #FFA050;
            }
        `;
        document.head.appendChild(style);
        console.log('✅ Styles added with dark mode support');
    }

    parseTajweed(text) {
        // Parse notation like [h:9421[ٱ] or [p[َا]
        const regex = /\[([a-z])(?::\d+)?\[([^\]]+)\]/g;
        return text.replace(regex, (match, rule, content) => {
            const className = RULE_MAP[rule];
            const color = TAJWEED_COLORS[className] || '#000000';
            console.log(`🎨 Tajweed: ${rule} -> ${className} -> ${color} for "${content}"`);
            // Use class instead of inline style for theme support
            return `<span class="tajweed-${className}">${content}</span>`;
        });
    }

    getAudioUrl(reciter, surah, verse) {
        // Quran.com CDN format: https://verses.quran.com/Alafasy/mp3/055001.mp3
        const formattedKey = `${String(surah).padStart(3, '0')}${String(verse).padStart(3, '0')}`;
        
        // Find the reciter's Quran.com name
        const reciterData = AVAILABLE_RECITERS.find(r => r.identifier === reciter);
        const reciterName = reciterData ? reciterData.quranComName : reciter.replace('ar.', '');
        
        const url = `https://verses.quran.com/${reciterName}/mp3/${formattedKey}.mp3`;
        console.log(`🔊 Audio URL: ${url}`);
        return url;
    }

    createAudioPlayer(reciter, surah, verse, verseDiv = null, rangeControls = null) {
        const audioContainer = document.createElement('div');
        audioContainer.className = 'quran-audio-container';

        // Create audio element with explicit source
        const audio = new Audio();
        audio.controls = true;
        audio.className = 'quran-audio-player';
        audio.preload = 'none';
        audio.crossOrigin = 'anonymous';

        const audioUrl = this.getAudioUrl(reciter, surah, verse);

        // Set source using source element for better compatibility
        const source = document.createElement('source');
        source.src = audioUrl;
        source.type = 'audio/mpeg';
        audio.appendChild(source);

        // Add error handling with more details
        audio.addEventListener('error', (e) => {
            const errorMap = {
                1: 'MEDIA_ERR_ABORTED',
                2: 'MEDIA_ERR_NETWORK',
                3: 'MEDIA_ERR_DECODE',
                4: 'MEDIA_ERR_SRC_NOT_SUPPORTED'
            };
            const errorCode = audio.error?.code || 'unknown';
            const errorMsg = audio.error?.message || 'Unknown error';
            console.error(`❌ Audio load error: Surah ${surah}:${verse}`, {
                reciter,
                url: audioUrl,
                errorCode,
                errorName: errorMap[errorCode],
                errorMsg,
                networkState: audio.networkState
            });
        });

        // Log when audio loads successfully
        audio.addEventListener('loadeddata', () => {
            console.log(`✅ Audio loaded successfully: Surah ${surah}:${verse}`);
        });

        // Auto-advance to next verse when current ends (for range playback)
        audio.addEventListener('ended', () => {
            if (rangeControls && rangeControls.isPlaying && verseDiv) {
                this.highlightVerse(verseDiv, false);
                const nextIndex = rangeControls.currentVerseIndex + 1;
                
                // Check if we've reached the end of the range
                if (nextIndex < rangeControls.verseDivs.length) {
                    rangeControls.currentVerseIndex = nextIndex;
                    const nextVerseDiv = rangeControls.verseDivs[nextIndex];
                    this.highlightVerse(nextVerseDiv, true);
                    const nextAudio = nextVerseDiv.querySelector('.quran-audio-player');
                    if (nextAudio) {
                        nextAudio.play().catch(err => console.error('❌ Failed to play next verse:', err));
                    }
                } else {
                    // We've reached the end, check if we should repeat
                    rangeControls.repeatCount++;
                    if (rangeControls.repeatCount < rangeControls.maxRepeats) {
                        rangeControls.currentVerseIndex = 0;
                        console.log(`🔄 Repeating range... (${rangeControls.repeatCount + 1}/${rangeControls.maxRepeats})`);
                        this.updateRepeatDisplay(rangeControls);
                        const firstVerseDiv = rangeControls.verseDivs[0];
                        this.highlightVerse(firstVerseDiv, true);
                        const firstAudio = firstVerseDiv.querySelector('.quran-audio-player');
                        if (firstAudio) {
                            firstAudio.play().catch(err => console.error('❌ Failed to play first verse:', err));
                        }
                    } else {
                        // Stop playback
                        rangeControls.isPlaying = false;
                        this.updatePlayButton(rangeControls);
                        console.log(`✅ Range playback completed (${rangeControls.maxRepeats} plays)`);
                    }
                }
            }
        });

        audioContainer.appendChild(audio);
        return audioContainer;
    }

    createRangePlaybackControls(container, reciter, surah, startVerse, endVerse, verses) {
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'quran-range-controls';

        const controls = {
            isPlaying: false,
            currentVerseIndex: 0,
            repeatCount: 0,
            maxRepeats: this.settings.defaultRepeatCount,
            verseDivs: [],
            reciter,
            surah,
            startVerse,
            endVerse
        };

        // Control bar
        const controlBar = document.createElement('div');
        controlBar.className = 'quran-control-bar';

        // Play button
        const playBtn = document.createElement('button');
        playBtn.className = 'quran-play-btn';
        playBtn.innerHTML = '▶️ Play Range';
        playBtn.onclick = () => this.playRange(controls);
        controls.playButton = playBtn;

        // Stop button
        const stopBtn = document.createElement('button');
        stopBtn.className = 'quran-stop-btn';
        stopBtn.innerHTML = '⏹️ Stop';
        stopBtn.onclick = () => this.stopRange(controls);
        stopBtn.style.display = 'none'; // Hidden initially
        controls.stopButton = stopBtn;

        // Repeat controls
        const repeatContainer = document.createElement('div');
        repeatContainer.className = 'quran-repeat-controls';

        const repeatLabel = document.createElement('span');
        repeatLabel.className = 'quran-repeat-label';
        repeatLabel.textContent = 'Repeat:';

        const repeatInput = document.createElement('input');
        repeatInput.type = 'number';
        repeatInput.min = '1';
        repeatInput.max = '100';
        repeatInput.value = this.settings.defaultRepeatCount.toString();
        repeatInput.className = 'quran-repeat-input';
        repeatInput.title = 'Number of times to repeat the range';
        repeatInput.onchange = (e) => {
            controls.maxRepeats = parseInt(e.target.value) || 1;
            controls.repeatCount = 0;
        };
        controls.repeatInput = repeatInput;

        const repeatDisplay = document.createElement('span');
        repeatDisplay.className = 'quran-repeat-display';
        repeatDisplay.textContent = '(1x)';
        controls.repeatDisplay = repeatDisplay;

        repeatContainer.appendChild(repeatLabel);
        repeatContainer.appendChild(repeatInput);
        repeatContainer.appendChild(repeatDisplay);

        controlBar.appendChild(playBtn);
        controlBar.appendChild(stopBtn);
        controlBar.appendChild(repeatContainer);

        controlsContainer.appendChild(controlBar);
        // Insert controls before the verses (at the top of container)
        container.insertBefore(controlsContainer, container.firstChild);

        return controls;
    }

    playRange(controls) {
        if (controls.isPlaying) return;
        
        controls.isPlaying = true;
        controls.currentVerseIndex = 0;
        controls.repeatCount = 0;
        this.updatePlayButton(controls);
        this.updateRepeatDisplay(controls);

        // Find the first verse div and play it
        const container = controls.playButton.closest('.quran-tajweed-container');
        const verseDivs = container.querySelectorAll('.quran-verse');
        controls.verseDivs = Array.from(verseDivs);

        if (verseDivs.length > 0) {
            const firstVerseDiv = verseDivs[0];
            this.highlightVerse(firstVerseDiv, true);
            const audio = firstVerseDiv.querySelector('.quran-audio-player');
            if (audio) {
                audio.play().catch(err => {
                    console.error('❌ Failed to play audio:', err);
                    controls.isPlaying = false;
                    this.updatePlayButton(controls);
                });
            }
        }
    }

    stopRange(controls) {
        controls.isPlaying = false;
        this.updatePlayButton(controls);

        // Stop any playing audio
        const container = controls.playButton.closest('.quran-tajweed-container');
        const audio = container.querySelector('.quran-audio-player[playing]');
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }

        // Remove all highlights
        const verseDivs = container.querySelectorAll('.quran-verse');
        verseDivs.forEach(div => this.highlightVerse(div, false));

        console.log('⏹️ Range playback stopped');
    }

    highlightVerse(verseDiv, isHighlighted) {
        if (isHighlighted) {
            verseDiv.classList.add('quran-verse-active');
            verseDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            verseDiv.classList.remove('quran-verse-active');
        }
    }

    updatePlayButton(controls) {
        if (controls.isPlaying) {
            controls.playButton.style.display = 'none';
            controls.stopButton.style.display = 'inline-block';
        } else {
            controls.playButton.style.display = 'inline-block';
            controls.playButton.innerHTML = '▶️ Play Range';
            controls.stopButton.style.display = 'none';
        }
    }

    updateRepeatDisplay(controls) {
        if (controls.maxRepeats > 1) {
            const current = controls.repeatCount + 1;
            controls.repeatDisplay.textContent = `(${current}/${controls.maxRepeats})`;
        } else {
            controls.repeatDisplay.textContent = '';
        }
    }

    async renderQuranWithTajweed(source, el, isInlineWord = false, reciter = DEFAULT_RECITER, audioEnabled = false, translationEnabled = false, transliterationEnabled = false) {
        // For inline words, use simpler styling
        if (isInlineWord) {
            const wordSpan = el.createSpan({ cls: 'quran-word-inline' });
            wordSpan.innerHTML = this.parseTajweed(source.trim());
            return;
        }

        const container = el.createDiv({ cls: 'quran-tajweed-container' });
        
        // Apply dynamic font settings from user preferences
        container.style.setProperty('--quran-font-size', `${this.settings.fontSize}em`);
        container.style.setProperty('--quran-line-height', `${this.settings.lineSpacing}`);

        // Parse the source to get surah:verse references
        // First check if there's a verse reference anywhere in the source
        const verseRef = this.extractVerseReference(source);
        
        if (verseRef) {
            // It's a reference, fetch from API
            const surah = verseRef.surah;
            const startVerse = verseRef.startVerse;
            const endVerse = verseRef.endVerse;

            console.log(`📥 Fetching Surah ${surah}, verses ${startVerse}-${endVerse}`);

                const loading = container.createDiv({ cls: 'quran-loading' });
                loading.textContent = 'Loading verses...';

                try {
                    // Fetch Arabic text with Tajweed
                    const arabicResponse = await fetch(`https://api.alquran.cloud/v1/surah/${surah}/quran-tajweed`);
                    const arabicData = await arabicResponse.json();

                    // Fetch English translation (Saheeh International)
                    let translationData = null;
                    if (translationEnabled) {
                        console.log('📚 Fetching English translation...');
                        const translationResponse = await fetch(`https://api.alquran.cloud/v1/surah/${surah}/en.sahih`);
                        translationData = await translationResponse.json();
                    }

                    // Fetch transliteration
                    let transliterationData = null;
                    if (transliterationEnabled) {
                        console.log('🔤 Fetching transliteration...');
                        const transliterationResponse = await fetch(`https://api.alquran.cloud/v1/surah/${surah}/en.transliteration`);
                        transliterationData = await transliterationResponse.json();
                    }

                    console.log('✅ Verses fetched successfully');
                    loading.remove();

                    // Get the requested verses
                    const arabicVerses = arabicData.data.ayahs.slice(startVerse - 1, endVerse);
                    const translationVerses = translationEnabled && translationData?.data?.ayahs
                        ? translationData.data.ayahs.slice(startVerse - 1, endVerse)
                        : [];
                    const transliterationVerses = transliterationEnabled && transliterationData?.data?.ayahs
                        ? transliterationData.data.ayahs.slice(startVerse - 1, endVerse)
                        : [];

                    // Add continuous playback controls if audio is enabled and we have a range
                    let rangePlaybackControls = null;
                    if (audioEnabled && arabicVerses.length > 1) {
                        rangePlaybackControls = this.createRangePlaybackControls(
                            container,
                            reciter,
                            surah,
                            startVerse,
                            endVerse,
                            arabicVerses
                        );
                    }

                    for (let i = 0; i < arabicVerses.length; i++) {
                        const verse = arabicVerses[i];
                        const verseDiv = container.createDiv({ cls: 'quran-verse' });
                        verseDiv.dataset.verseNumber = verse.numberInSurah;

                        // Create a container for text and verse number (inline)
                        const textContainer = verseDiv.createDiv({ cls: 'quran-text-container' });

                        const textSpan = textContainer.createSpan();
                        textSpan.innerHTML = this.parseTajweed(verse.text);

                        // Add verse number if enabled
                        if (this.settings.showVerseNumbers) {
                            const verseNum = textContainer.createSpan({ cls: 'verse-number' });
                            verseNum.textContent = verse.numberInSurah;
                        }

                        // Add translation if enabled
                        if (translationEnabled && translationVerses[i]) {
                            const translationDiv = verseDiv.createDiv({ cls: 'quran-translation' });
                            translationDiv.innerHTML = `<span class="quran-translation-prefix">Translation:</span>${translationVerses[i].text}`;
                        }

                        // Add transliteration if enabled
                        if (transliterationEnabled && transliterationVerses[i]) {
                            const transliterationDiv = verseDiv.createDiv({ cls: 'quran-transliteration' });
                            transliterationDiv.innerHTML = `<span class="quran-transliteration-prefix">Transliteration:</span>${transliterationVerses[i].text}`;
                        }

                        // Add audio player if enabled (below text)
                        if (audioEnabled) {
                            const audioPlayer = this.createAudioPlayer(reciter, surah, verse.numberInSurah, verseDiv, rangePlaybackControls);
                            verseDiv.appendChild(audioPlayer);
                        }
                    }
                } catch (error) {
                    console.error('❌ Failed to fetch verses:', error);
                    loading.remove();
                    const errorDiv = container.createDiv({ cls: 'quran-error' });
                    errorDiv.textContent = 'Failed to load verses. Please check your internet connection.';
                }
        } else {
            // It's raw text with Tajweed notation, just parse and display
            console.log('📝 Parsing raw Tajweed text');
            const verseDiv = container.createDiv({ cls: 'quran-verse' });
            verseDiv.innerHTML = this.parseTajweed(source);
        }
    }

    onunload() {
        console.log('❌ Unloading Quran Tajweed Plugin');
        const style = document.getElementById('quran-tajweed-styles');
        if (style) {
            style.remove();
        }
    }
};

// Settings Tab for reciter selection
class QuranTajweedSettingTab extends PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display() {
        const { containerEl } = this;
        containerEl.empty();

        containerEl.createEl('h2', { text: 'Quran Tajweed Plugin Settings' });

        // Section: Audio Settings
        containerEl.createEl('h3', { text: '🔊 Audio Settings' });

        // Reciter dropdown
        new Setting(containerEl)
            .setName('Reciter')
            .setDesc('Choose your preferred reciter for audio playback.')
            .addDropdown((dropdown) => {
                AVAILABLE_RECITERS.forEach(reciter => {
                    dropdown.addOption(reciter.identifier, reciter.name);
                });

                dropdown.setValue(this.plugin.settings.reciter);
                dropdown.onChange(async (value) => {
                    const selectedReciter = AVAILABLE_RECITERS.find(r => r.identifier === value);
                    this.plugin.settings.reciter = value;
                    this.plugin.settings.reciterName = selectedReciter ? selectedReciter.name : value;
                    await this.plugin.saveSettings();
                });
            });

        new Setting(containerEl)
            .setName('Default Audio Playback')
            .setDesc('Enable audio players by default when displaying verses.')
            .addToggle((toggle) => {
                toggle.setValue(this.plugin.settings.defaultAudio);
                toggle.onChange(async (value) => {
                    this.plugin.settings.defaultAudio = value;
                    await this.plugin.saveSettings();
                });
            });

        new Setting(containerEl)
            .setName('Default Repeat Count')
            .setDesc('Default number of times to repeat a range during playback.')
            .addSlider((slider) => {
                slider.setLimits(1, 10, 1);
                slider.setValue(this.plugin.settings.defaultRepeatCount);
                slider.setDynamicTooltip();
                slider.onChange(async (value) => {
                    this.plugin.settings.defaultRepeatCount = value;
                    await this.plugin.saveSettings();
                });
            });

        // Section: Display Settings
        containerEl.createEl('h3', { text: '🎨 Display Settings' });

        new Setting(containerEl)
            .setName('Font Size')
            .setDesc('Adjust the size of the Arabic text.')
            .addSlider((slider) => {
                slider.setLimits(1.2, 3.0, 0.1);
                slider.setValue(this.plugin.settings.fontSize);
                slider.setDynamicTooltip();
                slider.onChange(async (value) => {
                    this.plugin.settings.fontSize = Math.round(value * 10) / 10;
                    await this.plugin.saveSettings();
                });
            });

        new Setting(containerEl)
            .setName('Line Spacing')
            .setDesc('Adjust the spacing between lines of Arabic text.')
            .addSlider((slider) => {
                slider.setLimits(1.2, 3.0, 0.1);
                slider.setValue(this.plugin.settings.lineSpacing);
                slider.setDynamicTooltip();
                slider.onChange(async (value) => {
                    this.plugin.settings.lineSpacing = Math.round(value * 10) / 10;
                    await this.plugin.saveSettings();
                });
            });

        new Setting(containerEl)
            .setName('Show Verse Numbers')
            .setDesc('Display verse number badges next to each verse.')
            .addToggle((toggle) => {
                toggle.setValue(this.plugin.settings.showVerseNumbers);
                toggle.onChange(async (value) => {
                    this.plugin.settings.showVerseNumbers = value;
                    await this.plugin.saveSettings();
                });
            });

        // Section: Content Settings
        containerEl.createEl('h3', { text: '📖 Content Settings' });

        new Setting(containerEl)
            .setName('Default Translation')
            .setDesc('Show English translation (Saheeh International) by default.')
            .addToggle((toggle) => {
                toggle.setValue(this.plugin.settings.defaultTranslation);
                toggle.onChange(async (value) => {
                    this.plugin.settings.defaultTranslation = value;
                    await this.plugin.saveSettings();
                });
            });

        new Setting(containerEl)
            .setName('Default Transliteration')
            .setDesc('Show English transliteration by default.')
            .addToggle((toggle) => {
                toggle.setValue(this.plugin.settings.defaultTransliteration);
                toggle.onChange(async (value) => {
                    this.plugin.settings.defaultTransliteration = value;
                    await this.plugin.saveSettings();
                });
            });

        // Section: About
        containerEl.createEl('h3', { text: 'ℹ️ About' });
        const aboutDiv = containerEl.createDiv();
        aboutDiv.style.cssText = 'font-size: 0.85em; color: var(--text-muted); padding: 10px 0;';
        aboutDiv.innerHTML = `
            <p><strong>Quran Tajweed Plugin</strong> v1.1.0</p>
            <p>Display Quranic verses with Tajweed colors using Uthmanic Hafs font.</p>
            <p>Data sources: <a href="https://alquran.cloud" target="_blank">AlQuran.cloud</a> | 
               Audio: <a href="https://quran.com" target="_blank">Quran.com CDN</a></p>
        `;
    }
}
