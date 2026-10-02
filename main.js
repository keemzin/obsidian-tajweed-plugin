const { Plugin, PluginSettingTab, Setting, MarkdownView, requestUrl, Notice, Modal } = require('obsidian');
const SURAHS = [{"number":1,"name":"Al-Faatiha","arabic":"سُورَةُ ٱلْفَاتِحَةِ","ayahs":7,"type":"Meccan","translation":"The Opening"},{"number":2,"name":"Al-Baqara","arabic":"سُورَةُ البَقَرَةِ","ayahs":286,"type":"Medinan","translation":"The Cow"},{"number":3,"name":"Aal-i-Imraan","arabic":"سُورَةُ آلِ عِمۡرَانَ","ayahs":200,"type":"Medinan","translation":"The Family of Imraan"},{"number":4,"name":"An-Nisaa","arabic":"سُورَةُ النِّسَاءِ","ayahs":176,"type":"Medinan","translation":"The Women"},{"number":5,"name":"Al-Maaida","arabic":"سُورَةُ المَائـِدَةِ","ayahs":120,"type":"Medinan","translation":"The Table"},{"number":6,"name":"Al-An'aam","arabic":"سُورَةُ الأَنۡعَامِ","ayahs":165,"type":"Meccan","translation":"The Cattle"},{"number":7,"name":"Al-A'raaf","arabic":"سُورَةُ الأَعۡرَافِ","ayahs":206,"type":"Meccan","translation":"The Heights"},{"number":8,"name":"Al-Anfaal","arabic":"سُورَةُ الأَنفَالِ","ayahs":75,"type":"Medinan","translation":"The Spoils of War"},{"number":9,"name":"At-Tawba","arabic":"سُورَةُ التَّوۡبَةِ","ayahs":129,"type":"Medinan","translation":"The Repentance"},{"number":10,"name":"Yunus","arabic":"سُورَةُ يُونُسَ","ayahs":109,"type":"Meccan","translation":"Jonas"},{"number":11,"name":"Hud","arabic":"سُورَةُ هُودٍ","ayahs":123,"type":"Meccan","translation":"Hud"},{"number":12,"name":"Yusuf","arabic":"سُورَةُ يُوسُفَ","ayahs":111,"type":"Meccan","translation":"Joseph"},{"number":13,"name":"Ar-Ra'd","arabic":"سُورَةُ الرَّعۡدِ","ayahs":43,"type":"Medinan","translation":"The Thunder"},{"number":14,"name":"Ibrahim","arabic":"سُورَةُ إِبۡرَاهِيمَ","ayahs":52,"type":"Meccan","translation":"Abraham"},{"number":15,"name":"Al-Hijr","arabic":"سُورَةُ الحِجۡرِ","ayahs":99,"type":"Meccan","translation":"The Rock"},{"number":16,"name":"An-Nahl","arabic":"سُورَةُ النَّحۡلِ","ayahs":128,"type":"Meccan","translation":"The Bee"},{"number":17,"name":"Al-Israa","arabic":"سُورَةُ الإِسۡرَاءِ","ayahs":111,"type":"Meccan","translation":"The Night Journey"},{"number":18,"name":"Al-Kahf","arabic":"سُورَةُ الكَهۡفِ","ayahs":110,"type":"Meccan","translation":"The Cave"},{"number":19,"name":"Maryam","arabic":"سُورَةُ مَرۡيَمَ","ayahs":98,"type":"Meccan","translation":"Mary"},{"number":20,"name":"Taa-Haa","arabic":"سُورَةُ طه","ayahs":135,"type":"Meccan","translation":"Taa-Haa"},{"number":21,"name":"Al-Anbiyaa","arabic":"سُورَةُ الأَنبِيَاءِ","ayahs":112,"type":"Meccan","translation":"The Prophets"},{"number":22,"name":"Al-Hajj","arabic":"سُورَةُ الحَجِّ","ayahs":78,"type":"Medinan","translation":"The Pilgrimage"},{"number":23,"name":"Al-Muminoon","arabic":"سُورَةُ المُؤۡمِنُونَ","ayahs":118,"type":"Meccan","translation":"The Believers"},{"number":24,"name":"An-Noor","arabic":"سُورَةُ النُّورِ","ayahs":64,"type":"Medinan","translation":"The Light"},{"number":25,"name":"Al-Furqaan","arabic":"سُورَةُ الفُرۡقَانِ","ayahs":77,"type":"Meccan","translation":"The Criterion"},{"number":26,"name":"Ash-Shu'araa","arabic":"سُورَةُ الشُّعَرَاءِ","ayahs":227,"type":"Meccan","translation":"The Poets"},{"number":27,"name":"An-Naml","arabic":"سُورَةُ النَّمۡلِ","ayahs":93,"type":"Meccan","translation":"The Ant"},{"number":28,"name":"Al-Qasas","arabic":"سُورَةُ القَصَصِ","ayahs":88,"type":"Meccan","translation":"The Stories"},{"number":29,"name":"Al-Ankaboot","arabic":"سُورَةُ العَنكَبُوتِ","ayahs":69,"type":"Meccan","translation":"The Spider"},{"number":30,"name":"Ar-Room","arabic":"سُورَةُ الرُّومِ","ayahs":60,"type":"Meccan","translation":"The Romans"},{"number":31,"name":"Luqman","arabic":"سُورَةُ لُقۡمَانَ","ayahs":34,"type":"Meccan","translation":"Luqman"},{"number":32,"name":"As-Sajda","arabic":"سُورَةُ السَّجۡدَةِ","ayahs":30,"type":"Meccan","translation":"The Prostration"},{"number":33,"name":"Al-Ahzaab","arabic":"سُورَةُ الأَحۡزَابِ","ayahs":73,"type":"Medinan","translation":"The Clans"},{"number":34,"name":"Saba","arabic":"سُورَةُ سَبَإٍ","ayahs":54,"type":"Meccan","translation":"Sheba"},{"number":35,"name":"Faatir","arabic":"سُورَةُ فَاطِرٍ","ayahs":45,"type":"Meccan","translation":"The Originator"},{"number":36,"name":"Yaseen","arabic":"سُورَةُ يسٓ","ayahs":83,"type":"Meccan","translation":"Yaseen"},{"number":37,"name":"As-Saaffaat","arabic":"سُورَةُ الصَّافَّاتِ","ayahs":182,"type":"Meccan","translation":"Those drawn up in Ranks"},{"number":38,"name":"Saad","arabic":"سُورَةُ صٓ","ayahs":88,"type":"Meccan","translation":"The letter Saad"},{"number":39,"name":"Az-Zumar","arabic":"سُورَةُ الزُّمَرِ","ayahs":75,"type":"Meccan","translation":"The Groups"},{"number":40,"name":"Ghafir","arabic":"سُورَةُ غَافِرٍ","ayahs":85,"type":"Meccan","translation":"The Forgiver"},{"number":41,"name":"Fussilat","arabic":"سُورَةُ فُصِّلَتۡ","ayahs":54,"type":"Meccan","translation":"Explained in detail"},{"number":42,"name":"Ash-Shura","arabic":"سُورَةُ الشُّورَىٰ","ayahs":53,"type":"Meccan","translation":"Consultation"},{"number":43,"name":"Az-Zukhruf","arabic":"سُورَةُ الزُّخۡرُفِ","ayahs":89,"type":"Meccan","translation":"Ornaments of gold"},{"number":44,"name":"Ad-Dukhaan","arabic":"سُورَةُ الدُّخَانِ","ayahs":59,"type":"Meccan","translation":"The Smoke"},{"number":45,"name":"Al-Jaathiya","arabic":"سُورَةُ الجَاثِيَةِ","ayahs":37,"type":"Meccan","translation":"Crouching"},{"number":46,"name":"Al-Ahqaf","arabic":"سُورَةُ الأَحۡقَافِ","ayahs":35,"type":"Meccan","translation":"The Dunes"},{"number":47,"name":"Muhammad","arabic":"سُورَةُ مُحَمَّدٍ","ayahs":38,"type":"Medinan","translation":"Muhammad"},{"number":48,"name":"Al-Fath","arabic":"سُورَةُ الفَتۡحِ","ayahs":29,"type":"Medinan","translation":"The Victory"},{"number":49,"name":"Al-Hujuraat","arabic":"سُورَةُ الحُجُرَاتِ","ayahs":18,"type":"Medinan","translation":"The Inner Apartments"},{"number":50,"name":"Qaaf","arabic":"سُورَةُ قٓ","ayahs":45,"type":"Meccan","translation":"The letter Qaaf"},{"number":51,"name":"Adh-Dhaariyat","arabic":"سُورَةُ الذَّارِيَاتِ","ayahs":60,"type":"Meccan","translation":"The Winnowing Winds"},{"number":52,"name":"At-Tur","arabic":"سُورَةُ الطُّورِ","ayahs":49,"type":"Meccan","translation":"The Mount"},{"number":53,"name":"An-Najm","arabic":"سُورَةُ النَّجۡمِ","ayahs":62,"type":"Meccan","translation":"The Star"},{"number":54,"name":"Al-Qamar","arabic":"سُورَةُ القَمَرِ","ayahs":55,"type":"Meccan","translation":"The Moon"},{"number":55,"name":"Ar-Rahmaan","arabic":"سُورَةُ الرَّحۡمَٰن","ayahs":78,"type":"Medinan","translation":"The Beneficent"},{"number":56,"name":"Al-Waaqia","arabic":"سُورَةُ الوَاقِعَةِ","ayahs":96,"type":"Meccan","translation":"The Inevitable"},{"number":57,"name":"Al-Hadid","arabic":"سُورَةُ الحَدِيدِ","ayahs":29,"type":"Medinan","translation":"The Iron"},{"number":58,"name":"Al-Mujaadila","arabic":"سُورَةُ المُجَادلَةِ","ayahs":22,"type":"Medinan","translation":"The Pleading Woman"},{"number":59,"name":"Al-Hashr","arabic":"سُورَةُ الحَشۡرِ","ayahs":24,"type":"Medinan","translation":"The Exile"},{"number":60,"name":"Al-Mumtahana","arabic":"سُورَةُ المُمۡتَحنَةِ","ayahs":13,"type":"Medinan","translation":"She that is to be examined"},{"number":61,"name":"As-Saff","arabic":"سُورَةُ الصَّفِّ","ayahs":14,"type":"Medinan","translation":"The Ranks"},{"number":62,"name":"Al-Jumu'a","arabic":"سُورَةُ الجُمُعَةِ","ayahs":11,"type":"Medinan","translation":"Friday"},{"number":63,"name":"Al-Munaafiqoon","arabic":"سُورَةُ المُنَافِقُونَ","ayahs":11,"type":"Medinan","translation":"The Hypocrites"},{"number":64,"name":"At-Taghaabun","arabic":"سُورَةُ التَّغَابُنِ","ayahs":18,"type":"Medinan","translation":"Mutual Disillusion"},{"number":65,"name":"At-Talaaq","arabic":"سُورَةُ الطَّلَاقِ","ayahs":12,"type":"Medinan","translation":"Divorce"},{"number":66,"name":"At-Tahrim","arabic":"سُورَةُ التَّحۡرِيمِ","ayahs":12,"type":"Medinan","translation":"The Prohibition"},{"number":67,"name":"Al-Mulk","arabic":"سُورَةُ المُلۡكِ","ayahs":30,"type":"Meccan","translation":"The Sovereignty"},{"number":68,"name":"Al-Qalam","arabic":"سُورَةُ القَلَمِ","ayahs":52,"type":"Meccan","translation":"The Pen"},{"number":69,"name":"Al-Haaqqa","arabic":"سُورَةُ الحَاقَّةِ","ayahs":52,"type":"Meccan","translation":"The Reality"},{"number":70,"name":"Al-Ma'aarij","arabic":"سُورَةُ المَعَارِجِ","ayahs":44,"type":"Meccan","translation":"The Ascending Stairways"},{"number":71,"name":"Nooh","arabic":"سُورَةُ نُوحٍ","ayahs":28,"type":"Meccan","translation":"Noah"},{"number":72,"name":"Al-Jinn","arabic":"سُورَةُ الجِنِّ","ayahs":28,"type":"Meccan","translation":"The Jinn"},{"number":73,"name":"Al-Muzzammil","arabic":"سُورَةُ المُزَّمِّلِ","ayahs":20,"type":"Meccan","translation":"The Enshrouded One"},{"number":74,"name":"Al-Muddaththir","arabic":"سُورَةُ المُدَّثِّرِ","ayahs":56,"type":"Meccan","translation":"The Cloaked One"},{"number":75,"name":"Al-Qiyaama","arabic":"سُورَةُ القِيَامَةِ","ayahs":40,"type":"Meccan","translation":"The Resurrection"},{"number":76,"name":"Al-Insaan","arabic":"سُورَةُ الإِنسَانِ","ayahs":31,"type":"Medinan","translation":"Man"},{"number":77,"name":"Al-Mursalaat","arabic":"سُورَةُ المُرۡسَلَاتِ","ayahs":50,"type":"Meccan","translation":"The Emissaries"},{"number":78,"name":"An-Naba","arabic":"سُورَةُ النَّبَإِ","ayahs":40,"type":"Meccan","translation":"The Announcement"},{"number":79,"name":"An-Naazi'aat","arabic":"سُورَةُ النَّازِعَاتِ","ayahs":46,"type":"Meccan","translation":"Those who drag forth"},{"number":80,"name":"Abasa","arabic":"سُورَةُ عَبَسَ","ayahs":42,"type":"Meccan","translation":"He frowned"},{"number":81,"name":"At-Takwir","arabic":"سُورَةُ التَّكۡوِيرِ","ayahs":29,"type":"Meccan","translation":"The Overthrowing"},{"number":82,"name":"Al-Infitaar","arabic":"سُورَةُ الانفِطَارِ","ayahs":19,"type":"Meccan","translation":"The Cleaving"},{"number":83,"name":"Al-Mutaffifin","arabic":"سُورَةُ المُطَفِّفِينَ","ayahs":36,"type":"Meccan","translation":"Defrauding"},{"number":84,"name":"Al-Inshiqaaq","arabic":"سُورَةُ الانشِقَاقِ","ayahs":25,"type":"Meccan","translation":"The Splitting Open"},{"number":85,"name":"Al-Burooj","arabic":"سُورَةُ البُرُوجِ","ayahs":22,"type":"Meccan","translation":"The Constellations"},{"number":86,"name":"At-Taariq","arabic":"سُورَةُ الطَّارِقِ","ayahs":17,"type":"Meccan","translation":"The Morning Star"},{"number":87,"name":"Al-A'laa","arabic":"سُورَةُ الأَعۡلَىٰ","ayahs":19,"type":"Meccan","translation":"The Most High"},{"number":88,"name":"Al-Ghaashiya","arabic":"سُورَةُ الغَاشِيَةِ","ayahs":26,"type":"Meccan","translation":"The Overwhelming"},{"number":89,"name":"Al-Fajr","arabic":"سُورَةُ الفَجۡرِ","ayahs":30,"type":"Meccan","translation":"The Dawn"},{"number":90,"name":"Al-Balad","arabic":"سُورَةُ البَلَدِ","ayahs":20,"type":"Meccan","translation":"The City"},{"number":91,"name":"Ash-Shams","arabic":"سُورَةُ الشَّمۡسِ","ayahs":15,"type":"Meccan","translation":"The Sun"},{"number":92,"name":"Al-Lail","arabic":"سُورَةُ اللَّيۡلِ","ayahs":21,"type":"Meccan","translation":"The Night"},{"number":93,"name":"Ad-Dhuhaa","arabic":"سُورَةُ الضُّحَىٰ","ayahs":11,"type":"Meccan","translation":"The Morning Hours"},{"number":94,"name":"Ash-Sharh","arabic":"سُورَةُ الشَّرۡحِ","ayahs":8,"type":"Meccan","translation":"The Consolation"},{"number":95,"name":"At-Tin","arabic":"سُورَةُ التِّينِ","ayahs":8,"type":"Meccan","translation":"The Fig"},{"number":96,"name":"Al-Alaq","arabic":"سُورَةُ العَلَقِ","ayahs":19,"type":"Meccan","translation":"The Clot"},{"number":97,"name":"Al-Qadr","arabic":"سُورَةُ القَدۡرِ","ayahs":5,"type":"Meccan","translation":"The Power, Fate"},{"number":98,"name":"Al-Bayyina","arabic":"سُورَةُ البَيِّنَةِ","ayahs":8,"type":"Medinan","translation":"The Evidence"},{"number":99,"name":"Az-Zalzala","arabic":"سُورَةُ الزَّلۡزَلَةِ","ayahs":8,"type":"Medinan","translation":"The Earthquake"},{"number":100,"name":"Al-Aadiyaat","arabic":"سُورَةُ العَادِيَاتِ","ayahs":11,"type":"Meccan","translation":"The Chargers"},{"number":101,"name":"Al-Qaari'a","arabic":"سُورَةُ القَارِعَةِ","ayahs":11,"type":"Meccan","translation":"The Calamity"},{"number":102,"name":"At-Takaathur","arabic":"سُورَةُ التَّكَاثُرِ","ayahs":8,"type":"Meccan","translation":"Competition"},{"number":103,"name":"Al-Asr","arabic":"سُورَةُ العَصۡرِ","ayahs":3,"type":"Meccan","translation":"The Declining Day, Epoch"},{"number":104,"name":"Al-Humaza","arabic":"سُورَةُ الهُمَزَةِ","ayahs":9,"type":"Meccan","translation":"The Traducer"},{"number":105,"name":"Al-Fil","arabic":"سُورَةُ الفِيلِ","ayahs":5,"type":"Meccan","translation":"The Elephant"},{"number":106,"name":"Quraish","arabic":"سُورَةُ قُرَيۡشٍ","ayahs":4,"type":"Meccan","translation":"Quraysh"},{"number":107,"name":"Al-Maa'un","arabic":"سُورَةُ المَاعُونِ","ayahs":7,"type":"Meccan","translation":"Almsgiving"},{"number":108,"name":"Al-Kawthar","arabic":"سُورَةُ الكَوۡثَرِ","ayahs":3,"type":"Meccan","translation":"Abundance"},{"number":109,"name":"Al-Kaafiroon","arabic":"سُورَةُ الكَافِرُونَ","ayahs":6,"type":"Meccan","translation":"The Disbelievers"},{"number":110,"name":"An-Nasr","arabic":"سُورَةُ النَّصۡرِ","ayahs":3,"type":"Medinan","translation":"Divine Support"},{"number":111,"name":"Al-Masad","arabic":"سُورَةُ المَسَدِ","ayahs":5,"type":"Meccan","translation":"The Palm Fibre"},{"number":112,"name":"Al-Ikhlaas","arabic":"سُورَةُ الإِخۡلَاصِ","ayahs":4,"type":"Meccan","translation":"Sincerity"},{"number":113,"name":"Al-Falaq","arabic":"سُورَةُ الفَلَقِ","ayahs":5,"type":"Meccan","translation":"The Dawn"},{"number":114,"name":"An-Naas","arabic":"سُورَةُ النَّاسِ","ayahs":6,"type":"Meccan","translation":"Mankind"}];

