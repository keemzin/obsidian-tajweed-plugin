const { Plugin, PluginSettingTab, Setting, MarkdownView, requestUrl } = require('obsidian');
const SURAHS = [{ number: 1, name: "Al-Faatiha", ayahs: 7 }, { number: 2, name: "Al-Baqara", ayahs: 286 }, { number: 3, name: "Aal-i-Imraan", ayahs: 200 }, { number: 4, name: "An-Nisaa", ayahs: 176 }, { number: 5, name: "Al-Maaida", ayahs: 120 }, { number: 6, name: "Al-An'aam", ayahs: 165 }, { number: 7, name: "Al-A'raaf", ayahs: 206 }, { number: 8, name: "Al-Anfaal", ayahs: 75 }, { number: 9, name: "At-Tawba", ayahs: 129 }, { number: 10, name: "Yunus", ayahs: 109 }, { number: 11, name: "Hud", ayahs: 123 }, { number: 12, name: "Yusuf", ayahs: 111 }, { number: 13, name: "Ar-Ra'd", ayahs: 43 }, { number: 14, name: "Ibrahim", ayahs: 52 }, { number: 15, name: "Al-Hijr", ayahs: 99 }, { number: 16, name: "An-Nahl", ayahs: 128 }, { number: 17, name: "Al-Israa", ayahs: 111 }, { number: 18, name: "Al-Kahf", ayahs: 110 }, { number: 19, name: "Maryam", ayahs: 98 }, { number: 20, name: "Taa-Haa", ayahs: 135 }, { number: 21, name: "Al-Anbiyaa", ayahs: 112 }, { number: 22, name: "Al-Hajj", ayahs: 78 }, { number: 23, name: "Al-Muminoon", ayahs: 118 }, { number: 24, name: "An-Noor", ayahs: 64 }, { number: 25, name: "Al-Furqaan", ayahs: 77 }, { number: 26, name: "Ash-Shu'araa", ayahs: 227 }, { number: 27, name: "An-Naml", ayahs: 93 }, { number: 28, name: "Al-Qasas", ayahs: 88 }, { number: 29, name: "Al-Ankaboot", ayahs: 69 }, { number: 30, name: "Ar-Room", ayahs: 60 }, { number: 31, name: "Luqman", ayahs: 34 }, { number: 32, name: "As-Sajda", ayahs: 30 }, { number: 33, name: "Al-Ahzaab", ayahs: 73 }, { number: 34, name: "Saba", ayahs: 54 }, { number: 35, name: "Faatir", ayahs: 45 }, { number: 36, name: "Yaseen", ayahs: 83 }, { number: 37, name: "As-Saaffaat", ayahs: 182 }, { number: 38, name: "Saad", ayahs: 88 }, { number: 39, name: "Az-Zumar", ayahs: 75 }, { number: 40, name: "Ghafir", ayahs: 85 }, { number: 41, name: "Fussilat", ayahs: 54 }, { number: 42, name: "Ash-Shura", ayahs: 53 }, { number: 43, name: "Az-Zukhruf", ayahs: 89 }, { number: 44, name: "Ad-Dukhaan", ayahs: 59 }, { number: 45, name: "Al-Jaathiya", ayahs: 37 }, { number: 46, name: "Al-Ahqaf", ayahs: 35 }, { number: 47, name: "Muhammad", ayahs: 38 }, { number: 48, name: "Al-Fath", ayahs: 29 }, { number: 49, name: "Al-Hujuraat", ayahs: 18 }, { number: 50, name: "Qaaf", ayahs: 45 }, { number: 51, name: "Adh-Dhaariyat", ayahs: 60 }, { number: 52, name: "At-Tur", ayahs: 49 }, { number: 53, name: "An-Najm", ayahs: 62 }, { number: 54, name: "Al-Qamar", ayahs: 55 }, { number: 55, name: "Ar-Rahmaan", ayahs: 78 }, { number: 56, name: "Al-Waaqia", ayahs: 96 }, { number: 57, name: "Al-Hadid", ayahs: 29 }, { number: 58, name: "Al-Mujaadila", ayahs: 22 }, { number: 59, name: "Al-Hashr", ayahs: 24 }, { number: 60, name: "Al-Mumtahana", ayahs: 13 }, { number: 61, name: "As-Saff", ayahs: 14 }, { number: 62, name: "Al-Jumu'a", ayahs: 11 }, { number: 63, name: "Al-Munaafiqoon", ayahs: 11 }, { number: 64, name: "At-Taghaabun", ayahs: 18 }, { number: 65, name: "At-Talaaq", ayahs: 12 }, { number: 66, name: "At-Tahrim", ayahs: 12 }, { number: 67, name: "Al-Mulk", ayahs: 30 }, { number: 68, name: "Al-Qalam", ayahs: 52 }, { number: 69, name: "Al-Haaqqa", ayahs: 52 }, { number: 70, name: "Al-Ma'aarij", ayahs: 44 }, { number: 71, name: "Nooh", ayahs: 28 }, { number: 72, name: "Al-Jinn", ayahs: 28 }, { number: 73, name: "Al-Muzzammil", ayahs: 20 }, { number: 74, name: "Al-Muddaththir", ayahs: 56 }, { number: 75, name: "Al-Qiyaama", ayahs: 40 }, { number: 76, name: "Al-Insaan", ayahs: 31 }, { number: 77, name: "Al-Mursalaat", ayahs: 50 }, { number: 78, name: "An-Naba", ayahs: 40 }, { number: 79, name: "An-Naazi'aat", ayahs: 46 }, { number: 80, name: "Abasa", ayahs: 42 }, { number: 81, name: "At-Takwir", ayahs: 29 }, { number: 82, name: "Al-Infitaar", ayahs: 19 }, { number: 83, name: "Al-Mutaffifin", ayahs: 36 }, { number: 84, name: "Al-Inshiqaaq", ayahs: 25 }, { number: 85, name: "Al-Burooj", ayahs: 22 }, { number: 86, name: "At-Taariq", ayahs: 17 }, { number: 87, name: "Al-A'laa", ayahs: 19 }, { number: 88, name: "Al-Ghaashiya", ayahs: 26 }, { number: 89, name: "Al-Fajr", ayahs: 30 }, { number: 90, name: "Al-Balad", ayahs: 20 }, { number: 91, name: "Ash-Shams", ayahs: 15 }, { number: 92, name: "Al-Lail", ayahs: 21 }, { number: 93, name: "Ad-Dhuhaa", ayahs: 11 }, { number: 94, name: "Ash-Sharh", ayahs: 8 }, { number: 95, name: "At-Tin", ayahs: 8 }, { number: 96, name: "Al-Alaq", ayahs: 19 }, { number: 97, name: "Al-Qadr", ayahs: 5 }, { number: 98, name: "Al-Bayyina", ayahs: 8 }, { number: 99, name: "Az-Zalzala", ayahs: 8 }, { number: 100, name: "Al-Aadiyaat", ayahs: 11 }, { number: 101, name: "Al-Qaari'a", ayahs: 11 }, { number: 102, name: "At-Takaathur", ayahs: 8 }, { number: 103, name: "Al-Asr", ayahs: 3 }, { number: 104, name: "Al-Humaza", ayahs: 9 }, { number: 105, name: "Al-Fil", ayahs: 5 }, { number: 106, name: "Quraish", ayahs: 4 }, { number: 107, name: "Al-Maa'un", ayahs: 7 }, { number: 108, name: "Al-Kawthar", ayahs: 3 }, { number: 109, name: "Al-Kaafiroon", ayahs: 6 }, { number: 110, name: "An-Nasr", ayahs: 3 }, { number: 111, name: "Al-Masad", ayahs: 5 }, { number: 112, name: "Al-Ikhlaas", ayahs: 4 }, { number: 113, name: "Al-Falaq", ayahs: 5 }, { number: 114, name: "An-Naas", ayahs: 6 }];

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
const TRANSLATION_VERSIONS = [
    { id: 'en.sahih', name: 'Saheeh International (English)', source: 'alquran-cloud', apiId: 'en.sahih' },
    { id: '131', name: 'Dr. Mustafa Khattab — The Clear Quran (English)', source: 'fawazahmed', apiId: 'eng-mustafakhattaba' },
    { id: '39', name: 'Abdullah Muhammad Basmeih (Malay)', source: 'fawazahmed', apiId: 'msa-abdullahmuhamma' },
    { id: '33', name: 'Indonesian Islamic Affairs Ministry (Indonesian)', source: 'fawazahmed', apiId: 'ind-indonesianislam' },
    { id: '20', name: 'Saheeh International (English)', source: 'fawazahmed', apiId: 'eng-sahihinternational' },
];

