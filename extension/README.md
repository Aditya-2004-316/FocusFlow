# FocusFlow Timer - Browser Extension

A lightweight, privacy-first Pomodoro timer that syncs across all your browser tabs. Perfect for staying focused with FocusFlow.

## Features

✅ **Floating timer** - Appears in every tab, draggable and customizable  
✅ **Shared state** - Timer syncs across all open tabs automatically  
✅ **Privacy-first** - No tracking, no page content reading, no data collection  
✅ **Minimal permissions** - Only requires `storage` and `scripting` permissions  
✅ **Full control** - Customize focus/break durations in real-time  
✅ **Audio notifications** - Subtle beep when sessions complete  
✅ **Productivity tracking** - Track sessions completed and total focus time

## What It Does

-   🎯 **Focus Session** - 25-minute focused work periods (customizable)
-   ☕ **Break Time** - 5-minute breaks to rest (customizable)
-   📊 **Stats** - Track sessions completed and accumulated focus time
-   🎨 **Draggable UI** - Move the timer anywhere on your screen
-   🔔 **Auto-switch** - Automatically alternates between focus and break

## Installation

### Chrome / Chromium / Edge

1. **Download or clone the extension**

    ```bash
    # The extension is in: d:\FocusFlow\extension
    ```

2. **Load the extension into your browser**
    - Open your browser and go to the extensions management page:
        - **Chrome/Chromium**: `chrome://extensions`
        - **Edge**: `edge://extensions`
        - **Brave**: `brave://extensions`
3. **Enable Developer Mode**

    - Toggle the **Developer mode** switch in the top-right corner

4. **Load the unpacked extension**

    - Click **Load unpacked**
    - Navigate to the `extension` folder
    - Select the folder and click **Select Folder**

5. **Verify installation**
    - You should see "FocusFlow Timer" in your extensions list
    - The extension icon should appear in your browser toolbar

### Firefox

1. **Download or clone the extension**

    ```bash
    # The extension is in: d:\FocusFlow\extension
    ```

2. **Load the extension temporarily**

    - Open Firefox and go to `about:debugging`
    - Click **This Firefox** in the left panel
    - Click **Load Temporary Add-on**
    - Navigate to the `extension` folder
    - Select `manifest.json` and open it

3. **For permanent installation (Firefox Developer/Nightly)**

    - Pack the extension as a ZIP file:
        ```bash
        # Zip the extension folder
        # Then go to about:addons and drag-drop the ZIP
        ```

4. **Verify installation**
    - The extension icon should appear in your browser toolbar

## Usage

### Starting the Timer

1. **From the floating widget** (appears on every tab)

    - Click the **▶ Play** button to start a focus session
    - The timer will sync across all open tabs

2. **From the popup**
    - Click the extension icon in your toolbar
    - Adjust settings if needed
    - Click **Start**

### Controlling the Timer

| Button     | Action                                               |
| ---------- | ---------------------------------------------------- |
| ▶ Play     | Start the current session                            |
| ⏸ Pause    | Pause the timer                                      |
| ↻ Reset    | Reset to the current session type's default duration |
| ⚙ Settings | Customize focus/break durations                      |

### Dragging the Timer

-   Click and drag the **top bar** of the floating timer to move it anywhere on the page
-   The timer stays in its position across all tabs
-   Position is reset when you close the browser

### Customizing Durations

**Via Popup:**

1. Click the extension icon
2. Set your desired focus and break times (1-60 minutes)
3. Click **Save Settings**

**Via Floating Widget:**

1. Click the **⚙ Menu** button (three dots)
2. Adjust durations
3. Click **Save**

## Permissions Explanation

```json
{
    "permissions": [
        "storage", // To save timer state and settings
        "scripting" // To inject the timer UI into pages
    ],
    "host_permissions": [
        "<all_urls>" // To inject timer on all websites
    ]
}
```

### Privacy Guarantee

-   ❌ No page content is read
-   ❌ No user data is sent to any server
-   ❌ No tracking or analytics
-   ❌ No modifications to page content (except adding the timer UI)
-   ✅ All data stays locally in your browser

