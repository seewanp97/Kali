# Kali (ಕಲಿ)

Duolingo-style practice for my Kannada phrases. Live at https://kali.kannada-practice.workers.dev

## Update phrases
1. Edit `const PHRASES = [...]` at the top of `worker.js`
   (`tr` = romanized, `en` = meaning, `cat` = unit, `note` = optional tip;
   use `/` for alternative answers, `(text)` is shown but not graded).
2. `npm install` (first time), then `npx cf deploy`.

Progress is stored in your browser (localStorage), so it stays per device.
