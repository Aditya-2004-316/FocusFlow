import { contextBridge, ipcRenderer } from "electron";

// Expose safe IPC methods to React components
contextBridge.exposeInMainWorld("electronAPI", {
    // Timer control
    openFloatingTimer: (timerData) =>
        ipcRenderer.send("open-floating-timer", timerData),
    closeFloatingTimer: () => ipcRenderer.send("close-floating-timer"),
    updateFloatingTimer: (timerData) =>
        ipcRenderer.send("update-floating-timer", timerData),
    toggleFloatingTimerTopmost: (alwaysOnTop) =>
        ipcRenderer.send("toggle-floating-timer-topmost", alwaysOnTop),

    // Display info
    getPrimaryDisplaySize: () => ipcRenderer.invoke("get-primary-display-size"),

    // Timer updates listener (main window)
    onTimerData: (callback) => {
        ipcRenderer.on("timer-data", (event, data) => callback(data));
        return () => ipcRenderer.removeListener("timer-data", callback);
    },

    // Listen for pause/resume commands from floating timer
    onToggleTimerPause: (callback) => {
        ipcRenderer.on("toggle-timer-pause-from-floating", (event) =>
            callback()
        );
        return () =>
            ipcRenderer.removeListener("toggle-timer-pause-from-floating", callback);
    },

    // Platform detection
    getPlatform: () => process.platform,
    getAppVersion: () => process.env.npm_package_version || "1.0.0",
});

// Make sure context isolation works
if (process.contextIsolated) {
    console.log("Context isolation enabled - IPC communication is secure");
}
}
