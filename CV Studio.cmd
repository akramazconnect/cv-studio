@echo off
title CV Studio
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js est introuvable. Installez-le depuis https://nodejs.org puis relancez.
  pause
  exit /b 1
)

if not exist node_modules (
  echo Installation des dependances ^(premiere fois seulement^)...
  call npm install
)

echo.
echo   CV Studio demarre sur http://localhost:5173
echo   Fermez cette fenetre pour arreter.
echo.
call npm run start
