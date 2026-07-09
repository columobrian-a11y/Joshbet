/* ============================================================
   script.js
   Everything on the page is built from `diaryData` (defined in
   data.js, loaded before this file) and `HABIT_LIST`.

   Sections in this file:
     1. Tab / nav switching
     2. Calendar
     3. Diary list
     4. Add-entry code generator
     5. Progress stats + chart
     6. Photos grid
     7. Small helpers
   ============================================================ */

// Make a quick lookup of entries by date string, sorted newest -> oldest
const entriesByDate = {};
diaryData.entries.forEach((e) => (entriesByDate[e.date] = e));
const sortedEntries = [...diaryData.entries].sort((a, b) => (a.date < b.date ? 1 : -1));

/* ============================================================
   1. TAB / NAV SWITCHING
   ============================================================ */
document.querySelectorAll("nav .tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("nav .tab").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("view-" + btn.dataset.view).classList.add("active");
  });
});

/* ============================================================
   2. CALENDAR
   ============================================================ */

// Start the calendar on the month of the most recent entry (or today if none)
let calYear, calMonth; // calMonth is 0-indexed (0 = January)
(function initCalendarMonth() {
  const ref = sortedEntries.length ? new Date(sortedEntries[0].date) : new Date();
  calYear = ref.getFullYear();
  calMonth = ref.getMonth();
})();

function scoreToColor(score) {
  if (score <= 3) return "var(--rose)";
  if (score <= 6) return "var(--amber)";
  return "var(--sage)";
}

function renderCalendar() {
  const grid = document.getElementById("calendarGrid");
  const label = document.getElementById("calendarLabel");
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  label.textContent = `${monthNames[calMonth]} ${calYear}`;

  grid.innerHTML = "";

  // day-of-week headers
  ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].forEach((d) => {
    const el = document.createElement("div");
    el.className = "dow";
    el.textContent = d;
    grid.appendChild(el);
  });

  const firstOfMonth = new Date(calYear, calMonth, 1);
  // convert Sunday=0..Saturday=6 into Monday-first index (0=Mon..6=Sun)
  const leadingBlanks = (firstOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

  for (let i = 0; i < leadingBlanks; i++) {
    const blank = document.createElement("div");
    blank.className = "day-cell empty";
    grid.appendChild(blank);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const entry = entriesByDate[dateStr];
    const cell = document.createElement("div");
    cell.className = "day-cell";
    cell.textContent = day;

    if (entry) {
      cell.classList.add("has-entry");
      cell.style.background = scoreToColor(entry.score);
      cell.addEventListener("click", () => showCalendarDetail(entry));
    }
    grid.appendChild(cell);
  }
}

function showCalendarDetail(entry) {
  document.getElementById("calendarDetail").innerHTML = renderEntryHTML(entry);
}

document.getElementById("prevMonth").addEventListener("click", () => {
  calMonth--;
  if (calMonth < 0) { calMonth = 11; calYear--; }
  renderCalendar();
});
document.getElementById("nextMonth").addEventListener("click", () => {
  calMonth++;
  if (calMonth > 11) { calMonth = 0; calYear++; }
  renderCalendar();
});

/* ============================================================
   3. DIARY LIST
   ============================================================ */

function renderEntryHTML(entry) {
  const habitPills = HABIT_LIST
    .map((h) => `<span class="pill ${entry.habits && entry.habits[h] ? "done" : ""}">${h}</span>`)
    .join("");

  const photos = (entry.photos || [])
    .map((src) => `<img src="${src}" alt="Photo from ${entry.date}" onerror="this.style.display='none'">`)
    .join("");

  const activities = (entry.activities || []).join(" · ");

  return `
    <div class="entry">
      <p class="entry-date">${formatDate(entry.date)}</p>
      <div class="entry-stats">
        <span><b>Score</b> ${entry.score}/10</span>
        <span><b>Sleep</b> ${entry.sleepHours}h (${entry.sleepQuality}/5)</span>
        <span><b>Mood</b> ${entry.mood}/5</span>
        <span><b>Exercise</b> ${entry.exercise || "—"}</span>
      </div>
      <div class="habit-pills">${habitPills}</div>
      ${activities ? `<p style="color:var(--ink-soft); font-size:0.85rem; margin:0 0 0.5rem;">${activities}</p>` : ""}
      <p>${entry.notes || ""}</p>
      <div class="entry-photos">${photos}</div>
    </div>
  `;
}

function renderDiaryList() {
  const container = document.getElementById("diaryList");
  if (!sortedEntries.length) {
    container.innerHTML = `<p style="color:var(--ink-soft)">No entries yet — add one from the "Add entry" tab.</p>`;
    return;
  }
  container.innerHTML = sortedEntries.map(renderEntryHTML).join("");
}

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

/* ============================================================
   4. ADD-ENTRY CODE GENERATOR
   ============================================================ */

// Build the habit checkboxes from HABIT_LIST (edit HABIT_LIST in data.js
// to add/remove habits — this form updates automatically)
(function buildHabitCheckboxes() {
  const wrap = document.getElementById("habitCheckboxes");
  HABIT_LIST.forEach((habit) => {
    const row = document.createElement("div");
    row.className = "checkbox-row";
    row.innerHTML = `
      <input type="checkbox" id="habit-${habit}" />
      <label for="habit-${habit}">${habit}</label>
    `;
    wrap.appendChild(row);
  });
})();

