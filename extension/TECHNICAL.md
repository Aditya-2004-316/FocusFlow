# FocusFlow Browser Extension - Technical Documentation

## Project Structure

```
d:\FocusFlow\extension/
├── manifest.json          # Manifest V3 configuration
├── background.js          # Service worker (timer state management)
├── content.js            # Content script (UI injection & sync)
├── popup.html            # Popup UI
├── popup.js              # Popup logic
├── README.md             # Full documentation
├── QUICK_START.md        # Quick setup guide
└── icons/                # Extension icons (16, 48, 128px)
```

## Architecture Overview

### 1. Manifest V3 (`manifest.json`)

-   **Minimal permissions**: Only `storage` and `scripting`
-   **Host permissions**: `<all_urls>` for universal injection
-   **Service worker**: Long-lived background process
-   **Content script**: Injected into all pages at document start
-   **Web accessible resources**: None needed (uses message passing)

**Key properties**:

```json
{
    "manifest_version": 3,
    "permissions": ["storage", "scripting"],
    "background": { "service_worker": "background.js" },
    "content_scripts": [{ "matches": ["<all_urls>"] }]
}
```

### 2. Background Service Worker (`background.js`)

**Responsibilities**:

-   Maintains single source of truth for timer state
-   Handles timer tick logic (every 1 second)
-   Manages play/pause/reset/duration updates
-   Broadcasts state changes to all content scripts
-   Persists state to `chrome.storage.local`

**State object**:

```javascript
{
  isRunning: boolean,
  timeRemaining: number (seconds),
  sessionType: 'focus' | 'break',
  focusDuration: number (seconds),
  breakDuration: number (seconds),
  totalFocusTime: number (seconds),
  sessionsCompleted: number
}
```

**Message handlers**:

-   `startTimer` - Start countdown
-   `pauseTimer` - Pause countdown
-   `resetTimer` - Reset to current session default
-   `setDurations` - Update focus/break times
-   `switchSession` - Manually switch between focus/break
-   `getState` - Retrieve current state

### 3. Content Script (`content.js`)

**Responsibilities**:

-   Injects floating timer UI into every page
-   Listens for state updates from background worker
-   Handles user interactions (buttons, dragging)
-   Syncs UI with background state
-   Provides audio notification on session completion

**Key features**:

-   **Injection timing**: `document_start` for earliest injection
-   **Scoping**: Wraps all styles with `!important` to prevent CSS conflicts
-   **Drag handling**: Mouse-based dragging with viewport boundary checks
-   **Notification sound**: Web Audio API for completion beep
-   **Error resilience**: Catches and ignores errors on restricted pages

**UI structure**:

```html
<div id="focusflow-timer-container">
    <div id="focusflow-timer">
        <div class="session-type">Focus</div>
        <div class="time-display">25:00</div>
        <div class="timer-controls">
            <button id="focusflow-play">▶</button>
            <button id="focusflow-pause">⏸</button>
            <button id="focusflow-reset">↻</button>
            <button id="focusflow-menu">⋮</button>
        </div>
        <div id="focusflow-menu-panel">
            <!-- Settings form -->
        </div>
        <div class="drag-handle"></div>
    </div>
</div>
```

### 4. Popup UI (`popup.html` + `popup.js`)

**Responsibilities**:

-   Display current timer state
-   Provide quick controls
-   Show productivity stats
-   Allow duration configuration

**Features**:

-   Real-time stats: sessions completed, total focus time
-   Progress bar showing session completion
-   Input validation for duration ranges
-   Visual feedback on button interactions

## State Management Flow

```
User clicks "Play"
  ↓
Content script sends message to background
  ↓
Background starts timer interval
  ↓
Each second: timeRemaining -= 1
  ↓
Background broadcasts to all tabs
  ↓
Content scripts update UI locally
  ↓
User sees timer decrement on all tabs simultaneously
```

## Data Persistence

**Local storage key**: `timerState`

Stored using `chrome.storage.local`:

```javascript
{
  timerState: {
    isRunning: boolean,
    timeRemaining: number,
    // ... other fields
  }
}
```

**Persistence behavior**:

-   State survives popup open/close
-   State survives tab close (restores on next tab open)
-   State survives browser restart (partially - running timers stop)
-   State is per-profile (different Chrome profiles = separate state)

## Cross-Tab Synchronization

**Mechanism**: Message passing via `chrome.tabs.sendMessage`