const PRESET_PASSAGES = [
    { label: "Ayat al-Kursi", surah: 2, startVerse: 255, endVerse: 255, badge: "Throne Verse" },
    { label: "Last 2 of Al-Baqarah", surah: 2, startVerse: 285, endVerse: 286, badge: "Night Protection" },
    { label: "First 10 of Al-Kahf", surah: 18, startVerse: 1, endVerse: 10, badge: "Friday Sunnah" },
    { label: "Last 10 of Al-Kahf", surah: 18, startVerse: 101, endVerse: 110, badge: "Friday Sunnah" },
    { label: "Surah As-Sajda", surah: 32, startVerse: 1, endVerse: 30, badge: "Night Sunnah" },
    { label: "Surah Yaseen", surah: 36, startVerse: 1, endVerse: 83, badge: "Heart of Quran" },
    { label: "Surah Ar-Rahman", surah: 55, startVerse: 1, endVerse: 78, badge: "Beauty of Quran" },
    { label: "Surah Al-Waqi'ah", surah: 56, startVerse: 1, endVerse: 96, badge: "Abundance" },
    { label: "Last 3 of Al-Hashr", surah: 59, startVerse: 22, endVerse: 24, badge: "Divine Names" },
    { label: "Surah Al-Mulk", surah: 67, startVerse: 1, endVerse: 30, badge: "Grave Protection" },
    { label: "Surah Al-Ikhlaas", surah: 112, startVerse: 1, endVerse: 4, badge: "1/3 of Quran" },
    { label: "Surah Al-Falaq", surah: 113, startVerse: 1, endVerse: 5, badge: "Refuge from Evil" },
    { label: "Surah An-Naas", surah: 114, startVerse: 1, endVerse: 6, badge: "Refuge from Whispers" }
];

function normalizeArabicText(text) {
    if (!text) return '';
    return text
        .replace(/[\u064B-\u065F\u0670]/g, '')
        .replace(/[\u0622\u0623\u0625\u0671]/g, '\u0627')
        .replace(/\u0629/g, '\u0647')
        .replace(/\u0649/g, '\u064A');
}

function normalizeEnglishText(text) {
    if (!text) return '';
    return text.toLowerCase().replace(/[^a-z0-9]/g, '');
}

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

const V4_TAJWEED_COLORS = {
    'ham_wasl': '#999999',
    'slnt': '#999999',
    'madda_normal': '#ffc1e0',
    'madda_permissible': '#ff8e3b',
    'madda_obligatory': '#ff5e8e',
    'madda_necessary': '#e30000',
    'qlq': '#00deff',
    'ghn': '#26b55d',
    'ikhf': '#26b55d',
    'ikhf_shfw': '#26b55d',
    'idghm_shfw': '#26b55d',
    'iqlb': '#26b55d',
    'idgh_ghn': '#26b55d',
    'idgh_w_ghn': '#999999',
    'idgh_mus': '#999999',
    'tafkhim': '#3c84d5'
};

