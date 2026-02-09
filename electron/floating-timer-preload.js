import { contextBridge, ipcRenderer } from "electron";

// Expose safe IPC methods to floating timer window
contextBridge.exposeInMainWorld("electronAPI", {
    // Listen for timer updates from main process
    onTimerData: (callback) => {
        const listener = (event, data) => callback(data);
        ipcRenderer.on("timer-data", listener);
        // Return cleanup function
        return () => ipcRenderer.removeListener("timer-data", listener);
    },

    // Send pause/resume command back to main window
    toggleTimerPause: () => ipcRenderer.send("toggle-timer-pause"),

    // Send close request back to main process
    closeFloatingTimer: () => ipcRenderer.send("close-floating-timer"),

    // Platform detection
    getPlatform: () => process.platform,
});
