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

        // Load QPC V4 glyph data from bundled JSON
        this._qpcV4Data = null;
        try {
            const adapter = this.app.vault.adapter;
            const pluginDir = this.getPluginDir();
            const raw = await adapter.read(`${pluginDir}/data/qpc-v4.json`);
            this._qpcV4Data = JSON.parse(raw);
        } catch (e) {
            console.warn('⚠️ Could not load qpc-v4.json:', e);
        }

        this._memCache = {};
        this._v4PageFontsLoaded = new Set();

        // Add settings tab
        this.addSettingTab(new QuranTajweedSettingTab(this.app, this));

        // Register markdown post processor for code blocks with language "quran"
        this.registerMarkdownCodeBlockProcessor('quran', async (source, el, ctx) => {
            const reciter = this.parseReciterFromSource(source);
            const audioEnabled = this.parseAudioFromSource(source);
            const translationEnabled = this.parseTranslationFromSource(source);
            const transliterationEnabled = this.parseTransliterationFromSource(source);
            const label = this.parseLabelFromSource(source);
            const actualSource = this.removeParameters(source);
            await this.renderQuranWithTajweed(actualSource, el, false, reciter, audioEnabled, translationEnabled, transliterationEnabled, ctx, label);
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

        this.registerEvent(this.app.workspace.on('active-leaf-change', () => {
            const existing = document.querySelector('.quran-page-index');
            if (existing?._scrollListeners) {
                existing._scrollListeners.forEach(({ el, fn }) => el.removeEventListener('scroll', fn));
            }
            if (existing?._docListeners) {
                existing._docListeners.forEach(({ type, fn }) => document.removeEventListener(type, fn));
            }
            if (existing) existing.remove();
            setTimeout(() => this.buildIndexFromFile(), 500);
            setTimeout(() => this.buildIndexFromFile(), 1500);
        }));

        this.registerEvent(this.app.workspace.on('layout-change', () => {
            setTimeout(() => this.buildIndexFromFile(), 500);
        }));

        this.registerEvent(this.app.workspace.on('file-open', () => {
            setTimeout(() => this.buildIndexFromFile(), 500);
            setTimeout(() => this.buildIndexFromFile(), 1500);
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

    parseLabelFromSource(source) {
        const match = source.match(/label="([^"]+)"/i);
        return match ? match[1] : null;
    }

    removeParameters(source) {
        return source.replace(/reciter="[^"]+"\s*/g, '')
                    .replace(/audio="(on|off)"\s*/gi, '')
                    .replace(/translation="(on|off)"\s*/gi, '')
                    .replace(/transliteration="(on|off)"\s*/gi, '')
                    .replace(/label="[^"]+"\s*/gi, '')
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

    getPluginDir() {
        return this.manifest.dir || (this.app?.vault?.configDir ? `${this.app.vault.configDir}/plugins/${this.manifest.id}` : `.obsidian/plugins/${this.manifest.id}`);
    }

    async ensureQulV4FontLoaded(page) {
        page = parseInt(page);
        if (!page) return false;
        if (!this._v4PageFontsLoaded) this._v4PageFontsLoaded = new Set();
        if (this._v4PageFontsLoaded.has(page)) return true;

        const family = `qul-v4-p${page}`;
        const remoteUrl = `https://static-cdn.tarteel.ai/qul/fonts/quran_fonts/v4-tajweed/ttf/p${page}.ttf`;

        if (!this._inFlightFontRequests) this._inFlightFontRequests = {};
        if (this._inFlightFontRequests[page]) {
            return await this._inFlightFontRequests[page];
        }

        const task = (async () => {
            const pluginDir = this.getPluginDir();
            const adapter = this.app.vault.adapter;
            const fontRelPath = `${pluginDir}/cache/fonts/p${page}.ttf`;
            let buffer = null;

            try {
                if (await adapter.exists(fontRelPath)) {
                    buffer = await adapter.readBinary(fontRelPath);
                }
            } catch {}

            if (!buffer) {
                try {
                    const res = await fetch(remoteUrl);
                    if (res.ok) {
                        buffer = await res.arrayBuffer();
                        try {
                            const fontsDir = `${pluginDir}/cache/fonts`;
                            const cacheDir = `${pluginDir}/cache`;
                            if (!(await adapter.exists(cacheDir))) await adapter.mkdir(cacheDir);
                            if (!(await adapter.exists(fontsDir))) await adapter.mkdir(fontsDir);
                            await adapter.writeBinary(fontRelPath, buffer);
                        } catch {}
                    }
                } catch {}
            }

            if (buffer) {
                try {
                    const font = new FontFace(family, buffer);
                    await font.load();
                    document.fonts.add(font);
                    this._v4PageFontsLoaded.add(page);
                    return true;
                } catch {}
            }

            try {
                const font = new FontFace(family, `url('${remoteUrl}')`);
                await font.load();
                document.fonts.add(font);
                this._v4PageFontsLoaded.add(page);
                return true;
            } catch {}

            try {
                const style = document.createElement('style');
                style.textContent = `@font-face{font-family:'${family}';src:url('${remoteUrl}') format('truetype');font-display:block}`;
                document.head.appendChild(style);
                await document.fonts.load(`1em '${family}'`).catch(() => {});
                this._v4PageFontsLoaded.add(page);
                return true;
            } catch {}

            return false;
        })();

        this._inFlightFontRequests[page] = task;
        try {
            return await task;
        } finally {
            delete this._inFlightFontRequests[page];
        }
    }

    renderQulV4Verse(textSpan, surah, verse, pageMap) {
        const ayah = verse.numberInSurah;
        let w = 1;
        let rendered = 0;
        const wordNodes = [];

        while (true) {
            const key = `${surah}:${ayah}:${w}`;
            const glyphEntry = this._qpcV4Data[key];
            if (!glyphEntry) break;
            const page = parseInt(pageMap[`${ayah}:${w}`]);
            if (!page) { w++; continue; }

            if (!this._v4PageFontsLoaded?.has(page)) {
                return false;
            }

            const tajweedClass = this.getTajweedClassForWord(verse.text, w);
            const wordSpan = document.createElement('span');
            if (tajweedClass) wordSpan.className = tajweedClass;
            wordSpan.style.fontFamily = `'qul-v4-p${page}', serif`;
            wordSpan.style.unicodeBidi = 'bidi-override';
            wordSpan.textContent = glyphEntry.text;
            wordNodes.push(wordSpan);
            wordNodes.push(document.createTextNode(' '));
            w++;
            rendered++;
        }

        if (rendered > 0) {
            wordNodes.forEach(node => textSpan.appendChild(node));
            return true;
        }
        return false;
    }

    getTajweedClassForWord(verseText, wordPos) {
        const tokens = [];
        const re = /\[([a-z])(?::\d+)?\[([^\]]+)\]/g;
        let last = 0, m;
        while ((m = re.exec(verseText)) !== null) {
            if (m.index > last) tokens.push({ type: 'text', val: verseText.slice(last, m.index) });
            tokens.push({ type: 'tag', rule: m[1] });
            last = re.lastIndex;
        }
        if (last < verseText.length) tokens.push({ type: 'text', val: verseText.slice(last) });

        const words = [];
        let cur = { classes: [], hasText: false };
        for (const tok of tokens) {
            if (tok.type === 'tag') {
                const cls = RULE_MAP[tok.rule];
                if (cls) cur.classes.push(`tajweed-${cls}`);
            } else {
                const parts = tok.val.split(/(\s+)/);
                for (const p of parts) {
                    if (/^\s+$/.test(p)) {
                        words.push(cur);
                        cur = { classes: [], hasText: false };
                    } else if (p) {
                        cur.hasText = true;
                    }
                }
            }
        }
        words.push(cur);
        const filtered = words.filter(w => w.hasText || w.classes.length);
        const entry = filtered[wordPos - 1];
        return entry ? (entry.classes[0] || null) : null;
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

        audio.addEventListener('ended', () => {
            if (!rangeControls || !rangeControls.isPlaying || !verseDiv) return;
            if (rangeControls.isPaused) return;
            this.highlightVerse(verseDiv, false);

            const nextIndex = rangeControls.currentVerseIndex + 1;

            if (nextIndex < rangeControls.verseDivs.length) {
                rangeControls.currentVerseIndex = nextIndex;
                const nextVerseDiv = rangeControls.verseDivs[nextIndex];
                this.highlightVerse(nextVerseDiv, true);
                const nextAudio = nextVerseDiv.querySelector('.quran-audio-player');
                if (!nextAudio) { this.stopRange(rangeControls); return; }
                nextAudio.play().catch(() => this.stopRange(rangeControls));
                this.preloadNextAudio(rangeControls, nextIndex);
                this.updateMiniPlayer(rangeControls);
            } else {
                rangeControls.repeatCount++;
                if (rangeControls.repeatCount < rangeControls.maxRepeats) {
                    rangeControls.currentVerseIndex = 0;
                    this.updateRepeatDisplay(rangeControls);
                    const firstVerseDiv = rangeControls.verseDivs[0];
                    this.highlightVerse(firstVerseDiv, true);
                    const firstAudio = firstVerseDiv.querySelector('.quran-audio-player');
                    if (!firstAudio) { this.stopRange(rangeControls); return; }
                    firstAudio.play().catch(() => this.stopRange(rangeControls));
                    this.preloadNextAudio(rangeControls, 0);
                    this.updateMiniPlayer(rangeControls);
                } else {
                    rangeControls.isPlaying = false;
                    this.updatePlayButton(rangeControls);
                    this.hideMiniPlayer();
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
        controls.isPaused = false;
        controls.currentVerseIndex = 0;
        controls.repeatCount = 0;
        this.updatePlayButton(controls);
        this.updateRepeatDisplay(controls);

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
        this.updateMiniPlayer(controls);
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
        controls.isPaused = false;
        if (this.currentPlaying === controls) {
            this.currentPlaying = null;
        }
        this.updatePlayButton(controls);

        const container = controls.playButton.closest('.quran-tajweed-container');
        container.querySelectorAll('.quran-audio-player').forEach(a => {
            a.pause();
            a.currentTime = 0;
        });
        container.querySelectorAll('.quran-verse').forEach(div => this.highlightVerse(div, false));
        this.hideMiniPlayer();
    }

    pauseRange(controls) {
        if (!controls.isPlaying || controls.isPaused) return;
        controls.isPaused = true;
        const verseDiv = controls.verseDivs[controls.currentVerseIndex];
        if (verseDiv) {
            const audio = verseDiv.querySelector('.quran-audio-player');
            if (audio) audio.pause();
        }
        this.updateMiniPlayer(controls);
    }

    resumeRange(controls) {
        if (!controls.isPlaying || !controls.isPaused) return;
        controls.isPaused = false;
        const verseDiv = controls.verseDivs[controls.currentVerseIndex];
        if (verseDiv) {
            const audio = verseDiv.querySelector('.quran-audio-player');
            if (audio) audio.play().catch(() => {});
        }
        this.updateMiniPlayer(controls);
    }

    prevVerse(controls) {
        if (!controls.isPlaying) return;
        const currentVerseDiv = controls.verseDivs[controls.currentVerseIndex];
        if (currentVerseDiv) {
            const audio = currentVerseDiv.querySelector('.quran-audio-player');
            if (audio) { audio.pause(); audio.currentTime = 0; }
            this.highlightVerse(currentVerseDiv, false);
        }
        const prevIndex = Math.max(0, controls.currentVerseIndex - 1);
        controls.currentVerseIndex = prevIndex;
        controls.isPaused = false;
        const prevVerseDiv = controls.verseDivs[prevIndex];
        if (prevVerseDiv) {
            this.highlightVerse(prevVerseDiv, true);
            const audio = prevVerseDiv.querySelector('.quran-audio-player');
            if (audio) audio.play().catch(() => {});
        }
        this.updateMiniPlayer(controls);
    }

    nextVerse(controls) {
        if (!controls.isPlaying) return;
        const currentVerseDiv = controls.verseDivs[controls.currentVerseIndex];
        if (currentVerseDiv) {
            const audio = currentVerseDiv.querySelector('.quran-audio-player');
            if (audio) { audio.pause(); audio.currentTime = 0; }
            this.highlightVerse(currentVerseDiv, false);
        }
        const nextIndex = controls.currentVerseIndex + 1;
        if (nextIndex >= controls.verseDivs.length) {
            this.stopRange(controls);
            return;
        }
        controls.currentVerseIndex = nextIndex;
        controls.isPaused = false;
        const nextVerseDiv = controls.verseDivs[nextIndex];
        if (nextVerseDiv) {
            this.highlightVerse(nextVerseDiv, true);
            const audio = nextVerseDiv.querySelector('.quran-audio-player');
            if (audio) audio.play().catch(() => {});
            this.preloadNextAudio(controls, nextIndex);
        }
        this.updateMiniPlayer(controls);
    }

    updateMiniPlayer(controls) {
        let bar = document.getElementById('quran-mini-player');
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'quran-mini-player';
            bar.className = 'quran-mini-player';
            document.body.appendChild(bar);

            const savedX = localStorage.getItem('quran-mini-x');
            const savedY = localStorage.getItem('quran-mini-y');
            if (savedX && savedY) {
                const x = Math.max(0, Math.min(parseInt(savedX, 10), window.innerWidth - 220));
                const y = Math.max(0, Math.min(parseInt(savedY, 10), window.innerHeight - 50));
                bar.style.left = `${x}px`;
                bar.style.top = `${y}px`;
                bar.style.right = 'auto';
                bar.style.bottom = 'auto';
            }

            let dragging = false;
            let startX = 0;
            let startY = 0;

            bar.addEventListener('pointerdown', (e) => {
                if (e.target.closest('button')) return;
                dragging = true;
                e.preventDefault();
                const rect = bar.getBoundingClientRect();
                startX = e.clientX - rect.left;
                startY = e.clientY - rect.top;
                bar.classList.add('quran-mini-dragging');

                const onMove = (moveEv) => {
                    if (!dragging) return;
                    const x = moveEv.clientX - startX;
                    const y = moveEv.clientY - startY;
                    const maxX = window.innerWidth - bar.offsetWidth;
                    const maxY = window.innerHeight - bar.offsetHeight;
                    const clampedX = Math.max(0, Math.min(x, maxX));
                    const clampedY = Math.max(0, Math.min(y, maxY));
                    bar.style.left = `${clampedX}px`;
                    bar.style.top = `${clampedY}px`;
                    bar.style.right = 'auto';
                    bar.style.bottom = 'auto';
                    localStorage.setItem('quran-mini-x', `${clampedX}`);
                    localStorage.setItem('quran-mini-y', `${clampedY}`);
                };

                const onUp = () => {
                    dragging = false;
                    bar.classList.remove('quran-mini-dragging');
                    window.removeEventListener('pointermove', onMove);
                    window.removeEventListener('pointerup', onUp);
                    window.removeEventListener('pointercancel', onUp);
                };

                window.addEventListener('pointermove', onMove);
                window.addEventListener('pointerup', onUp);
                window.addEventListener('pointercancel', onUp);
            });
        }

        const surahName = SURAHS.find(s => s.number === controls.surah)?.name || `Surah ${controls.surah}`;
        const verseNum = controls.verseDivs[controls.currentVerseIndex]?.dataset.verseNumber || '';
        const totalVerses = controls.verseDivs.length;
        const curIdx = controls.currentVerseIndex;

        bar.innerHTML = '';

        const grip = document.createElement('span');
        grip.className = 'quran-mini-grip';
        grip.innerHTML = '<svg viewBox="0 0 10 16" width="8" height="13" fill="currentColor"><circle cx="2" cy="2" r="1.5"/><circle cx="8" cy="2" r="1.5"/><circle cx="2" cy="8" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="2" cy="14" r="1.5"/><circle cx="8" cy="14" r="1.5"/></svg>';

        const info = document.createElement('div');
        info.className = 'quran-mini-info';
        info.innerHTML = `<span class="quran-mini-surah">${surahName}</span><span class="quran-mini-verse">${verseNum} <span class="quran-mini-pos">(${curIdx + 1}/${totalVerses})</span></span>`;

        const btns = document.createElement('div');
        btns.className = 'quran-mini-btns';

        const prevBtn = document.createElement('button');
        prevBtn.className = 'quran-mini-btn';
        prevBtn.title = 'Previous verse';
        prevBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="19,5 9,12 19,19"/><rect x="5" y="5" width="3" height="14"/></svg>';
        prevBtn.disabled = curIdx === 0;
        prevBtn.onclick = () => this.prevVerse(controls);

        const pauseBtn = document.createElement('button');
        pauseBtn.className = 'quran-mini-btn quran-mini-playpause';
        pauseBtn.title = controls.isPaused ? 'Resume' : 'Pause';
        pauseBtn.innerHTML = controls.isPaused
            ? '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>'
            : '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
        pauseBtn.onclick = () => {
            if (controls.isPaused) this.resumeRange(controls);
            else this.pauseRange(controls);
        };

        const nextBtn = document.createElement('button');
        nextBtn.className = 'quran-mini-btn';
        nextBtn.title = 'Next verse';
        nextBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,5 15,12 5,19"/><rect x="16" y="5" width="3" height="14"/></svg>';
        nextBtn.disabled = curIdx >= totalVerses - 1;
        nextBtn.onclick = () => this.nextVerse(controls);

        const stopBtn = document.createElement('button');
        stopBtn.className = 'quran-mini-btn quran-mini-stop';
        stopBtn.title = 'Stop';
        stopBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12"/></svg>';
        stopBtn.onclick = () => this.stopRange(controls);

        btns.appendChild(prevBtn);
        btns.appendChild(pauseBtn);
        btns.appendChild(nextBtn);
        btns.appendChild(stopBtn);

        bar.appendChild(grip);
        bar.appendChild(info);
        bar.appendChild(btns);
        bar.style.display = 'flex';
    }

    hideMiniPlayer() {
        const bar = document.getElementById('quran-mini-player');
        if (bar) bar.style.display = 'none';
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
        } catch {}
    }

    async getDiskCache(key) {
        if (this._memCache && this._memCache[key]) {
            return this._memCache[key];
        }
        try {
            const adapter = this.app.vault.adapter;
            const pluginDir = this.getPluginDir();
            const path = `${pluginDir}/cache/${key}.json`;
            if (await adapter.exists(path)) {
                const raw = await adapter.read(path);
                const data = JSON.parse(raw);
                if (this._memCache) this._memCache[key] = data;
                return data;
            }
        } catch {}
        return this.getCache(key);
    }

    async setDiskCache(key, data) {
        if (!this._memCache) this._memCache = {};
        this._memCache[key] = data;
        try {
            const adapter = this.app.vault.adapter;
            const pluginDir = this.getPluginDir();
            const dir = `${pluginDir}/cache`;
            if (!(await adapter.exists(dir))) {
                await adapter.mkdir(dir);
            }
            await adapter.write(`${dir}/${key}.json`, JSON.stringify(data));
        } catch {
            this.setCache(key, data);
        }
    }

    async getBundledTajweedSurah(surahNumber) {
        if (!this._bundledTajweed) {
            try {
                const adapter = this.app.vault.adapter;
                const pluginDir = this.getPluginDir();
                const path = `${pluginDir}/data/quran-tajweed.json`;
                if (await adapter.exists(path)) {
                    const raw = await adapter.read(path);
                    this._bundledTajweed = JSON.parse(raw);
                }
            } catch {}
        }
        if (this._bundledTajweed?.data?.surahs) {
            const s = this._bundledTajweed.data.surahs.find(x => x.number === surahNumber);
            if (s) {
                return {
                    arabicData: {
                        data: {
                            ayahs: s.ayahs
                        }
                    },
                    transliterationFetchData: null
                };
            }
        }
        return null;
    }

    async getBundledTranslationSurah(surahNumber) {
        if (!this._bundledSahihTrans) {
            try {
                const adapter = this.app.vault.adapter;
                const pluginDir = this.getPluginDir();
                const path = `${pluginDir}/data/translation-en-sahih.json`;
                if (await adapter.exists(path)) {
                    const raw = await adapter.read(path);
                    this._bundledSahihTrans = JSON.parse(raw);
                }
            } catch {}
        }
        if (this._bundledSahihTrans?.data?.surahs) {
            const s = this._bundledSahihTrans.data.surahs.find(x => x.number === surahNumber);
            if (s) {
                return {
                    translationData: {
                        data: {
                            ayahs: s.ayahs
                        }
                    }
                };
            }
        }
        return null;
    }

    async ensureSurahData(surah, transInfo) {
        if (!this._inFlightRequests) this._inFlightRequests = {};
        const flightKey = `surah-${surah}-${transInfo.source}-${transInfo.id}`;
        if (this._inFlightRequests[flightKey]) {
            return await this._inFlightRequests[flightKey];
        }

        const task = (async () => {
            if (this.settings.experimentalV4Tajweed && !this._qpcV4Data) {
                try {
                    const adapter = this.app.vault.adapter;
                    const pluginDir = this.getPluginDir();
                    const raw = await adapter.read(`${pluginDir}/data/qpc-v4.json`);
                    this._qpcV4Data = JSON.parse(raw);
                } catch {}
            }

            const arabicCacheKey = `quran-surah-${surah}`;
            const pageMapCacheKey = `quran-surah-${surah}-page-map`;
            const transCacheKey = `quran-surah-${surah}-trans-${transInfo.source}-${transInfo.id}`;

            let arabicCached = await this.getDiskCache(arabicCacheKey);
            if (!arabicCached || !arabicCached.transliterationFetchData) {
                try {
                    const fetches = [
                        !arabicCached ? this.fetchJson(`https://api.alquran.cloud/v1/surah/${surah}/quran-tajweed`) : Promise.resolve(arabicCached.arabicData),
                        this.fetchJson(`https://api.alquran.cloud/v1/surah/${surah}/en.transliteration`).catch(() => null)
                    ];
                    const [arabicData, transliterationFetchData] = await Promise.all(fetches);
                    if (arabicData) {
                        arabicCached = {
                            arabicData,
                            transliterationFetchData: transliterationFetchData || arabicCached?.transliterationFetchData || null
                        };
                        await this.setDiskCache(arabicCacheKey, arabicCached);
                    }
                } catch {}
            }

            if (!arabicCached) {
                arabicCached = await this.getBundledTajweedSurah(surah);
                if (arabicCached) {
                    await this.setDiskCache(arabicCacheKey, arabicCached);
                }
            }

            let pageMapCached = null;
            if (this.settings.experimentalV4Tajweed) {
                pageMapCached = await this.getDiskCache(pageMapCacheKey);
                if (!pageMapCached) {
                    try {
                        const pageMapData = await this.fetchJson(`https://api.qurancdn.com/api/qdc/verses/by_chapter/${surah}?words=true&word_fields=page_number&per_page=300`);
                        if (pageMapData?.verses) {
                            const map = {};
                            for (const verse of pageMapData.verses) {
                                for (const word of (verse.words || [])) {
                                    map[`${verse.verse_number}:${word.position}`] = word.page_number;
                                }
                            }
                            pageMapCached = { map };
                            await this.setDiskCache(pageMapCacheKey, pageMapCached);
                        }
                    } catch {}

                    if (!pageMapCached && arabicCached?.arabicData?.data?.ayahs) {
                        const map = {};
                        for (const ayah of arabicCached.arabicData.data.ayahs) {
                            const a = ayah.numberInSurah;
                            const pg = ayah.page || 1;
                            let w = 1;
                            while (this._qpcV4Data && this._qpcV4Data[`${surah}:${a}:${w}`]) {
                                map[`${a}:${w}`] = pg;
                                w++;
                            }
                        }
                        pageMapCached = { map };
                        await this.setDiskCache(pageMapCacheKey, pageMapCached);
                    }
                }
            }

            let transCached = await this.getDiskCache(transCacheKey);
            if (!transCached) {
                if (transInfo.id === 'en.sahih') {
                    transCached = await this.getBundledTranslationSurah(surah);
                    if (transCached) {
                        await this.setDiskCache(transCacheKey, transCached);
                    }
                }
                if (!transCached) {
                    try {
                        let data = null;
                        if (transInfo.source === 'quran-com') {
                            data = await this.fetchJson(`https://api.quran.com/api/v4/verses/by_chapter/${surah}?translations=${transInfo.apiId}&per_page=300`);
                        } else if (transInfo.source === 'fawazahmed') {
                            data = await this.fetchJson(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/${transInfo.apiId}/${surah}.json`);
                        } else {
                            data = await this.fetchJson(`https://api.alquran.cloud/v1/surah/${surah}/${transInfo.apiId}`);
                        }
                        transCached = { translationData: data };
                    } catch {
                        transCached = { translationData: null };
                    }
                    if (transCached?.translationData) {
                        await this.setDiskCache(transCacheKey, transCached);
                    }
                }
            }

            return { arabicCached, pageMapCached, transCached };
        })();

        this._inFlightRequests[flightKey] = task;
        try {
            return await task;
        } finally {
            delete this._inFlightRequests[flightKey];
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

    async renderQuranWithTajweed(source, el, isInlineWord = false, reciter = DEFAULT_RECITER, audioEnabled = false, translationEnabled = false, transliterationEnabled = false, ctx = null, customLabel = null) {
        // For inline words, use simpler styling
        if (isInlineWord) {
            const wordSpan = el.createSpan({ cls: 'quran-word-inline' });
            wordSpan.innerHTML = this.parseTajweed(source.trim());
            return;
        }

        const container = el.createDiv({ cls: 'quran-tajweed-container' });
        container.style.fontSize = `${this.settings.fontSize}em`;
        container.style.lineHeight = `${this.settings.lineSpacing}`;
        if (this.settings.experimentalV4Tajweed) {
            container.classList.add('quran-v4-mode');
        }

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
                await this.updateSourceRange(container, newRef);
                el.innerHTML = '';
                await this.renderQuranWithTajweed(newRef, el, false, st.reciter || reciter, st.audioEnabled !== undefined ? st.audioEnabled : audioEnabled, st.translationEnabled !== undefined ? st.translationEnabled : translationEnabled, st.transliterationEnabled !== undefined ? st.transliterationEnabled : transliterationEnabled, st.ctx, st.customLabel);
            };

            fromSelect.onchange = async () => {
                const f = parseInt(fromSelect.value);
                const t = Math.max(f, parseInt(toSelect.value));
                toSelect.value = t;
                updateVerseOptions(f);
                const st = container._quranState || {};
                const newRef = `${surah}:${f}-${t}`;
                await this.updateSourceRange(container, newRef);
                el.innerHTML = '';
                await this.renderQuranWithTajweed(newRef, el, false, st.reciter || reciter, st.audioEnabled !== undefined ? st.audioEnabled : audioEnabled, st.translationEnabled !== undefined ? st.translationEnabled : translationEnabled, st.transliterationEnabled !== undefined ? st.transliterationEnabled : transliterationEnabled, st.ctx, st.customLabel);
            };

            toSelect.onchange = async () => {
                const f = parseInt(fromSelect.value);
                const t = Math.max(f, parseInt(toSelect.value));
                toSelect.value = t;
                const st = container._quranState || {};
                const newRef = `${surah}:${f}-${t}`;
                await this.updateSourceRange(container, newRef);
                el.innerHTML = '';
                await this.renderQuranWithTajweed(newRef, el, false, st.reciter || reciter, st.audioEnabled !== undefined ? st.audioEnabled : audioEnabled, st.translationEnabled !== undefined ? st.translationEnabled : translationEnabled, st.transliterationEnabled !== undefined ? st.transliterationEnabled : transliterationEnabled, st.ctx, st.customLabel);
            };

            const transInfo = TRANSLATION_VERSIONS.find(t => t.id === this.settings.translationVersion) || TRANSLATION_VERSIONS[0];
            const arabicCacheKey = `quran-surah-${surah}`;
            const hasCached = (this._memCache && this._memCache[arabicCacheKey]);

            let loading = null;
            if (!hasCached) {
                loading = container.createDiv({ cls: 'quran-loading' });
                loading.textContent = 'Loading verses...';
            }

            const { arabicCached, pageMapCached, transCached } = await this.ensureSurahData(surah, transInfo);

            if (loading) {
                loading.remove();
            }

            if (!arabicCached) {
                const errorDiv = container.createDiv({ cls: 'quran-error' });
                errorDiv.textContent = 'Failed to load verses. Please check your internet connection.';
                return;
            }

            const { arabicData, transliterationFetchData } = arabicCached;
            const translationFetchData = transCached?.translationData || null;

            const arabicVerses = arabicData.data.ayahs.slice(startVerse - 1, endVerse);
            const translationVerses = [];
            if (translationFetchData) {
                if (translationFetchData.verses) {
                    const allVerses = translationFetchData.verses;
                    const sliced = allVerses.slice(startVerse - 1, endVerse);
                    sliced.forEach(v => {
                        const t = v.translations?.[0];
                        translationVerses.push({ text: t?.text || '' });
                    });
                } else if (translationFetchData.chapter) {
                    const allVerses = translationFetchData.chapter;
                    const sliced = allVerses.slice(startVerse - 1, endVerse);
                    sliced.forEach(v => {
                        translationVerses.push({ text: v.text || '' });
                    });
                } else if (translationFetchData.data?.ayahs) {
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
                el,
                customLabel,
            };
            container._quranState = state;

            let pageMap = (this.settings.experimentalV4Tajweed && pageMapCached) ? pageMapCached.map : null;

            if (this.settings.experimentalV4Tajweed && !this._qpcV4Data) {
                try {
                    const adapter = this.app.vault.adapter;
                    const pluginDir = this.getPluginDir();
                    const raw = await adapter.read(`${pluginDir}/data/qpc-v4.json`);
                    this._qpcV4Data = JSON.parse(raw);
                } catch {}
            }

            if (this.settings.experimentalV4Tajweed && pageMap && this._qpcV4Data) {
                const allPages = new Set();
                for (const verse of arabicVerses) {
                    const a = verse.numberInSurah;
                    let w = 1;
                    while (this._qpcV4Data[`${surah}:${a}:${w}`]) {
                        const pg = parseInt(pageMap[`${a}:${w}`]);
                        if (pg) allPages.add(pg);
                        w++;
                    }
                }
                await Promise.all([...allPages].map(p => this.ensureQulV4FontLoaded(p).catch(() => {})));
            }

            for (let i = 0; i < arabicVerses.length; i++) {
                const verse = arabicVerses[i];
                const verseDiv = container.createDiv({ cls: 'quran-verse' });
                verseDiv.dataset.verseNumber = verse.numberInSurah;

                const textContainer = verseDiv.createDiv({ cls: 'quran-text-container' });

                const textSpan = textContainer.createSpan({ cls: 'quran-verse-text' });
                let rendered = false;
                if (this.settings.experimentalV4Tajweed && pageMap && this._qpcV4Data) {
                    rendered = this.renderQulV4Verse(textSpan, surah, verse, pageMap);
                }
                if (!rendered) {
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

            const surahName = SURAHS.find(s => s.number === surah)?.name || `Surah ${surah}`;
            container.dataset.quranRef = `${surah}:${startVerse}-${endVerse}`;
            container.dataset.quranLabel = customLabel || surahName;
            container.dataset.quranVerses = `${startVerse}–${endVerse}`;
            clearTimeout(this._indexBuildTimer);
            this._indexBuildTimer = setTimeout(() => this.buildIndexFromFile(), 600);
        } else {
            // It's raw text with Tajweed notation, just parse and display
            const verseDiv = container.createDiv({ cls: 'quran-verse' });
            verseDiv.innerHTML = this.parseTajweed(source);
        }
    }

    rebuildIndexFromDOM() {
        this.buildIndexFromFile();
    }

    async buildIndexFromFile() {
        const { MarkdownView } = require('obsidian');
        const view = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (!view) return;

        const file = view.file;
        if (!file) return;

        let content;
        try {
            content = await this.app.vault.read(file);
        } catch (e) { return; }

        const blocks = [];
        const lines = content.split('\n');
        let inBlock = false;
        let blockLines = [];

        for (const line of lines) {
            if (!inBlock && line.trim().startsWith('```quran')) {
                inBlock = true;
                blockLines = [];
            } else if (inBlock && line.trim() === '```') {
                inBlock = false;
                const src = blockLines.join('\n');
                const ref = this.extractVerseReference(this.removeParameters(src));
                if (ref) {
                    const surahName = SURAHS.find(s => s.number === ref.surah)?.name || `Surah ${ref.surah}`;
                    const customLabel = this.parseLabelFromSource(src);
                    blocks.push({
                        label: customLabel || surahName,
                        verses: `${ref.startVerse}–${ref.endVerse}`,
                        ref: `${ref.surah}:${ref.startVerse}-${ref.endVerse}`
                    });
                }
            } else if (inBlock) {
                blockLines.push(line);
            }
        }

        this.renderIndexFromBlocks(blocks);
    }

    renderIndexFromBlocks(blocks) {
        const existing = document.querySelector('.quran-page-index');
        if (existing?._scrollListeners) {
            existing._scrollListeners.forEach(({ el, fn }) => el.removeEventListener('scroll', fn));
        }
        if (existing?._docListeners) {
            existing._docListeners.forEach(({ type, fn }) => document.removeEventListener(type, fn));
        }

        if (blocks.length < 1) {
            if (existing) existing.remove();
            return;
        }

        let index = existing || document.createElement('div');
        if (!existing) {
            index.className = 'quran-page-index';
            document.body.appendChild(index);
        }

        const savedSide = localStorage.getItem('quran-index-dock-side') || 'right';
        const savedTop = localStorage.getItem('quran-index-dock-top');
        if (savedSide === 'left') {
            index.classList.add('quran-dock-left');
            index.classList.remove('quran-dock-right');
            index.style.left = '14px';
            index.style.right = 'auto';
        } else {
            index.classList.add('quran-dock-right');
            index.classList.remove('quran-dock-left');
            index.style.left = 'auto';
            index.style.right = '14px';
        }
        if (savedTop) {
            const clamped = Math.max(140, Math.min(window.innerHeight - 140, parseInt(savedTop, 10)));
            index.style.top = `${clamped}px`;
            index.style.transform = 'none';
        } else {
            index.style.top = '50%';
            index.style.transform = 'translateY(-50%)';
        }

        index._blocks = blocks;
        index._activeIdx = 0;
        index._scrollListeners = [];
        index._docListeners = [];
        index.innerHTML = '';

        const itemHeight = 42;
        const wheelHeight = 210;
        const halfH = wheelHeight / 2;
        const padY = (wheelHeight - itemHeight) / 2;

        const pill = document.createElement('div');
        pill.className = 'quran-index-pill';

        const pillDots = document.createElement('div');
        pillDots.className = 'quran-index-pill-dots';
        const numPillDots = Math.min(blocks.length, 5);
        const pillDotElements = [];
        for (let i = 0; i < numPillDots; i++) {
            const d = document.createElement('span');
            d.className = 'quran-index-pill-dot';
            pillDots.appendChild(d);
            pillDotElements.push(d);
        }
        pill.appendChild(pillDots);

        let draggingPill = false;
        let startClientX = 0;
        let startClientY = 0;
        let startLeft = 0;
        let startTop = 0;
        let didMovePill = false;

        pill.addEventListener('pointerdown', (e) => {
            draggingPill = true;
            didMovePill = false;
            e.preventDefault();
            startClientX = e.clientX;
            startClientY = e.clientY;
            const rect = index.getBoundingClientRect();
            startLeft = rect.left;
            startTop = rect.top;
            index.style.transition = 'none';
            pill.classList.add('quran-dragging');

            const onPillMove = (moveEv) => {
                if (!draggingPill) return;
                const dx = moveEv.clientX - startClientX;
                const dy = moveEv.clientY - startClientY;
                if (Math.hypot(dx, dy) > 4) didMovePill = true;
                const curX = Math.max(10, Math.min(window.innerWidth - index.offsetWidth - 10, startLeft + dx));
                const curY = Math.max(40, Math.min(window.innerHeight - index.offsetHeight - 40, startTop + dy));
                index.style.left = `${curX}px`;
                index.style.right = 'auto';
                index.style.top = `${curY}px`;
                index.style.transform = 'none';
            };

            const finishPillDrag = () => {
                if (!draggingPill) return;
                draggingPill = false;
                pill.classList.remove('quran-dragging');
                window.removeEventListener('pointermove', onPillMove);
                window.removeEventListener('pointerup', finishPillDrag);
                window.removeEventListener('pointercancel', finishPillDrag);

                if (!didMovePill) {
                    index.classList.toggle('quran-index-open');
                    if (index.classList.contains('quran-index-open')) {
                        wheelScroll.scrollTo({ top: index._activeIdx * itemHeight, behavior: 'instant' });
                        updateWheelVisuals(index._activeIdx);
                    }
                } else {
                    const rect = index.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const snapToLeft = centerX < window.innerWidth / 2;
                    index.style.transition = 'left 0.28s cubic-bezier(0.16, 1, 0.3, 1), right 0.28s cubic-bezier(0.16, 1, 0.3, 1)';
                    if (snapToLeft) {
                        index.classList.add('quran-dock-left');
                        index.classList.remove('quran-dock-right');
                        index.style.left = '14px';
                        index.style.right = 'auto';
                        localStorage.setItem('quran-index-dock-side', 'left');
                    } else {
                        index.classList.add('quran-dock-right');
                        index.classList.remove('quran-dock-left');
                        index.style.left = 'auto';
                        index.style.right = '14px';
                        localStorage.setItem('quran-index-dock-side', 'right');
                    }
                    const clampedY = Math.max(140, Math.min(window.innerHeight - 140, rect.top));
                    index.style.top = `${clampedY}px`;
                    localStorage.setItem('quran-index-dock-top', `${clampedY}`);
                    setTimeout(() => { index.style.transition = ''; }, 300);
                }
            };

            window.addEventListener('pointermove', onPillMove);
            window.addEventListener('pointerup', finishPillDrag);
            window.addEventListener('pointercancel', finishPillDrag);
        });

        const panel = document.createElement('div');
        panel.className = 'quran-index-panel';

        const header = document.createElement('div');
        header.className = 'quran-index-header';

        const title = document.createElement('span');
        title.className = 'quran-index-title';
        title.textContent = 'Quran Verses';

        const counter = document.createElement('span');
        counter.className = 'quran-index-counter';
        counter.textContent = `1/${blocks.length}`;

        const closeBtn = document.createElement('button');
        closeBtn.className = 'quran-index-close';
        closeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
        closeBtn.onclick = (e) => {
            e.stopPropagation();
            index.classList.remove('quran-index-open');
        };

        header.appendChild(title);
        header.appendChild(counter);
        header.appendChild(closeBtn);
        panel.appendChild(header);

        const viewport = document.createElement('div');
        viewport.className = 'quran-wheel-viewport';

        const lens = document.createElement('div');
        lens.className = 'quran-wheel-lens';
        viewport.appendChild(lens);

        const wheelScroll = document.createElement('div');
        wheelScroll.className = 'quran-wheel-scroll';
        wheelScroll.style.padding = `${padY}px 0`;

        const itemElements = [];
        blocks.forEach((b, idx) => {
            const item = document.createElement('div');
            item.className = 'quran-wheel-item';

            const dot = document.createElement('span');
            dot.className = 'quran-wheel-dot';

            const text = document.createElement('div');
            text.className = 'quran-wheel-text';

            const label = document.createElement('span');
            label.className = 'quran-wheel-label';
            label.textContent = b.label;

            const verses = document.createElement('span');
            verses.className = 'quran-wheel-verses';
            verses.textContent = b.verses;

            text.appendChild(label);
            text.appendChild(verses);
            item.appendChild(dot);
            item.appendChild(text);

            item.addEventListener('click', (e) => {
                e.stopPropagation();
                selectIndex(idx, true);
            });

            wheelScroll.appendChild(item);
            itemElements.push(item);
        });

        viewport.appendChild(wheelScroll);
        panel.appendChild(viewport);

        index.appendChild(pill);
        index.appendChild(panel);

        const getContainers = () =>
            Array.from(document.querySelectorAll('.quran-tajweed-container[data-quran-ref]'));

        const navigateToBlock = (b, idx) => {
            index._scrollLocked = true;
            clearTimeout(index._scrollLockTimer);

            const containers = getContainers();
            const target = containers.find(c => c.dataset.quranRef === b.ref);

            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                target.classList.add('quran-block-flash');
                setTimeout(() => target.classList.remove('quran-block-flash'), 800);
                index._scrollLockTimer = setTimeout(() => { index._scrollLocked = false; }, 1200);
            } else {
                const scrollEl = document.querySelector('.markdown-preview-view')
                    || document.querySelector('.view-content')
                    || document.documentElement;

                const getScrollTop = () => scrollEl === document.documentElement
                    ? window.scrollY
                    : scrollEl.scrollTop;

                const scrollTo = (top) => {
                    if (scrollEl === document.documentElement) {
                        window.scrollTo({ top, behavior: 'instant' });
                    } else {
                        scrollEl.scrollTop = top;
                    }
                };

                const targetIdx = idx;
                const targetRef = b.ref;
                let attempts = 0;
                const maxAttempts = 40;

                const poll = () => {
                    attempts++;
                    if (attempts > maxAttempts) {
                        index._scrollLocked = false;
                        return;
                    }

                    const found = getContainers().find(c => c.dataset.quranRef === targetRef);
                    if (found) {
                        found.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        found.classList.add('quran-block-flash');
                        setTimeout(() => found.classList.remove('quran-block-flash'), 800);
                        index._scrollLockTimer = setTimeout(() => { index._scrollLocked = false; }, 1000);
                        return;
                    }

                    const current = getContainers();
                    if (current.length === 0) {
                        scrollTo(targetIdx === 0 ? 0 : getScrollTop() + window.innerHeight * 2);
                        setTimeout(poll, 150);
                        return;
                    }

                    const nearest = current
                        .map(c => ({ c, fi: blocks.findIndex(b => b.ref === c.dataset.quranRef) }))
                        .filter(x => x.fi >= 0)
                        .sort((a, b) => Math.abs(a.fi - targetIdx) - Math.abs(b.fi - targetIdx))[0];

                    if (!nearest) {
                        setTimeout(poll, 150);
                        return;
                    }

                    const direction = targetIdx > nearest.fi ? 1 : -1;
                    const step = window.innerHeight * 0.9;
                    const newTop = getScrollTop() + direction * step;
                    scrollTo(newTop);
                    setTimeout(poll, 150);
                };

                poll();
            }
        };

        const updateWheelVisuals = (activeIdx) => {
            const currentScroll = wheelScroll.scrollTop;
            itemElements.forEach((el, i) => {
                const itemCenter = padY + i * itemHeight + itemHeight / 2 - currentScroll;
                const dist = (itemCenter - halfH) / itemHeight;
                const absDist = Math.abs(dist);
                const angle = Math.max(-75, Math.min(75, -dist * 22));
                const scale = Math.max(0.72, 1 - absDist * 0.08);
                const opacity = Math.max(0.12, 1 - absDist * 0.32);
                const tz = -absDist * 14;

                el.style.transform = `perspective(500px) rotateX(${angle}deg) scale(${scale}) translateZ(${tz}px)`;
                el.style.opacity = `${opacity}`;

                if (i === activeIdx) {
                    el.classList.add('quran-wheel-active');
                } else {
                    el.classList.remove('quran-wheel-active');
                }
            });

            counter.textContent = `${activeIdx + 1}/${blocks.length}`;

            if (pillDotElements.length > 0) {
                const activeDotIdx = pillDotElements.length === 1
                    ? 0
                    : Math.round((activeIdx / Math.max(1, blocks.length - 1)) * (pillDotElements.length - 1));
                pillDotElements.forEach((dot, dIdx) => {
                    if (dIdx === activeDotIdx) dot.classList.add('quran-dot-active');
                    else dot.classList.remove('quran-dot-active');
                });
            }
        };

        const selectIndex = (idx, scrollToNote = false) => {
            const clamped = Math.max(0, Math.min(blocks.length - 1, idx));
            index._activeIdx = clamped;
            wheelScroll.scrollTo({ top: clamped * itemHeight, behavior: 'smooth' });
            updateWheelVisuals(clamped);
            if (scrollToNote) {
                navigateToBlock(blocks[clamped], clamped);
            }
        };

        let isWheelUserScrolling = false;
        let wheelScrollTimer = null;
        let rAF = null;

        wheelScroll.addEventListener('scroll', () => {
            if (rAF) cancelAnimationFrame(rAF);
            rAF = requestAnimationFrame(() => {
                const currentIdx = Math.max(0, Math.min(blocks.length - 1, Math.round(wheelScroll.scrollTop / itemHeight)));
                updateWheelVisuals(currentIdx);
            });

            isWheelUserScrolling = true;
            clearTimeout(wheelScrollTimer);
            wheelScrollTimer = setTimeout(() => {
                isWheelUserScrolling = false;
                const snappedIdx = Math.max(0, Math.min(blocks.length - 1, Math.round(wheelScroll.scrollTop / itemHeight)));
                if (snappedIdx !== index._activeIdx) {
                    index._activeIdx = snappedIdx;
                    updateWheelVisuals(snappedIdx);
                    navigateToBlock(blocks[snappedIdx], snappedIdx);
                }
            }, 180);
        }, { passive: true });

        let isWheelDragging = false;
        let wheelDragStartY = 0;
        let wheelDragStartScroll = 0;

        wheelScroll.addEventListener('pointerdown', (e) => {
            if (e.target.closest('.quran-wheel-item')) return;
            isWheelDragging = true;
            wheelDragStartY = e.clientY;
            wheelDragStartScroll = wheelScroll.scrollTop;
            wheelScroll.setPointerCapture(e.pointerId);
            wheelScroll.classList.add('quran-wheel-grabbing');
        });

        wheelScroll.addEventListener('pointermove', (e) => {
            if (!isWheelDragging) return;
            const deltaY = e.clientY - wheelDragStartY;
            wheelScroll.scrollTop = wheelDragStartScroll - deltaY;
        });

        const finishWheelDrag = () => {
            if (!isWheelDragging) return;
            isWheelDragging = false;
            wheelScroll.classList.remove('quran-wheel-grabbing');
            const targetIdx = Math.max(0, Math.min(blocks.length - 1, Math.round(wheelScroll.scrollTop / itemHeight)));
            selectIndex(targetIdx, true);
        };
        wheelScroll.addEventListener('pointerup', finishWheelDrag);
        wheelScroll.addEventListener('pointercancel', finishWheelDrag);

        const onDocClick = (e) => {
            if (!index.contains(e.target)) {
                index.classList.remove('quran-index-open');
            }
        };
        const onDocKeyDown = (e) => {
            if (e.key === 'Escape') {
                index.classList.remove('quran-index-open');
            }
        };
        document.addEventListener('click', onDocClick);
        document.addEventListener('keydown', onDocKeyDown);
        index._docListeners.push({ type: 'click', fn: onDocClick });
        index._docListeners.push({ type: 'keydown', fn: onDocKeyDown });

        const findActiveIdx = () => {
            const containers = getContainers();
            if (containers.length === 0) return 0;
            const viewH = window.innerHeight;
            let bestIdx = 0;
            let bestScore = -Infinity;
            containers.forEach((c, domIdx) => {
                const rect = c.getBoundingClientRect();
                if (rect.bottom < 0 || rect.top > viewH) return;
                const visible = Math.min(rect.bottom, viewH) - Math.max(rect.top, 0);
                if (visible > bestScore) {
                    bestScore = visible;
                    const ref = c.dataset.quranRef;
                    const fileIdx = blocks.findIndex(b => b.ref === ref);
                    bestIdx = fileIdx >= 0 ? fileIdx : domIdx;
                }
            });
            return bestIdx;
        };

        const onNoteScroll = () => {
            if (index._scrollLocked || isWheelUserScrolling || isWheelDragging) return;
            const idx = findActiveIdx();
            if (idx !== index._activeIdx) {
                index._activeIdx = idx;
                wheelScroll.scrollTo({ top: idx * itemHeight, behavior: 'smooth' });
                updateWheelVisuals(idx);
            }
        };

        const addScrollListener = (target) => {
            target.addEventListener('scroll', onNoteScroll, { passive: true });
            index._scrollListeners.push({ el: target, fn: onNoteScroll });
        };

        addScrollListener(window);
        const seen = new Set([window]);
        document.querySelectorAll('.markdown-preview-view, .cm-scroller, .view-content').forEach(el => {
            if (!seen.has(el)) { seen.add(el); addScrollListener(el); }
        });

        const initialIdx = findActiveIdx();
        index._activeIdx = initialIdx;
        wheelScroll.scrollTop = initialIdx * itemHeight;
        updateWheelVisuals(initialIdx);
    }

    refreshQuranIndex(el) {
        setTimeout(() => this.buildIndexFromFile(), 50);
        setTimeout(() => this.buildIndexFromFile(), 900);
    }

    getBlockLineRange(container, lines) {
        const st = container._quranState;
        if (!st || !st.ctx) return null;

        try {
            const el = st.el || container.parentElement || container;
            const info = st.ctx.getSectionInfo(el) || st.ctx.getSectionInfo(container);
            if (info && typeof info.lineStart === 'number') {
                for (let offset = 0; offset <= 3; offset++) {
                    const checkLines = [info.lineStart - offset, info.lineStart + offset];
                    for (const ln of checkLines) {
                        if (ln >= 0 && ln < lines.length && lines[ln].trim().startsWith('```quran')) {
                            let end = lines.length;
                            for (let j = ln + 1; j < lines.length; j++) {
                                if (lines[j].trim() === '```') {
                                    end = j;
                                    break;
                                }
                            }
                            return { start: ln, end };
                        }
                    }
                }
            }
        } catch (e) {}

        const allContainers = Array.from(document.querySelectorAll('.quran-tajweed-container'));
        const containerIndex = allContainers.indexOf(container);

        const blockRanges = [];
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim().startsWith('```quran')) {
                let end = lines.length;
                for (let j = i + 1; j < lines.length; j++) {
                    if (lines[j].trim() === '```') {
                        end = j;
                        break;
                    }
                }
                blockRanges.push({ start: i, end });
            }
        }

        if (containerIndex >= 0 && containerIndex < blockRanges.length) {
            return blockRanges[containerIndex];
        }

        return null;
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

        const range = this.getBlockLineRange(container, lines);
        if (!range) return;

        for (let j = range.start + 1; j < range.end; j++) {
            const regex = new RegExp(`${paramName}="(on|off)"`, 'i');
            if (regex.test(lines[j])) {
                lines[j] = lines[j].replace(regex, `${paramName}="${paramValue}"`);
                await this.app.vault.modify(file, lines.join('\n'));
                return;
            }
        }
        lines.splice(range.start + 1, 0, `${paramName}="${paramValue}"`);
        await this.app.vault.modify(file, lines.join('\n'));
    }

    async updateSourceRange(container, newRef) {
        const st = container._quranState;
        if (!st || !st.ctx || !st.ctx.sourcePath) return;
        const file = this.app.vault.getAbstractFileByPath(st.ctx.sourcePath);
        if (!file) return;
        let content;
        try {
            content = await this.app.vault.read(file);
        } catch (e) { return; }
        const lines = content.split('\n');

        const range = this.getBlockLineRange(container, lines);
        if (!range) return;

        const verseRegex = /^\s*(\d{1,3}):(\d{1,3})(?:-(\d{1,3}))?\s*$/;
        for (let j = range.start + 1; j <= range.end; j++) {
            if (j === range.end || verseRegex.test(lines[j]) || lines[j].trim() === '```') {
                if (j === range.end || lines[j].trim() === '```') {
                    lines.splice(j, 0, newRef);
                } else {
                    lines[j] = newRef;
                }
                await this.app.vault.modify(file, lines.join('\n'));
                const parsed = this.extractVerseReference(newRef);
                if (parsed) {
                    st.surah = parsed.surah;
                    st.startVerse = parsed.startVerse;
                    st.endVerse = parsed.endVerse;
                }
                return;
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

        // Section: Font Style
        containerEl.createEl('h3', { text: '🖋️ Font Style' });

        new Setting(containerEl)
            .setName('QCF V4 Tajweed Font')
            .setDesc('Render Quranic text using the QPC V4 Mushaf calligraphy font with Tajweed colors. Uses bundled glyph data (qpc-v4.json) and loads page fonts from Tarteel CDN on demand.')
            .addToggle((toggle) => {
                toggle.setValue(this.plugin.settings.experimentalV4Tajweed);
                toggle.onChange(async (value) => {
                    this.plugin.settings.experimentalV4Tajweed = value;
                    await this.plugin.saveSettings();
                    await this.plugin.rerenderAll();
                });
            });

        // Section: Cache
        containerEl.createEl('h3', { text: '🗑️ Cache' });

        new Setting(containerEl)
            .setName('Clear Cache')
            .setDesc('Remove all cached verse data. Use this if text looks wrong after an update.')
            .addButton(btn => {
                btn.setButtonText('Clear Cache')
                    .setWarning()
                    .onClick(() => {
                        const keys = Object.keys(localStorage).filter(k => k.startsWith('quran-'));
                        keys.forEach(k => localStorage.removeItem(k));
                        if (this.plugin._memCache) this.plugin._memCache = {};
                        btn.setButtonText(`Cleared ${keys.length} entries`);
                        btn.setDisabled(true);
                        setTimeout(() => { btn.setButtonText('Clear Cache'); btn.setDisabled(false); }, 3000);
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
