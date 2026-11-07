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
  { kn: "ನಮಸ್ಕಾರ", tr: "namaskāra", en: "Hello / Greetings", cat: "Everyday" },
  { kn: "ಊಟ ಆಯ್ತಾ?", tr: "ūṭa āytā?", en: "Have you eaten?", cat: "Everyday", note: "A common way to say hello." },
  { kn: "ಹೇಗಿದ್ದೀರಾ?", tr: "hēgiddīrā?", en: "How are you? (respectful)", cat: "Everyday" },
  { kn: "ಚೆನ್ನಾಗಿದ್ದೀನಿ", tr: "chennāgiddīni", en: "I am fine / I'm fine / I am well", cat: "Everyday" },
  { kn: "ಧನ್ಯವಾದ", tr: "dhanyavāda", en: "Thank you / Thanks", cat: "Everyday" },
  { kn: "ಎಲ್ಲಿಗೆ ಹೋಗ್ತಾ ಇದ್ದೀರಾ?", tr: "ellige hōgtā iddīrā?", en: "Where are you going?", cat: "Getting around" },
  { kn: "ಬನ್ನಿ", tr: "banni", en: "Come (respectful) / Come in", cat: "Getting around" },
  { kn: "ಸ್ವಲ್ಪ ನಿಲ್ಲಿ", tr: "svalpa nilli", en: "Wait a little / Stop for a bit", cat: "Getting around" },
  { kn: "ಎಷ್ಟು?", tr: "eṣṭu?", en: "How much?", cat: "Getting around" },
  { kn: "ಗೊತ್ತಿಲ್ಲ", tr: "gottilla", en: "I don't know", cat: "Getting around" },
  { kn: "ನಿಮ್ಮ ಹೆಸರೇನು?", tr: "nimma hesarēnu?", en: "What is your name? / What's your name?", cat: "People" },
  { kn: "ಅಮ್ಮ", tr: "amma", en: "Mother / Mom", cat: "People" },
  { kn: "ಅಪ್ಪ", tr: "appa", en: "Father / Dad", cat: "People" },
];

