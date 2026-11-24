/* ===================================================================
   THE SHELF — every tool on useful-indeed.com
   To add a tool: copy one block, change it, and put its logo in
   UPLOAD-TO-GITHUB/<repo>/logo.svg. The main page, the jar, the filters and
   deploy.ps1 all read from this list. Order here = order on the page.

   id     → subdomain  (id.useful-indeed.com)
   repo   → GitHub repo name = folder name in UPLOAD-TO-GITHUB
   cat    → filter group (new names create new filter buttons)
   c / on → card colour on hover / text colour on that card
   dot    → its dot in the jar
   badge  → optional sticker on the card, e.g. "New" or "Updated"
   =================================================================== */
window.USEFUL_TOOLS = [
  {
    "id": "mypdf",
    "name": "myPDF",
    "repo": "mypdf",
    "cat": "Docs & Dev",
    "tag": "Documents",
    "d": "PDF to Word, Word, Excel and PowerPoint to PDF, merge, split, compress, number and sign. Every file stays on your device.",
    "c": "#05060f",
    "on": "#e8ecff",
    "dot": "#8b5cf6",
    "added": "2026-11-16",
    "badge": ""
  },
  {
    "id": "mp2calculator",
    "name": "MP2 Calculator",
    "repo": "mp2calculator",
    "cat": "Money",
    "tag": "Savings",
    "d": "See how your Pag-IBIG MP2 savings could grow in 5 years. Monthly or custom deposits, in English and Tagalog.",
    "c": "#0f5b46",
    "on": "#fbf0d4",
    "dot": "#e9a512",
    "added": "2026-11-16",
    "badge": ""
  },
  {
    "id": "beforeyouloan",
    "name": "Before You Loan",
    "repo": "beforeyouloan",
    "cat": "Money",
    "tag": "Loans",
    "d": "Know the true cost of a loan before you sign — total payable, real interest rate, budget impact and late-payment what-ifs.",
    "c": "#16a34a",
    "on": "#ffffff",
    "dot": "#16a34a",
    "added": "2026-11-17",
    "badge": ""
  },
  {
    "id": "hmmmeme",
    "name": "hmmmMeme",
    "repo": "hmmmeme",
    "cat": "Fun",
    "tag": "Memes",
    "d": "One click, one random meme. Then another. Then another. Endless, free, zero effort.",
    "c": "#0a0a0b",
    "on": "#ffd23f",
    "dot": "#ffd23f",
    "added": "2026-11-17",
    "badge": ""
  },
  {
    "id": "hmmmeme-ph",
    "name": "hmmmMeme PH",
    "repo": "hmmmeme-ph",
    "cat": "Fun",
    "tag": "Pinoy memes",
    "d": "Random Pinoy memes, isang click lang. Para sa mga break time na kailangan ng tawa.",
    "c": "#0038a8",
    "on": "#fcd116",
    "dot": "#ce1126",
    "added": "2026-11-17",
    "badge": ""
  },
  {
    "id": "fairspin",
    "name": "FairSpin",
    "repo": "fairspin",
    "cat": "Fun",
    "tag": "Raffles",
    "d": "A truly fair name wheel for raffles, giveaways, and deciding who goes first. Big, bright and 3D.",
    "c": "#241a52",
    "on": "#ffd23f",
    "dot": "#ff5e7e",
    "added": "2026-11-17",
    "badge": ""
  },
  {
    "id": "blokblok",
    "name": "BlokBlok",
    "repo": "blokblok",
    "cat": "Fun",
    "tag": "Game",
    "d": "A colourful falling-block puzzle game. Stack, rotate and clear lines — 20 themes, chiptune music, keyboard or touch.",
    "c": "#0b0f1a",
    "on": "#5ee7ff",
    "dot": "#5effa1",
    "added": "2026-11-20",
    "badge": ""
  },
  {
    "id": "choirarranger",
    "name": "Choir Arranger",
    "repo": "choirarranger",
    "cat": "Music & Focus",
    "tag": "Music",
    "d": "Balanced choir lineups, visual seat plans and printable sign-off sheets for performances and worship services.",
    "c": "#172036",
    "on": "#f2b84b",
    "dot": "#3ec7c0",
    "added": "2026-11-17",
    "badge": ""
  },
  {
    "id": "choirtrainer",
    "name": "Choir Voice Trainer",
    "repo": "choirtrainer",
    "cat": "Music & Focus",
    "tag": "Singing",
    "d": "A detailed voice type test, live pitch feedback, hand signs, the grand staff, S A T B harmony, 30 songs or your own MIDI, and a certificate.",
    "c": "#1e2350",
    "on": "#f7c948",
    "dot": "#ff8a2a",
    "added": "2026-11-18",
    "badge": ""
  },
  {
    "id": "codeformatter",
    "name": "Code Formatter",
    "repo": "codeformatter",
    "cat": "Docs & Dev",
    "tag": "Developers",
    "d": "Format, minify and validate 46 languages — JSON to SQL to Go — with exact error positions. All in the browser.",
    "c": "#141a26",
    "on": "#7aa2ff",
    "dot": "#5b8cff",
    "added": "2026-11-16",
    "badge": ""
  },
  {
    "id": "sqlplayground",
    "name": "SQL Playground",
    "repo": "sqlplayground",
    "cat": "Docs & Dev",
    "tag": "SQL",
    "d": "Write and run SQL right in your browser — 7 dialects, sample databases, import and export. Nothing to install.",
    "c": "#161a23",
    "on": "#3ecf8e",
    "dot": "#3ecf8e",
    "added": "2026-11-18",
    "badge": ""
  },
  {
    "id": "randomdata",
    "name": "Random Data Generator",
    "repo": "randomdata",
    "cat": "Docs & Dev",
    "tag": "Test data",
    "d": "Generate realistic sample CSVs — up to 10 million rows — with Unique, Required and Key rules. Clean or messy.",
    "c": "#2F5D8A",
    "on": "#FBF8F3",
    "dot": "#2F5D8A",
    "added": "2026-11-16",
    "badge": ""
  },
  {
    "id": "stilldusk",
    "name": "Stilldusk",
    "repo": "stilldusk",
    "cat": "Music & Focus",
    "tag": "Focus",
    "d": "A calm, dusk-coloured focus timer for deep work sessions — with soundscapes, atmospheres and rhythm.",
    "c": "#241a5a",
    "on": "#eef0ff",
    "dot": "#a594ff",
    "added": "2026-11-17",
    "badge": ""
  },
  {
    "id": "keytester",
    "name": "Keyboard & Mouse Tester",
    "repo": "keytester",
    "cat": "Docs & Dev",
    "tag": "Hardware",
    "d": "Press every key and click every button. Spot dead keys, ghosting, key chatter, double-click faults and your mouse polling rate.",
    "c": "#171d24",
    "on": "#ff9d2e",
    "dot": "#3cc79b",
    "added": "2026-11-23",
    "badge": ""
  },
  {
    "id": "pa-pic",
    "name": "Pa-pic",
    "repo": "pa-pic",
    "cat": "Business",
    "tag": "Photobooth · ₱999",
    "d": "Photobooth software for event businesses: 30 templates, 20 themes, HD prints and one-click printing. Try the live demo free.",
    "c": "#2b1637",
    "on": "#ffb800",
    "dot": "#ff3d7f",
    "added": "2026-11-24",
    "badge": ""
  }
];
