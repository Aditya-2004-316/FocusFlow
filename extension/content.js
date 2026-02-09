/**
 * Content Script for FocusFlow Timer
 * Injects floating timer UI into the page
 * Handles UI interactions and syncs with background service worker
 */

// Prevent multiple injections
if (!window.focusflowTimerInjected) {
    window.focusflowTimerInjected = true;

    // Create and inject the timer UI
    function injectTimerUI() {
        // Check if already exists
        if (document.getElementById("focusflow-timer-container")) {
            return;
        }

        // Create container
        const container = document.createElement("div");
        container.id = "focusflow-timer-container";
        container.innerHTML = `
      <div id="focusflow-timer" class="focusflow-timer">
        <div class="timer-display">
          <div class="session-type">Focus</div>
          <div class="time-display">25:00</div>
        </div>
        <div class="timer-controls">
          <button id="focusflow-play" class="control-btn play-btn" title="Start timer">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
          <button id="focusflow-pause" class="control-btn pause-btn" title="Pause timer" style="display: none;">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          </button>
          <button id="focusflow-reset" class="control-btn reset-btn" title="Reset timer">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
            </svg>
          </button>
          <button id="focusflow-menu" class="control-btn menu-btn" title="Settings">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 8c1.1 0 2-0.9 2-2s-0.9-2-2-2-2 0.9-2 2 0.9 2 2 2zm0 2c-1.1 0-2 0.9-2 2s0.9 2 2 2 2-0.9 2-2-0.9-2-2-2zm0 6c-1.1 0-2 0.9-2 2s0.9 2 2 2 2-0.9 2-2-0.9-2-2-2z"/>
            </svg>
          </button>
        </div>
        <div id="focusflow-menu-panel" class="menu-panel" style="display: none;">
          <div class="menu-item">
            <label>Focus duration (minutes)</label>
            <input type="number" id="focus-duration-input" min="1" max="60" value="25">
          </div>
          <div class="menu-item">
            <label>Break duration (minutes)</label>
            <input type="number" id="break-duration-input" min="1" max="30" value="5">
          </div>
          <button id="focusflow-save-settings" class="save-btn">Save</button>
          <button id="focusflow-close-menu" class="close-btn">Close</button>
        </div>
        <div class="drag-handle"></div>
      </div>
    `;

        // Inject styles
        const style = document.createElement("style");
        style.textContent = getTimerStyles();
        document.head.appendChild(style);

        // Append to body
        document.body.appendChild(container);

        // Initialize event listeners
        initializeEventListeners();

        // Load initial state
        loadTimerState();
    }

    function getTimerStyles() {
        return `
      #focusflow-timer-container {
        all: initial;
        display: block !important;
        z-index: 999999 !important;
        position: fixed !important;
        top: 20px !important;
        right: 20px !important;
      }

      .focusflow-timer {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif !important;
        position: relative !important;
        background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%) !important;
        border-radius: 16px !important;
        padding: 16px !important;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
        color: #ffffff !important;
        min-width: 180px !important;
        user-select: none !important;
        cursor: grab !important;
      }

      .focusflow-timer.paused {
        background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%) !important;
      }

      .focusflow-timer.break {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
      }

      .focusflow-timer:active {
        cursor: grabbing !important;
      }

      .drag-handle {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        height: 8px !important;
        cursor: grab !important;
        border-radius: 16px 16px 0 0 !important;
      }

      .timer-display {
        text-align: center !important;
        margin-bottom: 12px !important;
      }

      .session-type {
        font-size: 11px !important;
        font-weight: 700 !important;
        text-transform: uppercase !important;
        letter-spacing: 0.05em !important;
        opacity: 0.9 !important;
        margin-bottom: 4px !important;
      }

      .time-display {
        font-size: 36px !important;
        font-weight: 800 !important;
        line-height: 1 !important;
        font-variant-numeric: tabular-nums !important;
        letter-spacing: -0.025em !important;
      }

      .timer-controls {
        display: flex !important;
        gap: 8px !important;
        justify-content: center !important;
        align-items: center !important;
      }

      .control-btn {
        all: unset !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 32px !important;
        height: 32px !important;
        border-radius: 8px !important;
        background: rgba(255, 255, 255, 0.2) !important;
        color: #ffffff !important;
        cursor: pointer !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
        transition: all 0.2s ease !important;
      }

      .control-btn:hover {
        background: rgba(255, 255, 255, 0.3) !important;
        transform: scale(1.05) !important;
      }

      .control-btn:active {
        transform: scale(0.95) !important;
      }

      .control-btn svg {
        width: 18px !important;
        height: 18px !important;
      }

      .menu-panel {
        position: absolute !important;
        top: 100% !important;
        right: 0 !important;
        margin-top: 8px !important;
        background: #ffffff !important;
        border-radius: 12px !important;
        padding: 12px !important;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15) !important;
        z-index: 1000000 !important;
        min-width: 200px !important;
      }

      .menu-item {
        display: flex !important;
        flex-direction: column !important;
        gap: 4px !important;
        margin-bottom: 12px !important;
      }

      .menu-item label {
        font-size: 12px !important;
        font-weight: 600 !important;
        color: #1f2937 !important;
        text-transform: uppercase !important;
        letter-spacing: 0.05em !important;
      }

      .menu-item input {
        all: unset !important;
        padding: 8px !important;
        border: 1px solid #e5e7eb !important;
        border-radius: 6px !important;
        font-size: 14px !important;
        color: #1f2937 !important;
        background: #f9fafb !important;
        text-align: center !important;
      }

      .menu-item input:focus {
        border-color: #3b82f6 !important;
        background: #f0f9ff !important;
        outline: none !important;
      }

      .save-btn,
      .close-btn {
        all: unset !important;
        width: 100% !important;
        padding: 8px !important;
        border-radius: 6px !important;
        font-size: 12px !important;
        font-weight: 600 !important;
        text-transform: uppercase !important;
        letter-spacing: 0.05em !important;
        cursor: pointer !important;
        transition: all 0.2s ease !important;
        margin-bottom: 4px !important;
      }

      .save-btn {
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%) !important;
        color: #ffffff !important;
        border: 1px solid #1e40af !important;
      }

      .save-btn:hover {
        transform: translateY(-1px) !important;
        box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3) !important;
      }

      .close-btn {
        background: #f3f4f6 !important;
        color: #374151 !important;
        border: 1px solid #e5e7eb !important;
      }

      .close-btn:hover {
        background: #e5e7eb !important;
      }

      /* Dragging state */
      .focusflow-timer.dragging {
        opacity: 0.9 !important;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
      }
    `;
    }

    function initializeEventListeners() {
        const timer = document.getElementById("focusflow-timer");
        const playBtn = document.getElementById("focusflow-play");
        const pauseBtn = document.getElementById("focusflow-pause");
        const resetBtn = document.getElementById("focusflow-reset");
        const menuBtn = document.getElementById("focusflow-menu");
        const menuPanel = document.getElementById("focusflow-menu-panel");
        const closeMenuBtn = document.getElementById("focusflow-close-menu");
        const saveSettingsBtn = document.getElementById(
            "focusflow-save-settings"
        );
        const focusDurationInput = document.getElementById(
            "focus-duration-input"
        );
        const breakDurationInput = document.getElementById(
            "break-duration-input"
        );
        const dragHandle = document.querySelector(".drag-handle");

        // Play button
        playBtn.addEventListener("click", () => {
            chrome.runtime.sendMessage({ type: "startTimer" }, (response) => {
                if (response && response.state) {
                    updateTimerDisplay(response.state);
                }
            });
        });

        // Pause button
        pauseBtn.addEventListener("click", () => {
            chrome.runtime.sendMessage({ type: "pauseTimer" }, (response) => {
                if (response && response.state) {
                    updateTimerDisplay(response.state);
                }
            });
        });

        // Reset button
        resetBtn.addEventListener("click", () => {
            chrome.runtime.sendMessage({ type: "resetTimer" }, (response) => {
                if (response && response.state) {
                    updateTimerDisplay(response.state);
                }
            });
        });

        // Menu button
        menuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            menuPanel.style.display =
                menuPanel.style.display === "none" ? "block" : "none";
        });

        // Close menu
        closeMenuBtn.addEventListener("click", () => {
            menuPanel.style.display = "none";
        });

        // Save settings
        saveSettingsBtn.addEventListener("click", () => {
            const focusDuration = parseInt(focusDurationInput.value) * 60;
            const breakDuration = parseInt(breakDurationInput.value) * 60;

            chrome.runtime.sendMessage(
                {
                    type: "setDurations",
                    focusDuration,
                    breakDuration,
                },
                (response) => {
                    if (response && response.state) {
                        updateTimerDisplay(response.state);
                        menuPanel.style.display = "none";
                    }
                }
            );
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!menuPanel.contains(e.target) && !menuBtn.contains(e.target)) {
                menuPanel.style.display = "none";
            }
        });

        // Drag functionality
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        dragHandle.addEventListener("mousedown", (e) => {
            isDragging = true;
            offsetX = e.clientX - timer.offsetLeft;
            offsetY = e.clientY - timer.offsetTop;
            timer.classList.add("dragging");
        });

        document.addEventListener("mousemove", (e) => {
            if (!isDragging) return;

            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;

            // Keep within viewport
            const maxX = window.innerWidth - timer.offsetWidth;
            const maxY = window.innerHeight - timer.offsetHeight;

            timer.style.left = Math.max(0, Math.min(x, maxX)) + "px";
            timer.style.top = Math.max(0, Math.min(y, maxY)) + "px";
            timer.style.right = "auto";
        });

        document.addEventListener("mouseup", () => {
            if (isDragging) {
                isDragging = false;
                timer.classList.remove("dragging");
            }
        });
    }

    function updateTimerDisplay(state) {
        const timer = document.getElementById("focusflow-timer");
        const sessionTypeEl = document.querySelector(".session-type");
        const timeDisplayEl = document.querySelector(".time-display");
        const playBtn = document.getElementById("focusflow-play");
        const pauseBtn = document.getElementById("focusflow-pause");

        // Update display
        const minutes = Math.floor(state.timeRemaining / 60);
        const seconds = state.timeRemaining % 60;
        timeDisplayEl.textContent = `${String(minutes).padStart(
            2,
            "0"
        )}:${String(seconds).padStart(2, "0")}`;

        // Update session type
        sessionTypeEl.textContent =
            state.sessionType === "focus" ? "Focus" : "Break";

        // Update timer styling
        if (state.sessionType === "focus") {
            timer.classList.remove("break");
        } else {
            timer.classList.add("break");
        }

        // Update button visibility
        if (state.isRunning) {
            playBtn.style.display = "none";
            pauseBtn.style.display = "inline-flex";
            timer.classList.remove("paused");
        } else {
            playBtn.style.display = "inline-flex";
            pauseBtn.style.display = "none";
            timer.classList.add("paused");
        }
    }

    function loadTimerState() {
        chrome.runtime.sendMessage({ type: "getState" }, (response) => {
            if (response && response.state) {
                updateTimerDisplay(response.state);

                // Update settings inputs
                const focusDurationInput = document.getElementById(
                    "focus-duration-input"
                );
                const breakDurationInput = document.getElementById(
                    "break-duration-input"
                );

                focusDurationInput.value = response.state.focusDuration / 60;
                breakDurationInput.value = response.state.breakDuration / 60;
            }
        });
    }

    // Listen for timer updates from background
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (
            message.type === "timerUpdated" ||
            message.type === "timerCompleted"
        ) {
            updateTimerDisplay(message.state);

            // Play notification sound for completed timers
            if (message.type === "timerCompleted") {
                playNotificationSound();
            }
        }
    });

    // Notification sound
    function playNotificationSound() {
        try {
            const audioContext =
                window.audioContext ||
                new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = "sine";

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(
                0.01,
                audioContext.currentTime + 0.5
            );

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            // Audio context not available or blocked
        }
    }

    // Inject timer when DOM is ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", injectTimerUI);
    } else {
        injectTimerUI();
    }
}
