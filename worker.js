// Kali (ಕಲಿ) — a Duolingo-style Kannada phrase trainer.
// One file, no dependencies. Deploy as a Cloudflare Worker.
//
// Edit PHRASES below, then redeploy.
//   kn   Kannada script            (kn and/or tr required)
//   tr   romanized Kannada
//   en   English meaning (required). Use "/" or ";" for alternatives;
//        text in (parentheses) is shown but ignored when grading.
//   cat  unit name (optional). Units appear in first-seen order.
//   note dialect / usage remark (optional)

const PHRASES = [
  // Introductions
  { tr: "Namaskara", en: "Hello", cat: "Introductions" },
  { tr: "Nivu haeng idthri?", en: "How are you? (formal)", cat: "Introductions", note: "Formal, use with elders." },
  { tr: "Ni Haeng idd theeri", en: "How are you? (casual)", cat: "Introductions" },
  { tr: "Nuhn hes eru see wan", en: "My name is see wan", cat: "Introductions" },
  { tr: "Nim hesri yenoo?", en: "What is your name? / What's your name?", cat: "Introductions" },
  { tr: "Kannada kahlili kathini", en: "I'm learning Kannada / I am learning Kannada", cat: "Introductions" },

  // Greetings & replies
  { tr: "Bal Chalo idini", en: "I'm doing very good / I'm doing very well", cat: "Greetings & replies" },
  { tr: "nanu sakath idthini", en: "I'm doing great", cat: "Greetings & replies", note: "Your reply when someone asks how you are." },
  { tr: "Ahram Idthini", en: "I'm fine / I'm relaxed", cat: "Greetings & replies" },
  { tr: "Nanu chuhlo idhini", en: "I'm also doing well", cat: "Greetings & replies" },
  { tr: "Nohd khushi aithoo", en: "Nice to see you", cat: "Greetings & replies" },
  { tr: "Dhan ya vaduhguhloo", en: "Thank you / Thanks", cat: "Greetings & replies" },
  { tr: "Nidthi ai thoo?", en: "Did you sleep well?", cat: "Greetings & replies" },
  { tr: "Nidthee bandth", en: "I'm sleepy / I need to close my eyes", cat: "Greetings & replies" },
  { tr: "Hoag bardthini", en: "I'm leaving and coming back", cat: "Greetings & replies", note: "Always say this when leaving." },
  { tr: "Sokkash drive madri", en: "Drive safely", cat: "Greetings & replies" },

  // Food & drink
  { tr: "Hasiv agetha", en: "I'm hungry", cat: "Food & drink" },
  { tr: "Ooh tta aightoo?", en: "Did you eat?", cat: "Food & drink" },
  { tr: "Ooh tta aitth", en: "Yes I ate", cat: "Food & drink" },
  { tr: "Hotti tthumbeda", en: "I'm full", cat: "Food & drink" },
  { tr: "Hotti thum tha?", en: "Are you full?", cat: "Food & drink" },
  { tr: "Ootta", en: "Food", cat: "Food & drink" },
  { tr: "Ootta beikah?", en: "Do you want food?", cat: "Food & drink" },
  { tr: "Unna muhsru", en: "Yogurt rice", cat: "Food & drink" },
  { tr: "Kohli", en: "Chicken", cat: "Food & drink" },
  { tr: "near", en: "Water", cat: "Food & drink" },
  { tr: "Beer beiku", en: "I want beer", cat: "Food & drink" },
  { tr: "Bar hoghana? Kudi thivi", en: "Should we go to a bar? We're going to drink", cat: "Food & drink" },
  { tr: "Kooh ree ahna", en: "Should we drink?", cat: "Food & drink" },
  { tr: "Sohkash KUdoo", en: "Eat slowly", cat: "Food & drink", note: "Say this ONLY when you made the food you're serving." },
  { tr: "Inna soulpa thogori", en: "Take some more", cat: "Food & drink" },

  // Reactions
  { tr: "Chuh-lo", en: "Very good", cat: "Reactions" },
  { tr: "Bhaahla chal-o ada", en: "This is very good", cat: "Reactions" },
  { tr: "Chuh-lo aith", en: "It was good / It went well", cat: "Reactions", note: "Use in response to questions." },
  { tr: "Musth aighth", en: "It was excellent", cat: "Reactions" },
  { tr: "Sak khath aighth", en: "It was fantastic", cat: "Reactions", note: "Even more than excellent." },
  { tr: "Musth irtadha", en: "It's gonna be awesome / It's going to be awesome", cat: "Reactions" },
  { tr: "Ayepah", en: "Ouch / Oh my gosh", cat: "Reactions" },
  { tr: "Ashttae nah?", en: "That's it?", cat: "Reactions", note: "Can refer to someone not drinking enough." },
  { tr: "Athein godthila", en: "I don't know what you just said", cat: "Reactions" },

  // Little words
  { tr: "Ni", en: "You", cat: "Little words" },
  { tr: "Nanu", en: "Me / I", cat: "Little words" },
  { tr: "Bal", en: "Very", cat: "Little words" },
  { tr: "Bah la", en: "Too much", cat: "Little words" },
  { tr: "Juldi", en: "Quickly", cat: "Little words" },
  { tr: "Careh", en: "Really", cat: "Little words" },
  { tr: "Ashtek ashteh", en: "So-so", cat: "Little words" },
  { tr: "Sol pe sulp", en: "Little bit / A little bit", cat: "Little words" },
  { tr: "Huldi", en: "Yellow", cat: "Little words" },
  { tr: "Aklaa", en: "Cow", cat: "Little words" },
  { tr: "Bli mundi", en: "White person", cat: "Little words" },
  { tr: "Kuhree mundi", en: "Black person", cat: "Little words" },

  // Bathroom
  { tr: "Suhn daas yal la da", en: "Where is the bathroom?", cat: "Bathroom" },
  { tr: "Sun das hoag beiku, hoos bandth", en: "I have to shit, I just farted", cat: "Bathroom" },
  { tr: "Hooos", en: "Fart", cat: "Bathroom" },
  { tr: "Uchi", en: "Pee", cat: "Bathroom" },
  { tr: "Moothra", en: "Pee", cat: "Bathroom" },
  { tr: "Ugooloo", en: "Spit", cat: "Bathroom" },

  // Asking & handy patterns
  { tr: "Yain idthu?", en: "What is that?", cat: "Asking & patterns" },
  { tr: "Yain madlikathivi?", en: "What are we doing today?", cat: "Asking & patterns" },
  { tr: "Nung kellu", en: "Ask me", cat: "Asking & patterns" },
  { tr: "___ haeng aigth?", en: "How is ___?", cat: "Asking & patterns" },
  { tr: "___ adtha", en: "It's ___", cat: "Asking & patterns" },
  { tr: "___ beikri nungeh", en: "Can I please have ___", cat: "Asking & patterns" },
  { tr: "Inna soulpa _____ kodthira please", en: "Can I please have some more ___", cat: "Asking & patterns" },
  { tr: "Adthey kohdoo", en: "Give me that one", cat: "Asking & patterns" },
  { tr: "Idthey kohdoo", en: "Gimme this one / Give me this one", cat: "Asking & patterns" },
  { tr: "Na sari thiri", en: "I will get out the way / I will get out of the way", cat: "Asking & patterns" },
  { tr: "Nana gu nu___", en: "I'm also ___", cat: "Asking & patterns" },

  // Love & teasing
  { tr: "Nanu ninega preethi marthini", en: "I love you", cat: "Love & teasing" },
  { tr: "Nanu ninega bahallah preethi marthini", en: "I love you very much", cat: "Love & teasing" },
  { tr: "Careh preethi martini", en: "I really love you", cat: "Love & teasing" },
  { tr: "Boo hoag thini", en: "Let's go for a walk (baby talk)", cat: "Love & teasing", note: "Baby talk." },
  { tr: "Gund dah mah", en: "Fat mom", cat: "Love & teasing" },
  { tr: "Nin tali kumlikai", en: "Pumpkin head", cat: "Love & teasing" },
  { tr: "Ninthali judge-lee", en: "Let me bang your head", cat: "Love & teasing" },
  { tr: "Kkgai curry thi nee", en: "I'll bite your hand", cat: "Love & teasing" },

  // Bad words
  { tr: "Hooch solemaga", en: "Crazy bastard", cat: "Bad words (not for adults)", note: "Don't say to anyone." },
  { tr: "Shaatha", en: "Pubes", cat: "Bad words (not for adults)" },
  { tr: "Shaatha thun du", en: "It brought me pubes", cat: "Bad words (not for adults)", note: "Say it like \"shit\"." },
  { tr: "Shaatha tehrri", en: "Go shave your pubes and come back", cat: "Bad words (not for adults)" },
  { tr: "Shaatha Nuhn maga", en: "Son of a pube", cat: "Bad words (not for adults)" },
  { tr: "Thikka moochoo", en: "Shut your ass / STFU", cat: "Bad words (not for adults)" },
  { tr: "Hoocha", en: "Crazy person", cat: "Bad words (not for adults)", note: "As in \"aye hootcha\" (to Sachin)." },
  { tr: "Hooch run dhey gatta", en: "Son of a prostitute", cat: "Bad words (not for adults)" },
  { tr: "Hooch rund thi", en: "Crazy slut", cat: "Bad words (not for adults)" },
  { tr: "Ttoon inah", en: "Man, wtf", cat: "Bad words (not for adults)" },
  { tr: "Choothia", en: "Coochie", cat: "Bad words (not for adults)", note: "Hindi." },
  { tr: "Wadthuvannahakthini", en: "I'm gonna kick you out and hang you out to dry", cat: "Bad words (not for adults)" },
  { tr: "A a soodli", en: "Let it burn", cat: "Bad words (not for adults)", note: "Good or bad depending on context." },
  { tr: "Too nina henayethli", en: "I'm gonna spit on you and lift up your corpse", cat: "Bad words (not for adults)" },
];

