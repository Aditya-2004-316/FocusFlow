#!/usr/bin/env node

/**
 * FocusFlow Extension Verification Script
 * Checks that all required files are present and valid
 */

const fs = require("fs");
const path = require("path");

const extensionDir = __dirname;
const requiredFiles = [
    "manifest.json",
    "background.js",
    "content.js",
    "popup.html",
    "popup.js",
    "README.md",
    "QUICK_START.md",
    "TECHNICAL.md",
];

console.log("🔍 FocusFlow Extension Verification\n");

let allValid = true;

// Check each file
requiredFiles.forEach((file) => {
    const filePath = path.join(extensionDir, file);
    const exists = fs.existsSync(filePath);
    const status = exists ? "✅" : "❌";
    console.log(`${status} ${file}`);
    if (!exists) allValid = false;
});

// Validate manifest.json
console.log("\n📋 Manifest Validation");
try {
    const manifest = JSON.parse(
        fs.readFileSync(path.join(extensionDir, "manifest.json"), "utf-8")
    );

    const checks = [
        [
            "manifest_version",
            manifest.manifest_version === 3,
            "Manifest V3 format",
        ],
        [
            "permissions",
            Array.isArray(manifest.permissions),
            "Permissions defined",
        ],
        [
            "background.service_worker",
            manifest.background?.service_worker,
            "Service worker configured",
        ],
        [
            "content_scripts",
            Array.isArray(manifest.content_scripts),
            "Content scripts configured",
        ],
        ["action", manifest.action, "Action/popup configured"],
    ];

    checks.forEach(([key, valid, desc]) => {
        const status = valid ? "✅" : "❌";
        console.log(`${status} ${desc}`);
        if (!valid) allValid = false;
    });
} catch (err) {
    console.log("❌ Could not parse manifest.json");
    allValid = false;
}

// Check file sizes
console.log("\n📦 File Sizes");
requiredFiles.forEach((file) => {
    const filePath = path.join(extensionDir, file);
    if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const size = (stats.size / 1024).toFixed(2);
        console.log(`  ${file}: ${size} KB`);
    }
});

// Summary
console.log("\n" + "=".repeat(50));
if (allValid) {
    console.log("✅ All checks passed! Extension is ready.");
    console.log("\nNext steps:");
    console.log("1. Open chrome://extensions (or edge://extensions)");
    console.log("2. Enable Developer mode");
    console.log('3. Click "Load unpacked"');
    console.log(`4. Select this folder: ${extensionDir}`);
    console.log("\n🎉 Your timer should appear in the top-right of every tab!");
    process.exit(0);
} else {
    console.log("❌ Some checks failed. Please review the errors above.");
    process.exit(1);
}
