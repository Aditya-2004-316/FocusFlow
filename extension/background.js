/**
 * Background Service Worker for FocusFlow Timer
 * Manages shared timer state across all tabs
 * No page tracking or content analysis
 */

// Timer state object
const timerState = {
    isRunning: false,
    timeRemaining: 1500, // 25 minutes in seconds (default Pomodoro)
    sessionType: "focus", // 'focus' or 'break'
    totalFocusTime: 0, // in seconds
    sessionsCompleted: 0,
    lastStartTime: null,
    focusDuration: 1500, // 25 minutes
    breakDuration: 300, // 5 minutes
};

// Initialize state from storage on startup
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get(["timerState"], (result) => {
        if (!result.timerState) {
            chrome.storage.local.set({ timerState });
        }
    });
});

// Interval to update timer
let timerInterval = null;

// Start the timer
function startTimer() {
    if (timerInterval) return;

    timerInterval = setInterval(async () => {
        const { timerState: state } = await chrome.storage.local.get([
            "timerState",
        ]);

        if (!state || !state.isRunning) {
            clearInterval(timerInterval);
            timerInterval = null;
            return;
        }

        state.timeRemaining -= 1;

        // Timer completed
        if (state.timeRemaining <= 0) {
            handleTimerComplete(state);
        } else {
            // Update storage
            await chrome.storage.local.set({ timerState: state });
            // Notify all tabs of the update
            chrome.tabs.query({}, (tabs) => {
                tabs.forEach((tab) => {
                    chrome.tabs
                        .sendMessage(tab.id, {
                            type: "timerUpdated",
                            state,
                        })
                        .catch(() => {
                            // Tab might not have content script loaded, ignore error
                        });
                });
            });
        }
    }, 1000);
}

// Handle timer completion
async function handleTimerComplete(state) {
    clearInterval(timerInterval);
    timerInterval = null;

    if (state.sessionType === "focus") {
        // Switch to break
        state.sessionsCompleted += 1;
        state.totalFocusTime += state.focusDuration;
        state.sessionType = "break";
        state.timeRemaining = state.breakDuration;
    } else {
        // Switch to focus
        state.sessionType = "focus";
        state.timeRemaining = state.focusDuration;
    }

    state.isRunning = false;

    await chrome.storage.local.set({ timerState: state });

    // Notify all tabs with completion event
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
            chrome.tabs
                .sendMessage(tab.id, {
                    type: "timerCompleted",
                    state,
                })
                .catch(() => {
                    // Tab might not have content script loaded, ignore error
                });
        });
    });
}

// Listen for messages from content scripts and popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "startTimer") {
        handleStartTimer().then(sendResponse);
        return true; // Keep channel open for async response
    }

    if (message.type === "pauseTimer") {
        handlePauseTimer().then(sendResponse);
        return true;
    }

    if (message.type === "resetTimer") {
        handleResetTimer().then(sendResponse);
        return true;
    }

    if (message.type === "getState") {
        chrome.storage.local.get(["timerState"], (result) => {
            sendResponse({ state: result.timerState || timerState });
        });
        return true;
    }

    if (message.type === "setDurations") {
        handleSetDurations(message.focusDuration, message.breakDuration).then(
            sendResponse
        );
        return true;
    }

    if (message.type === "switchSession") {
        handleSwitchSession().then(sendResponse);
        return true;
    }
});

async function handleStartTimer() {
    const { timerState: state } = await chrome.storage.local.get([
        "timerState",
    ]);
    state.isRunning = true;
    state.lastStartTime = Date.now();

    await chrome.storage.local.set({ timerState: state });
    startTimer();

    // Notify all tabs
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
            chrome.tabs
                .sendMessage(tab.id, {
                    type: "timerUpdated",
                    state,
                })
                .catch(() => {});
        });
    });

    return { success: true, state };
}

async function handlePauseTimer() {
    const { timerState: state } = await chrome.storage.local.get([
        "timerState",
    ]);
    state.isRunning = false;

    clearInterval(timerInterval);
    timerInterval = null;

    await chrome.storage.local.set({ timerState: state });

    // Notify all tabs
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
            chrome.tabs
                .sendMessage(tab.id, {
                    type: "timerUpdated",
                    state,
                })
                .catch(() => {});
        });
    });

    return { success: true, state };
}

async function handleResetTimer() {
    const { timerState: state } = await chrome.storage.local.get([
        "timerState",
    ]);

    state.isRunning = false;
    state.timeRemaining = state.focusDuration;
    state.sessionType = "focus";

    clearInterval(timerInterval);
    timerInterval = null;

    await chrome.storage.local.set({ timerState: state });

    // Notify all tabs
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
            chrome.tabs
                .sendMessage(tab.id, {
                    type: "timerUpdated",
                    state,
                })
                .catch(() => {});
        });
    });

    return { success: true, state };
}

async function handleSetDurations(focusDuration, breakDuration) {
    const { timerState: state } = await chrome.storage.local.get([
        "timerState",
    ]);

    state.focusDuration = focusDuration;
    state.breakDuration = breakDuration;

    // Reset timer to focus duration if not running
    if (!state.isRunning) {
        state.timeRemaining = focusDuration;
        state.sessionType = "focus";
    }

    await chrome.storage.local.set({ timerState: state });

    // Notify all tabs
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
            chrome.tabs
                .sendMessage(tab.id, {
                    type: "timerUpdated",
                    state,
                })
                .catch(() => {});
        });
    });

    return { success: true, state };
}

async function handleSwitchSession() {
    const { timerState: state } = await chrome.storage.local.get([
        "timerState",
    ]);

    if (state.sessionType === "focus") {
        state.totalFocusTime += state.focusDuration;
        state.sessionsCompleted += 1;
        state.sessionType = "break";
        state.timeRemaining = state.breakDuration;
    } else {
        state.sessionType = "focus";
        state.timeRemaining = state.focusDuration;
    }

    state.isRunning = false;

    clearInterval(timerInterval);
    timerInterval = null;

    await chrome.storage.local.set({ timerState: state });

    // Notify all tabs
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
            chrome.tabs
                .sendMessage(tab.id, {
                    type: "timerUpdated",
                    state,
                })
                .catch(() => {});
        });
    });

    return { success: true, state };
}