const V4_RULE_NAMES = {
    'ham_wasl': 'Silent letter',
    'slnt': 'Silent letter',
    'madda_normal': 'Normal madd (2)',
    'madda_permissible': 'Separated madd (2/4/6)',
    'madda_obligatory': 'Connected madd (4/5)',
    'madda_necessary': 'Necessary madd (6)',
    'qlq': 'Qalqala (echo)',
    'ghn': 'Ghunna/ikhfa',
    'ikhf': 'Ghunna/ikhfa',
    'ikhf_shfw': 'Ghunna/ikhfa',
    'idghm_shfw': 'Ghunna/ikhfa',
    'iqlb': 'Ghunna/ikhfa',
    'idgh_ghn': 'Ghunna/ikhfa',
    'idgh_w_ghn': 'Silent letter',
    'idgh_mus': 'Silent letter',
    'tafkhim': 'Tafkhim (heavy)'
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

const TAJWEED_DETAILS = {
    'ham_wasl': {
        name: 'Hamzatul Wasl',
        arabic: 'همزة الوصل',
        desc: 'Connecting Hamza — silent when continuing recitation; pronounced when starting recitation with it.',
        color: '#AAAAAA'
    },
    'slnt': {
        name: 'Silent Letter',
        arabic: 'حرف ساقط',
        desc: 'Unpronounced letter (such as Lam Shamsiyyah or silent Alif/Waw/Yaa).',
        color: '#AAAAAA'
    },
    'madda_normal': {
        name: 'Madd Asli (Normal Prolongation)',
        arabic: 'مد أصلي',
        duration: '2 counts',
        desc: 'Natural elongation held for 2 harakat (counts) on Alif, Waw, or Yaa.',
        color: '#537FFF'
    },
    'madda_permissible': {
        name: "Madd Ja'iz (Permissible Prolongation)",
        arabic: 'مد جائز منفصل',
        duration: '2, 4, or 5 counts',
        desc: 'Separated prolongation when a letter of Madd is followed by Hamzah in the next word.',
        color: '#4050FF'
    },
    'madda_necessary': {
        name: 'Madd Lazim (Compulsory Prolongation)',
        arabic: 'مد لازم',
        duration: '6 counts',
        desc: 'Compulsory prolongation before an original sukoon or shaddah; held for 6 full harakat.',
        color: '#000EBC'
    },
    'madda_obligatory': {
        name: 'Madd Wajib (Obligatory Prolongation)',
        arabic: 'مد واجب متصل',
        duration: '4 or 5 counts',
        desc: 'Connected prolongation when Madd letter and Hamzah appear within the same word; held for 4-5 harakat.',
        color: '#2144C1'
    },
    'qlq': {
        name: 'Qalqalah (Echoing / Bounce)',
        arabic: 'قلقلة',
        desc: 'Sharp bouncing or echoing sound produced on letters of قطب جد (Qaf, Taa, Ba, Jeem, Dal) when carrying sukoon.',
        color: '#DD0008'
    },
    'ghn': {
        name: 'Ghunnah (Nasalization)',
        arabic: 'غنة',
        duration: '2 counts',
        desc: 'Nasal resonance originating from the nasal passage; held for 2 counts on Noon or Meem with Shaddah (نّ / مّ).',
        color: '#FFA050'
    },
    'ikhf': {
        name: 'Ikhfa (Concealment)',
        arabic: 'إخفاء حقيقي',
        duration: '2 counts',
        desc: 'Concealing Noon Sakinah or Tanween before any of the 15 Ikhfa letters, with a light nasal sound held for 2 counts.',
        color: '#9400A8'
    },
    'ikhf_shfw': {
        name: 'Ikhfa Shafawi (Labial Concealment)',
        arabic: 'إخفاء شفوي',
        duration: '2 counts',
        desc: 'Concealing Meem Sakinah before the letter Baa (ب) with light nasal resonance held for 2 counts.',
        color: '#D500B7'
    },
    'idghm_shfw': {
        name: 'Idgham Shafawi (Labial Merging)',
        arabic: 'إدغام شفوي',
        duration: '2 counts',
        desc: 'Merging Meem Sakinah into another Meem (م) with full Ghunnah held for 2 counts.',
        color: '#58B800'
    },
    'iqlb': {
        name: 'Iqlab (Conversion)',
        arabic: 'إقلاب',
        duration: '2 counts',
        desc: 'Converting Noon Sakinah or Tanween into an unpronounced Meem before the letter Baa (ب), with Ghunnah held for 2 counts.',
        color: '#26BFFD'
    },
    'idgh_ghn': {
        name: 'Idgham with Ghunnah',
        arabic: 'إدغام بغنة',
        duration: '2 counts',
        desc: 'Merging Noon Sakinah or Tanween into letters of ينمو (Yaa, Noon, Meem, Waw) with 2-count nasal resonance.',
        color: '#169777'
    },
    'idgh_w_ghn': {
        name: 'Idgham without Ghunnah',
        arabic: 'إدغام بغير غنة',
        desc: 'Merging Noon Sakinah or Tanween completely into Laam (ل) or Raa (ر) with no nasal resonance.',
        color: '#169200'
    },
    'idgh_mus': {
        name: 'Idgham Mutajanisayn / Mutaqaribayn',
        arabic: 'إدغام متجانسين / متقاربين',
        desc: 'Merging two letters that share the same or close articulation point (e.g. Dal into Taa or Baa into Meem).',
        color: '#A1A1A1'
    },
    'tafkhim': {
        name: 'Tafkhim (Heavy Letter)',
        arabic: 'تفخيم',
        desc: "Pronounced with a full, elevated mouth — applies to the 7 Isti'la letters (خ ص ض غ ط ق ظ), heavy Ra (ر) with fathah or dammah, and the Lam in the name of Allah.",
        color: '#3C84D5'
    }
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
    { id: 'en-tafisr-ibn-kathir', name: 'Ibn Kathir (Abridged)', apiName: 'Ibn Kathir', qdcId: 169 },
    { id: 'en-tafsir-maarif-ul-quran', name: "Ma'arif al-Qur'an", apiName: "Ma'arif al-Qur'an", qdcId: 168 },
    { id: 'tazkirul-quran-en', name: 'Tazkirul Quran (Wahiduddin Khan)', apiName: 'Tazkirul Quran', qdcId: 817 },
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
            fontSize: 2.0,
            defaultAudio: true,
            defaultTranslation: true,
            defaultTransliteration: true,
            defaultRepeatCount: 5,
            showVerseNumbers: true,
            autoHideDuplicateVerseNumbersInV4: true,
            lineSpacing: 1.8,
            translationFontSize: 0.5,
            transliterationFontSize: 0.5,
            translationVersion: '131',
            tafsirVersion: 'en-tafisr-ibn-kathir',
            tafsirPlacement: 'inline',
            thematicTafsirOnly: true,
            experimentalV4Tajweed: true,
            wbwEnabled: true,
            wbwTrigger: 'hover',
            wbwAudio: true,
            defaultPlaybackSpeed: 1.0,
            autoScrollAudio: true,
            showFloatingMiniPlayer: true,
            showSideIndexWheel: true,
            useRichSurahPicker: true,
            starredSurahs: [1, 18, 32, 36, 55, 56, 67, 112, 113, 114]
        };

        // Load saved settings
        await this.loadSettings();

        this._surahsData = null;
        this.ensureSurahsData().catch(() => {});

        this._qpcV4Data = null;
        this.ensureQpcV4Data().catch(() => {});

        this._memCache = {};
        this._v4PageFontsLoaded = new Set();
        this._activeOpenSettingsPopover = null;
        this.injectV4PaletteStyles();

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
            this.debounceRebuildIndex(200);
        }));

        this.registerEvent(this.app.workspace.on('layout-change', () => {
            this.debounceRebuildIndex(200);
        }));

        this.registerEvent(this.app.workspace.on('file-open', () => {
            this.debounceRebuildIndex(200);
        }));

        this.registerEvent(this.app.vault.on('modify', (file) => {
            const activeFile = this.getActiveNoteFile();
            if (activeFile && file && file.path === activeFile.path) {
                this.debounceRebuildIndex(250);
            }
        }));
    }

    onunload() {
        clearTimeout(this._indexBuildTimer);
        const existing = document.querySelector('.quran-page-index');
        if (existing) {
            if (existing._scrollListeners) existing._scrollListeners.forEach(({ el, fn }) => el.removeEventListener('scroll', fn));
            if (existing._docListeners) existing._docListeners.forEach(({ type, fn }) => document.removeEventListener(type, fn));
            if (existing._winListeners) existing._winListeners.forEach(({ type, fn }) => window.removeEventListener(type, fn));
            if (typeof existing._clearBufferTimer === 'function') existing._clearBufferTimer();
            clearTimeout(existing._scrollLockTimer);
            clearTimeout(existing._resizeTimer);
            if (existing._scrollRaf) cancelAnimationFrame(existing._scrollRaf);
            existing.remove();
        }
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
            this.settings.fontSize = saved.fontSize !== undefined ? saved.fontSize : 2.0;
            this.settings.defaultAudio = saved.defaultAudio !== undefined ? saved.defaultAudio : true;
            this.settings.defaultTranslation = saved.defaultTranslation !== undefined ? saved.defaultTranslation : true;
            this.settings.defaultTransliteration = saved.defaultTransliteration !== undefined ? saved.defaultTransliteration : true;
            this.settings.defaultRepeatCount = this.snapToRepeatOption(saved.defaultRepeatCount || 5);
            this.settings.showVerseNumbers = saved.showVerseNumbers !== undefined ? saved.showVerseNumbers : true;
            this.settings.autoHideDuplicateVerseNumbersInV4 = saved.autoHideDuplicateVerseNumbersInV4 !== undefined ? saved.autoHideDuplicateVerseNumbersInV4 : true;
            this.settings.lineSpacing = saved.lineSpacing !== undefined ? saved.lineSpacing : 1.8;
            this.settings.translationFontSize = saved.translationFontSize !== undefined ? saved.translationFontSize : 0.5;
            this.settings.transliterationFontSize = saved.transliterationFontSize !== undefined ? saved.transliterationFontSize : 0.5;
            this.settings.translationVersion = saved.translationVersion !== undefined ? saved.translationVersion : '131';
            this.settings.tafsirVersion = saved.tafsirVersion !== undefined ? saved.tafsirVersion : 'en-tafisr-ibn-kathir';
            this.settings.tafsirPlacement = saved.tafsirPlacement || 'inline';
            this.settings.thematicTafsirOnly = saved.thematicTafsirOnly !== undefined ? saved.thematicTafsirOnly : true;
            this.settings.experimentalV4Tajweed = saved.experimentalV4Tajweed !== undefined ? saved.experimentalV4Tajweed : true;
            this.settings.wbwEnabled = saved.wbwEnabled !== undefined ? saved.wbwEnabled : true;
            this.settings.wbwTrigger = saved.wbwTrigger || 'hover';
            this.settings.wbwAudio = saved.wbwAudio !== undefined ? saved.wbwAudio : true;
            this.settings.defaultPlaybackSpeed = saved.defaultPlaybackSpeed !== undefined ? saved.defaultPlaybackSpeed : 1.0;
            this.settings.autoScrollAudio = saved.autoScrollAudio !== undefined ? saved.autoScrollAudio : true;
            this.settings.showFloatingMiniPlayer = saved.showFloatingMiniPlayer !== undefined ? saved.showFloatingMiniPlayer : true;
            this.settings.showSideIndexWheel = saved.showSideIndexWheel !== undefined ? saved.showSideIndexWheel : true;
            this.settings.useRichSurahPicker = saved.useRichSurahPicker !== undefined ? saved.useRichSurahPicker : true;
            this.settings.starredSurahs = Array.isArray(saved.starredSurahs) ? saved.starredSurahs : [1, 18, 32, 36, 55, 56, 67, 112, 113, 114];
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
            autoHideDuplicateVerseNumbersInV4: this.settings.autoHideDuplicateVerseNumbersInV4,
            lineSpacing: this.settings.lineSpacing,
            translationFontSize: this.settings.translationFontSize,
            transliterationFontSize: this.settings.transliterationFontSize,
            translationVersion: this.settings.translationVersion,
            tafsirVersion: this.settings.tafsirVersion,
            tafsirPlacement: this.settings.tafsirPlacement,
            thematicTafsirOnly: this.settings.thematicTafsirOnly,
            experimentalV4Tajweed: this.settings.experimentalV4Tajweed,
            wbwEnabled: this.settings.wbwEnabled,
            wbwTrigger: this.settings.wbwTrigger,
            wbwAudio: this.settings.wbwAudio,
            defaultPlaybackSpeed: this.settings.defaultPlaybackSpeed,
            autoScrollAudio: this.settings.autoScrollAudio,
            showFloatingMiniPlayer: this.settings.showFloatingMiniPlayer,
            showSideIndexWheel: this.settings.showSideIndexWheel,
            useRichSurahPicker: this.settings.useRichSurahPicker,
            starredSurahs: this.settings.starredSurahs
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

    injectV4PaletteStyles() {
        if (document.getElementById('quran-v4-palette-styles')) return;
        const allFamilies = Array.from({ length: 604 }, (_, i) => `'qul-v4-p${i + 1}'`).join(', ');
        const style = document.createElement('style');
        style.id = 'quran-v4-palette-styles';
        style.textContent = `@font-palette-values --quran-v4-dark { font-family: ${allFamilies}; base-palette: 1; } @font-palette-values --quran-v4-light { font-family: ${allFamilies}; base-palette: 0; }`;
        document.head.appendChild(style);
    }

    onunload() {
        document.getElementById('quran-v4-palette-styles')?.remove();
        document.querySelector('.quran-page-index')?.remove();
        document.querySelector('.quran-mini-player')?.remove();
        this.closeWordPopover();
    }

    getPluginDir() {
        return this.manifest.dir || (this.app?.vault?.configDir ? `${this.app.vault.configDir}/plugins/${this.manifest.id}` : `.obsidian/plugins/${this.manifest.id}`);
    }

    async ensureQpcV4Data() {
        if (this._qpcV4Data) return this._qpcV4Data;
        if (this._qpcV4DataPromise) return this._qpcV4DataPromise;

        this._qpcV4DataPromise = (async () => {
            const adapter = this.app.vault.adapter;
            const pluginDir = this.getPluginDir();
            const localPath = `${pluginDir}/data/qpc-v4.json`;
            const cachePath = `${pluginDir}/cache/qpc-v4.json`;

            for (const p of [localPath, cachePath]) {
                try {
                    if (await adapter.exists(p)) {
                        const raw = await adapter.read(p);
                        this._qpcV4Data = JSON.parse(raw);
                        return this._qpcV4Data;
                    }
                } catch {}
            }

            if (typeof navigator !== 'undefined' && navigator.onLine) {
                try {
                    const { requestUrl } = require('obsidian');
                    const res = await requestUrl({
                        url: 'https://raw.githubusercontent.com/keemzin/obsidian-tajweed-plugin/feat/v4-tajweed-font/data/qpc-v4.json'
                    });
                    if (res.status === 200) {
                        this._qpcV4Data = typeof res.json === 'object' ? res.json : JSON.parse(res.text);
                        const cacheDir = `${pluginDir}/cache`;
                        if (!(await adapter.exists(cacheDir))) {
                            await adapter.mkdir(cacheDir);
                        }
                        await adapter.write(cachePath, JSON.stringify(this._qpcV4Data));
                        return this._qpcV4Data;
                    }
                } catch {}
            }
            return null;
        })();

        return await this._qpcV4DataPromise;
    }

    async ensureSurahsData() {
        if (this._surahsData) return this._surahsData;
        const adapter = this.app.vault.adapter;
        const localPath = `${this.getPluginDir()}/data/surahs.json`;
        try {
            if (await adapter.exists(localPath)) {
                const raw = await adapter.read(localPath);
                const parsed = JSON.parse(raw);
                if (parsed && Array.isArray(parsed.data)) {
                    this._surahsData = parsed.data;
                    return this._surahsData;
                }
            }
        } catch {}
        return null;
    }

    getSurahMeta(surahNum) {
        if (this._surahsData) {
            const found = this._surahsData.find(s => s.number === surahNum);
            if (found) {
                return {
                    ...found,
                    arabic: found.name || ''
                };
            }
        }
        const s = SURAHS.find(x => x.number === surahNum);
        return {
            number: surahNum,
            name: s ? (s.arabic || s.name) : `Surah ${surahNum}`,
            arabic: s?.arabic || '',
            englishName: s ? s.name : `Surah ${surahNum}`,
            englishNameTranslation: s?.translation || '',
            numberOfAyahs: s ? s.ayahs : 7,
            revelationType: s?.type || (surahNum === 1 || surahNum > 2 ? 'Meccan' : 'Medinan')
        };
    }

    openSurahPicker(container, renderEl, surah, startVerse, endVerse, initialMode = 'surah') {
        new QuranSurahPickerModal(this.app, this, container, renderEl, { surah, startVerse, endVerse, initialMode }).open();
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

            if (!buffer && typeof navigator !== 'undefined' && navigator.onLine) {
                try {
                    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
                    const timer = controller ? setTimeout(() => controller.abort(), 2500) : null;
                    const res = await fetch(remoteUrl, { signal: controller ? controller.signal : undefined });
                    if (timer) clearTimeout(timer);
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
        const parsedVerseWords = this.getTajweedWords(verse.text);

        while (true) {
            const key = `${surah}:${ayah}:${w}`;
            const glyphEntry = this._qpcV4Data[key];
            if (!glyphEntry) break;
            const page = parseInt(pageMap[`${ayah}:${w}`]);
            if (!page) { w++; continue; }

            if (!this._v4PageFontsLoaded?.has(page)) {
                return false;
            }

            const wordSpan = document.createElement('span');
            wordSpan.className = 'quran-word-v4';
            wordSpan.style.fontFamily = `'qul-v4-p${page}', serif`;
            wordSpan.style.unicodeBidi = 'bidi-override';
            wordSpan.textContent = glyphEntry.text;

            const nextKey = `${surah}:${ayah}:${w + 1}`;
            const isAyahMarker = !this._qpcV4Data[nextKey];
            if (!isAyahMarker) {
                const currentPos = w;
                const rules = parsedVerseWords[currentPos - 1]?.rules || [];
                this.attachWordInteractivity(wordSpan, surah, ayah, currentPos, rules, null);
            }

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

    hasTafkhim(word) {
        if (!word) return false;
        if (/[خصضغطقظ]/.test(word)) return true;
        if (/ر(\u0651?[\u064E\u064F\u064B\u064C]|[\u064E\u064F\u064B\u064C]\u0651)/.test(word)) return true;
        if (/[\u064E\u064F][^\u064E\u064F\u0650\u064D\u064B\u064C]*رْ/.test(word)) return true;
        if (/اللَّه/.test(word)) return true;
        return false;
    }

    getTajweedWords(verseText) {
        if (!verseText) return [];
        const clean = verseText.replace(/۞\s*/g, '').replace(/\[ٮٰ\]/g, 'ٮٰ').trim();
        const words = [];
        let currentHtml = '';
        let currentRaw = '';
        let activeRules = [];
        let currentWordRules = [];

        let i = 0;
        while (i < clean.length) {
            const tagMatch = clean.slice(i).match(/^\[([a-z])(?::\d+)?\[/);
            if (tagMatch) {
                const ruleCode = tagMatch[1];
                const ruleClass = RULE_MAP[ruleCode] || ruleCode;
                activeRules.push(ruleClass);
                if (!currentWordRules.includes(ruleClass)) currentWordRules.push(ruleClass);
                currentHtml += `<span class="tajweed-${ruleClass}">`;
                i += tagMatch[0].length;
            } else if (clean[i] === ']') {
                if (activeRules.length > 0) {
                    activeRules.pop();
                    currentHtml += '</span>';
                }
                i++;
            } else if (/\s/.test(clean[i])) {
                if (currentHtml || currentRaw) {
                    let wordHtml = currentHtml;
                    for (let r = 0; r < activeRules.length; r++) wordHtml += '</span>';
                    const rawWord = currentRaw.replace(/\[|\]/g, '');
                    const wordRules = [...currentWordRules];
                    if (this.hasTafkhim(rawWord) && !wordRules.includes('tafkhim')) {
                        wordRules.push('tafkhim');
                    }
                    words.push({ html: wordHtml, raw: rawWord, rules: wordRules });
                    currentHtml = '';
                    for (const r of activeRules) currentHtml += `<span class="tajweed-${r}">`;
                    currentRaw = '';
                    currentWordRules = [...activeRules];
                }
                i++;
                while (i < clean.length && /\s/.test(clean[i])) i++;
            } else {
                currentHtml += clean[i];
                currentRaw += clean[i];
                i++;
            }
        }
        if (currentHtml || currentRaw) {
            let wordHtml = currentHtml;
            for (let r = 0; r < activeRules.length; r++) wordHtml += '</span>';
            const rawWord = currentRaw.replace(/\[|\]/g, '');
            const wordRules = [...currentWordRules];
            if (this.hasTafkhim(rawWord) && !wordRules.includes('tafkhim')) {
                wordRules.push('tafkhim');
            }
            words.push({ html: wordHtml, raw: rawWord, rules: wordRules });
        }
        return words;
    }

    renderStandardVerse(textSpan, surah, verse) {
        const ayah = verse.numberInSurah;
        const parsedWords = this.getTajweedWords(verse.text);
        for (let i = 0; i < parsedWords.length; i++) {
            const pw = parsedWords[i];
            const wordPos = i + 1;
            const wordSpan = document.createElement('span');
            wordSpan.className = 'quran-word';
            wordSpan.innerHTML = pw.html;

            this.attachWordInteractivity(wordSpan, surah, ayah, wordPos, pw.rules, pw.raw);

            textSpan.appendChild(wordSpan);
            if (i < parsedWords.length - 1) {
                textSpan.appendChild(document.createTextNode(' '));
            }
        }
    }

    getTajweedRulesForWord(verseText, wordPos) {
        if (!verseText) return [];
        const words = this.getTajweedWords(verseText);
        return words[wordPos - 1]?.rules || [];
    }

    async getWbwData(surah, ayah) {
        if (!this._wbwCache) this._wbwCache = {};
        const key = `${surah}:${ayah}`;
        if (this._wbwCache[key]) return this._wbwCache[key];

        const storageKey = `quran-wbw-${surah}-${ayah}`;
        const cached = await this.getDiskCache(storageKey);
        if (cached && cached.length > 0) {
            this._wbwCache[key] = cached;
            return cached;
        }

        if (typeof navigator !== 'undefined' && !navigator.onLine) {
            return cached || [];
        }

        try {
            const url = `https://api.quran.com/api/v4/verses/by_key/${surah}:${ayah}?words=true&word_fields=translation,transliteration`;
            const data = await this.fetchJson(url);
            const words = data?.verse?.words || [];
            if (words.length > 0) {
                await this.setDiskCache(storageKey, words);
                this._wbwCache[key] = words;
                return words;
            }
        } catch {}
        return cached || [];
    }

    positionWordPopover(popover, targetEl) {
        if (!popover || !targetEl) return;
        const rect = targetEl.getBoundingClientRect();
        const popoverWidth = Math.min(300, window.innerWidth - 20);
        let left = rect.left + (rect.width / 2) - (popoverWidth / 2);
        if (left < 10) left = 10;
        if (left + popoverWidth > window.innerWidth - 10) {
            left = window.innerWidth - popoverWidth - 10;
        }

        let top = rect.bottom + 8;
        const estimatedHeight = 220;
        if (top + estimatedHeight > window.innerHeight && rect.top > estimatedHeight) {
            top = rect.top - estimatedHeight - 8;
        }

        popover.style.left = `${left}px`;
        popover.style.top = `${top}px`;
        popover.style.width = `${popoverWidth}px`;
    }

    closeWordPopover() {
        const existing = document.querySelector('.quran-word-popover');
        if (existing) existing.remove();
        this._activeWordKey = null;
    }

    async showWordPopover(targetEl, surah, ayah, wordPos, rules, rawWordText) {
        const wordKey = `${surah}:${ayah}:${wordPos}`;
        this.closeWordPopover();
        this._activeWordKey = wordKey;

        const wbwWords = await this.getWbwData(surah, ayah);
        if (this._activeWordKey !== wordKey) return;

        const wbw = wbwWords.find(item => item.position === wordPos) || (wordPos <= wbwWords.length ? wbwWords[wordPos - 1] : null);

        const arabicDisplay = rawWordText ? rawWordText.replace(/\[[a-z](?::\d+)?\[([^\]]+)\]/g, '$1') : (wbw?.text_uthmani || targetEl.textContent || '');
        const transliteration = wbw?.transliteration?.text || '';
        const translation = wbw?.translation?.text || '';
        const audioUrl = (this.settings.wbwAudio && wbw?.audio_url) ? `https://audio.qurancdn.com/${wbw.audio_url}` : null;

        let html = `
            <div class="quran-word-popover-header">
                <div class="quran-word-popover-arabic">${arabicDisplay}</div>
                <div class="quran-word-popover-meta">
                    ${transliteration ? `<span class="quran-word-popover-translit">${transliteration}</span>` : ''}
                    ${audioUrl ? `<button class="quran-word-audio-btn" title="Play pronunciation"><svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg></button>` : ''}
                </div>
            </div>
            ${translation ? `<div class="quran-word-popover-trans">${translation}</div>` : ''}
        `;

        if (rules && rules.length > 0) {
            const isV4 = this.settings.experimentalV4Tajweed;
            html += `<div class="quran-word-popover-tajweed-title">Tajweed Rules${isV4 ? ' (Mushaf V4)' : ''}</div>`;
            const uniqueRules = [...new Set(rules)];
            for (const r of uniqueRules) {
                const det = TAJWEED_DETAILS[r];
                if (!det) continue;
                const dotColor = (isV4 ? V4_TAJWEED_COLORS[r] : null) || det.color;
                const ruleName = (isV4 && V4_RULE_NAMES[r]) ? V4_RULE_NAMES[r] : det.name;
                html += `
                    <div class="quran-word-rule-card">
                        <div class="quran-word-rule-header">
                            <span class="quran-word-rule-dot" style="background-color: ${dotColor};"></span>
                            <span class="quran-word-rule-name">${ruleName}</span>
                            <span class="quran-word-rule-arabic">${det.arabic}</span>
                            ${det.duration ? `<span class="quran-word-rule-duration">${det.duration}</span>` : ''}
                        </div>
                        <div class="quran-word-rule-desc">${det.desc}</div>
                    </div>
                `;
            }
        } else {
            html += `<div class="quran-word-popover-tajweed-title">Tajweed</div><div class="quran-word-popover-no-rules">Normal pronunciation (no special rule).</div>`;
        }

        const popover = document.createElement('div');
        popover.className = 'quran-word-popover';
        popover.innerHTML = html;
        document.body.appendChild(popover);

        this.positionWordPopover(popover, targetEl);

        const audioBtn = popover.querySelector('.quran-word-audio-btn');
        if (audioBtn && audioUrl) {
            audioBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const a = new Audio(audioUrl);
                a.play().catch(() => {});
            });
        }

        const closeHandler = (e) => {
            if (!popover.contains(e.target) && !targetEl.contains(e.target)) {
                this.closeWordPopover();
                document.removeEventListener('click', closeHandler, true);
            }
        };
        setTimeout(() => document.addEventListener('click', closeHandler, true), 0);
    }

    attachWordInteractivity(wordSpan, surah, ayah, wordPos, rules, rawWordText) {
        if (!this.settings.wbwEnabled) return;
        wordSpan.classList.add('quran-interactive-word');
        const wordKey = `${surah}:${ayah}:${wordPos}`;
        let hoverTimeout = null;

        wordSpan.addEventListener('click', (e) => {
            e.stopPropagation();
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
                hoverTimeout = null;
            }
            if (this._activeWordKey === wordKey) {
                this.closeWordPopover();
                return;
            }
            this.showWordPopover(wordSpan, surah, ayah, wordPos, rules, rawWordText);
        });

        if (this.settings.wbwTrigger !== 'click') {
            wordSpan.addEventListener('mouseenter', () => {
                if (this._activeWordKey === wordKey) return;
                hoverTimeout = setTimeout(() => {
                    this.showWordPopover(wordSpan, surah, ayah, wordPos, rules, rawWordText);
                }, 350);
            });

            wordSpan.addEventListener('mouseleave', () => {
                if (hoverTimeout) {
                    clearTimeout(hoverTimeout);
                    hoverTimeout = null;
                }
            });
        }
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

        const audio = new Audio();
        audio.controls = false;
        audio.className = 'quran-audio-player';
        audio.preload = 'none';
        audio.crossOrigin = 'anonymous';
        audio.playbackRate = this.settings.defaultPlaybackSpeed || 1.0;
        audio.style.display = 'none';

        const audioUrl = this.getAudioUrl(reciter, surah, verse);

        const source = document.createElement('source');
        source.src = audioUrl;
        source.type = 'audio/mpeg';
        audio.appendChild(source);

        const playBtn = document.createElement('button');
        playBtn.type = 'button';
        playBtn.className = 'quran-verse-audio-btn';
        playBtn.title = `Play Ayah ${verse}`;
        playBtn.innerHTML = '<svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor"><polygon points="6,4 18,12 6,20"/></svg><span>Play</span>';

        playBtn.onclick = (e) => {
            e.stopPropagation();
            if (audio.paused) {
                document.querySelectorAll('.quran-audio-player').forEach(a => {
                    if (a !== audio && !a.paused) a.pause();
                });
                audio.play().catch(err => console.error('Audio play error', err));
            } else {
                audio.pause();
            }
        };

        audio.addEventListener('play', () => {
            playBtn.classList.add('quran-audio-playing');
            playBtn.innerHTML = '<svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg><span>Pause</span>';
            if (verseDiv) this.highlightVerse(verseDiv, true);
        });

        audio.addEventListener('pause', () => {
            playBtn.classList.remove('quran-audio-playing');
            playBtn.innerHTML = '<svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor"><polygon points="6,4 18,12 6,20"/></svg><span>Play</span>';
            if (verseDiv && (!rangeControls || !rangeControls.isPlaying)) this.highlightVerse(verseDiv, false);
        });

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
            playBtn.classList.remove('quran-audio-playing');
            playBtn.innerHTML = '<svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor"><polygon points="6,4 18,12 6,20"/></svg><span>Play</span>';
            if (!rangeControls || !rangeControls.isPlaying || !verseDiv) {
                if (verseDiv) this.highlightVerse(verseDiv, false);
                return;
            }
            if (rangeControls.isPaused) return;
            this.highlightVerse(verseDiv, false);

            const nextIndex = rangeControls.currentVerseIndex + 1;

            if (nextIndex < rangeControls.verseDivs.length) {
                rangeControls.currentVerseIndex = nextIndex;
                const nextVerseDiv = rangeControls.verseDivs[nextIndex];
                this.highlightVerse(nextVerseDiv, true);
                const nextAudio = nextVerseDiv.querySelector('.quran-audio-player');
                if (!nextAudio) { this.stopRange(rangeControls); return; }
                nextAudio.playbackRate = this.settings.defaultPlaybackSpeed || 1.0;
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
                    firstAudio.playbackRate = this.settings.defaultPlaybackSpeed || 1.0;
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
        audioContainer.appendChild(playBtn);
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

        const nextRefBelow = this.getNextRange(surah, startVerse, endVerse, 'below');
        const prevRefAbove = this.getNextRange(surah, startVerse, endVerse, 'above');

        const addBtn = document.createElement('button');
        addBtn.className = 'quran-add-btn';
        addBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
        addBtn.title = 'Add Quran block';

        const addPopover = document.createElement('div');
        addPopover.className = 'quran-settings-popover quran-add-popover';
        addPopover.style.display = 'none';

        const addBelowRow = document.createElement('div');
        addBelowRow.className = 'quran-settings-row quran-action-row';
        addBelowRow.innerHTML = `<span class="quran-row-label"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg> Continue below (${nextRefBelow})</span>`;
        addBelowRow.onclick = async (e) => {
            e.stopPropagation();
            addPopover.style.display = 'none';
            await this.insertQuranBlock(container, 'below');
        };

        const addAboveRow = document.createElement('div');
        addAboveRow.className = 'quran-settings-row quran-action-row';
        addAboveRow.innerHTML = `<span class="quran-row-label"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg> Continue above (${prevRefAbove})</span>`;
        addAboveRow.onclick = async (e) => {
            e.stopPropagation();
            addPopover.style.display = 'none';
            await this.insertQuranBlock(container, 'above');
        };

        const addPopDivider = document.createElement('div');
        addPopDivider.className = 'quran-settings-divider';

        const addNewBelowRow = document.createElement('div');
        addNewBelowRow.className = 'quran-settings-row quran-action-row';
        addNewBelowRow.innerHTML = `<span class="quran-row-label"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> New block below (1:1)</span>`;
        addNewBelowRow.onclick = async (e) => {
            e.stopPropagation();
            addPopover.style.display = 'none';
            await this.insertQuranBlock(container, 'below', '1:1');
        };

        const addNewAboveRow = document.createElement('div');
        addNewAboveRow.className = 'quran-settings-row quran-action-row';
        addNewAboveRow.innerHTML = `<span class="quran-row-label"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> New block above (1:1)</span>`;
        addNewAboveRow.onclick = async (e) => {
            e.stopPropagation();
            addPopover.style.display = 'none';
            await this.insertQuranBlock(container, 'above', '1:1');
        };

        addPopover.appendChild(addBelowRow);
        addPopover.appendChild(addAboveRow);
        addPopover.appendChild(addPopDivider);
        addPopover.appendChild(addNewBelowRow);
        addPopover.appendChild(addNewAboveRow);

        addPopover.onclick = (e) => e.stopPropagation();

        addBtn.onclick = (e) => {
            e.stopPropagation();
            const isVisible = addPopover.style.display !== 'none';
            document.querySelectorAll('.quran-settings-popover').forEach(p => p.style.display = 'none');
            addPopover.style.display = isVisible ? 'none' : 'block';
            this._activeOpenSettingsPopover = null;
        };

        const settingsBtn = document.createElement('button');
        settingsBtn.className = 'quran-settings-btn';
        settingsBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';
        settingsBtn.title = 'Quick settings';

        const blockKey = `${surah}:${startVerse}-${endVerse}`;
        const settingsPopover = document.createElement('div');
        settingsPopover.className = 'quran-settings-popover';
        settingsPopover.style.display = (this._activeOpenSettingsPopover === blockKey) ? 'block' : 'none';
        settingsPopover.onclick = (e) => e.stopPropagation();

        const displaySection = document.createElement('div');
        displaySection.className = 'quran-settings-section-header';
        displaySection.textContent = 'Display';
        settingsPopover.appendChild(displaySection);

        const items = [
            {
                key: 'translationEnabled',
                label: 'Translation',
                icon: '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>'
            },
            {
                key: 'transliterationEnabled',
                label: 'Transliteration',
                icon: '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>'
            },
            {
                key: 'audioEnabled',
                label: 'Audio',
                icon: '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>'
            }
        ];

        items.forEach(({ key, label, icon }) => {
            const row = document.createElement('div');
            row.className = 'quran-settings-row';
            const state = container._quranState || {};
            const isActive = state[key];
            row.innerHTML = `<span class="quran-row-label">${icon} <span>${label}</span></span><span class="quran-settings-toggle ${isActive ? 'on' : 'off'}"></span>`;
            row.onclick = async (e) => {
                e.stopPropagation();
                const st = container._quranState;
                if (!st) return;
                st[key] = !st[key];
                row.querySelector('.quran-settings-toggle').className = `quran-settings-toggle ${st[key] ? 'on' : 'off'}`;
                this.applyToggle(container, st, key);
                this._activeOpenSettingsPopover = blockKey;
                await this.updateSourceParam(container, key, st[key]);
            };
            settingsPopover.appendChild(row);
        });

        const divider = document.createElement('div');
        divider.className = 'quran-settings-divider';
        settingsPopover.appendChild(divider);

        const actionsSection = document.createElement('div');
        actionsSection.className = 'quran-settings-section-header';
        actionsSection.textContent = 'Block Actions';
        settingsPopover.appendChild(actionsSection);

        const gearAddBelow = document.createElement('div');
        gearAddBelow.className = 'quran-settings-row quran-action-row';
        gearAddBelow.innerHTML = `<span class="quran-row-label"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg> Continue below (${nextRefBelow})</span>`;
        gearAddBelow.onclick = async (e) => {
            e.stopPropagation();
            settingsPopover.style.display = 'none';
            this._activeOpenSettingsPopover = null;
            await this.insertQuranBlock(container, 'below');
        };
        settingsPopover.appendChild(gearAddBelow);

        const gearAddAbove = document.createElement('div');
        gearAddAbove.className = 'quran-settings-row quran-action-row';
        gearAddAbove.innerHTML = `<span class="quran-row-label"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg> Continue above (${prevRefAbove})</span>`;
        gearAddAbove.onclick = async (e) => {
            e.stopPropagation();
            settingsPopover.style.display = 'none';
            this._activeOpenSettingsPopover = null;
            await this.insertQuranBlock(container, 'above');
        };
        settingsPopover.appendChild(gearAddAbove);

        const gearAddNew = document.createElement('div');
        gearAddNew.className = 'quran-settings-row quran-action-row';
        gearAddNew.innerHTML = `<span class="quran-row-label"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> New block (1:1)</span>`;
        gearAddNew.onclick = async (e) => {
            e.stopPropagation();
            settingsPopover.style.display = 'none';
            this._activeOpenSettingsPopover = null;
            await this.insertQuranBlock(container, 'below', '1:1');
        };
        settingsPopover.appendChild(gearAddNew);

        const deleteDivider = document.createElement('div');
        deleteDivider.className = 'quran-settings-divider';
        settingsPopover.appendChild(deleteDivider);

        const deleteRow = document.createElement('div');
        deleteRow.className = 'quran-settings-row quran-delete-row';
        deleteRow.innerHTML = `<span class="quran-row-label"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Delete block</span>`;
        let confirmTimer = null;
        deleteRow.onclick = async (e) => {
            e.stopPropagation();
            if (deleteRow.dataset.confirming === 'true') {
                clearTimeout(confirmTimer);
                settingsPopover.style.display = 'none';
                this._activeOpenSettingsPopover = null;
                await this.deleteQuranBlock(container);
            } else {
                deleteRow.dataset.confirming = 'true';
                deleteRow.innerHTML = `<span class="quran-row-label quran-confirm-label"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg> Confirm delete?</span>`;
                confirmTimer = setTimeout(() => {
                    deleteRow.dataset.confirming = 'false';
                    deleteRow.innerHTML = `<span class="quran-row-label"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Delete block</span>`;
                }, 3500);
            }
        };
        settingsPopover.appendChild(deleteRow);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'quran-settings-btn quran-header-delete-btn';
        deleteBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>';
        deleteBtn.title = 'Delete block';

        let deleteBtnTimer = null;
        deleteBtn.onclick = async (e) => {
            e.stopPropagation();
            if (deleteBtn.classList.contains('quran-confirm-delete')) {
                clearTimeout(deleteBtnTimer);
                deleteBtn.classList.remove('quran-confirm-delete');
                await this.deleteQuranBlock(container);
            } else {
                deleteBtn.classList.add('quran-confirm-delete');
                deleteBtn.title = 'Click again to confirm delete';
                deleteBtnTimer = setTimeout(() => {
                    deleteBtn.classList.remove('quran-confirm-delete');
                    deleteBtn.title = 'Delete block';
                }, 3500);
            }
        };

        settingsBtn.onclick = (e) => {
            e.stopPropagation();
            const isVisible = settingsPopover.style.display !== 'none';
            document.querySelectorAll('.quran-settings-popover').forEach(p => p.style.display = 'none');
            settingsPopover.style.display = isVisible ? 'none' : 'block';
            this._activeOpenSettingsPopover = isVisible ? null : blockKey;
        };

        const onDocClick = (e) => {
            if (!controlsContainer.contains(e.target)) {
                addPopover.style.display = 'none';
                settingsPopover.style.display = 'none';
                if (this._activeOpenSettingsPopover === blockKey) {
                    this._activeOpenSettingsPopover = null;
                }
            }
        };
        document.addEventListener('click', onDocClick);

        controlBar.appendChild(playBtn);
        controlBar.appendChild(stopBtn);
        controlBar.appendChild(repeatContainer);
        controlBar.appendChild(addBtn);
        controlBar.appendChild(settingsBtn);
        controlBar.appendChild(deleteBtn);

        if (this.settings.tafsirPlacement === 'top' || this.settings.tafsirPlacement === 'both') {
            const topTafsirBtn = document.createElement('button');
            topTafsirBtn.className = 'quran-action-btn quran-top-tafsir-btn';
            topTafsirBtn.innerHTML = '<svg viewBox="0 0 24 24" width="11" height="11" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg><span>Tafsir</span>';
            topTafsirBtn.title = 'View Tafsir';
            topTafsirBtn.onclick = (e) => {
                e.stopPropagation();
                this.showTafsir(e, surah, startVerse);
            };
            controlBar.appendChild(topTafsirBtn);
        }

        controlsContainer.appendChild(addPopover);
        controlsContainer.appendChild(settingsPopover);

        if (!audioEnabled) {
            controls.audioControls.forEach(el => el.style.display = 'none');
        }

        const existingNavBar = container.querySelector('.quran-nav-bar');
        if (existingNavBar) {
            controlsContainer.insertBefore(existingNavBar, controlsContainer.firstChild);
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

        audio.playbackRate = this.settings.defaultPlaybackSpeed || 1.0;
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
        if (!this.settings.showFloatingMiniPlayer) {
            this.hideMiniPlayer();
            return;
        }
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
            if (this.settings.autoScrollAudio) {
                const rect = verseDiv.getBoundingClientRect();
                const windowHeight = window.innerHeight || document.documentElement.clientHeight;
                const isInView = rect.top >= 40 && rect.bottom <= windowHeight - 40;
                if (!isInView) {
                    verseDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
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
                let actionsDiv = ve.div.querySelector('.quran-verse-actions');
                if (!actionsDiv) {
                    actionsDiv = ve.div.createDiv({ cls: 'quran-verse-actions' });
                }
                const ap = this.createAudioPlayer(state.reciter, state.surah, verse.numberInSurah, ve.div, rangeControls);
                actionsDiv.insertBefore(ap, actionsDiv.firstChild);
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
            const actionsDiv = ve.div.querySelector('.quran-verse-actions');
            if (actionsDiv && actionsDiv.children.length === 0) {
                actionsDiv.remove();
            }
        });
        if (state.rangeControls && state.rangeControls.audioControls) {
            state.rangeControls.audioControls.forEach(el => el.style.display = 'none');
        }
    }

    fetchJson(url, timeoutMs = 2500) {
        if (typeof navigator !== 'undefined' && navigator.onLine === false) {
            return Promise.reject(new Error('Offline'));
        }
        const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
        const signal = controller ? controller.signal : undefined;
        const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
        return fetch(url, { signal })
            .then(r => {
                if (timer) clearTimeout(timer);
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json();
            })
            .catch(err => {
                if (timer) clearTimeout(timer);
                throw err;
            });
    }

    async getSurahTafsir(surah, tafsirInfo = null) {
        if (!this._tafsirCache) this._tafsirCache = {};
        const info = tafsirInfo || TAFSIR_VERSIONS.find(t => t.id === this.settings.tafsirVersion) || TAFSIR_VERSIONS[0];
        const cacheKey = `quran-tafsir-${surah}-${info.id}`;

        if (this._tafsirCache[cacheKey]) {
            return this._tafsirCache[cacheKey];
        }

        const cached = await this.getDiskCache(cacheKey);
        if (cached && Object.keys(cached).length > 0) {
            this._tafsirCache[cacheKey] = cached;
            return cached;
        }

        if (!this._inFlightTafsirRequests) this._inFlightTafsirRequests = {};
        if (this._inFlightTafsirRequests[cacheKey]) {
            return await this._inFlightTafsirRequests[cacheKey];
        }

        const task = (async () => {
            try {
                const qdcId = info.qdcId || 169;
                const url = `https://api.qurancdn.com/api/qdc/tafsirs/${qdcId}/by_chapter/${surah}?per_page=300`;
                const data = await this.fetchJson(url);
                const tafsirs = data?.tafsirs || [];
                if (tafsirs.length > 0) {
                    const anchors = [];
                    tafsirs.forEach((t, i) => {
                        if (t.text && t.text.trim().length > 0) {
                            anchors.push({ verse: i + 1, text: t.text });
                        }
                    });
                    const map = {};
                    const total = tafsirs.length;
                    for (let idx = 0; idx < anchors.length; idx++) {
                        const cur = anchors[idx];
                        const next = anchors[idx + 1];
                        const start = cur.verse;
                        const end = next ? next.verse - 1 : total;
                        const rangeLabel = start === end ? 'Tafsir' : `Tafsir (${start}–${end})`;
                        map[start] = { hasTafsir: true, anchorVerse: start, startVerse: start, endVerse: end, rangeLabel, text: cur.text };
                        for (let v = start + 1; v <= end; v++) {
                            map[v] = { hasTafsir: false, anchorVerse: start, startVerse: start, endVerse: end, rangeLabel };
                        }
                    }
                    if (Object.keys(map).length > 0) {
                        await this.setDiskCache(cacheKey, map);
                        this._tafsirCache[cacheKey] = map;
                        return map;
                    }
                }
            } catch {}
            return null;
        })();

        this._inFlightTafsirRequests[cacheKey] = task;
        try {
            return await task;
        } finally {
            delete this._inFlightTafsirRequests[cacheKey];
        }
    }

    async showTafsir(event, surah, verse) {
        const existing = document.querySelector('.quran-tafsir-popover');
        if (existing) existing.remove();

        const tafsirInfo = TAFSIR_VERSIONS.find(t => t.id === this.settings.tafsirVersion) || TAFSIR_VERSIONS[0];
        const popover = document.createElement('div');
        popover.className = 'quran-tafsir-popover';
        popover.innerHTML = '<div class="quran-tafsir-loading">Loading tafsir...</div>';
        document.body.appendChild(popover);

        const setupClose = () => {
            const closeHandler = (e) => {
                if (!popover.contains(e.target) && e.target !== event?.currentTarget) {
                    popover.remove();
                    document.removeEventListener('click', closeHandler, true);
                }
            };
            setTimeout(() => document.addEventListener('click', closeHandler, true), 0);
        };

        try {
            const tafsirMap = await this.getSurahTafsir(surah, tafsirInfo);
            let entry = tafsirMap ? tafsirMap[verse] : null;
            if (entry && !entry.hasTafsir && entry.anchorVerse) {
                entry = tafsirMap[entry.anchorVerse];
            }

            if (entry && entry.text) {
                const rangeStr = entry.startVerse === entry.endVerse ? `${surah}:${entry.startVerse}` : `${surah}:${entry.startVerse}–${entry.endVerse}`;
                popover.innerHTML = `
                    <div class="quran-tafsir-header">
                        <span class="quran-tafsir-title">${tafsirInfo.apiName} (${rangeStr})</span>
                        <button class="quran-tafsir-close">&times;</button>
                    </div>
                    <div class="quran-tafsir-body">${entry.text}</div>
                `;
                popover.querySelector('.quran-tafsir-close').addEventListener('click', () => popover.remove());
                setupClose();
                return;
            }
        } catch {}

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

        setupClose();
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

    async clearAllCache() {
        const keys = Object.keys(localStorage).filter(k => k.startsWith('quran-'));
        keys.forEach(k => localStorage.removeItem(k));
        this._memCache = {};
        this._wbwCache = {};
        this._tafsirCache = {};
        this._v4PageFontsLoaded = new Set();
        let diskFilesCount = 0;
        try {
            const adapter = this.app.vault.adapter;
            const pluginDir = this.getPluginDir();
            const cacheDir = `${pluginDir}/cache`;
            if (await adapter.exists(cacheDir)) {
                const list = await adapter.list(cacheDir);
                if (list && list.files) {
                    for (const f of list.files) {
                        await adapter.remove(f);
                        diskFilesCount++;
                    }
                }
                const fontsDir = `${cacheDir}/fonts`;
                if (await adapter.exists(fontsDir)) {
                    const fontList = await adapter.list(fontsDir);
                    if (fontList && fontList.files) {
                        for (const f of fontList.files) {
                            await adapter.remove(f);
                            diskFilesCount++;
                        }
                    }
                }
            }
        } catch {}
        return { localKeys: keys.length, diskFiles: diskFilesCount };
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
                await this.ensureQpcV4Data();
            }

            const arabicCacheKey = `quran-surah-${surah}`;
            const pageMapCacheKey = `quran-surah-${surah}-page-map`;
            const transCacheKey = `quran-surah-${surah}-trans-${transInfo.source}-${transInfo.id}`;

            let arabicCached = await this.getDiskCache(arabicCacheKey);
            if (!arabicCached) {
                arabicCached = await this.getBundledTajweedSurah(surah);
                if (arabicCached) {
                    await this.setDiskCache(arabicCacheKey, arabicCached);
                }
            }

            if (!arabicCached && typeof navigator !== 'undefined' && navigator.onLine) {
                try {
                    const fetches = [
                        this.fetchJson(`https://api.alquran.cloud/v1/surah/${surah}/quran-tajweed`),
                        this.fetchJson(`https://api.alquran.cloud/v1/surah/${surah}/en.transliteration`).catch(() => null)
                    ];
                    const [arabicData, transliterationFetchData] = await Promise.all(fetches);
                    if (arabicData) {
                        arabicCached = {
                            arabicData,
                            transliterationFetchData: transliterationFetchData || null
                        };
                        await this.setDiskCache(arabicCacheKey, arabicCached);
                    }
                } catch {}
            } else if (arabicCached && !arabicCached.transliterationFetchData && typeof navigator !== 'undefined' && navigator.onLine) {
                this.fetchJson(`https://api.alquran.cloud/v1/surah/${surah}/en.transliteration`)
                    .then(async transliterationFetchData => {
                        if (transliterationFetchData) {
                            arabicCached.transliterationFetchData = transliterationFetchData;
                            await this.setDiskCache(arabicCacheKey, arabicCached);
                        }
                    })
                    .catch(() => {});
            }

            let pageMapCached = null;
            if (this.settings.experimentalV4Tajweed) {
                pageMapCached = await this.getDiskCache(pageMapCacheKey);
                if (!pageMapCached) {
                    if (typeof navigator !== 'undefined' && navigator.onLine) {
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
                    }

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
                if (!transCached && typeof navigator !== 'undefined' && navigator.onLine) {
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
                        if (transCached?.translationData) {
                            await this.setDiskCache(transCacheKey, transCached);
                        }
                    } catch {
                        transCached = { translationData: null };
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

            const surahName = SURAHS.find(s => s.number === surah)?.name || `Surah ${surah}`;
            container.dataset.quranRef = `${surah}:${startVerse}-${endVerse}`;
            container.dataset.quranLabel = customLabel || surahName;
            container.dataset.quranVerses = `${startVerse}–${endVerse}`;

            const navBar = container.createDiv({ cls: 'quran-nav-bar' });

            if (this.settings.useRichSurahPicker !== false) {
                const pickerBtn = navBar.createEl('button', { cls: 'quran-nav-picker-btn' });
                pickerBtn.type = 'button';
                pickerBtn.title = 'Choose Surah & Verse range';

                const sInfo = SURAHS.find(s => s.number === surah) || SURAHS[0];

                pickerBtn.innerHTML = `
                    <span class="quran-picker-btn-icon"><svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2" fill="none"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></span>
                    <span class="quran-picker-btn-name">${surah}. ${sInfo.name}</span>
                    <span class="quran-picker-btn-verses">${startVerse}–${endVerse}</span>
                    <svg class="quran-picker-btn-chevron" viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2.5" fill="none"><polyline points="6 9 12 15 18 9"/></svg>
                `;

                pickerBtn.onclick = (e) => {
                    e.stopPropagation();
                    const isVerseClick = e.target.closest('.quran-picker-btn-verses') !== null;
                    this.openSurahPicker(container, el, surah, startVerse, endVerse, isVerseClick ? 'range' : 'surah');
                };
            } else {
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
            }

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
                await this.ensureQpcV4Data();
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

            let tafsirMap = null;
            if (this.settings.tafsirPlacement === 'inline' || this.settings.tafsirPlacement === 'both') {
                const tafsirInfo = TAFSIR_VERSIONS.find(t => t.id === this.settings.tafsirVersion) || TAFSIR_VERSIONS[0];
                const tafsirCacheKey = `quran-tafsir-${surah}-${tafsirInfo.id}`;
                tafsirMap = this._tafsirCache?.[tafsirCacheKey] || await this.getDiskCache(tafsirCacheKey);
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
                    this.renderStandardVerse(textSpan, surah, verse);
                }

                const hideBadge = this.settings.experimentalV4Tajweed && this.settings.autoHideDuplicateVerseNumbersInV4;
                if (this.settings.showVerseNumbers && !hideBadge) {
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

                if (this.settings.tafsirPlacement === 'inline' || this.settings.tafsirPlacement === 'both') {
                    const ayahNum = verse.numberInSurah;
                    const tafsirEntry = tafsirMap ? tafsirMap[ayahNum] : null;
                    const shouldShowTafsir = !this.settings.thematicTafsirOnly || !tafsirMap || (tafsirEntry && tafsirEntry.hasTafsir);
                    if (shouldShowTafsir) {
                        const actionsDiv = verseDiv.createDiv({ cls: 'quran-verse-actions' });
                        const tafsirBtn = actionsDiv.createEl('button', { cls: 'quran-action-btn quran-tafsir-btn' });
                        const btnLabel = tafsirEntry?.rangeLabel || 'Tafsir';
                        tafsirBtn.innerHTML = `<svg viewBox="0 0 24 24" width="11" height="11" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg><span>${btnLabel}</span>`;
                        tafsirBtn.title = tafsirEntry ? `View Tafsir for verses ${tafsirEntry.startVerse}–${tafsirEntry.endVerse}` : 'View Tafsir';
                        tafsirBtn.addEventListener('click', (e) => {
                            e.stopPropagation();
                            this.showTafsir(e, surah, ayahNum);
                        });
                    }
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
                    let actionsDiv = ve.div.querySelector('.quran-verse-actions');
                    if (!actionsDiv) {
                        actionsDiv = ve.div.createDiv({ cls: 'quran-verse-actions' });
                    }
                    const ap = this.createAudioPlayer(reciter, surah, verse.numberInSurah, ve.div, state.rangeControls);
                    actionsDiv.insertBefore(ap, actionsDiv.firstChild);
                    ve.audioPlayer = ap;
                });
            }

            container.dataset.quranRef = `${surah}:${startVerse}-${endVerse}`;
            container.dataset.quranLabel = customLabel || surahName;
            container.dataset.quranVerses = `${startVerse}–${endVerse}`;

            const nextRefBelow = this.getNextRange(surah, startVerse, endVerse, 'below');
            const footer = container.createDiv({ cls: 'quran-block-footer' });

            const footerContinueBtn = footer.createEl('button', { cls: 'quran-footer-icon-btn' });
            footerContinueBtn.innerHTML = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>';
            footerContinueBtn.title = `Continue with ${nextRefBelow}`;
            footerContinueBtn.onclick = async (e) => {
                e.stopPropagation();
                await this.insertQuranBlock(container, 'below');
            };

            const footerNewBtn = footer.createEl('button', { cls: 'quran-footer-icon-btn' });
            footerNewBtn.innerHTML = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
            footerNewBtn.title = 'New block (1:1)';
            footerNewBtn.onclick = async (e) => {
                e.stopPropagation();
                await this.insertQuranBlock(container, 'below', '1:1');
            };

            const footerDeleteBtn = footer.createEl('button', { cls: 'quran-footer-icon-btn quran-footer-delete-btn' });
            footerDeleteBtn.innerHTML = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>';
            footerDeleteBtn.title = 'Delete block';
            let footerDeleteTimer = null;
            footerDeleteBtn.onclick = async (e) => {
                e.stopPropagation();
                if (footerDeleteBtn.classList.contains('quran-confirm-delete')) {
                    clearTimeout(footerDeleteTimer);
                    footerDeleteBtn.classList.remove('quran-confirm-delete');
                    await this.deleteQuranBlock(container);
                } else {
                    footerDeleteBtn.classList.add('quran-confirm-delete');
                    footerDeleteBtn.title = 'Click again to confirm delete';
                    footerDeleteTimer = setTimeout(() => {
                        footerDeleteBtn.classList.remove('quran-confirm-delete');
                        footerDeleteBtn.title = 'Delete block';
                    }, 3500);
                }
            };

            this.debounceRebuildIndex(150);
        } else {
            const verseDiv = container.createDiv({ cls: 'quran-verse' });
            verseDiv.innerHTML = this.parseTajweed(source);
        }
    }

    getActiveNoteFile() {
        let file = this.app.workspace.getActiveFile();
        if (file) return file;
        const { MarkdownView } = require('obsidian');
        const view = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (view?.file) return view.file;
        const container = document.querySelector('.quran-tajweed-container');
        if (container) return this.getFileForContainer(container);
        const mdLeaves = this.app.workspace.getLeavesOfType('markdown');
        for (const leaf of mdLeaves) {
            if (leaf.view?.file) return leaf.view.file;
        }
        return null;
    }

    debounceRebuildIndex(delay = 150) {
        clearTimeout(this._indexBuildTimer);
        this._indexBuildTimer = setTimeout(() => this.buildIndexFromFile(), delay);
    }

    rebuildIndexFromDOM() {
        this.debounceRebuildIndex(50);
    }

    async buildIndexFromFile() {
        if (!this.settings.showSideIndexWheel) {
            const existing = document.querySelector('.quran-page-index');
            if (existing) this.renderIndexFromBlocks([]);
            return;
        }
        const file = this.getActiveNoteFile();
        if (!file || file.extension !== 'md') return;

        let content;
        try {
            content = await this.app.vault.read(file);
        } catch (e) { return; }

        const blocks = [];
        const lines = content.split('\n');
        let inBlock = false;
        let blockLines = [];
        let startLine = 0;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (!inBlock && line.trim().startsWith('```quran')) {
                inBlock = true;
                startLine = i;
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
                        ref: `${ref.surah}:${ref.startVerse}-${ref.endVerse}`,
                        line: startLine
                    });
                }
            } else if (inBlock) {
                blockLines.push(line);
            }
        }

        this.renderIndexFromBlocks(blocks);
    }

    renderIndexFromBlocks(blocks) {
        if (!this.settings.showSideIndexWheel) {
            const existing = document.querySelector('.quran-page-index');
            if (existing) {
                if (existing._scrollListeners) existing._scrollListeners.forEach(({ el, fn }) => el.removeEventListener('scroll', fn));
                if (existing._docListeners) existing._docListeners.forEach(({ type, fn }) => document.removeEventListener(type, fn));
                if (existing._winListeners) existing._winListeners.forEach(({ type, fn }) => window.removeEventListener(type, fn));
                if (typeof existing._clearBufferTimer === 'function') existing._clearBufferTimer();
                clearTimeout(existing._scrollLockTimer);
                existing.remove();
            }
            return;
        }

        const existing = document.querySelector('.quran-page-index');
        if (existing && existing._blocks && existing._blocks.length === blocks.length) {
            const isSame = blocks.every((b, i) => {
                const eb = existing._blocks[i];
                return eb && eb.ref === b.ref && eb.label === b.label && eb.verses === b.verses && eb.line === b.line;
            });
            if (isSame) return;
        }
        const wasOpen = existing ? existing.classList.contains('quran-index-open') : false;
        const prevIdx = existing?._activeIdx ?? 0;

        if (existing?._scrollListeners) {
            existing._scrollListeners.forEach(({ el, fn }) => el.removeEventListener('scroll', fn));
        }
        if (existing?._docListeners) {
            existing._docListeners.forEach(({ type, fn }) => document.removeEventListener(type, fn));
        }
        if (existing?._winListeners) {
            existing._winListeners.forEach(({ type, fn }) => window.removeEventListener(type, fn));
        }
        if (typeof existing?._clearBufferTimer === 'function') {
            existing._clearBufferTimer();
        }
        clearTimeout(existing?._scrollLockTimer);
        clearTimeout(existing?._resizeTimer);
        if (existing?._scrollRaf) cancelAnimationFrame(existing._scrollRaf);

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

        if (wasOpen) {
            index.classList.add('quran-index-open');
        }

        index._blocks = blocks;
        index._activeIdx = Math.min(prevIdx, blocks.length - 1);
        index._scrollListeners = [];
        index._docListeners = [];
        index._winListeners = [];
        index.innerHTML = '';

        const itemHeight = 42;
        const wheelHeight = 210;
        const halfH = wheelHeight / 2;
        const padY = (wheelHeight - itemHeight) / 2;
        let isProgrammaticScroll = false;
        let findActiveIdx = () => 0;

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
                        const currentNoteIdx = Math.min(Math.max(0, findActiveIdx()), blocks.length - 1);
                        index._activeIdx = currentNoteIdx;
                        isProgrammaticScroll = true;
                        wheelScroll.scrollTo({ top: currentNoteIdx * itemHeight, behavior: 'instant' });
                        setTimeout(() => { isProgrammaticScroll = false; }, 50);
                        updateWheelVisuals(currentNoteIdx);
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
        counter.textContent = `${index._activeIdx + 1}/${blocks.length}`;

        const closeBtn = document.createElement('button');
        closeBtn.className = 'quran-index-close';
        closeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
        closeBtn.onclick = (e) => {
            e.stopPropagation();
            if (typeof clearBufferTimer === 'function') clearBufferTimer();
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

        let isPointerDown = false;
        let pointerStartY = 0;
        let pointerStartScroll = 0;
        let pointerDidMove = false;
        let isWheelUserScrolling = false;
        let scrollSettleTimer = null;
        let rAF = null;

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
                if (pointerDidMove) return;
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

        let bufferNavTimer = null;

        const clearBufferTimer = () => {
            if (bufferNavTimer) {
                clearTimeout(bufferNavTimer);
                bufferNavTimer = null;
            }
            if (lens) lens.classList.remove('quran-lens-settling');
            itemElements.forEach(el => el.classList.remove('quran-wheel-settling'));
        };
        index._clearBufferTimer = clearBufferTimer;

        const startBufferTimer = (targetIdx, delay = 400) => {
            clearBufferTimer();
            if (targetIdx < 0 || targetIdx >= blocks.length) return;
            if (lens) lens.classList.add('quran-lens-settling');
            if (itemElements[targetIdx]) {
                itemElements[targetIdx].classList.add('quran-wheel-settling');
            }
            bufferNavTimer = setTimeout(() => {
                clearBufferTimer();
                if (blocks[targetIdx]) {
                    navigateToBlock(blocks[targetIdx], targetIdx);
                }
            }, delay);
        };

        const snapWheel = () => {
            const snappedIdx = Math.max(0, Math.min(blocks.length - 1, Math.round(wheelScroll.scrollTop / itemHeight)));
            const targetScroll = snappedIdx * itemHeight;
            if (Math.abs(wheelScroll.scrollTop - targetScroll) > 1) {
                isProgrammaticScroll = true;
                wheelScroll.scrollTo({ top: targetScroll, behavior: 'smooth' });
                setTimeout(() => { isProgrammaticScroll = false; }, 260);
            }
            index._activeIdx = snappedIdx;
            updateWheelVisuals(snappedIdx);
            return snappedIdx;
        };

        const findTargetContainer = (b, idx) => {
            if (!b || !b.ref) return null;
            const containers = getContainers();
            if (containers.length === 0) return null;

            let occurrenceIdx = 0;
            for (let i = 0; i < idx; i++) {
                if (blocks[i].ref === b.ref) occurrenceIdx++;
            }

            const matching = containers.filter(c => c.dataset.quranRef === b.ref);
            if (matching.length > 0) {
                return matching[occurrenceIdx] || matching[matching.length - 1];
            }

            return null;
        };

        const navigateToBlock = (b, idx) => {
            if (!b) return;
            index._scrollLocked = true;
            clearTimeout(index._scrollLockTimer);
            index._scrollLockTimer = setTimeout(() => { index._scrollLocked = false; }, 1600);

            const flashElement = (el) => {
                el.classList.remove('quran-block-flash');
                void el.offsetWidth;
                el.classList.add('quran-block-flash');
                setTimeout(() => el.classList.remove('quran-block-flash'), 1500);
            };

            const getActiveScroller = (el) => {
                return (el && el.closest('.markdown-preview-view, .cm-scroller'))
                    || document.querySelector('.workspace-leaf.mod-active .markdown-preview-view')
                    || document.querySelector('.workspace-leaf.mod-active .cm-scroller')
                    || (el && el.closest('.view-content'))
                    || document.querySelector('.markdown-preview-view')
                    || document.querySelector('.cm-scroller')
                    || document.documentElement;
            };

            const smoothScrollTo = (container, targetTop, duration = 460) => {
                const startTop = container.scrollTop;
                const diff = targetTop - startTop;
                if (Math.abs(diff) < 2) return;
                const startTime = performance.now();
                const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

                const step = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    container.scrollTop = startTop + diff * easeOutCubic(progress);
                    if (progress < 1) {
                        requestAnimationFrame(step);
                    }
                };
                requestAnimationFrame(step);
            };

            const scrollToElement = (el, smooth = true) => {
                const scrollEl = getActiveScroller(el);
                if (scrollEl && scrollEl !== document.documentElement) {
                    const elRect = el.getBoundingClientRect();
                    const scrollerRect = scrollEl.getBoundingClientRect();
                    const offsetTop = Math.max(0, scrollEl.scrollTop + (elRect.top - scrollerRect.top) - 30);
                    if (smooth) {
                        smoothScrollTo(scrollEl, offsetTop, 460);
                    } else {
                        scrollEl.scrollTop = offsetTop;
                    }
                } else {
                    el.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant', block: 'start' });
                }
                flashElement(el);
            };

            const target = findTargetContainer(b, idx);
            if (target) {
                scrollToElement(target, true);
                clearTimeout(index._scrollLockTimer);
                index._scrollLockTimer = setTimeout(() => { index._scrollLocked = false; }, 800);
                return;
            }

            const { MarkdownView } = require('obsidian');
            const view = this.app?.workspace?.getActiveViewOfType(MarkdownView);

            if (view && typeof b.line === 'number') {
                if (typeof view.setEphemeralState === 'function') {
                    view.setEphemeralState({ line: b.line });
                }
                if (view.previewMode && typeof view.previewMode.applyScroll === 'function') {
                    view.previewMode.applyScroll(b.line);
                }
                if (view.editor && typeof view.editor.scrollIntoView === 'function') {
                    view.editor.scrollIntoView({ from: { line: b.line, ch: 0 }, to: { line: b.line, ch: 0 } }, true);
                }
            } else {
                const scrollEl = getActiveScroller(null);
                if (scrollEl && typeof b.line === 'number') {
                    const lastLine = (blocks.length > 0 && typeof blocks[blocks.length - 1].line === 'number')
                        ? blocks[blocks.length - 1].line + 30
                        : 100;
                    const maxScroll = scrollEl.scrollHeight - scrollEl.clientHeight;
                    const targetTop = Math.max(0, (b.line / Math.max(1, lastLine)) * maxScroll);
                    smoothScrollTo(scrollEl, targetTop, 460);
                }
            }

            const checkInterval = (attemptsLeft) => {
                if (attemptsLeft <= 0) {
                    index._scrollLocked = false;
                    return;
                }
                const found = findTargetContainer(b, idx);
                if (found) {
                    scrollToElement(found, true);
                    clearTimeout(index._scrollLockTimer);
                    index._scrollLockTimer = setTimeout(() => { index._scrollLocked = false; }, 800);
                    return;
                }
                setTimeout(() => checkInterval(attemptsLeft - 1), 60);
            };

            setTimeout(() => checkInterval(20), 60);
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
            clearBufferTimer();
            const clamped = Math.max(0, Math.min(blocks.length - 1, idx));
            index._activeIdx = clamped;
            isProgrammaticScroll = true;
            wheelScroll.scrollTo({ top: clamped * itemHeight, behavior: 'smooth' });
            setTimeout(() => { isProgrammaticScroll = false; }, 260);
            updateWheelVisuals(clamped);
            if (scrollToNote && blocks[clamped]) {
                navigateToBlock(blocks[clamped], clamped);
            }
        };

        const onUserScrollSettled = () => {
            if (isPointerDown) return;
            isWheelUserScrolling = false;
            snapWheel();
        };

        wheelScroll.addEventListener('scroll', () => {
            if (rAF) cancelAnimationFrame(rAF);
            rAF = requestAnimationFrame(() => {
                const currentIdx = Math.max(0, Math.min(blocks.length - 1, Math.round(wheelScroll.scrollTop / itemHeight)));
                updateWheelVisuals(currentIdx);
            });

            if (!isWheelUserScrolling || isProgrammaticScroll) return;

            clearBufferTimer();
            clearTimeout(scrollSettleTimer);
            scrollSettleTimer = setTimeout(onUserScrollSettled, 140);
        }, { passive: true });

        wheelScroll.addEventListener('scrollend', () => {
            if (!isWheelUserScrolling || isProgrammaticScroll || isPointerDown) return;
            clearTimeout(scrollSettleTimer);
            onUserScrollSettled();
        }, { passive: true });

        wheelScroll.addEventListener('wheel', () => {
            if (isProgrammaticScroll || !index.classList.contains('quran-index-open')) return;
            clearBufferTimer();
            isWheelUserScrolling = true;
            clearTimeout(scrollSettleTimer);
            scrollSettleTimer = setTimeout(onUserScrollSettled, 140);
        }, { passive: true });

        wheelScroll.addEventListener('pointerdown', (e) => {
            clearBufferTimer();
            clearTimeout(scrollSettleTimer);
            isPointerDown = true;
            isWheelUserScrolling = true;
            pointerDidMove = false;
            pointerStartY = e.clientY;
            pointerStartScroll = wheelScroll.scrollTop;
            wheelScroll.classList.add('quran-wheel-grabbing');
        });

        const onWheelPointerMove = (e) => {
            if (!isPointerDown) return;
            const deltaY = e.clientY - pointerStartY;
            if (Math.abs(deltaY) > 4) {
                pointerDidMove = true;
            }
            if (e.pointerType === 'mouse' && e.buttons === 1) {
                wheelScroll.scrollTop = pointerStartScroll - deltaY;
            }
        };

        const finishPointer = () => {
            if (!isPointerDown) return;
            isPointerDown = false;
            wheelScroll.classList.remove('quran-wheel-grabbing');
            if (pointerDidMove) {
                clearTimeout(scrollSettleTimer);
                scrollSettleTimer = setTimeout(onUserScrollSettled, 80);
                setTimeout(() => { pointerDidMove = false; }, 120);
            } else {
                isWheelUserScrolling = false;
            }
        };

        window.addEventListener('pointermove', onWheelPointerMove);
        window.addEventListener('pointerup', finishPointer);
        window.addEventListener('pointercancel', finishPointer);
        index._winListeners.push({ type: 'pointermove', fn: onWheelPointerMove });
        index._winListeners.push({ type: 'pointerup', fn: finishPointer });
        index._winListeners.push({ type: 'pointercancel', fn: finishPointer });

        const onDocClick = (e) => {
            if (!index.contains(e.target)) {
                clearBufferTimer();
                index.classList.remove('quran-index-open');
            }
        };
        const onDocKeyDown = (e) => {
            if (e.key === 'Escape') {
                clearBufferTimer();
                index.classList.remove('quran-index-open');
            }
        };
        document.addEventListener('click', onDocClick);
        document.addEventListener('keydown', onDocKeyDown);
        index._docListeners.push({ type: 'click', fn: onDocClick });
        index._docListeners.push({ type: 'keydown', fn: onDocKeyDown });

        findActiveIdx = () => {
            const containers = getContainers();
            if (containers.length === 0) return index._activeIdx ?? 0;
            const viewH = window.innerHeight;
            let bestIdx = -1;
            let bestScore = -Infinity;
            containers.forEach((c, domIdx) => {
                const rect = c.getBoundingClientRect();
                if (rect.bottom < 0 || rect.top > viewH) return;
                const visible = Math.min(rect.bottom, viewH) - Math.max(rect.top, 0);
                if (visible > bestScore) {
                    bestScore = visible;
                    const ref = c.dataset.quranRef;
                    let occ = 0;
                    for (let k = 0; k < domIdx; k++) {
                        if (containers[k].dataset.quranRef === ref) occ++;
                    }
                    let blockOcc = 0;
                    let matched = -1;
                    for (let bIdx = 0; bIdx < blocks.length; bIdx++) {
                        if (blocks[bIdx].ref === ref) {
                            if (blockOcc === occ) {
                                matched = bIdx;
                                break;
                            }
                            blockOcc++;
                        }
                    }
                    bestIdx = matched >= 0 ? matched : (index._activeIdx ?? 0);
                }
            });
            return bestIdx >= 0 ? bestIdx : (index._activeIdx ?? 0);
        };

        let scrollRaf = null;
        let isResizing = false;
        let resizeTimer = null;

        const onResize = () => {
            isResizing = true;
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                isResizing = false;
                onNoteScroll();
            }, 120);
        };
        window.addEventListener('resize', onResize, { passive: true });
        index._winListeners.push({ type: 'resize', fn: onResize });
        index._resizeTimer = resizeTimer;

        const onNoteScroll = () => {
            if (isResizing || index._scrollLocked || isWheelUserScrolling || isPointerDown) return;
            clearBufferTimer();
            if (index.classList.contains('quran-index-open')) return;
            if (scrollRaf) return;
            scrollRaf = requestAnimationFrame(() => {
                scrollRaf = null;
                index._scrollRaf = null;
                if (isResizing || index._scrollLocked || isWheelUserScrolling || isPointerDown) return;
                if (index.classList.contains('quran-index-open')) return;
                const idx = findActiveIdx();
                if (idx !== index._activeIdx) {
                    index._activeIdx = idx;
                    isProgrammaticScroll = true;
                    wheelScroll.scrollTop = idx * itemHeight;
                    requestAnimationFrame(() => { isProgrammaticScroll = false; });
                    updateWheelVisuals(idx);
                }
            });
            index._scrollRaf = scrollRaf;
        };

        const addScrollListener = (target) => {
            target.addEventListener('scroll', onNoteScroll, { passive: true });
            index._scrollListeners.push({ el: target, fn: onNoteScroll });
        };

        addScrollListener(window);
        const seen = new Set([window]);
        const activeLeafScrollers = document.querySelectorAll('.workspace-leaf.mod-active .markdown-preview-view, .workspace-leaf.mod-active .cm-scroller, .workspace-leaf.mod-active .view-content');
        const targetScrollers = activeLeafScrollers.length > 0
            ? activeLeafScrollers
            : document.querySelectorAll('.markdown-preview-view, .cm-scroller');
        targetScrollers.forEach(el => {
            if (!seen.has(el)) { seen.add(el); addScrollListener(el); }
        });

        const initialIdx = Math.min(Math.max(0, findActiveIdx()), blocks.length - 1);
        index._activeIdx = initialIdx;
        wheelScroll.scrollTop = initialIdx * itemHeight;
        updateWheelVisuals(initialIdx);
    }

    refreshQuranIndex(el) {
        this.debounceRebuildIndex(50);
    }

    getBlockLineRange(container, lines) {
        const st = container._quranState || {};

        try {
            if (st.ctx) {
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
            }
        } catch (e) {}

        const allContainers = Array.from(document.querySelectorAll('.quran-tajweed-container'));
        const containerIndex = allContainers.indexOf(container);

        const blockRanges = [];
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim().startsWith('```quran')) {
                let end = lines.length;
                let blockRef = null;
                for (let j = i + 1; j < lines.length; j++) {
                    if (lines[j].trim() === '```') {
                        end = j;
                        break;
                    }
                    const m = lines[j].trim().match(/^(\d{1,3}):(\d{1,3})(?:-(\d{1,3}))?$/);
                    if (m) blockRef = m[0];
                }
                blockRanges.push({ start: i, end, ref: blockRef });
            }
        }

        const targetRef = container.dataset.quranRef;
        if (targetRef && blockRanges.length > 0) {
            const parsedTarget = this.extractVerseReference(targetRef);
            if (parsedTarget) {
                const matches = blockRanges.filter(b => {
                    if (!b.ref) return false;
                    const pb = this.extractVerseReference(b.ref);
                    return pb && pb.surah === parsedTarget.surah && pb.startVerse === parsedTarget.startVerse;
                });
                if (matches.length === 1) return matches[0];
            }
        }

        if (containerIndex >= 0 && containerIndex < blockRanges.length) {
            return blockRanges[containerIndex];
        }

        return blockRanges[0] || null;
    }

    getFileForContainer(container) {
        const st = container._quranState;
        if (st && st.ctx && st.ctx.sourcePath) {
            const file = this.app.vault.getAbstractFileByPath(st.ctx.sourcePath);
            if (file) return file;
        }
        const view = this.app.workspace.getActiveViewOfType(MarkdownView);
        return view ? view.file : null;
    }

    getNextRange(surah, startVerse, endVerse, position = 'below') {
        const span = Math.max(1, endVerse - startVerse + 1);
        const currentSurah = SURAHS.find(s => s.number === surah) || { ayahs: 7 };
        const totalAyahs = currentSurah.ayahs || 7;

        if (position === 'below') {
            if (endVerse < totalAyahs) {
                const nextStart = endVerse + 1;
                const nextEnd = Math.min(totalAyahs, nextStart + span - 1);
                return `${surah}:${nextStart}${nextStart === nextEnd ? '' : `-${nextEnd}`}`;
            } else if (surah < 114) {
                const nextSurah = surah + 1;
                const nextSurahTotal = SURAHS.find(s => s.number === nextSurah)?.ayahs || 7;
                const nextEnd = Math.min(nextSurahTotal, span);
                return `${nextSurah}:1${nextEnd > 1 ? `-${nextEnd}` : ''}`;
            }
            return `${surah}:1${span > 1 ? `-${span}` : ''}`;
        } else {
            if (startVerse > 1) {
                const prevEnd = startVerse - 1;
                const prevStart = Math.max(1, prevEnd - span + 1);
                return `${surah}:${prevStart}${prevStart === prevEnd ? '' : `-${prevEnd}`}`;
            } else if (surah > 1) {
                const prevSurah = surah - 1;
                const prevSurahTotal = SURAHS.find(s => s.number === prevSurah)?.ayahs || 7;
                const prevStart = Math.max(1, prevSurahTotal - span + 1);
                return `${prevSurah}:${prevStart}${prevStart === prevSurahTotal ? '' : `-${prevSurahTotal}`}`;
            }
            return `${surah}:1${span > 1 ? `-${span}` : ''}`;
        }
    }

    async insertQuranBlock(container, position = 'below', customRef = null) {
        const file = this.getFileForContainer(container);
        if (!file) {
            new Notice('Unable to locate note file');
            return;
        }

        let content;
        try {
            content = await this.app.vault.read(file);
        } catch (e) {
            new Notice('Failed to read note file');
            return;
        }

        const lines = content.split('\n');
        const range = this.getBlockLineRange(container, lines);
        if (!range) {
            new Notice('Unable to locate Quran block position');
            return;
        }

        const st = container._quranState || {};
        const surah = st.surah || 1;
        const startVerse = st.startVerse || 1;
        const endVerse = st.endVerse || 1;
        const nextRef = customRef || this.getNextRange(surah, startVerse, endVerse, position);

        const blockParams = [];
        const verseRegex = /^\s*(\d{1,3}):(\d{1,3})(?:-(\d{1,3}))?\s*$/;
        for (let j = range.start + 1; j < range.end; j++) {
            const trimmed = lines[j].trim();
            if (!verseRegex.test(trimmed) && trimmed.length > 0) {
                blockParams.push(lines[j]);
            }
        }

        if (blockParams.length === 0) {
            if (st.audioEnabled !== undefined) blockParams.push(`audio="${st.audioEnabled ? 'on' : 'off'}"`);
            if (st.translationEnabled !== undefined) blockParams.push(`translation="${st.translationEnabled ? 'on' : 'off'}"`);
            if (st.transliterationEnabled !== undefined) blockParams.push(`transliteration="${st.transliterationEnabled ? 'on' : 'off'}"`);
            if (st.reciter && st.reciter !== DEFAULT_RECITER) blockParams.push(`reciter="${st.reciter}"`);
        }

        const newBlock = [
            '```quran',
            ...blockParams,
            nextRef,
            '```'
        ];

        if (position === 'below') {
            lines.splice(range.end + 1, 0, '', ...newBlock);
        } else {
            lines.splice(range.start, 0, ...newBlock, '');
        }

        await this.app.vault.modify(file, lines.join('\n'));
        new Notice(`Added Quran block: ${nextRef}`);
        this.debounceRebuildIndex(50);

        const parsed = this.extractVerseReference(nextRef);
        const expectedRef = parsed ? `${parsed.surah}:${parsed.startVerse}-${parsed.endVerse}` : nextRef;

        const scrollTargetBlock = (attemptsLeft = 20) => {
            const allContainers = Array.from(document.querySelectorAll('.quran-tajweed-container'));
            const targetContainer = allContainers.find(c => c.dataset.quranRef === expectedRef || c.dataset.quranRef === nextRef);
            if (targetContainer) {
                const scrollEl = targetContainer.closest('.markdown-preview-view, .cm-scroller, .view-content')
                    || document.querySelector('.workspace-leaf.mod-active .markdown-preview-view')
                    || document.querySelector('.workspace-leaf.mod-active .cm-scroller');
                if (scrollEl) {
                    const elRect = targetContainer.getBoundingClientRect();
                    const scrollerRect = scrollEl.getBoundingClientRect();
                    const offsetTop = Math.max(0, scrollEl.scrollTop + (elRect.top - scrollerRect.top) - 30);
                    scrollEl.scrollTo({ top: offsetTop, behavior: 'smooth' });
                } else {
                    targetContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                targetContainer.classList.add('quran-block-flash');
                setTimeout(() => targetContainer.classList.remove('quran-block-flash'), 1500);
                return;
            }
            if (attemptsLeft > 0) {
                setTimeout(() => scrollTargetBlock(attemptsLeft - 1), 60);
            }
        };
        setTimeout(() => scrollTargetBlock(), 60);
    }

    async deleteQuranBlock(container) {
        const file = this.getFileForContainer(container);
        if (!file) {
            new Notice('Unable to locate note file');
            return;
        }

        let content;
        try {
            content = await this.app.vault.read(file);
        } catch (e) {
            new Notice('Failed to read note file');
            return;
        }

        const lines = content.split('\n');
        const range = this.getBlockLineRange(container, lines);
        if (!range) {
            new Notice('Unable to locate Quran block to delete');
            return;
        }

        let delStart = range.start;
        let delCount = range.end - range.start + 1;
        if (lines[range.end + 1] !== undefined && lines[range.end + 1].trim() === '') {
            delCount++;
        } else if (delStart > 0 && lines[delStart - 1].trim() === '') {
            delStart--;
            delCount++;
        }

        lines.splice(delStart, delCount);
        container.remove();
        await this.app.vault.modify(file, lines.join('\n'));
        new Notice('Deleted Quran block');
        this.debounceRebuildIndex(50);
    }

    async updateSourceParam(container, key, newVal) {
        const st = container._quranState;
        const paramMap = {
            translationEnabled: 'translation',
            transliterationEnabled: 'transliteration',
            audioEnabled: 'audio'
        };
        const paramName = paramMap[key];
        if (!paramName) return;
        const paramValue = newVal ? 'on' : 'off';

        const file = this.getFileForContainer(container);
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
        const file = this.getFileForContainer(container);
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
                if (parsed && st) {
                    st.surah = parsed.surah;
                    st.startVerse = parsed.startVerse;
                    st.endVerse = parsed.endVerse;
                }
                return;
            }
        }
    }

    async checkForUpdates() {
        if (typeof navigator !== 'undefined' && !navigator.onLine) return;
        try {
            const resp = await requestUrl({
                url: 'https://api.github.com/repos/keemzin/obsidian-tajweed-plugin/releases/latest',
                headers: { 'User-Agent': 'obsidian-tajweed-plugin' }
            });
            const latest = resp.json?.tag_name?.replace(/^v/, '');
            const current = this.manifest.version;
            if (latest && latest !== current) {
                new Notice(`Quran Tajweed: Update v${latest} available (you have v${current}) — download from GitHub`);
            }
        } catch (e) {
            console.debug('Update check failed (no internet or no releases yet)');
        }
    }


};

