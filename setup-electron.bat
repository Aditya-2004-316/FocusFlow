@echo off
REM Installation script for Electron setup on FocusFlow (Windows)

echo.
echo ============================================================
echo          FocusFlow Electron Setup
echo    Converting FocusFlow to Desktop Application
echo ============================================================
echo.

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [X] npm is not installed. Please install Node.js first.
    echo.
    echo Download Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] npm is installed
npm --version
echo.

REM Navigate to frontend directory
cd /d %~dp0frontend
if %ERRORLEVEL% NEQ 0 (
    echo [X] Could not navigate to frontend directory
    pause
    exit /b 1
)

echo [*] Installing Electron and dependencies...
echo.

REM Install dependencies
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [X] Installation failed. Please check the error above.
    pause
    exit /b 1
)

echo.
echo [OK] Installation complete!
echo.
echo ============================================================
echo                   Next Steps
echo ============================================================
echo.
echo   1. Start Electron app with dev server:
echo      npm run dev:electron
echo.
echo   2. Build for distribution:
echo      npm run build:electron
echo.
echo   3. Run only web version (no Electron):
echo      npm run dev
echo.
echo ============================================================
echo.

pause