1. Background worker maintains master state
2. On any state change, background queries all tabs
3. Background sends `timerUpdated` message to each tab
4. Content scripts receive message and update local UI
5. Result: All tabs show identical state within ~100ms

**Advantages**:

-   No shared DOM needed
-   Works across different domains
-   Isolates timer data per browser window

## CSS Architecture

**Scope isolation**: All styles wrapped with `!important` to override page CSS

**Key selectors**:

-   `#focusflow-timer-container` - Root container
-   `.focusflow-timer` - Main timer element
-   `.timer-display` - Time and session label
-   `.timer-controls` - Button group
-   `.menu-panel` - Settings dropdown

**Responsive design**:

-   Fixed positioning
-   Viewport boundary checks on drag
-   Mobile-friendly button sizes (min 32px)

## Performance Considerations

**Memory**:

-   Timer UI: ~2-3KB injected HTML
-   CSS styles: ~5KB
-   Total per page: <10KB

**CPU**:

-   Timer interval: Runs every 1 second (minimal)
-   Message passing: <1ms per broadcast
-   No animations or continuous rendering

**Storage**:

-   Timer state: ~500 bytes
-   Total local storage: <1MB

**Optimization techniques**:

-   Debounced progress calculations
-   Lazy initialization of audio context
-   Efficient DOM selectors
-   Single style injection per page

## Browser Compatibility

### Chrome 90+

✅ Full MV3 support

### Edge 90+

✅ Identical to Chromium (uses same engine)

### Firefox

⚠️ MV3 support is experimental

-   Developer Edition: Full support
-   Nightly: Full support
-   Stable: Requires manual signing (use temporary addon for testing)

### Brave

✅ Full support (Chromium-based)

### Opera

✅ Full support (Chrome Web Store integration)

## Security & Privacy Analysis

**Permissions**:

-   `storage` - Only accesses timer state, not user data
-   `scripting` - Only injects UI, doesn't run arbitrary code
-   `<all_urls>` - Necessary for universal injection, but no data is collected

**Data collection**: NONE

-   No HTTP requests
-   No external services
-   No cookies modified
-   No localStorage accessed outside extension storage

**Page interference**: MINIMAL

-   Only adds one DOM element
-   Only injects necessary styles
-   Doesn't modify page scripts or behavior
-   Uses unique IDs to prevent conflicts

## Development & Testing

### Local testing:

1. Make changes to any file
2. Go to `chrome://extensions`
3. Click Reload for "FocusFlow Timer"
4. Refresh browser tabs to see changes

### Testing checklist:

-   [ ] Timer increments/decrements correctly
-   [ ] Play/pause toggles UI buttons
-   [ ] Reset sets time to session default
-   [ ] Settings save and apply
-   [ ] Timer syncs across 2+ tabs
-   [ ] Dragging works and respects viewport
-   [ ] Settings persist after close/open
-   [ ] No console errors in DevTools

### Debugging:

-   **Background worker**: `chrome://extensions` → Details → "Inspect views" → "service worker"
-   **Content script**: Right-click page → Inspect → Console
-   **Popup**: Click extension icon → Right-click → Inspect

## Future Enhancement Ideas

### Phase 2:

-   Keyboard shortcuts (Alt+Shift+T to toggle)
-   Statistics export (CSV, JSON)
-   Dark/light theme toggle
-   Sound selection for notifications

### Phase 3:

-   Integration with FocusFlow API
-   Cloud sync of statistics
-   Team/social features
-   Calendar view of focus sessions

### Phase 4:

-   Machine learning for optimal focus times
-   Do Not Disturb OS integration
-   Mobile app companion
-   Slack/Teams integration

## Troubleshooting Guide

**Issue**: Timer doesn't appear on some pages

-   **Cause**: Content scripts can't run on: chrome://, about:\*, extension pages
-   **Solution**: Works on all regular websites

**Issue**: Settings don't persist

-   **Cause**: Storage permission denied
-   **Solution**: Re-add extension and grant permissions

**Issue**: Multiple timers appear

-   **Cause**: Content script injected twice
-   **Solution**: Check `if (!window.focusflowTimerInjected)` guard is working

**Issue**: Timer jumps seconds

-   **Cause**: Background worker restarting (Chrome GC)
-   **Solution**: Use `chrome.alarms` API instead of setInterval (planned)

---

**Last Updated**: January 2026  
**Extension Version**: 1.0.0  
**Manifest Version**: 3
