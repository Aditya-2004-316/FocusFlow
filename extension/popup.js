/**
 * Popup Script for FocusFlow Timer Extension
 * Handles popup UI interactions and displays timer state
 */

const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const saveSettingsBtn = document.getElementById("save-settings");
const focusInput = document.getElementById("focus-input");
const breakInput = document.getElementById("break-input");
const timeDisplay = document.getElementById("time-display");
const sessionLabel = document.getElementById("session-label");
const sessionsCount = document.getElementById("sessions-count");
const focusTime = document.getElementById("focus-time");
const progressFill = document.getElementById("progress-fill");
const statusIndicator = document.getElementById("status-indicator");
const statusText = document.getElementById("status-text");

let currentState = null;

// Load initial state
function loadState() {
    chrome.runtime.sendMessage({ type: "getState" }, (response) => {
        if (response && response.state) {
            currentState = response.state;
            updateDisplay();
        }
    });
}

// Update display elements
function updateDisplay() {
    if (!currentState) return;

    // Update time display
    const minutes = Math.floor(currentState.timeRemaining / 60);
    const seconds = currentState.timeRemaining % 60;
    timeDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(
        seconds
    ).padStart(2, "0")}`;

    // Update session label
    sessionLabel.textContent =
        currentState.sessionType === "focus" ? "Focus Session" : "Break Time";

    // Update stats
    sessionsCount.textContent = currentState.sessionsCompleted;

    const hours = Math.floor(currentState.totalFocusTime / 3600);
    const mins = Math.floor((currentState.totalFocusTime % 3600) / 60);
    focusTime.textContent = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

    // Update button states
    if (currentState.isRunning) {
        playBtn.style.display = "none";
        pauseBtn.style.display = "block";
        statusIndicator.classList.remove("paused");
        statusText.textContent = "Timer running";
    } else {
        playBtn.style.display = "block";
        pauseBtn.style.display = "none";
        statusIndicator.classList.add("paused");
        statusText.textContent = "Timer paused";
    }

    // Update progress bar
    const totalDuration =
        currentState.sessionType === "focus"
            ? currentState.focusDuration
            : currentState.breakDuration;
    const progress =
        ((totalDuration - currentState.timeRemaining) / totalDuration) * 100;
    progressFill.style.width = progress + "%";

    // Update input values
    focusInput.value = currentState.focusDuration / 60;
    breakInput.value = currentState.breakDuration / 60;
}

// Play button handler
playBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "startTimer" }, (response) => {
        if (response && response.state) {
            currentState = response.state;
            updateDisplay();
        }
    });
});

// Pause button handler
pauseBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "pauseTimer" }, (response) => {
        if (response && response.state) {
            currentState = response.state;
            updateDisplay();
        }
    });
});

// Reset button handler
resetBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "resetTimer" }, (response) => {
        if (response && response.state) {
            currentState = response.state;
            updateDisplay();
        }
    });
});

// Save settings handler
saveSettingsBtn.addEventListener("click", () => {
    const focusDuration = parseInt(focusInput.value) * 60;
    const breakDuration = parseInt(breakInput.value) * 60;

    chrome.runtime.sendMessage(
        {
            type: "setDurations",
            focusDuration,
            breakDuration,
        },
        (response) => {
            if (response && response.state) {
                currentState = response.state;
                updateDisplay();
                // Show feedback
                saveSettingsBtn.textContent = "✓ Saved";
                setTimeout(() => {
                    saveSettingsBtn.textContent = "Save Settings";
                }, 2000);
            }
        }
    );
});

// Listen for timer updates
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "timerUpdated" || message.type === "timerCompleted") {
        currentState = message.state;
        updateDisplay();
    }
});

// Update timer display every 100ms when popup is open
setInterval(() => {
    loadState();
}, 100);

// Initial load
loadState();