const PAGE = String.raw`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#A9492A">
<title>Kali · ಕಲಿ</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Mukta:wght@400;500;700&family=Noto+Serif+Kannada:wght@600&display=swap" rel="stylesheet">
<style>
:root{
  --paper:#F3E9D8; --card:#FBF6EC; --ink:#2E2219; --muted:#7D6A58; --line:#E2D2B8; --thread:rgba(156,69,38,.32);
  --red:#A9492A; --red-d:#7A3519; --yellow:#D9A23A; --yellow-d:#A87A22; --indigo:#2F3E5C; --indigo-d:#1F2A40;
  --ok:#5B7F3A; --ok-d:#435F2A; --ok-bg:#E5EAD3; --bad:#A62E2E; --bad-d:#7C2121; --bad-bg:#F3DCD3;
  --serif:"Fraunces",Georgia,serif; --kn:"Noto Serif Kannada","Noto Sans Kannada",serif;
  --print:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='14'%3E%3Crect width='28' height='14' fill='%23A9492A'/%3E%3Cpath d='M14 2l5 5-5 5-5-5z' fill='%23D9A23A'/%3E%3Ccircle cx='14' cy='7' r='1.5' fill='%23A9492A'/%3E%3Ccircle cx='3' cy='7' r='1.3' fill='%23F3E9D8'/%3E%3Ccircle cx='25' cy='7' r='1.3' fill='%23F3E9D8'/%3E%3C/svg%3E");
  --grain:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .36 0 0 0 0 .25 0 0 0 0 .14 0 0 0 .10 0'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E");
}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body{margin:0;height:100%}
body{background:var(--grain),var(--paper);color:var(--ink);font-family:Mukta,system-ui,sans-serif;font-size:18px;line-height:1.4}
.kn{font-family:var(--kn)}
button{font:inherit;color:inherit;cursor:pointer}
#app{max-width:560px;margin:0 auto;min-height:100%;display:flex;flex-direction:column}
.flag{height:14px;background:var(--print);border-bottom:3px solid var(--indigo)}
header.top{display:flex;align-items:center;justify-content:space-between;padding:18px 16px 12px}
.brand{font-family:var(--serif);font-weight:700;font-size:32px;color:var(--ink);line-height:1;letter-spacing:-.5px}
.brand small{font-family:var(--kn);font-size:18px;color:var(--red);font-weight:600;margin-left:8px;letter-spacing:0}
.stats{display:flex;gap:8px}
.pill{border:1.5px solid var(--line);background:var(--card);border-radius:999px;padding:3px 11px;font-size:14px;color:var(--muted);white-space:nowrap}
.pill b{color:var(--red);font-weight:700;margin-right:2px}
main{flex:1;padding:0 16px 28px}
.actions{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:4px 0 22px}
.btn{border:none;border-radius:12px;padding:13px 16px;font-weight:700;font-size:17px;letter-spacing:.2px;box-shadow:0 3px 0 rgba(0,0,0,.2);transition:transform .05s}
.btn:active{transform:translateY(2px);box-shadow:0 1px 0 rgba(0,0,0,.2)}
.btn[disabled]{opacity:.45;pointer-events:none}
.btn-red{background:var(--red);color:#FBF6EC;box-shadow:0 3px 0 var(--red-d)}
.btn-yellow{background:var(--indigo);color:#FBF6EC;box-shadow:0 3px 0 var(--indigo-d)}
.btn-ghost{background:var(--card);border:1.5px solid var(--line);box-shadow:0 3px 0 var(--line)}
.btn-ok{background:var(--ok);color:#FBF6EC;box-shadow:0 3px 0 var(--ok-d)}
.btn-bad{background:var(--bad);color:#FBF6EC;box-shadow:0 3px 0 var(--bad-d)}
.wide{width:100%}
.unit{background:var(--card);border:1.5px solid var(--line);border-radius:16px;margin-bottom:18px;overflow:hidden;box-shadow:0 2px 0 var(--line)}
.unit h2{margin:0;padding:12px 16px 10px;background:var(--indigo);color:#FBF6EC;font-family:var(--serif);font-weight:600;font-size:21px;display:flex;justify-content:space-between;align-items:center;gap:10px}
.unit h2 span{font-family:Mukta,sans-serif;font-size:13px;font-weight:500;color:var(--yellow);white-space:nowrap}
.dotrule{height:7px;background:radial-gradient(circle,var(--yellow) 1.7px,transparent 2.2px) 0 0/10px 7px repeat-x,var(--indigo)}
.lessons{display:flex;flex-wrap:wrap;gap:14px;padding:18px 18px 20px;margin:8px;border:1.5px dashed var(--thread);border-radius:10px}
.lesson-btn{width:62px;height:62px;border-radius:50%;border:none;font-family:var(--serif);font-weight:700;font-size:21px;color:#FBF6EC;background:radial-gradient(circle at 35% 30%,#C4683F,var(--red));box-shadow:inset 0 0 0 4px var(--red),inset 0 0 0 5.5px rgba(251,246,236,.55),0 4px 0 var(--red-d)}
.lesson-btn.done{background:radial-gradient(circle at 35% 30%,#759A52,var(--ok));box-shadow:inset 0 0 0 4px var(--ok),inset 0 0 0 5.5px rgba(251,246,236,.55),0 4px 0 var(--ok-d)}
.lesson-btn.next{outline:3px solid var(--yellow);outline-offset:4px}
.lesson-btn:active{transform:translateY(3px)}
.empty{color:var(--muted);text-align:center;padding:30px 10px}
.lbar{display:flex;align-items:center;gap:12px;padding:16px}
.x{background:none;border:none;font-size:24px;color:var(--muted);padding:0 4px;line-height:1}
.prog{flex:1;height:12px;background:var(--line);border-radius:999px;overflow:hidden}
.prog i{display:block;height:100%;background:var(--red);border-radius:999px;transition:width .3s}
.hearts{font-weight:700;color:var(--bad);white-space:nowrap;font-size:18px}
.ex{flex:1;padding:4px 16px 16px;display:flex;flex-direction:column}
.ex h3{font-family:var(--serif);font-weight:600;font-size:22px;margin:6px 0 16px}
.prompt{display:flex;align-items:center;gap:10px;background:var(--card);border:1.5px solid var(--line);border-radius:14px;padding:18px;margin-bottom:18px;position:relative}
.prompt::before{content:"";position:absolute;inset:6px;border:1.5px dashed var(--thread);border-radius:9px;pointer-events:none}
.prompt .big{font-family:var(--serif);font-size:27px;font-weight:600;line-height:1.3}
.prompt .sub{color:var(--muted);font-size:15px;margin-top:2px}
.speak{border:none;background:var(--yellow);border-radius:10px;width:44px;height:44px;font-size:20px;flex:none;box-shadow:0 3px 0 var(--yellow-d)}
.opts{display:grid;gap:10px}
.opt{text-align:left;background:var(--card);border:1.5px solid var(--line);border-radius:12px;padding:13px 16px;font-size:18px;box-shadow:0 3px 0 var(--line)}
.opt .sub{display:block;color:var(--muted);font-size:14px}
.opt.sel{border-color:var(--red);background:#F7E6DA;box-shadow:0 3px 0 var(--red)}
.opt.right{border-color:var(--ok);background:var(--ok-bg);box-shadow:0 3px 0 var(--ok)}
.opt.wrong{border-color:var(--bad);background:var(--bad-bg);box-shadow:0 3px 0 var(--bad)}
.answer-line{min-height:62px;border-bottom:1.5px dashed var(--muted);display:flex;flex-wrap:wrap;gap:8px;padding:8px 0;margin-bottom:20px}
.bank{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
.tile{background:var(--card);border:1.5px solid var(--line);border-radius:10px;padding:7px 12px;font-size:17px;font-weight:500;box-shadow:0 3px 0 var(--line)}
.tile.used{visibility:hidden}
textarea{width:100%;min-height:96px;border:1.5px solid var(--line);border-radius:12px;padding:14px;font:inherit;font-size:19px;background:var(--card);resize:none}
textarea:focus{outline:none;border-color:var(--red)}
.hint{color:var(--muted);font-size:14px;margin-top:8px}
.match{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.match .col{display:grid;gap:10px;align-content:start}
.mt{background:var(--card);border:1.5px solid var(--line);border-radius:12px;padding:12px 10px;min-height:56px;font-size:16px;box-shadow:0 3px 0 var(--line)}
.mt.sel{border-color:var(--red);background:#F7E6DA}
.mt.gone{opacity:.3;pointer-events:none;border-color:var(--ok)}
.mt.wrong{border-color:var(--bad);background:var(--bad-bg)}
footer.check{padding:16px;border-top:1.5px solid var(--line);background:var(--paper)}
footer.check.ok{background:var(--ok-bg);border-color:var(--ok)}
footer.check.bad{background:var(--bad-bg);border-color:var(--bad)}
.fb{font-family:var(--serif);font-weight:700;font-size:21px;margin-bottom:4px}
.fb-ok{color:var(--ok-d)} .fb-bad{color:var(--bad)}
.fb-ans{margin-bottom:12px;font-size:17px}
.fb-note{color:var(--ink);opacity:.8;font-size:15px;margin:-4px 0 12px;padding-left:10px;border-left:3px solid var(--yellow)}
.result{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:24px 16px;gap:10px}
.stamp{width:124px;height:124px;border-radius:50%;display:grid;place-items:center;font-family:var(--kn);font-weight:600;font-size:32px;color:var(--red);border:3px solid var(--red);box-shadow:inset 0 0 0 5px var(--paper),inset 0 0 0 7px var(--red);transform:rotate(-8deg);margin-bottom:10px;opacity:.92}
.stamp.sad{color:var(--indigo);border-color:var(--indigo);box-shadow:inset 0 0 0 5px var(--paper),inset 0 0 0 7px var(--indigo);font-size:28px}
.result h2{font-family:var(--serif);font-weight:700;font-size:30px;margin:0;color:var(--ink)}
.result p{color:var(--muted);margin:0 0 8px}
.result .row{display:flex;gap:10px;margin:12px 0 18px}
.result .box{background:var(--card);border:1.5px solid var(--line);border-radius:12px;padding:10px 14px;font-family:var(--serif);font-weight:700;font-size:20px;min-width:92px}
.result .box small{display:block;font-family:Mukta,sans-serif;color:var(--muted);font-weight:500;font-size:13px}
.search{width:100%;padding:12px 14px;border:1.5px solid var(--line);border-radius:12px;font:inherit;background:var(--card);margin:4px 0 14px}
.search:focus{outline:none;border-color:var(--red)}
.cat-h{font-family:var(--serif);font-weight:600;color:var(--indigo);font-size:21px;margin:18px 0 8px;padding-bottom:4px;border-bottom:1.5px dashed var(--thread)}
.pb{background:var(--card);border:1.5px solid var(--line);border-radius:12px;padding:12px 14px;margin-bottom:8px;display:flex;gap:10px;align-items:flex-start}
.pb .main{flex:1;min-width:0}
.pb .k{font-family:var(--serif);font-size:20px;font-weight:600}
.pb .t{color:var(--muted);font-size:15px}
.pb .e{font-size:16px;margin-top:2px}
.pb .n{font-size:14px;color:var(--ink);opacity:.8;border-left:3px solid var(--yellow);padding:2px 8px;margin-top:6px}
.dots{display:flex;gap:4px;margin-top:8px}
.dots i{width:7px;height:7px;border-radius:50%;background:var(--line)}
.dots i.on{background:var(--ok)}
.back{background:none;border:none;font-weight:700;color:var(--red);font-size:16px;padding:0}
</style>
</head>
<body>
<div id="app"></div>
<script>
var PHRASES = __PHRASES__;
var LESSON_SIZE = 5;
var STORE_KEY = 'kali-v1';

/* ---------- helpers ---------- */
function h(tag, attrs, kids) {
  var el = document.createElement(tag);
  if (attrs) for (var k in attrs) {
    var v = attrs[k];
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'text') el.textContent = v;
    else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  (kids || []).forEach(function (c) {
    if (c == null || c === false) return;
    el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return el;
}
function shuffle(a) {
  a = a.slice();
  for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
  return a;
}
function pick(a, n) { return shuffle(a).slice(0, n); }
function stripParens(s) { return s.replace(/\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim(); }
function alts(s) { return String(s || '').split(/[\/;]/).map(stripParens).filter(Boolean); }
function normEn(s) { return stripParens(s).toLowerCase().replace(/[‘’]/g, "'").replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim(); }
function normTr(s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim(); }
function lev(a, b) {
  var m = a.length, n = b.length, prev = [], cur, i, j;
  for (j = 0; j <= n; j++) prev[j] = j;
  for (i = 1; i <= m; i++) {
    cur = [i];
    for (j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[n];
}
function today(d) { d = d || new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
function yesterday() { var d = new Date(); d.setDate(d.getDate() - 1); return today(d); }

/* ---------- data ---------- */
PHRASES = PHRASES.filter(function (p) { return p && p.en && (p.kn || p.tr); }).map(function (p, i) {
  return { i: i, kn: p.kn || '', tr: p.tr || '', en: p.en, cat: p.cat || 'Phrases', note: p.note || '',
           key: (p.kn || p.tr) + '|' + p.en };
});
var UNITS = [];
(function () {
  var byCat = {};
  PHRASES.forEach(function (p) {
    if (!byCat[p.cat]) { byCat[p.cat] = { name: p.cat, phrases: [] }; UNITS.push(byCat[p.cat]); }
    byCat[p.cat].phrases.push(p);
  });
  UNITS.forEach(function (u) {
    u.lessons = [];
    var count = Math.ceil(u.phrases.length / LESSON_SIZE), size = Math.ceil(u.phrases.length / count);
    for (var i = 0; i < count; i++) {
      u.lessons.push({ id: u.name + '#' + i, num: i + 1, phrases: u.phrases.slice(i * size, (i + 1) * size) });
    }
  });
})();
function display(p) { return p.kn || p.tr; }

/* ---------- progress ---------- */
var P = { xp: 0, streak: 0, lastDay: '', strength: {}, done: {} };
try { var saved = JSON.parse(localStorage.getItem(STORE_KEY) || 'null'); if (saved) for (var sk in saved) P[sk] = saved[sk]; } catch (e) {}
function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(P)); } catch (e) {} }
function strength(p) { return P.strength[p.key] || 0; }
function bump(p, d) { P.strength[p.key] = Math.max(0, Math.min(5, strength(p) + d)); }
function streakNow() { return (P.lastDay === today() || P.lastDay === yesterday()) ? P.streak : 0; }

/* ---------- audio ---------- */
var knVoice = null;
function findVoice() {
  if (!('speechSynthesis' in window)) return;
  var vs = speechSynthesis.getVoices() || [];
  knVoice = vs.filter(function (v) { return /^kn/i.test(v.lang); })[0] || null;
}
if ('speechSynthesis' in window) { findVoice(); speechSynthesis.onvoiceschanged = function () { var had = !!knVoice; findVoice(); if (!had && knVoice && state.screen === 'lesson') renderLesson(); }; }
function speakBtn(p) {
  if (!knVoice || !p.kn) return null;
  return h('button', { class: 'speak', 'aria-label': 'Listen', text: '🔊', onclick: function () {
    speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(p.kn); u.voice = knVoice; u.lang = knVoice.lang; u.rate = 0.85; speechSynthesis.speak(u);
  } });
}

/* ---------- exercises ---------- */
function distractors(p, n, field) {
  var same = PHRASES.filter(function (q) { return q !== p && q.cat === p.cat; });
  var other = PHRASES.filter(function (q) { return q !== p && q.cat !== p.cat; });
  var seen = {}, seenEn = {}; seen[display(p)] = 1; seenEn[normEn(p.en)] = 1;
  var out = [];
  shuffle(same).concat(shuffle(other)).forEach(function (q) {
    var k = display(q), e = normEn(q.en);
    if (out.length < n && !seen[k] && !seenEn[e]) { seen[k] = 1; seenEn[e] = 1; out.push(q); }
  });
  return out;
}
function enWords(p) { return alts(p.en)[0].split(' '); }
function canTiles(p) { var n = enWords(p).length; return n >= 2 && n <= 9; }
function makeEx(p, type) {
  if (type === 'kn2en' || type === 'en2kn') {
    var ds = distractors(p, 3, type === 'kn2en' ? 'en' : 'kn');
    if (!ds.length) return { type: 'type', p: p };
    return { type: type, p: p, options: shuffle([p].concat(ds)) };
  }
  if (type === 'tiles') {
    var words = enWords(p);
    var have = {}; words.forEach(function (w) { have[normEn(w)] = 1; });
    var pool = [];
    PHRASES.forEach(function (q) { if (q !== p) enWords(q).forEach(function (w) { var k = normEn(w); if (k && !have[k]) { have[k] = 1; pool.push(w); } }); });
    var tiles = words.concat(pick(pool, Math.min(3, Math.max(2, Math.ceil(words.length / 2)))));
    return { type: 'tiles', p: p, tiles: shuffle(tiles.map(function (w, i) { return { w: w.replace(/[^\w'’-]/g, '') || w, id: i }; })) };
  }
  return { type: type, p: p };
}
function buildExercises(phrases) {
  var first = [], second = [];
  phrases.forEach(function (p, i) {
    var t1 = strength(p) < 2 || !p.kn ? 'kn2en' : (i % 2 ? 'en2kn' : 'kn2en');
    first.push(makeEx(p, t1));
    var cands = [];
    if (canTiles(p)) cands.push('tiles');
    if (p.tr) cands.push('type');
    if (t1 !== 'en2kn') cands.push('en2kn');
    if (!cands.length) cands.push('kn2en');
    second.push(makeEx(p, cands[(i + strength(p)) % cands.length]));
  });
  var list = first;
  if (phrases.length >= 3) list = list.concat([{ type: 'match', phrases: phrases.slice(0, 5) }]);
  else if (PHRASES.length >= 3) list = list.concat([{ type: 'match', phrases: phrases.concat(distractors(phrases[0], 3 - phrases.length, 'en')) }]);
  return list.concat(shuffle(second));
}

/* ---------- state ---------- */
var state = { screen: 'home' };
var app = document.getElementById('app');
function mount(nodes) { app.innerHTML = ''; nodes.forEach(function (n) { if (n) app.appendChild(n); }); window.scrollTo(0, 0); }
function topBar() {
  return h('header', { class: 'top' }, [
    h('div', { class: 'brand' }, ['Kali', h('small', { class: 'kn', text: 'ಕಲಿ' })]),
    h('div', { class: 'stats' }, [h('span', { class: 'pill' }, [h('b', { text: String(streakNow()) }), ' day streak']), h('span', { class: 'pill' }, [h('b', { text: String(P.xp) }), ' XP'])])
  ]);
}

/* ---------- home ---------- */
function renderHome() {
  state = { screen: 'home' };
  var nextFound = false;
  var units = UNITS.map(function (u) {
    var doneCount = u.lessons.filter(function (l) { return P.done[l.id]; }).length;
    return h('section', { class: 'unit' }, [
      h('h2', {}, [u.name, h('span', { text: doneCount + ' of ' + u.lessons.length })]), h('div', { class: 'dotrule' }),
      h('div', { class: 'lessons' }, u.lessons.map(function (l) {
        var cls = 'lesson-btn';
        if (P.done[l.id]) cls += ' done';
        else if (!nextFound) { cls += ' next'; nextFound = true; }
        return h('button', { class: cls, 'aria-label': u.name + ' lesson ' + l.num, text: P.done[l.id] ? '✓' : String(l.num),
          onclick: function () { startLesson(l.phrases, l.id, u.name + ' · ' + l.num); } });
      }))
    ]);
  });
  mount([h('div', { class: 'flag' }), topBar(), h('main', {}, [
    h('div', { class: 'actions' }, [
      h('button', { class: 'btn btn-yellow', text: 'Practice weak', disabled: PHRASES.length < 2, onclick: practiceWeak }),
      h('button', { class: 'btn btn-ghost', text: 'Phrasebook', onclick: renderBook })
    ])
  ].concat(units.length ? units : [h('p', { class: 'empty', text: 'No phrases yet. Add some to PHRASES in worker.js.' })]))]);
}
function practiceWeak() {
  var ranked = shuffle(PHRASES).sort(function (a, b) { return strength(a) - strength(b); });
  startLesson(ranked.slice(0, 7), null, 'Practice');
}

/* ---------- lesson ---------- */
function startLesson(phrases, id, title) {
  var ex = buildExercises(phrases);
  state = { screen: 'lesson', id: id, title: title, queue: ex, total: ex.length, pos: 0, hearts: 5,
            mistakes: 0, missed: {}, phase: 'answer', answer: null, phrases: phrases };
  renderLesson();
}
function cur() { return state.queue[state.pos]; }
function renderLesson() {
  var ex = cur();
  var pct = Math.round(100 * state.pos / state.queue.length);
  var bar = h('div', { class: 'lbar' }, [
    h('button', { class: 'x', 'aria-label': 'Quit lesson', text: '✕', onclick: function () { if (state.pos === 0 || confirm('Quit this lesson? Progress in it will be lost.')) renderHome(); } }),
    h('div', { class: 'prog' }, [h('i', { style: 'width:' + pct + '%' })]),
    h('div', { class: 'hearts', text: '\u2665\uFE0E ' + state.hearts })
  ]);
  var body = h('div', { class: 'ex' });
  state.answer = null;
  var footer = h('footer', { class: 'check' });
  var checkBtn = h('button', { class: 'btn btn-red wide', text: 'Check', disabled: true, onclick: function () { grade(); } });
  function setReady(v) { checkBtn.disabled = !v; }
  state.setReady = setReady;
  footer.appendChild(checkBtn);
  state.footer = footer;

  if (ex.type === 'kn2en' || ex.type === 'en2kn') {
    var isKn = ex.type === 'kn2en';
    body.appendChild(h('h3', { text: isKn ? 'What does this mean?' : 'How do you say this in Kannada?' }));
    body.appendChild(h('div', { class: 'prompt' }, [
      isKn ? speakBtn(ex.p) : null,
      h('div', {}, isKn
        ? [h('div', { class: 'big kn', text: display(ex.p) }), ex.p.kn && ex.p.tr ? h('div', { class: 'sub', text: ex.p.tr }) : null]
        : [h('div', { class: 'big', text: ex.p.en.replace(/\s*[\/;]\s*/g, ' / ') })])
    ]));
    var opts = h('div', { class: 'opts' });
    ex.options.forEach(function (o) {
      var b = h('button', { class: 'opt' + (isKn ? '' : ' kn') }, isKn
        ? [alts(o.en)[0]]
        : [display(o), o.kn && o.tr ? h('span', { class: 'sub', text: o.tr }) : null]);
      b._o = o;
      b.addEventListener('click', function () {
        if (state.phase !== 'answer') return;
        [].forEach.call(opts.children, function (c) { c.classList.remove('sel'); });
        b.classList.add('sel'); state.answer = o; setReady(true);
      });
      opts.appendChild(b);
    });
    state.opts = opts;
    body.appendChild(opts);
  } else if (ex.type === 'type') {
    body.appendChild(h('h3', { text: 'Type this in Kannada (romanized)' }));
    body.appendChild(h('div', { class: 'prompt' }, [h('div', { class: 'big', text: ex.p.en.replace(/\s*[\/;]\s*/g, ' / ') })]));
    var ta = h('textarea', { placeholder: 'Type in English letters…', autocapitalize: 'off', autocomplete: 'off', autocorrect: 'off', spellcheck: 'false' });
    ta.addEventListener('input', function () { state.answer = ta.value; setReady(ta.value.trim().length > 0); });
    ta.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); if (state.phase === 'answer' && !checkBtn.disabled) grade(); else if (state.phase === 'feedback') next(); } });
    body.appendChild(ta);
    body.appendChild(h('div', { class: 'hint', text: 'Spacing, capitals and small typos are OK.' }));
    setTimeout(function () { ta.focus(); }, 50);
  } else if (ex.type === 'tiles') {
    body.appendChild(h('h3', { text: 'Translate into English' }));
    body.appendChild(h('div', { class: 'prompt' }, [speakBtn(ex.p), h('div', {}, [h('div', { class: 'big kn', text: display(ex.p) }), ex.p.kn && ex.p.tr ? h('div', { class: 'sub', text: ex.p.tr }) : null])]));
    var line = h('div', { class: 'answer-line' });
    var bank = h('div', { class: 'bank' });
    var chosen = [];
    function sync() { state.answer = chosen.map(function (t) { return t.w; }).join(' '); setReady(chosen.length > 0); }
    ex.tiles.forEach(function (t) {
      var src = h('button', { class: 'tile', text: t.w });
      src.addEventListener('click', function () {
        if (state.phase !== 'answer' || src.classList.contains('used')) return;
        src.classList.add('used'); chosen.push(t);
        var placed = h('button', { class: 'tile', text: t.w });
        placed.addEventListener('click', function () {
          if (state.phase !== 'answer') return;
          chosen.splice(chosen.indexOf(t), 1); line.removeChild(placed); src.classList.remove('used'); sync();
        });
        line.appendChild(placed); sync();
      });
      bank.appendChild(src);
    });
    body.appendChild(line); body.appendChild(bank);
  } else if (ex.type === 'match') {
    body.appendChild(h('h3', { text: 'Tap the matching pairs' }));
    var left = h('div', { class: 'col' }), right = h('div', { class: 'col' });
    var sel = null, left2go = ex.phrases.length;
    function tap(btn, p, side) {
      if (btn.classList.contains('gone')) return;
      if (!sel || sel.side === side) {
        if (sel) sel.btn.classList.remove('sel');
        sel = { btn: btn, p: p, side: side }; btn.classList.add('sel'); return;
      }
      if (sel.p === p || normEn(sel.p.en) === normEn(p.en)) {
        sel.btn.classList.remove('sel'); sel.btn.classList.add('gone'); btn.classList.add('gone'); sel = null;
        if (--left2go === 0) { state.answer = true; grade(); }
      } else {
        var a = sel.btn; a.classList.remove('sel'); a.classList.add('wrong'); btn.classList.add('wrong'); sel = null;
        state.matchMiss = true;
        setTimeout(function () { a.classList.remove('wrong'); btn.classList.remove('wrong'); }, 450);
      }
    }
    state.matchMiss = false;
    shuffle(ex.phrases).forEach(function (p) { var b = h('button', { class: 'mt kn', text: display(p) }); b.addEventListener('click', function () { tap(b, p, 'L'); }); left.appendChild(b); });
    shuffle(ex.phrases).forEach(function (p) { var b = h('button', { class: 'mt', text: alts(p.en)[0] }); b.addEventListener('click', function () { tap(b, p, 'R'); }); right.appendChild(b); });
    body.appendChild(h('div', { class: 'match' }, [left, right]));
    checkBtn.textContent = 'Match all pairs';
  }
  state.phase = 'answer';
  mount([bar, body, footer]);
}
function isCorrect(ex, ans) {
  if (ex.type === 'match') return true;
  if (ex.type === 'kn2en' || ex.type === 'en2kn') return ans === ex.p || (ex.type === 'kn2en' ? normEn(ans.en) === normEn(ex.p.en) : display(ans) === display(ex.p));
  if (ex.type === 'tiles') { var a = normEn(ans); return alts(ex.p.en).some(function (x) { return normEn(x) === a; }); }
  if (ex.type === 'type') {
    var t = normTr(ans).replace(/ /g, ''), key = normEn(ex.p.en);
    var ok = PHRASES.filter(function (q) { return q.tr && normEn(q.en) === key; });
    return ok.some(function (q) { return alts(q.tr).some(function (x) { var n = normTr(x).replace(/ /g, ''); return lev(t, n) <= Math.floor(n.length / 8); }); });
  }
  return false;
}
function correctText(ex) {
  if (ex.type === 'kn2en' || ex.type === 'tiles') return alts(ex.p.en).join(' / ');
  if (ex.type === 'en2kn') return display(ex.p) + (ex.p.kn && ex.p.tr ? '  (' + ex.p.tr + ')' : '');
  if (ex.type === 'type') return ex.p.tr + (ex.p.kn ? '  ·  ' + ex.p.kn : '');
  return '';
}
function grade() {
  if (state.phase !== 'answer') return;
  var ex = cur(), ok = isCorrect(ex, state.answer);
  state.phase = 'feedback';
  var f = state.footer; f.innerHTML = '';
  if (ex.type !== 'match') {
    var firstTry = !state.missed[ex.p.key + ex.type];
    if (ok && firstTry) bump(ex.p, 1);
    if (!ok) { bump(ex.p, -1); state.missed[ex.p.key + ex.type] = 1; }
  }
  if (state.opts) [].forEach.call(state.opts.children, function (c) {
    if (c._o === ex.p) c.classList.add('right'); else if (c.classList.contains('sel') && !ok) c.classList.add('wrong');
  });
  state.opts = null;
  if (ok) {
    f.className = 'check ok';
    f.appendChild(h('div', { class: 'fb fb-ok', text: pick(['Shabhash!', 'Correct.', 'Chennagide!', 'Nicely done.'], 1)[0] }));
    if (ex.type === 'type' && normTr(state.answer) !== normTr(alts(ex.p.tr)[0])) f.appendChild(h('div', { class: 'fb-ans kn', text: correctText(ex) }));
    if (ex.p && ex.p.note) f.appendChild(h('div', { class: 'fb-note', text: ex.p.note }));
  } else {
    state.hearts--; state.mistakes++;
    state.queue.push(ex.type === 'kn2en' || ex.type === 'en2kn' ? makeEx(ex.p, ex.type) : ex);
    f.className = 'check bad';
    f.appendChild(h('div', { class: 'fb fb-bad', text: 'Not quite' }));
    f.appendChild(h('div', { class: 'fb-ans kn' }, [h('b', { text: 'Answer: ' }), correctText(ex)]));
    if (ex.p.note) f.appendChild(h('div', { class: 'fb-note', text: ex.p.note }));
  }
  save();
  var hearts = app.querySelector('.hearts'); if (hearts) hearts.textContent = '\u2665\uFE0E ' + state.hearts;
  var cont = h('button', { class: 'btn wide ' + (ok ? 'btn-ok' : 'btn-bad'), text: 'Continue', onclick: next });
  f.appendChild(cont);
  if (ex.type !== 'type') cont.focus();
}
function next() {
  if (state.phase !== 'feedback') return;
  if (state.hearts <= 0) return renderOut();
  state.pos++;
  if (state.pos >= state.queue.length) return renderDone();
  renderLesson();
}

/* ---------- results ---------- */
function renderDone() {
  var perfect = state.mistakes === 0, gained = perfect ? 15 : 10;
  P.xp += gained;
  if (state.id) P.done[state.id] = true;
  var t = today();
  if (P.lastDay !== t) { P.streak = P.lastDay === yesterday() ? P.streak + 1 : 1; P.lastDay = t; }
  save();
  var replay = state.phrases, id = state.id, title = state.title;
  mount([h('div', { class: 'flag' }), h('div', { class: 'result' }, [
    h('div', { class: 'stamp', text: 'ಭಲೇ' }),
    h('h2', { text: 'Lesson complete!' }),
    h('p', { text: perfect ? 'Not a single slip.' : 'Well done.' }),
    h('div', { class: 'row' }, [
      h('div', { class: 'box' }, [h('small', { text: 'XP' }), '+' + gained]),
      h('div', { class: 'box' }, [h('small', { text: 'Accuracy' }), Math.round(100 * state.total / (state.total + state.mistakes)) + '%']),
      h('div', { class: 'box' }, [h('small', { text: 'Streak' }), P.streak + (P.streak === 1 ? ' day' : ' days')])
    ]),
    h('button', { class: 'btn btn-red wide', text: 'Continue', onclick: renderHome }),
    h('button', { class: 'btn btn-ghost wide', text: 'Practice again', onclick: function () { startLesson(replay, id, title); } })
  ])]);
}
function renderOut() {
  var replay = state.phrases, id = state.id, title = state.title;
  mount([h('div', { class: 'flag' }), h('div', { class: 'result' }, [
    h('div', { class: 'stamp sad', text: 'ಅಯ್ಯೋ' }),
    h('h2', { text: 'Out of hearts' }),
    h('p', { text: 'No worries. Every mistake helps you remember.' }),
    h('button', { class: 'btn btn-red wide', text: 'Try again', onclick: function () { startLesson(replay, id, title); } }),
    h('button', { class: 'btn btn-ghost wide', text: 'Back home', onclick: renderHome })
  ])]);
}

/* ---------- phrasebook ---------- */
function renderBook() {
  state = { screen: 'book' };
  var list = h('div');
  var input = h('input', { class: 'search', type: 'search', placeholder: 'Search Kannada, romanized or English…' });
  function draw() {
    var q = input.value.trim().toLowerCase(), qt = normTr(q);
    list.innerHTML = '';
    var n = 0;
    UNITS.forEach(function (u) {
      var ps = u.phrases.filter(function (p) {
        return !q || p.kn.indexOf(q) >= 0 || p.en.toLowerCase().indexOf(q) >= 0 || (qt && normTr(p.tr).indexOf(qt) >= 0) || p.note.toLowerCase().indexOf(q) >= 0;
      });
      if (!ps.length) return;
      list.appendChild(h('div', { class: 'cat-h', text: u.name }));
      ps.forEach(function (p) {
        n++;
        var dots = h('div', { class: 'dots', title: 'Strength ' + strength(p) + '/5' });
        for (var i = 0; i < 5; i++) dots.appendChild(h('i', { class: i < strength(p) ? 'on' : '' }));
        list.appendChild(h('div', { class: 'pb' }, [
          h('div', { class: 'main' }, [
            p.kn ? h('div', { class: 'k kn', text: p.kn }) : null,
            p.tr ? h('div', { class: p.kn ? 't' : 'k', text: p.tr }) : null,
            h('div', { class: 'e', text: p.en.replace(/\s*[\/;]\s*/g, ' / ') }),
            p.note ? h('div', { class: 'n', text: p.note }) : null,
            dots
          ]),
          speakBtn(p)
        ]));
      });
    });
    if (!n) list.appendChild(h('p', { class: 'empty', text: 'No matches.' }));
  }
  input.addEventListener('input', draw);
  draw();
  mount([h('div', { class: 'flag' }), topBar(), h('main', {}, [
    h('button', { class: 'back', text: '← Back', onclick: renderHome }),
    h('p', { class: 'hint', text: PHRASES.length + ' phrases' + (knVoice || !PHRASES.some(function (p) { return p.kn; }) ? '' : ' · no Kannada voice on this device, so audio is off') }),
    input, list
  ])]);
}

renderHome();
</script>
</body>
</html>`;

export default {
  async fetch(request) {
    const { pathname } = new URL(request.url);
    if (pathname === "/phrases.json") {
      return new Response(JSON.stringify(PHRASES, null, 2), {
        headers: { "content-type": "application/json; charset=utf-8", "access-control-allow-origin": "*" },
      });
    }
    if (pathname === "/" || pathname === "/index.html") {
      // Replacer function, so "$" in phrase data is never treated as a pattern.
      // Escape "<" so a phrase can never close the <script> tag.
      const json = JSON.stringify(PHRASES).replace(/</g, "\\u003c");
      const html = PAGE.replace("__PHRASES__", () => json);
      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-cache" },
      });
    }
    if (pathname === "/favicon.ico") return new Response(null, { status: 204 });
    return new Response("Not found", { status: 404 });
  },
};
