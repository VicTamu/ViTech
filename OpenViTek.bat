@echo off
setlocal

REM Change to the directory of this script
cd /d "%~dp0"

REM Move into the app directory
cd rootskelly

REM Start the Vite dev server in a new window
start "ViTek Dev Server" cmd /c "npm run dev"

REM Give the server a moment to start
timeout /t 3 >nul

REM Open in Google Chrome if available; otherwise open default browser
start "" chrome "http://localhost:5173/" || start "" "http://localhost:5173/"

endlocal

