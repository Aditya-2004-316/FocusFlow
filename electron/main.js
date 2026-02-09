import { app, BrowserWindow, Menu, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import isDev from "electron-is-dev";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;
let floatingTimerWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false,
        },
    });

    const startUrl = isDev
        ? "http://localhost:5173" // Vite dev server
        : `file://${path.join(__dirname, "../dist/index.html")}`; // Production build

    mainWindow.loadURL(startUrl);

    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

function createFloatingTimer(timerData) {
    // Close existing floating timer if open
    if (floatingTimerWindow) {
        floatingTimerWindow.close();
    }

    floatingTimerWindow = new BrowserWindow({
        width: 320,
        height: 400,
        minWidth: 120,
        minHeight: 100,
        alwaysOnTop: true,
        frame: true,
        transparent: false,
        resizable: true,
        skipTaskbar: false,
        show: false,
        webPreferences: {
            preload: path.join(__dirname, "floating-timer-preload.js"),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false,
        },
    });

    // Position in bottom-right corner by default
    const { screen } = require("electron");
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;
    floatingTimerWindow.setPosition(width - 340, height - 420);

    // Load the floating timer HTML file
    const htmlPath = path.join(__dirname, "../floating-timer.html");
    floatingTimerWindow.loadFile(htmlPath);

    // Show window after loading
    floatingTimerWindow.once("ready-to-show", () => {
        floatingTimerWindow.show();
    });

    if (isDev) {
        floatingTimerWindow.webContents.openDevTools();
    }

    // Send timer data to floating timer window
    floatingTimerWindow.webContents.on("did-finish-load", () => {
        floatingTimerWindow.webContents.send("timer-data", timerData);
    });

    floatingTimerWindow.on("closed", () => {
        floatingTimerWindow = null;
    });

    return floatingTimerWindow;
}

// IPC handlers for timer control
ipcMain.on("open-floating-timer", (event, timerData) => {
    createFloatingTimer(timerData);
});

ipcMain.on("close-floating-timer", () => {
    if (floatingTimerWindow) {
        floatingTimerWindow.close();
        floatingTimerWindow = null;
    }
});

ipcMain.on("update-floating-timer", (event, timerData) => {
    if (floatingTimerWindow) {
        floatingTimerWindow.webContents.send("timer-data", timerData);
    }
});

ipcMain.on("toggle-timer-pause", () => {
    // Forward pause/resume command to main window
    if (mainWindow) {
        mainWindow.webContents.send("toggle-timer-pause-from-floating");
    }
});

ipcMain.on("toggle-floating-timer-topmost", (event, alwaysOnTop) => {
    if (floatingTimerWindow) {
        floatingTimerWindow.setAlwaysOnTop(alwaysOnTop);
    }
});

ipcMain.handle("get-primary-display-size", () => {
    const { width, height } =
        require("electron").screen.getPrimaryDisplay().workAreaSize;
    return { width, height };
});

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});

// Create application menu
const createMenu = () => {
    const template = [
        {
            label: "File",
            submenu: [
                {
                    label: "Exit",
                    accelerator: "CmdOrCtrl+Q",
                    click: () => {
                        app.quit();
                    },
                },
            ],
        },
        {
            label: "Edit",
            submenu: [
                {
                    label: "Undo",
                    accelerator: "CmdOrCtrl+Z",
                    selector: "undo:",
                },
                {
                    label: "Redo",
                    accelerator: "Shift+CmdOrCtrl+Z",
                    selector: "redo:",
                },
                { type: "separator" },
                { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
                {
                    label: "Copy",
                    accelerator: "CmdOrCtrl+C",
                    selector: "copy:",
                },
                {
                    label: "Paste",
                    accelerator: "CmdOrCtrl+V",
                    selector: "paste:",
                },
            ],
        },
        {
            label: "View",
            submenu: [
                {
                    label: "Reload",
                    accelerator: "CmdOrCtrl+R",
                    click: () => mainWindow.reload(),
                },
                {
                    label: "Toggle Developer Tools",
                    accelerator: "CmdOrCtrl+Shift+I",
                    click: () => mainWindow.webContents.toggleDevTools(),
                },
            ],
        },
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
};

app.whenReady().then(() => {
    createMenu();
});

export { mainWindow, floatingTimerWindow };
