/* ============================================================
   data.js — THIS FILE IS YOUR DIARY.
   ============================================================
   Everything the website shows (calendar colours, diary entries,
   progress charts, photos) comes from the "entries" list below.

   HOW THIS SOLVES THE "IT ONLY SAVES ON MY COMPUTER" PROBLEM:
   Instead of the site saving your entries into the browser's
   localStorage (which only that one browser/device can see),
   your entries live in THIS FILE, inside your GitHub repo.
   When you edit this file on GitHub and commit it, Netlify
   rebuilds the site automatically and your diary updates for
   everyone who visits it — on any device.

   HOW TO ADD TODAY'S ENTRY:
   1. Open the site, go to the "Add entry" tab, fill in the form.
   2. It will NOT save anywhere by itself — instead it prints a
      ready-made block of code at the bottom of the page.
   3. Copy that block.
   4. On GitHub, open data.js, paste the block inside the
      "entries" list below (anywhere between the [ and ]),
      separated from the other entries by a comma.
   5. Commit the change. Netlify redeploys in ~30 seconds and
      your new entry is live.

   HOW TO ADD A PHOTO:
   1. On GitHub, open the "photos" folder in this repo.
   2. Click "Add file" → "Upload files" and upload your photo,
      e.g. sunset.jpg  (keep the filename simple, no spaces).
   3. In the entry's "photos" list below, add "photos/sunset.jpg"
      Example: photos: ["photos/sunset.jpg", "photos/example.jpg"]

   FIELD GUIDE for each entry:
   - date         "YYYY-MM-DD" — must be unique, one entry per day
   - score        0-10 overall "how was the day" number.
                  This is the number that colours the calendar
                  (0-3 red-ish, 4-6 amber, 7-10 green).
   - sleepHours   number, e.g. 7.5
   - sleepQuality 1-5 (1 = terrible sleep, 5 = amazing sleep)
   - mood         1-5 (1 = rough day, 5 = great day)
   - exercise     short text, e.g. "5k run" or "Rest day"
   - habits       true/false for each habit you're tracking.
                  Add or remove habits freely — just make sure
                  every entry uses the same habit names, and
                  update HABIT_LIST below to match.
   - activities   a list of short text tags for the day
   - notes        your actual diary writing, as long as you like
   - photos       a list of file paths inside the photos/ folder
   ============================================================ */

// The habits you want to track. Edit this list any time —
// the "Add entry" form and the progress page read from it.
const HABIT_LIST = ["water", "movement", "reading", "meditation"];

const diaryData = {
  entries: [
    {
      date: "2026-07-07",
      score: 7,
      sleepHours: 7.5,
      sleepQuality: 4,
      mood: 4,
      exercise: "30 min run",
      habits: { water: true, movement: true, reading: false, meditation: true },
      activities: ["Ran along the canal", "Cooked dinner from scratch"],
      notes:
        "Solid day. Slept better after cutting caffeine off at 2pm. Felt calm most of the day, a bit tired by the evening but in a good way.",
      photos: ["photos/example.jpg"],
    },
    {
      date: "2026-07-08",
      score: 2,
      sleepHours: 7,
      sleepQuality: 6,
      mood: 3,
      exercise: "5",
      habits: {"water":false,"movement":false,"reading":true,"meditation":false},
      activities: [],
      notes:
        "Bop",
      photos: ["Screenshot_20260704-120240.png"],
      },
    {
      date: "2026-07-09",
      score: 9,
      sleepHours: 8,
      sleepQuality: 5,
      mood: 5,
      exercise: "Gym — legs day",
      habits: { water: true, movement: true, reading: true, meditation: true },
      activities: ["Gym in the morning", "Met a friend for coffee", "Meal prepped for the week"],
      notes:
        "Great day, everything clicked. Waking up earlier is really paying off. Want to keep this routine going through the week.",
      photos: ["photos/example.jpg"],
    },
  ],
};

/* ============================================================
   Nothing below this line needs to be touched — it just makes
   the data available to script.js.
   ============================================================ */