class QuranTajweedSettingTab extends PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display() {
        const { containerEl } = this;
        containerEl.empty();

        containerEl.createEl('h2', { text: 'Quran Tajweed Plugin Settings' });

        containerEl.createEl('h3', { text: 'Audio Settings' });

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
            .setName('Default Playback Speed')
            .setDesc('Default playback speed for audio recitation.')
            .addDropdown((dropdown) => {
                const speeds = [
                    { val: '0.75', label: '0.75x' },
                    { val: '1', label: '1.0x (Normal)' },
                    { val: '1.25', label: '1.25x' },
                    { val: '1.5', label: '1.5x' },
                    { val: '1.75', label: '1.75x' },
                    { val: '2', label: '2.0x' }
                ];
                speeds.forEach(s => dropdown.addOption(s.val, s.label));
                dropdown.setValue(String(this.plugin.settings.defaultPlaybackSpeed || 1.0));
                dropdown.onChange(async (value) => {
                    this.plugin.settings.defaultPlaybackSpeed = parseFloat(value);
                    await this.plugin.saveSettings();
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

        new Setting(containerEl)
            .setName('Auto-Scroll During Audio')
            .setDesc('Smoothly scroll active verse into view while audio is playing.')
            .addToggle((toggle) => {
                toggle.setValue(this.plugin.settings.autoScrollAudio !== false);
                toggle.onChange(async (value) => {
                    this.plugin.settings.autoScrollAudio = value;
                    await this.plugin.saveSettings();
                });
            });

        new Setting(containerEl)
            .setName('Floating Mini Audio Player')
            .setDesc('Show draggable floating player in bottom corner during audio playback.')
            .addToggle((toggle) => {
                toggle.setValue(this.plugin.settings.showFloatingMiniPlayer !== false);
                toggle.onChange(async (value) => {
                    this.plugin.settings.showFloatingMiniPlayer = value;
                    await this.plugin.saveSettings();
                    if (!value) this.plugin.hideMiniPlayer();
                });
            });

        containerEl.createEl('h3', { text: 'Display & Typography' });

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

        new Setting(containerEl)
            .setName('Auto-Hide Verse Badges in V4 Mode')
            .setDesc('Automatically hide purple verse badges when QCF V4 is enabled since the calligraphy font includes ayah rosettes.')
            .addToggle((toggle) => {
                toggle.setValue(this.plugin.settings.autoHideDuplicateVerseNumbersInV4 !== false);
                toggle.onChange(async (value) => {
                    this.plugin.settings.autoHideDuplicateVerseNumbersInV4 = value;
                    await this.plugin.saveSettings();
                    await this.plugin.rerenderAll();
                });
            });

        containerEl.createEl('h3', { text: 'Word-by-Word & Tajweed Inspector' });

        new Setting(containerEl)
            .setName('Enable Word-by-Word Tooltips')
            .setDesc('Show interactive popover with word translation, transliteration, audio, and active Tajweed rules.')
            .addToggle((toggle) => {
                toggle.setValue(this.plugin.settings.wbwEnabled !== false);
                toggle.onChange(async (value) => {
                    this.plugin.settings.wbwEnabled = value;
                    await this.plugin.saveSettings();
                });
            });

        new Setting(containerEl)
            .setName('Tooltip Trigger')
            .setDesc('Choose whether word popovers appear on hover or on click.')
            .addDropdown((dropdown) => {
                dropdown.addOption('hover', 'Hover (Fast preview)');
                dropdown.addOption('click', 'Click / Tap (Touch friendly)');
                dropdown.setValue(this.plugin.settings.wbwTrigger || 'hover');
                dropdown.onChange(async (value) => {
                    this.plugin.settings.wbwTrigger = value;
                    await this.plugin.saveSettings();
                });
            });

        new Setting(containerEl)
            .setName('Word Pronunciation Audio')
            .setDesc('Show audio play button inside word tooltips for individual word pronunciation.')
            .addToggle((toggle) => {
                toggle.setValue(this.plugin.settings.wbwAudio !== false);
                toggle.onChange(async (value) => {
                    this.plugin.settings.wbwAudio = value;
                    await this.plugin.saveSettings();
                });
            });

        containerEl.createEl('h3', { text: 'Content & Tafsir Settings' });

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
            .setDesc('Show English translation by default.')
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
            .setDesc('Choose which tafsir to show.')
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

        new Setting(containerEl)
            .setName('Tafsir Button Placement')
            .setDesc('Choose where Tafsir access buttons appear.')
            .addDropdown((dropdown) => {
                dropdown.addOption('inline', 'Per Verse (Inline button)');
                dropdown.addOption('top', 'Control Bar (Top bar button)');
                dropdown.addOption('both', 'Both (Top bar and inline)');
                dropdown.addOption('hidden', 'Hidden');
                dropdown.setValue(this.plugin.settings.tafsirPlacement || 'inline');
                dropdown.onChange(async (value) => {
                    this.plugin.settings.tafsirPlacement = value;
                    await this.plugin.saveSettings();
                    await this.plugin.rerenderAll();
                });
            });

        new Setting(containerEl)
            .setName('Thematic Tafsir Grouping')
            .setDesc('Only show inline Tafsir buttons on verses that begin a thematic commentary section (e.g. 1–13) and hide redundant buttons on intermediate verses.')
            .addToggle((toggle) => {
                toggle.setValue(this.plugin.settings.thematicTafsirOnly !== false);
                toggle.onChange(async (value) => {
                    this.plugin.settings.thematicTafsirOnly = value;
                    await this.plugin.saveSettings();
                    await this.plugin.rerenderAll();
                });
            });

        containerEl.createEl('h3', { text: 'Navigation & Sidebar' });

        new Setting(containerEl)
            .setName('Rich Surah & Range Picker')
            .setDesc('Use modern modal picker with search, presets, and verse range controls instead of basic HTML dropdowns.')
            .addToggle((toggle) => {
                toggle.setValue(this.plugin.settings.useRichSurahPicker !== false);
                toggle.onChange(async (value) => {
                    this.plugin.settings.useRichSurahPicker = value;
                    await this.plugin.saveSettings();
                    await this.plugin.rerenderAll();
                });
            });

        new Setting(containerEl)
            .setName('Surah Navigation Wheel')
            .setDesc('Display floating 3D navigation wheel dock on the side of notes containing Quran blocks.')
            .addToggle((toggle) => {
                toggle.setValue(this.plugin.settings.showSideIndexWheel !== false);
                toggle.onChange(async (value) => {
                    this.plugin.settings.showSideIndexWheel = value;
                    await this.plugin.saveSettings();
                    if (!value) {
                        const el = document.querySelector('.quran-page-index');
                        if (el) el.remove();
                    } else {
                        this.plugin.buildIndexFromFile();
                    }
                });
            });

        containerEl.createEl('h3', { text: 'Font Style' });

        new Setting(containerEl)
            .setName('QCF V4 Tajweed Font')
            .setDesc('Render Quranic text using the QPC V4 Mushaf calligraphy font with Tajweed colors. Uses bundled glyph data and page fonts loaded on demand.')
            .addToggle((toggle) => {
                toggle.setValue(this.plugin.settings.experimentalV4Tajweed);
                toggle.onChange(async (value) => {
                    this.plugin.settings.experimentalV4Tajweed = value;
                    await this.plugin.saveSettings();
                    await this.plugin.rerenderAll();
                });
            });

        containerEl.createEl('h3', { text: 'Storage & Cache' });

        new Setting(containerEl)
            .setName('Clear All Cache')
            .setDesc('Remove all cached verses, translations, word-by-word data, and downloaded font files from memory and disk.')
            .addButton(btn => {
                btn.setButtonText('Clear All Cache')
                    .setWarning()
                    .onClick(async () => {
                        btn.setButtonText('Clearing...');
                        btn.setDisabled(true);
                        const result = await this.plugin.clearAllCache();
                        new Notice(`Cleared ${result.localKeys} storage entries and ${result.diskFiles} cached files`);
                        btn.setButtonText(`Cleared (${result.localKeys + result.diskFiles} items)`);
                        setTimeout(() => {
                            btn.setButtonText('Clear All Cache');
                            btn.setDisabled(false);
                        }, 3000);
                    });
            });

        containerEl.createEl('h3', { text: 'About' });
        const aboutDiv = containerEl.createDiv();
        aboutDiv.style.cssText = 'font-size: 0.85em; color: var(--text-muted); padding: 10px 0;';
        aboutDiv.innerHTML = `
            <p><strong>Quran Tajweed Plugin</strong> v${this.plugin.manifest.version}</p>
            <p>Display Quranic verses with Tajweed colors, word-by-word breakdown, audio recitation, translations, and tafsir.</p>
            <p>Data sources: <a href="https://alquran.cloud" target="_blank">AlQuran.cloud</a> | 
               <a href="https://quran.com" target="_blank">Quran.com API</a> | 
               <a href="https://islamic.app" target="_blank">Islamic.app</a> | 
               Audio: <a href="https://quran.com" target="_blank">Quran.com CDN</a></p>
        `;
    }
}

class QuranSurahPickerModal extends Modal {
    constructor(app, plugin, container, renderEl, initialData = {}) {
        super(app);
        this.plugin = plugin;
        this.container = container;
        this.renderEl = renderEl;
        this.currentSurah = initialData.surah || 1;
        this.currentStartVerse = initialData.startVerse || 1;
        this.currentEndVerse = initialData.endVerse || 7;
        this.viewMode = initialData.initialMode === 'range' ? 'range' : 'surah';
        this.selectedSurah = this.currentSurah;
        this.selectedStartVerse = this.currentStartVerse;
        this.selectedEndVerse = this.currentEndVerse;
        this.activeTab = 'all';
        this.searchQuery = '';
    }

    onOpen() {
        this.modalEl.addClass('quran-surah-picker-modal');
        this.renderContent();
    }

    onClose() {
        this.contentEl.empty();
    }

    renderContent() {
        this.contentEl.empty();
        this.contentEl.addClass('quran-picker-content');
        this.contentEl.createDiv({ cls: 'quran-picker-drag-handle' });

        if (this.viewMode === 'range') {
            this.renderRangeView();
        } else {
            this.renderListView();
        }
    }

    renderListView() {
        const header = this.contentEl.createDiv({ cls: 'quran-picker-header' });
        const titleRow = header.createDiv({ cls: 'quran-picker-title-row' });
        titleRow.createEl('h3', { text: 'Select Surah & Verses' });

        const closeBtn = titleRow.createEl('button', { cls: 'quran-picker-close-btn' });
        closeBtn.type = 'button';
        closeBtn.title = 'Close';
        closeBtn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
        closeBtn.onclick = () => this.close();

        const searchContainer = header.createDiv({ cls: 'quran-picker-search-container' });
        const searchIcon = searchContainer.createSpan({ cls: 'quran-picker-search-icon' });
        searchIcon.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';

        const searchInput = searchContainer.createEl('input', { cls: 'quran-picker-search-input' });
        searchInput.type = 'text';
        searchInput.placeholder = 'Search by name, number, meaning, or passage...';
        searchInput.value = this.searchQuery;

        const clearBtn = searchContainer.createEl('button', { cls: 'quran-picker-search-clear' });
        clearBtn.type = 'button';
        clearBtn.title = 'Clear search';
        clearBtn.innerHTML = '<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
        clearBtn.style.display = this.searchQuery ? 'inline-flex' : 'none';

        clearBtn.onclick = () => {
            this.searchQuery = '';
            searchInput.value = '';
            clearBtn.style.display = 'none';
            this.updateList();
            searchInput.focus();
        };

        searchInput.oninput = () => {
            this.searchQuery = searchInput.value;
            clearBtn.style.display = this.searchQuery ? 'inline-flex' : 'none';
            this.updateList();
        };

        searchInput.onkeydown = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const directApplyBtn = this.listContainer?.querySelector('.quran-picker-direct-match .quran-picker-apply-chip');
                if (directApplyBtn) {
                    directApplyBtn.click();
                    return;
                }
                const firstCard = this.listContainer?.querySelector('.quran-picker-passage-card');
                if (firstCard && this.activeTab === 'passages') {
                    firstCard.click();
                    return;
                }
                const firstSurah = this.listContainer?.querySelector('.quran-picker-surah-item');
                if (firstSurah) {
                    firstSurah.click();
                    return;
                }
            }
        };

        const tabsContainer = header.createDiv({ cls: 'quran-picker-tabs' });
        const tabs = [
            { id: 'all', label: 'All (114)' },
            { id: 'starred', label: `Starred (${(this.plugin?.settings?.starredSurahs || []).length})` },
            { id: 'passages', label: 'Preset Passages' },
            { id: 'meccan', label: 'Meccan' },
            { id: 'medinan', label: 'Medinan' }
        ];

        tabs.forEach(t => {
            const tabBtn = tabsContainer.createEl('button', {
                cls: `quran-picker-tab${this.activeTab === t.id ? ' is-active' : ''}`,
                text: t.label
            });
            tabBtn.type = 'button';
            tabBtn.onclick = () => {
                if (this.activeTab === t.id) return;
                this.activeTab = t.id;
                tabsContainer.querySelectorAll('.quran-picker-tab').forEach(b => b.classList.remove('is-active'));
                tabBtn.classList.add('is-active');
                this.updateList();
            };
        });

        this.listContainer = this.contentEl.createDiv({ cls: 'quran-picker-list-container' });
        this.updateList();

        setTimeout(() => {
            if (this.viewMode === 'surah') {
                searchInput.focus();
                if (!this.searchQuery) {
                    const currentEl = this.listContainer.querySelector('.quran-picker-surah-item.is-current');
                    if (currentEl) {
                        currentEl.scrollIntoView({ block: 'center', behavior: 'smooth' });
                    }
                }
            }
        }, 50);
    }

    updateList() {
        if (!this.listContainer) return;
        this.listContainer.empty();
        this.listContainer.scrollTop = 0;

        const q = this.searchQuery.trim();
        const normQuery = normalizeEnglishText(q);
        const normArabicQuery = normalizeArabicText(q);

        const refMatch = q.match(/^(\d{1,3})(?:\s*[:,\-\.]\s*(\d{1,3}))?(?:\s*[-–]\s*(\d{1,3}))?$/);
        let hasDirectMatch = false;
        if (refMatch) {
            const sNum = parseInt(refMatch[1]);
            if (sNum >= 1 && sNum <= 114) {
                hasDirectMatch = true;
                const sMeta = this.plugin.getSurahMeta(sNum);
                const totalAyahs = sMeta.numberOfAyahs || 7;
                const sStart = refMatch[2] ? Math.min(totalAyahs, Math.max(1, parseInt(refMatch[2]))) : 1;
                const sEnd = refMatch[3] ? Math.min(totalAyahs, Math.max(sStart, parseInt(refMatch[3]))) : (refMatch[2] ? sStart : Math.min(totalAyahs, 10));

                const directCard = this.listContainer.createDiv({ cls: 'quran-picker-passage-card quran-picker-direct-match' });
                const dInfo = directCard.createDiv({ cls: 'quran-passage-info' });
                dInfo.createDiv({ cls: 'quran-passage-title', text: `${sMeta.englishName} (${sNum}:${sStart}${sStart !== sEnd ? '–' + sEnd : ''})` });
                dInfo.createDiv({ cls: 'quran-passage-meta', text: `Direct match • ${sEnd - sStart + 1} Ayah(s)` });

                directCard.createSpan({ cls: 'quran-passage-badge', text: 'Direct Reference' });
                const applyBtn = directCard.createEl('button', { cls: 'quran-picker-apply-chip', text: 'Apply' });
                applyBtn.type = 'button';
                applyBtn.onclick = (e) => {
                    e.stopPropagation();
                    this.applyRange(sNum, sStart, sEnd);
                };
                directCard.onclick = () => {
                    this.openRangeForSurah(sNum, sStart, sEnd);
                };
            }
        }

        const showPassages = (this.activeTab === 'passages') || (normQuery.length >= 2);
        let matchedPassages = [];
        if (showPassages) {
            matchedPassages = PRESET_PASSAGES.filter(p => {
                if (this.activeTab === 'passages' && !q) return true;
                const sInfo = SURAHS.find(s => s.number === p.surah);
                const sName = sInfo ? normalizeEnglishText(sInfo.name) : '';
                const pLabel = normalizeEnglishText(p.label);
                const pBadge = normalizeEnglishText(p.badge);
                return pLabel.includes(normQuery) || pBadge.includes(normQuery) || sName.includes(normQuery) || `${p.surah}:${p.startVerse}`.includes(q);
            });

            if (matchedPassages.length > 0) {
                const pSection = this.listContainer.createDiv({ cls: 'quran-picker-section' });
                pSection.createDiv({ cls: 'quran-picker-section-title', text: 'Preset Passages' });
                const grid = pSection.createDiv({ cls: 'quran-picker-passages-grid' });
                matchedPassages.forEach(p => {
                    const sMeta = this.plugin.getSurahMeta(p.surah);
                    const card = grid.createDiv({ cls: 'quran-picker-passage-card' });
                    const info = card.createDiv({ cls: 'quran-passage-info' });
                    info.createDiv({ cls: 'quran-passage-title', text: p.label });
                    info.createDiv({ cls: 'quran-passage-meta', text: `${sMeta.englishName} ${p.surah}:${p.startVerse}${p.startVerse !== p.endVerse ? '–' + p.endVerse : ''}` });
                    if (p.badge) {
                        card.createSpan({ cls: 'quran-passage-badge', text: p.badge });
                    }
                    const applyBtn = card.createEl('button', { cls: 'quran-picker-apply-chip', text: 'Apply' });
                    applyBtn.type = 'button';
                    applyBtn.onclick = (e) => {
                        e.stopPropagation();
                        this.applyRange(p.surah, p.startVerse, p.endVerse);
                    };
                    card.onclick = () => {
                        this.openRangeForSurah(p.surah, p.startVerse, p.endVerse);
                    };
                });
            }
        }

        let filteredSurahs = [];
        if (this.activeTab !== 'passages') {
            const starredSet = new Set(this.plugin?.settings?.starredSurahs || []);
            filteredSurahs = SURAHS.filter(s => {
                const meta = this.plugin.getSurahMeta(s.number);
                if (this.activeTab === 'starred' && !starredSet.has(s.number)) return false;
                if (this.activeTab === 'meccan' && meta.revelationType !== 'Meccan') return false;
                if (this.activeTab === 'medinan' && meta.revelationType !== 'Medinan') return false;

                if (!q) return true;

                if (s.number.toString() === q) return true;
                if (normalizeEnglishText(s.name).includes(normQuery)) return true;
                if (meta.englishName && normalizeEnglishText(meta.englishName).includes(normQuery)) return true;
                if (meta.englishNameTranslation && normalizeEnglishText(meta.englishNameTranslation).includes(normQuery)) return true;
                if (meta.name && normalizeArabicText(meta.name).includes(normArabicQuery)) return true;
                return false;
            });

            if (filteredSurahs.length > 0) {
                const section = this.listContainer.createDiv({ cls: 'quran-picker-section' });
                section.createDiv({ cls: 'quran-picker-section-title', text: `Surahs (${filteredSurahs.length})` });
                const list = section.createDiv({ cls: 'quran-picker-surah-list' });

                filteredSurahs.forEach(s => {
                    const meta = this.plugin.getSurahMeta(s.number);
                    const isCurrent = (s.number === this.currentSurah);
                    const item = list.createDiv({ cls: `quran-picker-surah-item${isCurrent ? ' is-current' : ''}` });

                    const left = item.createDiv({ cls: 'quran-picker-item-left' });
                    left.createSpan({ cls: 'quran-picker-item-num', text: String(s.number) });

                    const details = left.createDiv({ cls: 'quran-picker-item-details' });
                    const titleRow = details.createDiv({ cls: 'quran-picker-item-title-row' });
                    titleRow.createSpan({ cls: 'quran-picker-item-name', text: meta.englishName || s.name });
                    if (meta.englishNameTranslation) {
                        titleRow.createSpan({ cls: 'quran-picker-item-trans', text: `(${meta.englishNameTranslation})` });
                    }

                    const subText = `${meta.revelationType || ''} • ${meta.numberOfAyahs || s.ayahs} Ayahs`;
                    details.createDiv({ cls: 'quran-picker-item-sub', text: subText });

                    const right = item.createDiv({ cls: 'quran-picker-item-right' });
                    const cleanArabic = meta.name ? meta.name.replace(/^سُورَةُ\s*/, '') : '';
                    if (cleanArabic) {
                        right.createSpan({ cls: 'quran-picker-item-arabic', text: cleanArabic });
                    }

                    const isStarred = starredSet.has(s.number);
                    const starBtn = right.createEl('button', {
                        cls: `quran-picker-star-btn${isStarred ? ' is-starred' : ''}`,
                        title: isStarred ? 'Unstar surah' : 'Star surah'
                    });
                    starBtn.type = 'button';
                    starBtn.innerHTML = isStarred
                        ? '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'
                        : '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';

                    starBtn.onclick = async (e) => {
                        e.stopPropagation();
                        if (!this.plugin.settings.starredSurahs) this.plugin.settings.starredSurahs = [];
                        const idx = this.plugin.settings.starredSurahs.indexOf(s.number);
                        if (idx >= 0) {
                            this.plugin.settings.starredSurahs.splice(idx, 1);
                        } else {
                            this.plugin.settings.starredSurahs.push(s.number);
                            this.plugin.settings.starredSurahs.sort((a, b) => a - b);
                        }
                        await this.plugin.saveSettings();
                        this.updateList();
                    };

                    item.onclick = () => {
                        if (isCurrent) {
                            this.openRangeForSurah(s.number, this.currentStartVerse, this.currentEndVerse);
                        } else {
                            const defaultEnd = Math.min(meta.numberOfAyahs || s.ayahs, 10);
                            this.openRangeForSurah(s.number, 1, defaultEnd);
                        }
                    };
                });
            }
        }

        if (filteredSurahs.length === 0 && matchedPassages.length === 0 && !hasDirectMatch) {
            const empty = this.listContainer.createDiv({ cls: 'quran-picker-empty' });
            empty.textContent = `No surahs or passages found matching "${q}"`;
        }
    }

    openRangeForSurah(surahNum, startVerse, endVerse) {
        this.selectedSurah = surahNum;
        const meta = this.plugin.getSurahMeta(surahNum);
        const sInfo = SURAHS.find(s => s.number === surahNum) || SURAHS[0];
        const totalAyahs = meta.numberOfAyahs || sInfo.ayahs || 7;
        this.selectedStartVerse = Math.min(totalAyahs, Math.max(1, startVerse || 1));
        this.selectedEndVerse = Math.min(totalAyahs, Math.max(this.selectedStartVerse, endVerse || Math.min(totalAyahs, 10)));
        this.viewMode = 'range';
        this.renderContent();
    }

    renderRangeView() {
        const meta = this.plugin.getSurahMeta(this.selectedSurah);
        const sInfo = SURAHS.find(s => s.number === this.selectedSurah) || SURAHS[0];
        const totalAyahs = meta.numberOfAyahs || sInfo.ayahs || 7;
        const cleanArabic = meta.name ? meta.name.replace(/^سُورَةُ\s*/, '') : '';

        const header = this.contentEl.createDiv({ cls: 'quran-picker-header' });
        const titleRow = header.createDiv({ cls: 'quran-picker-title-row' });
        titleRow.createEl('h3', { text: `Surah ${meta.englishName || sInfo.name} — Verse Range` });

        const closeBtn = titleRow.createEl('button', { cls: 'quran-picker-close-btn' });
        closeBtn.type = 'button';
        closeBtn.title = 'Close';
        closeBtn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
        closeBtn.onclick = () => this.close();

        const body = this.contentEl.createDiv({ cls: 'quran-picker-list-container' });

        const banner = body.createDiv({ cls: 'quran-picker-range-banner' });
        const bInfo = banner.createDiv({ cls: 'quran-range-banner-info' });
        bInfo.createSpan({ cls: 'quran-range-banner-num', text: String(this.selectedSurah) });
        const bDetails = bInfo.createDiv();
        bDetails.createSpan({ cls: 'quran-range-banner-title', text: meta.englishName || sInfo.name });
        const bSub = `${meta.englishNameTranslation ? meta.englishNameTranslation + ' • ' : ''}${meta.revelationType || ''} • ${totalAyahs} Ayahs`;
        bDetails.createDiv({ cls: 'quran-range-banner-sub', text: bSub });

        if (cleanArabic) {
            banner.createSpan({ cls: 'quran-range-banner-arabic', text: cleanArabic });
        }

        const presetsContainer = body.createDiv({ cls: 'quran-picker-range-presets' });

        const inputsContainer = body.createDiv({ cls: 'quran-picker-range-inputs' });

        const fromGroup = inputsContainer.createDiv({ cls: 'quran-range-input-group' });
        fromGroup.createEl('label', { text: 'From Verse' });
        const fromStepper = fromGroup.createDiv({ cls: 'quran-range-stepper' });
        const fromDecBtn = fromStepper.createEl('button', { cls: 'quran-stepper-btn', text: '−' });
        fromDecBtn.type = 'button';
        const fromInput = fromStepper.createEl('input', { cls: 'quran-stepper-input' });
        fromInput.type = 'number';
        fromInput.min = '1';
        fromInput.max = String(totalAyahs);
        fromInput.value = String(this.selectedStartVerse);
        const fromIncBtn = fromStepper.createEl('button', { cls: 'quran-stepper-btn', text: '+' });
        fromIncBtn.type = 'button';

        const toGroup = inputsContainer.createDiv({ cls: 'quran-range-input-group' });
        toGroup.createEl('label', { text: 'To Verse' });
        const toStepper = toGroup.createDiv({ cls: 'quran-range-stepper' });
        const toDecBtn = toStepper.createEl('button', { cls: 'quran-stepper-btn', text: '−' });
        toDecBtn.type = 'button';
        const toInput = toStepper.createEl('input', { cls: 'quran-stepper-input' });
        toInput.type = 'number';
        toInput.min = '1';
        toInput.max = String(totalAyahs);
        toInput.value = String(this.selectedEndVerse);
        const toIncBtn = toStepper.createEl('button', { cls: 'quran-stepper-btn', text: '+' });
        toIncBtn.type = 'button';

        const summaryEl = body.createDiv({ cls: 'quran-picker-range-summary' });

        const actions = this.contentEl.createDiv({ cls: 'quran-picker-range-actions' });
        const backBtn = actions.createEl('button', { cls: 'quran-picker-back-btn', text: 'Back' });
        backBtn.type = 'button';
        backBtn.onclick = () => {
            this.viewMode = 'surah';
            this.renderContent();
        };

        const insertBtn = actions.createEl('button', { cls: 'quran-picker-insert-btn', text: '+ Insert Below' });
        insertBtn.type = 'button';
        insertBtn.title = 'Insert a new block below with this range';
        insertBtn.onclick = async () => {
            await this.insertRange(this.selectedSurah, this.selectedStartVerse, this.selectedEndVerse);
        };

        const applyBtn = actions.createEl('button', { cls: 'quran-picker-apply-btn' });
        applyBtn.type = 'button';

        const updateState = (start, end) => {
            this.selectedStartVerse = Math.min(totalAyahs, Math.max(1, start));
            this.selectedEndVerse = Math.min(totalAyahs, Math.max(this.selectedStartVerse, end));

            fromInput.value = String(this.selectedStartVerse);
            toInput.value = String(this.selectedEndVerse);

            const count = this.selectedEndVerse - this.selectedStartVerse + 1;
            summaryEl.textContent = `Showing ${count} verse${count === 1 ? '' : 's'} (${this.selectedStartVerse} to ${this.selectedEndVerse}) of ${totalAyahs}`;
            applyBtn.textContent = `Apply Range (${this.selectedSurah}:${this.selectedStartVerse}–${this.selectedEndVerse})`;

            presetsContainer.querySelectorAll('.quran-range-chip').forEach(c => {
                const pStart = parseInt(c.getAttribute('data-start') || '0');
                const pEnd = parseInt(c.getAttribute('data-end') || '0');
                if (pStart === this.selectedStartVerse && pEnd === this.selectedEndVerse) {
                    c.classList.add('is-active');
                } else {
                    c.classList.remove('is-active');
                }
            });
        };

        const presets = [];
        if (totalAyahs >= 1) presets.push({ label: `1–${Math.min(5, totalAyahs)}`, start: 1, end: Math.min(5, totalAyahs) });
        if (totalAyahs >= 10) presets.push({ label: '1–10', start: 1, end: 10 });
        if (totalAyahs >= 20) presets.push({ label: '1–20', start: 1, end: 20 });
        if (totalAyahs > 10) presets.push({ label: `Last 10 (${totalAyahs - 9}–${totalAyahs})`, start: totalAyahs - 9, end: totalAyahs });
        presets.push({ label: `Whole Surah (1–${totalAyahs})`, start: 1, end: totalAyahs });

        PRESET_PASSAGES.filter(p => p.surah === this.selectedSurah).forEach(p => {
            presets.unshift({ label: `${p.label} (${p.startVerse}${p.startVerse !== p.endVerse ? '–' + p.endVerse : ''})`, start: p.startVerse, end: p.endVerse });
        });

        presets.forEach(p => {
            const chip = presetsContainer.createEl('button', {
                cls: `quran-range-chip${p.start === this.selectedStartVerse && p.end === this.selectedEndVerse ? ' is-active' : ''}`,
                text: p.label
            });
            chip.type = 'button';
            chip.setAttribute('data-start', String(p.start));
            chip.setAttribute('data-end', String(p.end));
            chip.onclick = () => {
                updateState(p.start, p.end);
            };
        });

        fromDecBtn.onclick = () => updateState(this.selectedStartVerse - 1, this.selectedEndVerse);
        fromIncBtn.onclick = () => updateState(this.selectedStartVerse + 1, Math.max(this.selectedStartVerse + 1, this.selectedEndVerse));
        fromInput.onchange = () => updateState(parseInt(fromInput.value) || 1, this.selectedEndVerse);

        toDecBtn.onclick = () => updateState(Math.min(this.selectedStartVerse, this.selectedEndVerse - 1), this.selectedEndVerse - 1);
        toIncBtn.onclick = () => updateState(this.selectedStartVerse, this.selectedEndVerse + 1);
        toInput.onchange = () => updateState(this.selectedStartVerse, parseInt(toInput.value) || totalAyahs);

        applyBtn.onclick = async () => {
            await this.applyRange(this.selectedSurah, this.selectedStartVerse, this.selectedEndVerse);
        };

        updateState(this.selectedStartVerse, this.selectedEndVerse);
    }

    async applyRange(surah, startVerse, endVerse) {
        const newRef = `${surah}:${startVerse}-${endVerse}`;
        await this.plugin.updateSourceRange(this.container, newRef);
        const st = this.container._quranState || {};
        this.renderEl.innerHTML = '';
        await this.plugin.renderQuranWithTajweed(
            newRef,
            this.renderEl,
            false,
            st.reciter,
            st.audioEnabled,
            st.translationEnabled,
            st.transliterationEnabled,
            st.ctx,
            st.customLabel
        );
        this.close();
    }

    async insertRange(surah, startVerse, endVerse) {
        const newRef = `${surah}:${startVerse}-${endVerse}`;
        await this.plugin.insertQuranBlock(this.container, 'below', newRef);
        this.close();
    }
}