## Troubleshooting

### Timer doesn't appear on a page

-   **Solution**: Refresh the page with `F5` or `Ctrl+R`
-   **Note**: Some Chrome extensions and system pages cannot run content scripts

### Timer stops when I close the popup

-   **Expected behavior**: This is normal! The timer continues in the background
-   The popup just shows the current state

### Timer isn't syncing across tabs

-   **Solution**: Make sure both tabs are from the same browser window
-   If using tabs from different browser windows, each window has its own service worker

### Extension won't load (Firefox)

-   **Solution**: In Firefox Developer Edition or Nightly, load from `about:debugging`
-   **Note**: Temporary add-ons in regular Firefox are removed on browser restart

### Audio notification doesn't play

-   **Causes**:
    -   Browser has autoplay audio disabled
    -   Website has audio blocked
-   **Solution**: Check browser audio permissions and site settings

## Architecture

```
extension/
├── manifest.json       # MV3 manifest with minimal permissions
├── background.js       # Service worker managing timer state
├── content.js         # Injects floating timer into all pages
├── popup.html         # Popup UI for quick controls
├── popup.js           # Popup logic and state management
└── icons/             # Extension icons (16x48x128)
```

### How It Works

1. **Background Service Worker** (`background.js`)

    - Manages the master timer state
    - Handles play/pause/reset commands
    - Broadcasts updates to all content scripts
    - Persists state to `chrome.storage.local`

2. **Content Scripts** (`content.js`)

    - Runs on every page (except restricted sites)
    - Injects the floating timer UI
    - Listens for state updates from background worker
    - Handles user interactions with the floating widget

3. **Popup** (`popup.html` + `popup.js`)
    - Quick access to controls
    - Settings management
    - Session statistics display

## Browser Compatibility

| Browser  | Status            | Notes                                                            |
| -------- | ----------------- | ---------------------------------------------------------------- |
| Chrome   | ✅ Full support   | 88+ recommended                                                  |
| Chromium | ✅ Full support   | Tested on latest                                                 |
| Edge     | ✅ Full support   | Based on Chromium                                                |
| Brave    | ✅ Full support   | Works with shields down                                          |
| Firefox  | ⚠️ Temporary only | Stable: requires manual signing; Developer/Nightly: full support |
| Safari   | ❌ Not supported  | Different extension API                                          |
| Opera    | ✅ Full support   | Via Chrome Web Store                                             |

## Keyboard Shortcuts

Add these to `manifest.json` if desired:

```json
"commands": {
  "toggle-timer": {
    "suggested_key": {
      "default": "Alt+Shift+T"
    },
    "description": "Start or pause the timer"
  }
}
```

## Performance

-   **Memory**: < 5MB (including injected UI)
-   **CPU**: Minimal; only updates every 1 second
-   **Network**: Zero (fully local)
-   **Impact on pages**: Negligible

## Development

### To make changes:

1. Edit the extension files
2. Go to `chrome://extensions` (or `edge://extensions`)
3. Click the **Reload** button for "FocusFlow Timer"
4. Refresh any open browser tabs to see changes

### Testing checklist:

-   [ ] Timer updates every second
-   [ ] Play/pause toggles correctly
-   [ ] Timer syncs across multiple tabs
-   [ ] Settings persist after browser restart
-   [ ] Floating timer is draggable
-   [ ] No console errors in browser DevTools

## Roadmap

-   [ ] Save timer history and stats
-   [ ] Dark/light theme toggle
-   [ ] Keyboard shortcuts for common actions
-   [ ] Export productivity stats (CSV)
-   [ ] Focus goals and streaks
-   [ ] Do Not Disturb integration with OS
-   [ ] Notification sounds customization

## License

MIT License - Feel free to modify and redistribute

## Support

For issues or feature requests, please visit the FocusFlow project repository.

---

**Tip**: Use this extension alongside the FocusFlow web app to track focus sessions across both browser and native experiences! 🎯
