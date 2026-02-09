#!/bin/bash
# Installation script for Electron setup on FocusFlow

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                  FocusFlow Electron Setup                      ║"
echo "║         Converting FocusFlow to Desktop Application            ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js first."
    exit 1
fi

echo "✓ npm is installed: $(npm --version)"
echo ""

# Navigate to frontend directory
cd frontend || exit

echo "📦 Installing Electron and dependencies..."
echo ""

# Install dependencies
npm install

if [ $? -ne 0 ]; then
    echo "❌ Installation failed. Please check the error above."
    exit 1
fi

echo ""
echo "✅ Installation complete!"
echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                   Next Steps                                   ║"
echo "╠════════════════════════════════════════════════════════════════╣"
echo "║                                                                ║"
echo "║  1. Start Electron app with dev server:                       ║"
echo "║     npm run dev:electron                                       ║"
echo "║                                                                ║"
echo "║  2. Build for distribution:                                   ║"
echo "║     npm run build:electron                                     ║"
echo "║                                                                ║"
echo "║  3. Run only web version (no Electron):                       ║"
echo "║     npm run dev                                                ║"
echo "║                                                                ║"
echo "║  Documentation:                                                ║"
echo "║  - ELECTRON_QUICK_START.md ........... Quick reference        ║"
echo "║  - ELECTRON_INSTALLATION.md ......... Setup help              ║"
echo "║  - ELECTRON_SETUP_GUIDE.md .......... Architecture details    ║"
echo "║  - ELECTRON_MIGRATION_SUMMARY.md ... Changes overview         ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
