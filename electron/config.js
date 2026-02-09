// electron.config.js
export default {
    appId: "com.focusflow.app",
    productName: "FocusFlow",
    directories: {
        buildResources: "public",
    },
    files: [
        "dist/**/*",
        "electron/**/*",
        "node_modules/**/*",
        "floating-timer.html",
    ],
    win: {
        target: ["nsis", "portable"],
        certificateFile: process.env.WIN_CSC_LINK,
        certificatePassword: process.env.WIN_CSC_KEY_PASSWORD,
    },
    nsis: {
        oneClick: false,
        allowToChangeInstallationDirectory: true,
        createDesktopShortcut: true,
        createStartMenuShortcut: true,
    },
};