const PAGE = String.raw`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#C8102E">
<title>Kali · ಕಲಿ</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Baloo+Tamma+2:wght@500;700;800&family=Noto+Sans+Kannada:wght@400;600;700&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
:root{
  --red:#C8102E; --red-d:#9c0c23; --yellow:#FFD100; --yellow-d:#d9b000;
  --bg:#FFF8E7; --card:#ffffff; --ink:#2b1d14; --muted:#7a6a5c; --line:#eadfca;
  --ok:#2e9d4a; --ok-bg:#dff5e3; --bad:#c62828; --bad-bg:#fde3e3;
}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body{margin:0;height:100%}
body{background:var(--bg);color:var(--ink);font-family:Nunito,"Noto Sans Kannada",system-ui,sans-serif;font-size:17px}
.kn{font-family:"Noto Sans Kannada","Baloo Tamma 2",sans-serif}
button{font:inherit;color:inherit;cursor:pointer}
#app{max-width:560px;margin:0 auto;min-height:100%;display:flex;flex-direction:column}
.flag{height:8px;background:linear-gradient(var(--yellow) 50%,var(--red) 50%)}
header.top{display:flex;align-items:center;justify-content:space-between;padding:14px 16px 10px}
.brand{font-family:"Baloo Tamma 2",sans-serif;font-weight:800;font-size:30px;color:var(--red);line-height:1}
.brand small{font-size:15px;color:var(--muted);font-weight:600;margin-left:6px}
.stats{display:flex;gap:10px;font-weight:800}
.pill{background:var(--card);border:2px solid var(--line);border-radius:999px;padding:4px 10px;font-size:15px;white-space:nowrap}
main{flex:1;padding:0 16px 24px}
.actions{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:6px 0 18px}
.btn{border:none;border-radius:16px;padding:14px 16px;font-weight:800;font-size:16px;box-shadow:0 4px 0 rgba(0,0,0,.18);transition:transform .05s}
.btn:active{transform:translateY(3px);box-shadow:0 1px 0 rgba(0,0,0,.18)}
.btn[disabled]{opacity:.45;pointer-events:none}
.btn-red{background:var(--red);color:#fff;box-shadow:0 4px 0 var(--red-d)}
.btn-yellow{background:var(--yellow);color:var(--ink);box-shadow:0 4px 0 var(--yellow-d)}
.btn-ghost{background:var(--card);border:2px solid var(--line);box-shadow:0 4px 0 var(--line)}
.btn-ok{background:var(--ok);color:#fff;box-shadow:0 4px 0 #1f7536}
.btn-bad{background:var(--bad);color:#fff;box-shadow:0 4px 0 #8e1b1b}
.wide{width:100%}
.unit{background:var(--card);border:2px solid var(--line);border-radius:20px;margin-bottom:16px;overflow:hidden}
.unit h2{margin:0;padding:12px 16px;background:var(--red);color:#fff;font-family:"Baloo Tamma 2",sans-serif;font-size:20px;display:flex;justify-content:space-between;align-items:center}
.unit h2 span{font-family:Nunito,sans-serif;font-size:13px;font-weight:700;background:rgba(255,255,255,.2);border-radius:999px;padding:2px 9px}
.lessons{display:flex;flex-wrap:wrap;gap:12px;padding:14px 16px 16px}
.lesson-btn{width:64px;height:64px;border-radius:50%;border:none;font-weight:800;font-size:20px;background:var(--yellow);box-shadow:0 5px 0 var(--yellow-d)}
.lesson-btn.done{background:var(--ok);color:#fff;box-shadow:0 5px 0 #1f7536}
.lesson-btn.next{outline:4px solid var(--red);outline-offset:3px}
.lesson-btn:active{transform:translateY(3px);box-shadow:none}
.empty{color:var(--muted);text-align:center;padding:30px 10px}
/* lesson */
.lbar{display:flex;align-items:center;gap:12px;padding:14px 16px}
.x{background:none;border:none;font-size:26px;color:var(--muted);padding:0 4px;line-height:1}
.prog{flex:1;height:16px;background:var(--line);border-radius:999px;overflow:hidden}
.prog i{display:block;height:100%;background:var(--red);border-radius:999px;transition:width .3s}
.hearts{font-weight:800;color:var(--bad);white-space:nowrap}
.ex{flex:1;padding:4px 16px 16px;display:flex;flex-direction:column}
.ex h3{font-size:20px;margin:6px 0 16px}
.prompt{display:flex;align-items:center;gap:10px;background:var(--card);border:2px solid var(--line);border-radius:18px;padding:16px;margin-bottom:18px}
.prompt .big{font-size:26px;font-weight:700;line-height:1.35}
.prompt .sub{color:var(--muted);font-size:15px;margin-top:2px}
.speak{border:none;background:var(--yellow);border-radius:12px;width:44px;height:44px;font-size:20px;flex:none;box-shadow:0 3px 0 var(--yellow-d)}
.opts{display:grid;gap:10px}
.opt{text-align:left;background:var(--card);border:2px solid var(--line);border-radius:16px;padding:14px 16px;font-size:18px;box-shadow:0 3px 0 var(--line)}
.opt .sub{display:block;color:var(--muted);font-size:14px}
.opt.sel{border-color:var(--red);background:#fff1f1;box-shadow:0 3px 0 var(--red)}
.opt.right{border-color:var(--ok);background:var(--ok-bg)}
.opt.wrong{border-color:var(--bad);background:var(--bad-bg)}
.answer-line{min-height:62px;border-bottom:2px solid var(--line);display:flex;flex-wrap:wrap;gap:8px;padding:8px 0;margin-bottom:18px}
.bank{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
.tile{background:var(--card);border:2px solid var(--line);border-radius:12px;padding:8px 12px;font-size:17px;font-weight:700;box-shadow:0 3px 0 var(--line)}
.tile.used{visibility:hidden}
textarea{width:100%;min-height:96px;border:2px solid var(--line);border-radius:16px;padding:14px;font:inherit;font-size:19px;background:var(--card);resize:none}
textarea:focus{outline:none;border-color:var(--red)}
.hint{color:var(--muted);font-size:14px;margin-top:8px}
.match{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.match .col{display:grid;gap:10px;align-content:start}
.mt{background:var(--card);border:2px solid var(--line);border-radius:14px;padding:12px 10px;min-height:56px;font-size:16px;box-shadow:0 3px 0 var(--line)}
.mt.sel{border-color:var(--red);background:#fff1f1}
.mt.gone{opacity:.25;pointer-events:none;border-color:var(--ok)}
.mt.wrong{border-color:var(--bad);background:var(--bad-bg)}
footer.check{padding:16px;border-top:2px solid var(--line);background:var(--bg)}
footer.check.ok{background:var(--ok-bg);border-color:var(--ok)}
footer.check.bad{background:var(--bad-bg);border-color:var(--bad)}
.fb{font-weight:800;font-size:19px;margin-bottom:4px}
.fb-ok{color:var(--ok)} .fb-bad{color:var(--bad)}
.fb-ans{margin-bottom:12px;font-size:16px}
.fb-note{color:var(--muted);font-size:14px;margin:-6px 0 12px}
/* results */
.result{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:24px 16px;gap:10px}
.result .emoji{font-size:72px}
.result h2{font-family:"Baloo Tamma 2",sans-serif;font-size:32px;margin:0;color:var(--red)}
.result .kn-title{font-size:22px;color:var(--muted)}
.result .row{display:flex;gap:10px;margin:10px 0 18px}
.result .box{background:var(--card);border:2px solid var(--line);border-radius:16px;padding:10px 16px;font-weight:800;min-width:96px}
.result .box small{display:block;color:var(--muted);font-weight:600;font-size:13px}
/* phrasebook */
.search{width:100%;padding:12px 14px;border:2px solid var(--line);border-radius:14px;font:inherit;background:var(--card);margin:4px 0 14px}
.search:focus{outline:none;border-color:var(--red)}
.cat-h{font-family:"Baloo Tamma 2",sans-serif;color:var(--red);font-size:20px;margin:14px 0 6px}
.pb{background:var(--card);border:2px solid var(--line);border-radius:14px;padding:12px 14px;margin-bottom:8px;display:flex;gap:10px;align-items:flex-start}
.pb .main{flex:1;min-width:0}
.pb .k{font-size:20px;font-weight:700}
.pb .t{color:var(--muted);font-size:15px}
.pb .e{font-size:16px;margin-top:2px}
.pb .n{font-size:14px;color:var(--muted);background:var(--bg);border-left:3px solid var(--yellow);padding:4px 8px;margin-top:6px;border-radius:4px}
.dots{display:flex;gap:3px;margin-top:6px}
.dots i{width:8px;height:8px;border-radius:50%;background:var(--line)}
.dots i.on{background:var(--ok)}
.back{background:none;border:none;font-weight:800;color:var(--red);font-size:16px;padding:0}
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
    for (var i = 0; i < u.phrases.length; i += LESSON_SIZE) {
      u.lessons.push({ id: u.name + '#' + (i / LESSON_SIZE), num: i / LESSON_SIZE + 1, phrases: u.phrases.slice(i, i + LESSON_SIZE) });
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
  var seen = {}; seen[field === 'en' ? normEn(p.en) : display(p)] = 1;
  var out = [];
  shuffle(same).concat(shuffle(other)).forEach(function (q) {
    var k = field === 'en' ? normEn(q.en) : display(q);
    if (out.length < n && !seen[k]) { seen[k] = 1; out.push(q); }
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
    h('div', { class: 'stats' }, [h('span', { class: 'pill', text: '🔥 ' + streakNow() }), h('span', { class: 'pill', text: '⭐ ' + P.xp + ' XP' })])
  ]);
}

/* ---------- home ---------- */
function renderHome() {
  state = { screen: 'home' };
  var nextFound = false;
  var units = UNITS.map(function (u) {
    var doneCount = u.lessons.filter(function (l) { return P.done[l.id]; }).length;
    return h('section', { class: 'unit' }, [
      h('h2', {}, [u.name, h('span', { text: doneCount + '/' + u.lessons.length })]),
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
      h('button', { class: 'btn btn-yellow', text: '💪 Practice weak', disabled: PHRASES.length < 2, onclick: practiceWeak }),
      h('button', { class: 'btn btn-ghost', text: '📖 Phrasebook', onclick: renderBook })
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
    h('div', { class: 'hearts', text: '❤️ ' + state.hearts })
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
    body.appendChild(h('div', { class: 'hint', text: 'Accents are optional (a = ā). Small typos are OK.' }));
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
      if (sel.p === p) {
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
    var t = normTr(ans);
    return alts(ex.p.tr).some(function (x) { var n = normTr(x); return lev(t, n) <= Math.floor(n.length / 8); });
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
    f.appendChild(h('div', { class: 'fb fb-ok', text: pick(['Shabhash! 🎉', 'Correct!', 'Chennagide! ✨', 'Nice!'], 1)[0] }));
    if (ex.type === 'type' && normTr(state.answer) !== normTr(alts(ex.p.tr)[0])) f.appendChild(h('div', { class: 'fb-ans kn', text: correctText(ex) }));
    if (ex.p && ex.p.note) f.appendChild(h('div', { class: 'fb-note', text: '📝 ' + ex.p.note }));
  } else {
    state.hearts--; state.mistakes++;
    state.queue.push(ex.type === 'kn2en' || ex.type === 'en2kn' ? makeEx(ex.p, ex.type) : ex);
    f.className = 'check bad';
    f.appendChild(h('div', { class: 'fb fb-bad', text: 'Not quite' }));
    f.appendChild(h('div', { class: 'fb-ans kn' }, [h('b', { text: 'Answer: ' }), correctText(ex)]));
    if (ex.p.note) f.appendChild(h('div', { class: 'fb-note', text: '📝 ' + ex.p.note }));
  }
  save();
  var hearts = app.querySelector('.hearts'); if (hearts) hearts.textContent = '❤️ ' + state.hearts;
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
    h('div', { class: 'emoji', text: perfect ? '🏆' : '🎉' }),
    h('h2', { text: 'Lesson complete!' }),
    h('div', { class: 'kn-title kn', text: 'ಭಲೇ!' }),
    h('div', { class: 'row' }, [
      h('div', { class: 'box' }, [h('small', { text: 'XP' }), '+' + gained]),
      h('div', { class: 'box' }, [h('small', { text: 'Accuracy' }), Math.round(100 * state.total / (state.total + state.mistakes)) + '%']),
      h('div', { class: 'box' }, [h('small', { text: 'Streak' }), '🔥 ' + P.streak])
    ]),
    h('button', { class: 'btn btn-red wide', text: 'Continue', onclick: renderHome }),
    h('button', { class: 'btn btn-ghost wide', text: 'Practice again', onclick: function () { startLesson(replay, id, title); } })
  ])]);
}
function renderOut() {
  var replay = state.phrases, id = state.id, title = state.title;
  mount([h('div', { class: 'flag' }), h('div', { class: 'result' }, [
    h('div', { class: 'emoji', text: '💔' }),
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
    h('p', { class: 'hint', text: PHRASES.length + ' phrases' + (knVoice ? '' : ' · no Kannada voice on this device, so audio is off') }),
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
