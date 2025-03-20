/** @format */

// script.js

let saveMoodBtn = document.getElementById("saveMood");

// Save mood to LocalStorage

function savIngMoodsToLocalStorage() {
  const mood = document.getElementById("mood").value;
  const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  let moodLogs = JSON.parse(localStorage.getItem("moodLogs")) || [];
  moodLogs.push({ date, mood });
  localStorage.setItem("moodLogs", JSON.stringify(moodLogs));

  displayTimeline();
  displayCalendar();
}

// Display Mood Timeline::::::

function displayTimeline() {
  const moodLogs = JSON.parse(localStorage.getItem("moodLogs")) || [];
  const timeline = document.getElementById("timeline");
  timeline.innerHTML = "";

  moodLogs.forEach((log) => {
    const moodEntry = document.createElement("div");
    moodEntry.className = "mood-entry";
    moodEntry.textContent = `${log.date}: ${log.mood}`;
    timeline.appendChild(moodEntry);
  });
}

// Display Calendar View:::

function displayCalendar() {
  const moodLogs = JSON.parse(localStorage.getItem("moodLogs")) || [];
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";

  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  //Generating Dates in the Calender

  for (let day = 1; day <= daysInMonth; day++) {
    const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    const moodLog = moodLogs.find((log) => log.date === date);
    const dayEl = document.createElement("div");

    dayEl.className = "calendar-day";
    dayEl.textContent = day;

    if (moodLog) {
      dayEl.style.backgroundColor =
        moodLog.mood === "Happy😊"
          ? "lightgreen"
          : moodLog.mood === "Sad😔"
          ? "lightblue"
          : moodLog.mood === "Neutral😐"
          ? "gray"
          : moodLog.mood === "Excited🤩"
          ? "yellow"
          : "pink";
      dayEl.title = moodLog.mood; // Tooltip for mood
    }

    calendar.appendChild(dayEl);
  }
}

//display date in Calendar

//Showing Today's Date to the Calendar
const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

let currentDate = document.getElementById("currentDate");
let todaysDate = `${today.getDate()}-${month + 1}-${year}`;
const dateEl = document.createElement("span");
dateEl.innerText = `Today's Date: ${todaysDate}`;
currentDate.appendChild(dateEl);

// Initialize on Page Load
window.onload = () => {
  displayTimeline();
  displayCalendar();
};

//EventListener to the saveMoodBtn

saveMoodBtn.addEventListener("click", savIngMoodsToLocalStorage);