document.getElementById("generateBtn").addEventListener("click", () => {
  const date = document.getElementById("f-date").value || new Date().toISOString().slice(0, 10);
  const score = Number(document.getElementById("f-score").value) || 0;
  const sleepHours = Number(document.getElementById("f-sleepHours").value) || 0;
  const sleepQuality = Number(document.getElementById("f-sleepQuality").value) || 0;
  const mood = Number(document.getElementById("f-mood").value) || 0;
  const exercise = document.getElementById("f-exercise").value.replace(/"/g, "'");
  const notes = document.getElementById("f-notes").value.replace(/"/g, "'");
  const activities = document.getElementById("f-activities").value
    .split(",").map((s) => s.trim()).filter(Boolean);
  const photos = document.getElementById("f-photos").value
    .split(",").map((s) => s.trim()).filter(Boolean);

  const habitsObj = {};
  HABIT_LIST.forEach((h) => {
    habitsObj[h] = document.getElementById(`habit-${h}`).checked;
  });

  const code = `    {
      date: "${date}",
      score: ${score},
      sleepHours: ${sleepHours},
      sleepQuality: ${sleepQuality},
      mood: ${mood},
      exercise: "${exercise}",
      habits: ${JSON.stringify(habitsObj)},
      activities: ${JSON.stringify(activities)},
      notes:
        "${notes}",
      photos: ${JSON.stringify(photos)},
    },`;

  document.getElementById("codeOutput").textContent = code;
  document.getElementById("generatedCode").style.display = "block";
});

document.getElementById("copyBtn").addEventListener("click", () => {
  const text = document.getElementById("codeOutput").textContent;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById("copyBtn");
    const old = btn.textContent;
    btn.textContent = "Copied!";
    setTimeout(() => (btn.textContent = old), 1500);
  });
});

/* ============================================================
   5. PROGRESS: stat boxes + a simple line chart (no libraries,
   drawn directly on a <canvas> — keeps this "basic JS/CSS/HTML"
   with no build tools or dependencies).
   ============================================================ */

function renderProgress() {
  const statGrid = document.getElementById("statGrid");

  if (!sortedEntries.length) {
    statGrid.innerHTML = `<p style="color:var(--ink-soft)">No entries yet.</p>`;
    return;
  }

  const avg = (arr) => (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1);
  const scores = diaryData.entries.map((e) => e.score);
  const sleep = diaryData.entries.map((e) => e.sleepHours);
  const mood = diaryData.entries.map((e) => e.mood);

  statGrid.innerHTML = `
    <div class="stat-box"><span class="num">${diaryData.entries.length}</span><span class="label">entries logged</span></div>
    <div class="stat-box"><span class="num">${avg(scores)}</span><span class="label">avg day score</span></div>
    <div class="stat-box"><span class="num">${avg(sleep)}h</span><span class="label">avg sleep</span></div>
    <div class="stat-box"><span class="num">${avg(mood)}</span><span class="label">avg mood</span></div>
  `;

  drawTrendChart();
}

function drawTrendChart() {
  const canvas = document.getElementById("trendChart");
  const ctx = canvas.getContext("2d");
  // match canvas resolution to its displayed size (keeps lines crisp)
  const width = canvas.clientWidth;
  const height = canvas.height;
  canvas.width = width;
  canvas.height = height;

  ctx.clearRect(0, 0, width, height);

  // oldest -> newest, left to right
  const points = [...diaryData.entries].sort((a, b) => (a.date > b.date ? 1 : -1));
  if (points.length < 2) {
    ctx.fillStyle = "#6b6a63";
    ctx.font = "14px sans-serif";
    ctx.fillText("Add a couple more entries to see a trend line.", 10, height / 2);
    return;
  }

  const padding = 30;
  const maxScore = 10;
  const stepX = (width - padding * 2) / (points.length - 1);

  function plot(values, color) {
    ctx.beginPath();
    values.forEach((v, i) => {
      const x = padding + i * stepX;
      const y = height - padding - (v / maxScore) * (height - padding * 2);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.stroke();
  }

  // day score line (0-10) and mood scaled up to a 0-10 range for comparison
  plot(points.map((p) => p.score), "#2f5d62");
  plot(points.map((p) => p.mood * 2), "#c97b84");

  // axis baseline
  ctx.strokeStyle = "#dcded2";
  ctx.beginPath();
  ctx.moveTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.stroke();

  // legend
  ctx.font = "12px sans-serif";
  ctx.fillStyle = "#2f5d62";
  ctx.fillText("● day score", padding, 16);
  ctx.fillStyle = "#c97b84";
  ctx.fillText("● mood (x2 for scale)", padding + 90, 16);
}

/* ============================================================
   6. PHOTOS GRID — pulls every photo from every entry
   ============================================================ */

function renderPhotos() {
  const grid = document.getElementById("photoGrid");
  const withPhotos = diaryData.entries.filter((e) => e.photos && e.photos.length);

  if (!withPhotos.length) {
    grid.innerHTML = `<p style="color:var(--ink-soft)">No photos yet. Upload one to the photos/ folder on GitHub, then reference it in an entry's "photos" list.</p>`;
    return;
  }

  grid.innerHTML = withPhotos
    .flatMap((e) => e.photos.map((src) => ({ src, date: e.date })))
    .map(
      (p) => `
      <figure>
        <img src="${p.src}" alt="Photo from ${p.date}" onerror="this.parentElement.style.display='none'">
        <figcaption>${p.date}</figcaption>
      </figure>`
    )
    .join("");
}

/* ============================================================
   7. INIT — run everything once the page loads
   ============================================================ */

renderCalendar();
renderDiaryList();
renderProgress();
renderPhotos();

// default the "Add entry" date field to today
document.getElementById("f-date").value = new Date().toISOString().slice(0, 10);