const DEFAULT_RECITER = 'ar.alafasy';

const TAFSIR_VERSIONS = [
    { id: 'en-tafisr-ibn-kathir', name: 'Ibn Kathir (Abridged)', apiName: 'Ibn Kathir' },
    { id: 'en-tafsir-maarif-ul-quran', name: "Ma'arif al-Qur'an", apiName: "Ma'arif al-Qur'an" },
];

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
            defaultAudio: true,
            defaultTranslation: true,
            defaultTransliteration: true,
            defaultRepeatCount: 5,
            showVerseNumbers: true,
            lineSpacing: 1.8,
            translationFontSize: 0.7,
            transliterationFontSize: 0.75,
            translationVersion: 'en.sahih',
            tafsirVersion: 'en-tafisr-ibn-kathir',
            experimentalV4Tajweed: false
        };

        // Load saved settings
        await this.loadSettings();

        // Add settings tab
        this.addSettingTab(new QuranTajweedSettingTab(this.app, this));

        // Register markdown post processor for code blocks with language "quran"
        this.registerMarkdownCodeBlockProcessor('quran', async (source, el, ctx) => {
            // Parse optional parameters: ```quran reciter="ar.alafasy" audio="on" translation="on" transliteration="on"
            const reciter = this.parseReciterFromSource(source);
            const audioEnabled = this.parseAudioFromSource(source);
            const translationEnabled = this.parseTranslationFromSource(source);
            const transliterationEnabled = this.parseTransliterationFromSource(source);
            const actualSource = this.removeParameters(source);
            await this.renderQuranWithTajweed(actualSource, el, false, reciter, audioEnabled, translationEnabled, transliterationEnabled, ctx);
        });

        // Register markdown post processor for code blocks with language "tajweed"
        this.registerMarkdownCodeBlockProcessor('tajweed', async (source, el, ctx) => {
            await this.renderQuranWithTajweed(source, el, false, this.settings.reciter, false);
        });

        // Register markdown post processor for inline words with language "word"
        this.registerMarkdownCodeBlockProcessor('word', async (source, el, ctx) => {
            await this.renderQuranWithTajweed(source, el, true, this.settings.reciter, false);
        });

        console.log('✅ Quran Tajweed Plugin loaded successfully');

        this.checkForUpdates();

        this.addCommand({
            id: 'insert-quran-block',
            name: 'Insert Quran verse block',
            editorCallback: (editor) => {
                editor.replaceSelection('```quran\naudio="on"\ntranslation="on"\ntransliteration="on"\n1:1\n```\n');
            }
        });

        this.registerEvent(this.app.workspace.on('editor-menu', (menu, editor) => {
            menu.addItem((item) => {
                item.setTitle('Insert Quran verse block')
                    .onClick(() => {
                        editor.replaceSelection('```quran\naudio="on"\ntranslation="on"\ntransliteration="on"\n1:1\n```\n');
                    });
            });
        }));
    }

    parseReciterFromSource(source) {
        // Parse: ```quran reciter="ar.alafasy"
        const match = source.match(/reciter="([^"]+)"/);
        if (match) {
            return match[1];
        }
        return this.settings.reciter;
    }

    parseAudioFromSource(source) {
        // Parse: ```quran audio="on" or audio="off"
        const match = source.match(/audio="(on|off)"/i);
        if (match) {
            return match[1].toLowerCase() === 'on';
        }
        // Default: use user setting
        return this.settings.defaultAudio;
    }

    parseTranslationFromSource(source) {
        // Parse: ```quran translation="on" or translation="off"
        const match = source.match(/translation="(on|off)"/i);
        if (match) {
            return match[1].toLowerCase() === 'on';
        }
        // Default: use user setting
        return this.settings.defaultTranslation;
    }

    parseTransliterationFromSource(source) {
        // Parse: ```quran transliteration="on" or transliteration="off"
        const match = source.match(/transliteration="(on|off)"/i);
        if (match) {
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

    snapToRepeatOption(val) {
        const options = [5, 10, 15, 20, 25, 30];
        return options.reduce((a, b) => Math.abs(b - val) < Math.abs(a - val) ? b : a);
    }

    async loadSettings() {
        const saved = await this.loadData();
        if (saved) {
            this.settings.reciter = saved.reciter || DEFAULT_RECITER;
            this.settings.reciterName = saved.reciterName || 'Mishary Rashid Alafasy';
            this.settings.fontSize = saved.fontSize !== undefined ? saved.fontSize : 1.8;
            this.settings.defaultAudio = saved.defaultAudio !== undefined ? saved.defaultAudio : true;
            this.settings.defaultTranslation = saved.defaultTranslation !== undefined ? saved.defaultTranslation : true;
            this.settings.defaultTransliteration = saved.defaultTransliteration !== undefined ? saved.defaultTransliteration : true;
            this.settings.defaultRepeatCount = this.snapToRepeatOption(saved.defaultRepeatCount || 5);
            this.settings.showVerseNumbers = saved.showVerseNumbers !== undefined ? saved.showVerseNumbers : true;
            this.settings.lineSpacing = saved.lineSpacing !== undefined ? saved.lineSpacing : 1.8;
            this.settings.translationFontSize = saved.translationFontSize !== undefined ? saved.translationFontSize : 0.7;
            this.settings.transliterationFontSize = saved.transliterationFontSize !== undefined ? saved.transliterationFontSize : 0.75;
            this.settings.translationVersion = saved.translationVersion !== undefined ? saved.translationVersion : 'en.sahih';
            this.settings.tafsirVersion = saved.tafsirVersion !== undefined ? saved.tafsirVersion : 'en-tafisr-ibn-kathir';
            this.settings.experimentalV4Tajweed = saved.experimentalV4Tajweed !== undefined ? saved.experimentalV4Tajweed : false;

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
            lineSpacing: this.settings.lineSpacing,
            translationFontSize: this.settings.translationFontSize,
            transliterationFontSize: this.settings.transliterationFontSize,
            translationVersion: this.settings.translationVersion,
            tafsirVersion: this.settings.tafsirVersion,
            experimentalV4Tajweed: this.settings.experimentalV4Tajweed
        });
    }



    parseTajweed(text) {
        // Parse notation like [h:9421[ٱ] or [p[َا]
        const regex = /\[([a-z])(?::\d+)?\[([^\]]+)\]/g;
        return text.replace(regex, (match, rule, content) => {
            const className = RULE_MAP[rule];
            const color = TAJWEED_COLORS[className] || '#000000';
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

        // Auto-advance to next verse when current ends (for range playback)
        audio.addEventListener('ended', () => {
            if (!rangeControls || !rangeControls.isPlaying || !verseDiv) return;
            this.highlightVerse(verseDiv, false);

            const nextIndex = rangeControls.currentVerseIndex + 1;

            if (nextIndex < rangeControls.verseDivs.length) {
                rangeControls.currentVerseIndex = nextIndex;
                const nextVerseDiv = rangeControls.verseDivs[nextIndex];
                this.highlightVerse(nextVerseDiv, true);
                const nextAudio = nextVerseDiv.querySelector('.quran-audio-player');
                if (!nextAudio) {
                    this.stopRange(rangeControls);
                    return;
                }
                nextAudio.play().catch(() => this.stopRange(rangeControls));
                this.preloadNextAudio(rangeControls, nextIndex);
            } else {
                rangeControls.repeatCount++;
                if (rangeControls.repeatCount < rangeControls.maxRepeats) {
                    rangeControls.currentVerseIndex = 0;
                    this.updateRepeatDisplay(rangeControls);
                    const firstVerseDiv = rangeControls.verseDivs[0];
                    this.highlightVerse(firstVerseDiv, true);
                    const firstAudio = firstVerseDiv.querySelector('.quran-audio-player');
                    if (!firstAudio) {
                        this.stopRange(rangeControls);
                        return;
                    }
                    firstAudio.play().catch(() => this.stopRange(rangeControls));
                    this.preloadNextAudio(rangeControls, 0);
                } else {
                    rangeControls.isPlaying = false;
                    this.updatePlayButton(rangeControls);
                }
            }
        });

        audioContainer.appendChild(audio);
        return audioContainer;
    }

    createRangePlaybackControls(container, reciter, surah, startVerse, endVerse, verses, audioEnabled) {
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
            endVerse,
            audioControls: []
        };

        // Control bar
        const controlBar = document.createElement('div');
        controlBar.className = 'quran-control-bar';

        // Play button (icon-only)
        const playBtn = document.createElement('button');
        playBtn.className = 'quran-play-btn';
        playBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>';
        playBtn.title = 'Play range';
        playBtn.onclick = () => this.playRange(controls);
        controls.playButton = playBtn;
        controls.audioControls.push(playBtn);

        // Stop button (icon-only)
        const stopBtn = document.createElement('button');
        stopBtn.className = 'quran-stop-btn';
        stopBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12"/></svg>';
        stopBtn.title = 'Stop';
        stopBtn.onclick = () => this.stopRange(controls);
        stopBtn.style.display = 'none'; // Hidden initially
        controls.stopButton = stopBtn;
        controls.audioControls.push(stopBtn);

        // Repeat controls
        const repeatContainer = document.createElement('div');
        repeatContainer.className = 'quran-repeat-controls';

        const repeatSelect = document.createElement('select');
        repeatSelect.className = 'quran-repeat-select';
        [5, 10, 15, 20, 25, 30].forEach(n => {
            const opt = document.createElement('option');
            opt.value = n;
            opt.textContent = `${n}x`;
            if (n === this.settings.defaultRepeatCount) opt.selected = true;
            repeatSelect.appendChild(opt);
        });
        repeatSelect.onchange = (e) => {
            controls.maxRepeats = parseInt(e.target.value);
            controls.repeatCount = 0;
        };
        controls.repeatSelect = repeatSelect;

        const repeatDisplay = document.createElement('span');
        repeatDisplay.className = 'quran-repeat-display';
        repeatDisplay.textContent = '';
        controls.repeatDisplay = repeatDisplay;

        repeatContainer.appendChild(repeatSelect);
        repeatContainer.appendChild(repeatDisplay);
        controls.audioControls.push(repeatContainer);

        const settingsBtn = document.createElement('button');
        settingsBtn.className = 'quran-settings-btn';
        settingsBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';
        settingsBtn.title = 'Quick settings';

        const settingsPopover = document.createElement('div');
        settingsPopover.className = 'quran-settings-popover';
        settingsPopover.style.display = 'none';

        const items = [
            { key: 'translationEnabled', label: 'Translation' },
            { key: 'transliterationEnabled', label: 'Transliteration' },
            { key: 'audioEnabled', label: 'Audio' },
        ];

        items.forEach(({ key, label }) => {
            const row = document.createElement('div');
            row.className = 'quran-settings-row';
            const state = container._quranState || {};
            const isActive = state[key];
            row.innerHTML = `<span>${label}</span><span class="quran-settings-toggle ${isActive ? 'on' : 'off'}"></span>`;
            row.onclick = async () => {
                const st = container._quranState;
                if (!st) return;
                settingsPopover.style.display = 'none';
                st[key] = !st[key];
                row.querySelector('.quran-settings-toggle').className = `quran-settings-toggle ${st[key] ? 'on' : 'off'}`;
                this.applyToggle(container, st, key);
                await this.updateSourceParam(container, key, st[key]);
            };
            settingsPopover.appendChild(row);
        });

        settingsBtn.onclick = (e) => {
            e.stopPropagation();
            const isVisible = settingsPopover.style.display !== 'none';
            document.querySelectorAll('.quran-settings-popover').forEach(p => p.style.display = 'none');
            settingsPopover.style.display = isVisible ? 'none' : 'block';
        };

        document.addEventListener('click', () => {
            settingsPopover.style.display = 'none';
        }, { capture: true });

        controlBar.appendChild(playBtn);
        controlBar.appendChild(stopBtn);
        controlBar.appendChild(repeatContainer);
        controlBar.appendChild(settingsBtn);
        controlsContainer.appendChild(settingsPopover);

        if (!audioEnabled) {
            controls.audioControls.forEach(el => el.style.display = 'none');
        }

        controlsContainer.appendChild(controlBar);
        container.insertBefore(controlsContainer, container.firstChild);

        return controls;
    }

    playRange(controls) {
        if (controls.isPlaying) return;
        if (this.currentPlaying && this.currentPlaying !== controls) {
            this.stopRange(this.currentPlaying);
        }
        this.currentPlaying = controls;
        
        controls.isPlaying = true;
        controls.currentVerseIndex = 0;
        controls.repeatCount = 0;
        this.updatePlayButton(controls);
        this.updateRepeatDisplay(controls);

        // Find all verse divs
        const container = controls.playButton.closest('.quran-tajweed-container');
        const verseDivs = container.querySelectorAll('.quran-verse');
        controls.verseDivs = Array.from(verseDivs);

        if (controls.verseDivs.length === 0) {
            controls.isPlaying = false;
            this.updatePlayButton(controls);
            return;
        }

        const firstVerseDiv = controls.verseDivs[0];
        this.highlightVerse(firstVerseDiv, true);
        const audio = firstVerseDiv.querySelector('.quran-audio-player');
        if (!audio) {
            controls.isPlaying = false;
            this.updatePlayButton(controls);
            return;
        }

        audio.play().catch(err => {
            console.error('❌ Failed to play audio:', err);
            controls.isPlaying = false;
            this.updatePlayButton(controls);
        });
        this.preloadNextAudio(controls, 0);
    }

    preloadNextAudio(controls, currentIndex) {
        const nextIndex = currentIndex + 1;
        if (nextIndex >= controls.verseDivs.length) return;
        const nextAudio = controls.verseDivs[nextIndex]?.querySelector('.quran-audio-player');
        if (nextAudio && nextAudio.readyState < 2) {
            nextAudio.preload = 'auto';
            nextAudio.load();
        }
    }

    stopRange(controls) {
        controls.isPlaying = false;
        if (this.currentPlaying === controls) {
            this.currentPlaying = null;
        }
        this.updatePlayButton(controls);

        // Stop all audio players in the container
        const container = controls.playButton.closest('.quran-tajweed-container');
        container.querySelectorAll('.quran-audio-player').forEach(a => {
            a.pause();
            a.currentTime = 0;
        });

        // Remove all highlights
        container.querySelectorAll('.quran-verse').forEach(div => this.highlightVerse(div, false));

    }

    highlightVerse(verseDiv, isHighlighted) {
        if (isHighlighted) {
            verseDiv.classList.add('quran-verse-active');
            verseDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            verseDiv.classList.remove('quran-verse-active');
        }
    }

    updatePlayButton(controls) {
        if (controls.isPlaying) {
            controls.playButton.style.display = 'none';
            controls.stopButton.style.display = 'inline-flex';
        } else {
            controls.playButton.style.display = 'inline-flex';
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

    applyToggle(container, state, key) {
        if (key === 'translationEnabled') {
            container.querySelectorAll('.quran-translation').forEach(el => {
                el.style.display = state.translationEnabled ? '' : 'none';
            });
        } else if (key === 'transliterationEnabled') {
            container.querySelectorAll('.quran-transliteration').forEach(el => {
                el.style.display = state.transliterationEnabled ? '' : 'none';
            });
        } else if (key === 'audioEnabled') {
            if (state.audioEnabled) {
                this.enableAudio(container, state);
            } else {
                this.disableAudio(container, state);
            }
        }
    }

    enableAudio(container, state) {
        let rangeControls = state.rangeControls;
        if (state.arabicVerses.length > 1 && !rangeControls) {
            rangeControls = this.createRangePlaybackControls(
                container, state.reciter, state.surah, state.startVerse, state.endVerse, state.arabicVerses, true
            );
            state.rangeControls = rangeControls;
        }
        if (rangeControls && rangeControls.audioControls) {
            rangeControls.audioControls.forEach(el => el.style.display = '');
        }
        state.verseElements.forEach((ve, i) => {
            if (!ve.audioPlayer) {
                const verse = state.arabicVerses[i];
                const ap = this.createAudioPlayer(state.reciter, state.surah, verse.numberInSurah, ve.div, rangeControls);
                ve.div.appendChild(ap);
                ve.audioPlayer = ap;
            }
        });
    }

    disableAudio(container, state) {
        state.verseElements.forEach(ve => {
            if (ve.audioPlayer) {
                ve.audioPlayer.remove();
                ve.audioPlayer = null;
            }
        });
        if (state.rangeControls && state.rangeControls.audioControls) {
            state.rangeControls.audioControls.forEach(el => el.style.display = 'none');
        }
    }

    fetchJson(url) {
        return fetch(url).then(r => r.json());
    }

    showTafsir(event, surah, verse) {
        const existing = document.querySelector('.quran-tafsir-popover');
        if (existing) existing.remove();

        const tafsirInfo = TAFSIR_VERSIONS.find(t => t.id === this.settings.tafsirVersion) || TAFSIR_VERSIONS[0];
        const popover = document.createElement('div');
        popover.className = 'quran-tafsir-popover';
        popover.innerHTML = '<div class="quran-tafsir-loading">Loading tafsir...</div>';
        document.body.appendChild(popover);

        this.fetchJson(`https://api.islamic.app/v1/verses/by_key/${surah}:${verse}?tafsirs=${tafsirInfo.id}`)
            .then(data => {
                const tafsir = data?.data?.verse?.tafsirs?.[0]?.text || 'No tafsir available for this verse.';
                popover.innerHTML = `
                    <div class="quran-tafsir-header">
                        <span class="quran-tafsir-title">${tafsirInfo.apiName} (${surah}:${verse})</span>
                        <button class="quran-tafsir-close">&times;</button>
                    </div>
                    <div class="quran-tafsir-body">${tafsir}</div>
                `;
                popover.querySelector('.quran-tafsir-close').addEventListener('click', () => popover.remove());
            })
            .catch(() => {
                popover.innerHTML = '<div class="quran-tafsir-error">Failed to load tafsir. Check your connection.</div>';
            });

        const closeHandler = (e) => {
            if (!popover.contains(e.target) && e.target !== event.currentTarget) {
                popover.remove();
                document.removeEventListener('click', closeHandler, true);
            }
        };
        setTimeout(() => document.addEventListener('click', closeHandler, true), 0);
    }

    getCache(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch {
            return null;
        }
    }

    setCache(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch {
            // localStorage full or unavailable — ignore
        }
    }

    async getV4GlyphData() {
        let cached = this.getCache('quran-v4-glyphs');
        if (cached && cached.lookup) return cached;
        const data = await this.fetchJson('https://fonts.quran.ws/bundles/qpc-hafs-v4/quran-glyphs.json');
        const lookup = {};
        for (const ayah of data.ayat) {
            lookup[`${ayah.surah}_${ayah.ayah}`] = ayah.chunks;
        }
        const result = { lookup, total: data.total };
        this.setCache('quran-v4-glyphs', result);
        return result;
    }

    async ensureV4FontLoaded(page) {
        if (!this._v4FontsLoaded) this._v4FontsLoaded = new Set();
        if (this._v4FontsLoaded.has(page)) return;
        const pageStr = String(page).padStart(2, '0');
        const fontFamily = `QCF4_Hafs_${pageStr}_W`;
        const style = document.createElement('style');
        style.textContent = `@font-face{font-family:'${fontFamily}';src:url('https://fonts.quran.ws/assets/fonts/qpc-hafs-v4/QCF4_Hafs_${pageStr}_W.ttf') format('truetype');font-display:swap}`;
        document.head.appendChild(style);
        this._v4FontsLoaded.add(page);
        await document.fonts.load(`1em '${fontFamily}'`);
    }

    renderV4GlyphText(textSpan, chunks) {
        if (chunks.length === 1) {
            textSpan.style.fontFamily = chunks[0].family;
            textSpan.textContent = chunks[0].text;
        } else {
            chunks.forEach(c => {
                const span = document.createElement('span');
                span.style.fontFamily = c.family;
                span.textContent = c.text;
                textSpan.appendChild(span);
            });
        }
    }

    async rerenderAll() {
        const containers = [...document.querySelectorAll('.quran-tajweed-container')];
        await Promise.all(containers.map(async container => {
            const state = container._quranState;
            if (!state) return;
            const el = container.parentElement;
            if (!el) return;
            const source = `${state.surah}:${state.startVerse}-${state.endVerse}`;
            el.innerHTML = '';
            await this.renderQuranWithTajweed(source, el, false, state.reciter, state.audioEnabled, state.translationEnabled, state.transliterationEnabled);
        }));
    }

    async renderQuranWithTajweed(source, el, isInlineWord = false, reciter = DEFAULT_RECITER, audioEnabled = false, translationEnabled = false, transliterationEnabled = false, ctx = null) {
        // For inline words, use simpler styling
        if (isInlineWord) {
            const wordSpan = el.createSpan({ cls: 'quran-word-inline' });
            wordSpan.innerHTML = this.parseTajweed(source.trim());
            return;
        }

        const container = el.createDiv({ cls: 'quran-tajweed-container' });
        container.style.fontSize = `${this.settings.fontSize}em`;
        container.style.lineHeight = `${this.settings.lineSpacing}`;

        // Parse the source to get surah:verse references
        // First check if there's a verse reference anywhere in the source
        let refSource = source;
        if (!this.extractVerseReference(refSource) && !refSource.trim()) {
            refSource = '1:1';
        }
        const verseRef = this.extractVerseReference(refSource);
        
        if (verseRef) {
            const surah = verseRef.surah;
            const startVerse = verseRef.startVerse;
            const endVerse = verseRef.endVerse;

            const navBar = container.createDiv({ cls: 'quran-nav-bar' });

            const surahSelect = navBar.createEl('select', { cls: 'quran-nav-select' });
            const surahInfo = SURAHS.map(s => ({ ...s }));
            surahInfo.forEach(s => {
                const opt = surahSelect.createEl('option');
                opt.value = s.number;
                opt.textContent = `${s.number}. ${s.name}`;
                if (s.number === surah) opt.selected = true;
            });

            const fromSelect = navBar.createEl('select', { cls: 'quran-nav-select' });
            const toSelect = navBar.createEl('select', { cls: 'quran-nav-select' });

            const currentSurah = SURAHS.find(s => s.number === surah) || surahInfo[0];
            const totalAyahs = currentSurah.ayahs;

            const updateVerseOptions = (fromVal) => {
                toSelect.innerHTML = '';
                const start = fromVal || 1;
                for (let i = start; i <= totalAyahs; i++) {
                    const opt = toSelect.createEl('option');
                    opt.value = i;
                    opt.textContent = i;
                    if (i === endVerse) opt.selected = true;
                }
            };

            for (let i = 1; i <= totalAyahs; i++) {
                const opt = fromSelect.createEl('option');
                opt.value = i;
                opt.textContent = i;
                if (i === startVerse) opt.selected = true;
            }
            updateVerseOptions(startVerse);

            surahSelect.onchange = async () => {
                const newSurah = parseInt(surahSelect.value);
                const s = SURAHS.find(x => x.number === newSurah);
                if (!s) return;
                const st = container._quranState || {};
                const newRef = `${newSurah}:1-${Math.min(s.ayahs, 10)}`;
                el.innerHTML = '';
                await this.renderQuranWithTajweed(newRef, el, false, st.reciter || reciter, st.audioEnabled !== undefined ? st.audioEnabled : audioEnabled, st.translationEnabled !== undefined ? st.translationEnabled : translationEnabled, st.transliterationEnabled !== undefined ? st.transliterationEnabled : transliterationEnabled);
                await this.updateSourceRange(container, newRef);
            };

            fromSelect.onchange = async () => {
                const f = parseInt(fromSelect.value);
                const t = Math.max(f, parseInt(toSelect.value));
                toSelect.value = t;
                updateVerseOptions(f);
                const st = container._quranState || {};
                const newRef = `${surah}:${f}-${t}`;
                el.innerHTML = '';
                await this.renderQuranWithTajweed(newRef, el, false, st.reciter || reciter, st.audioEnabled !== undefined ? st.audioEnabled : audioEnabled, st.translationEnabled !== undefined ? st.translationEnabled : translationEnabled, st.transliterationEnabled !== undefined ? st.transliterationEnabled : transliterationEnabled);
                await this.updateSourceRange(container, newRef);
            };

            toSelect.onchange = async () => {
                const f = parseInt(fromSelect.value);
                const t = Math.max(f, parseInt(toSelect.value));
                toSelect.value = t;
                const st = container._quranState || {};
                const newRef = `${surah}:${f}-${t}`;
                el.innerHTML = '';
                await this.renderQuranWithTajweed(newRef, el, false, st.reciter || reciter, st.audioEnabled !== undefined ? st.audioEnabled : audioEnabled, st.translationEnabled !== undefined ? st.translationEnabled : translationEnabled, st.transliterationEnabled !== undefined ? st.transliterationEnabled : transliterationEnabled);
                await this.updateSourceRange(container, newRef);
            };

            const arabicCacheKey = `quran-surah-${surah}`;
            const transInfo = TRANSLATION_VERSIONS.find(t => t.id === this.settings.translationVersion) || TRANSLATION_VERSIONS[0];
            const transCacheKey = `quran-surah-${surah}-trans-${transInfo.source}-${this.settings.translationVersion}`;
            let arabicCached = this.getCache(arabicCacheKey);
            let transCached = this.getCache(transCacheKey);

            if (!arabicCached) {
                const loading = container.createDiv({ cls: 'quran-loading' });
                loading.textContent = 'Loading verses...';

                try {
                    const [arabicData, transliterationFetchData] = await Promise.all([
                        this.fetchJson(`https://api.alquran.cloud/v1/surah/${surah}/quran-tajweed`),
                        this.fetchJson(`https://api.alquran.cloud/v1/surah/${surah}/en.transliteration`).catch(e => {
                            console.warn('⚠️ Transliteration fetch failed:', e);
                            return null;
                        })
                    ]);

                    loading.remove();
                    arabicCached = { arabicData, transliterationFetchData };
                    this.setCache(arabicCacheKey, arabicCached);
                } catch (error) {
                    console.error('❌ Failed to fetch verses:', error);
                    loading.remove();
                    const errorDiv = container.createDiv({ cls: 'quran-error' });
                    errorDiv.textContent = 'Failed to load verses. Please check your internet connection.';
                    return;
                }
            }

            if (!transCached) {

                if (transInfo.source === 'quran-com') {
                    try {
                        const data = await this.fetchJson(`https://api.quran.com/api/v4/verses/by_chapter/${surah}?translations=${transInfo.apiId}&per_page=300`);
                        transCached = { translationData: data };
                    } catch (e) {
                        console.warn('⚠️ Translation fetch failed:', e);
                        transCached = { translationData: null };
                    }
                } else if (transInfo.source === 'fawazahmed') {
                    try {
                        const data = await this.fetchJson(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/${transInfo.apiId}/${surah}.json`);
                        transCached = { translationData: data };
                    } catch (e) {
                        console.warn('⚠️ Translation fetch failed:', e);
                        transCached = { translationData: null };
                    }
                } else {
                    try {
                        const data = await this.fetchJson(`https://api.alquran.cloud/v1/surah/${surah}/${transInfo.apiId}`);
                        transCached = { translationData: data };
                    } catch (e) {
                        console.warn('⚠️ Translation fetch failed:', e);
                        transCached = { translationData: null };
                    }
                }
                this.setCache(transCacheKey, transCached);
            }

            const { arabicData, transliterationFetchData } = arabicCached;
            const translationFetchData = transCached.translationData;

            const arabicVerses = arabicData.data.ayahs.slice(startVerse - 1, endVerse);
            const translationVerses = [];
            if (translationFetchData) {
                if (translationFetchData.verses) {
                    // Quran.com API v4 format
                    const allVerses = translationFetchData.verses;
                    const sliced = allVerses.slice(startVerse - 1, endVerse);
                    sliced.forEach(v => {
                        const t = v.translations?.[0];
                        translationVerses.push({ text: t?.text || '' });
                    });
                } else if (translationFetchData.chapter) {
                    // fawazahmed0 API format
                    const allVerses = translationFetchData.chapter;
                    const sliced = allVerses.slice(startVerse - 1, endVerse);
                    sliced.forEach(v => {
                        translationVerses.push({ text: v.text || '' });
                    });
                } else if (translationFetchData.data?.ayahs) {
                    // AlQuran.cloud format
                    translationFetchData.data.ayahs.slice(startVerse - 1, endVerse).forEach(a => {
                        translationVerses.push({ text: a.text });
                    });
                }
            }
            const transliterationVerses = transliterationFetchData?.data?.ayahs
                ? transliterationFetchData.data.ayahs.slice(startVerse - 1, endVerse)
                : [];

            const verseElements = [];
            const state = {
                audioEnabled,
                translationEnabled,
                transliterationEnabled,
                reciter,
                surah,
                startVerse,
                endVerse,
                arabicVerses,
                verseElements,
                translationVerses,
                transliterationVerses,
                rangeControls: null,
                ctx,
            };
            container._quranState = state;

            let v4GlyphData = null;
            if (this.settings.experimentalV4Tajweed) {
                try {
                    v4GlyphData = await this.getV4GlyphData();
                    const allPages = new Set();
                    for (const verse of arabicVerses) {
                        const key = `${surah}_${verse.numberInSurah}`;
                        const chunks = v4GlyphData.lookup[key];
                        if (chunks) chunks.forEach(c => allPages.add(c.p));
                    }
                    if (allPages.size > 0) {
                        await Promise.all([...allPages].map(p => this.ensureV4FontLoaded(p).catch(() => {})));
                    }
                } catch (e) {
                    console.warn('⚠️ V4 Tajweed font init failed, falling back to standard rendering:', e);
                    v4GlyphData = null;
                }
            }

            for (let i = 0; i < arabicVerses.length; i++) {
                const verse = arabicVerses[i];
                const verseDiv = container.createDiv({ cls: 'quran-verse' });
                verseDiv.dataset.verseNumber = verse.numberInSurah;

                const textContainer = verseDiv.createDiv({ cls: 'quran-text-container' });

                const textSpan = textContainer.createSpan({ cls: 'quran-verse-text' });
                if (v4GlyphData) {
                    const key = `${surah}_${verse.numberInSurah}`;
                    const chunks = v4GlyphData.lookup[key];
                    if (chunks && chunks.length > 0) {
                        this.renderV4GlyphText(textSpan, chunks);
                    } else {
                        textSpan.innerHTML = this.parseTajweed(verse.text);
                    }
                } else {
                    textSpan.innerHTML = this.parseTajweed(verse.text);
                }
                textSpan.addEventListener('click', (e) => {
                    if (!window.getSelection().toString()) {
                        this.showTafsir(e, surah, verse.numberInSurah);
                    }
                });

                if (this.settings.showVerseNumbers) {
                    const verseNum = textContainer.createSpan({ cls: 'verse-number' });
                    verseNum.textContent = verse.numberInSurah;
                }

                let translationDiv = null;
                if (translationVerses[i]) {
                    translationDiv = verseDiv.createDiv({ cls: 'quran-translation' });
                    translationDiv.style.fontSize = `${this.settings.translationFontSize}em`;
                    translationDiv.innerHTML = `<span class="quran-translation-prefix">Translation:</span>${translationVerses[i].text}`;
                    if (!translationEnabled) translationDiv.style.display = 'none';
                }

                let transliterationDiv = null;
                if (transliterationVerses[i]) {
                    transliterationDiv = verseDiv.createDiv({ cls: 'quran-transliteration' });
                    transliterationDiv.style.fontSize = `${this.settings.transliterationFontSize}em`;
                    transliterationDiv.innerHTML = `<span class="quran-transliteration-prefix">Transliteration:</span>${transliterationVerses[i].text}`;
                    if (!transliterationEnabled) transliterationDiv.style.display = 'none';
                }

                let audioPlayer = null;
                verseElements.push({ div: verseDiv, translationDiv, transliterationDiv, audioPlayer });
            }

            state.rangeControls = this.createRangePlaybackControls(
                container, reciter, surah, startVerse, endVerse, arabicVerses, audioEnabled
            );

            if (audioEnabled) {
                verseElements.forEach((ve, i) => {
                    const verse = arabicVerses[i];
                    const ap = this.createAudioPlayer(reciter, surah, verse.numberInSurah, ve.div, state.rangeControls);
                    ve.div.appendChild(ap);
                    ve.audioPlayer = ap;
                });
            }
        } else {
            // It's raw text with Tajweed notation, just parse and display
            const verseDiv = container.createDiv({ cls: 'quran-verse' });
            verseDiv.innerHTML = this.parseTajweed(source);
        }
    }

    async updateSourceParam(container, key, newVal) {
        const st = container._quranState;
        if (!st || !st.ctx || !st.ctx.sourcePath) return;
        const paramMap = {
            translationEnabled: 'translation',
            transliterationEnabled: 'transliteration',
            audioEnabled: 'audio'
        };
        const paramName = paramMap[key];
        if (!paramName) return;
        const paramValue = newVal ? 'on' : 'off';

        const file = this.app.vault.getAbstractFileByPath(st.ctx.sourcePath);
        if (!file) return;
        let content;
        try {
            content = await this.app.vault.read(file);
        } catch (e) {
            return;
        }
        const lines = content.split('\n');

        let searchStart = 0;
        let searchEnd = lines.length;
        try {
            const info = st.ctx.getSectionInfo(container);
            if (info) {
                searchStart = info.lineStart;
                searchEnd = Math.min(info.lineEnd + 1, lines.length);
            }
        } catch (e) {}

        for (let i = searchStart; i < searchEnd; i++) {
            if (lines[i].trim().startsWith('```quran')) {
                for (let j = i + 1; j < searchEnd; j++) {
                    if (lines[j].trim() === '```') break;
                    const regex = new RegExp(`${paramName}="(on|off)"`, 'i');
                    if (regex.test(lines[j])) {
                        lines[j] = lines[j].replace(regex, `${paramName}="${paramValue}"`);
                        await this.app.vault.modify(file, lines.join('\n'));
                        return;
                    }
                }
                lines.splice(i + 1, 0, `${paramName}="${paramValue}"`);
                await this.app.vault.modify(file, lines.join('\n'));
                return;
            }
        }
    }

    async updateSourceRange(container, newRef) {
        const st = container._quranState;
        if (!st || !st.ctx || !st.ctx.sourcePath) return;
        const oldRef = `${st.surah}:${st.startVerse}${st.startVerse !== st.endVerse ? '-' + st.endVerse : ''}`;
        const file = this.app.vault.getAbstractFileByPath(st.ctx.sourcePath);
        if (!file) return;
        let content;
        try {
            content = await this.app.vault.read(file);
        } catch (e) { return; }
        const lines = content.split('\n');
        let searchStart = 0;
        let searchEnd = lines.length;
        try {
            const info = st.ctx.getSectionInfo(container);
            if (info) {
                searchStart = info.lineStart;
                searchEnd = Math.min(info.lineEnd + 1, lines.length);
            }
        } catch (e) {}
        for (let i = searchStart; i < searchEnd; i++) {
            if (lines[i].trim().startsWith('```quran')) {
                for (let j = i + 1; j < searchEnd; j++) {
                    if (lines[j].trim() === '```') break;
                    if (lines[j].trim() === oldRef) {
                        lines[j] = lines[j].replace(oldRef, newRef);
                        await this.app.vault.modify(file, lines.join('\n'));
                        return;
                    }
                }
            }
        }
    }

    async checkForUpdates() {
        try {
            const resp = await requestUrl({
                url: 'https://api.github.com/repos/keemzin/obsidian-tajweed-plugin/releases/latest',
                headers: { 'User-Agent': 'obsidian-tajweed-plugin' }
            });
            const latest = resp.json.tag_name.replace(/^v/, '');
            const current = this.manifest.version;
            if (latest !== current) {
                new Notice(`Quran Tajweed: Update v${latest} available (you have v${current}) — download from GitHub`);
            }
        } catch (e) {
            console.debug('Update check failed (no internet or no releases yet)');
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
                    await this.plugin.rerenderAll();
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
                    await this.plugin.rerenderAll();
                });
            });

        new Setting(containerEl)
            .setName('Default Repeat Count')
            .setDesc('Default number of times to repeat a range during playback.')
            .addDropdown((dropdown) => {
                [5, 10, 15, 20, 25, 30].forEach(n => {
                    dropdown.addOption(String(n), `${n}x`);
                });
                dropdown.setValue(String(this.plugin.settings.defaultRepeatCount));
                dropdown.onChange(async (value) => {
                    this.plugin.settings.defaultRepeatCount = parseInt(value);
                    await this.plugin.saveSettings();
                });
            });

        // Section: Display Settings
        containerEl.createEl('h3', { text: '🎨 Display Settings' });

        new Setting(containerEl)
            .setName('Arabic Font Size')
            .setDesc('Adjust the size of the Arabic Quran text.')
            .addSlider((slider) => {
                slider.setLimits(1.2, 3.0, 0.1);
                slider.setValue(this.plugin.settings.fontSize);
                slider.setDynamicTooltip();
                slider.onChange(async (value) => {
                    this.plugin.settings.fontSize = Math.round(value * 10) / 10;
                    await this.plugin.saveSettings();
                    document.querySelectorAll('.quran-tajweed-container').forEach(c => {
                        c.style.fontSize = `${this.plugin.settings.fontSize}em`;
                    });
                });
            });

        new Setting(containerEl)
            .setName('Translation Font Size')
            .setDesc('Adjust the size of the English translation text.')
            .addSlider((slider) => {
                slider.setLimits(0.5, 1.5, 0.05);
                slider.setValue(this.plugin.settings.translationFontSize);
                slider.setDynamicTooltip();
                slider.onChange(async (value) => {
                    this.plugin.settings.translationFontSize = Math.round(value * 100) / 100;
                    await this.plugin.saveSettings();
                    document.querySelectorAll('.quran-translation').forEach(c => {
                        c.style.fontSize = `${this.plugin.settings.translationFontSize}em`;
                    });
                });
            });

        new Setting(containerEl)
            .setName('Transliteration Font Size')
            .setDesc('Adjust the size of the English transliteration text.')
            .addSlider((slider) => {
                slider.setLimits(0.5, 1.5, 0.05);
                slider.setValue(this.plugin.settings.transliterationFontSize);
                slider.setDynamicTooltip();
                slider.onChange(async (value) => {
                    this.plugin.settings.transliterationFontSize = Math.round(value * 100) / 100;
                    await this.plugin.saveSettings();
                    document.querySelectorAll('.quran-transliteration').forEach(c => {
                        c.style.fontSize = `${this.plugin.settings.transliterationFontSize}em`;
                    });
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
                    document.querySelectorAll('.quran-tajweed-container').forEach(c => {
                        c.style.lineHeight = `${this.plugin.settings.lineSpacing}`;
                    });
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
                    await this.plugin.rerenderAll();
                });
            });

        // Section: Content Settings
        containerEl.createEl('h3', { text: '📖 Content Settings' });

        new Setting(containerEl)
            .setName('Translation Version')
            .setDesc('Choose which English translation to display.')
            .addDropdown((dropdown) => {
                TRANSLATION_VERSIONS.forEach(t => {
                    dropdown.addOption(t.id, t.name);
                });
                dropdown.setValue(this.plugin.settings.translationVersion);
                dropdown.onChange(async (value) => {
                    this.plugin.settings.translationVersion = value;
                    await this.plugin.saveSettings();
                    await this.plugin.rerenderAll();
                });
            });

        new Setting(containerEl)
            .setName('Default Translation')
            .setDesc('Show English translation (Saheeh International) by default.')
            .addToggle((toggle) => {
                toggle.setValue(this.plugin.settings.defaultTranslation);
                toggle.onChange(async (value) => {
                    this.plugin.settings.defaultTranslation = value;
                    await this.plugin.saveSettings();
                    await this.plugin.rerenderAll();
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
                    await this.plugin.rerenderAll();
                });
            });

        new Setting(containerEl)
            .setName('Tafsir Version')
            .setDesc('Choose which tafsir to show when clicking a verse.')
            .addDropdown((dropdown) => {
                TAFSIR_VERSIONS.forEach(t => {
                    dropdown.addOption(t.id, t.name);
                });
                dropdown.setValue(this.plugin.settings.tafsirVersion);
                dropdown.onChange(async (value) => {
                    this.plugin.settings.tafsirVersion = value;
                    await this.plugin.saveSettings();
                });
            });

        // Section: Experimental
        containerEl.createEl('h3', { text: '🧪 Experimental' });

        new Setting(containerEl)
            .setName('QCF V4 Tajweed Font (experimental)')
            .setDesc('Use the official Madani Mushaf V4 font with built-in Tajweed colors. Fetches glyph data from fonts.quran.ws and page fonts from Tarteel CDN. Disables CSS-based Tajweed coloring since colors are in the font.')
            .addToggle((toggle) => {
                toggle.setValue(this.plugin.settings.experimentalV4Tajweed);
                toggle.onChange(async (value) => {
                    this.plugin.settings.experimentalV4Tajweed = value;
                    await this.plugin.saveSettings();
                    await this.plugin.rerenderAll();
                });
            });

        // Section: About
        containerEl.createEl('h3', { text: 'ℹ️ About' });
        const aboutDiv = containerEl.createDiv();
        aboutDiv.style.cssText = 'font-size: 0.85em; color: var(--text-muted); padding: 10px 0;';
        aboutDiv.innerHTML = `
            <p><strong>Quran Tajweed Plugin</strong> v1.2.0</p>
            <p>Display Quranic verses with Tajweed colors using Uthmanic Hafs font.</p>
            <p>Data sources: <a href="https://alquran.cloud" target="_blank">AlQuran.cloud</a> | 
               <a href="https://quran.com" target="_blank">Quran.com API</a> | 
               Audio: <a href="https://quran.com" target="_blank">Quran.com CDN</a></p>
        `;
    }
}
