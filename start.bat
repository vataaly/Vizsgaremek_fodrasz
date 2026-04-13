@echo off
title Barber Project Indito

echo [1/2] Backend inditasa...
start "BACKEND" cmd /c "cd backend && npm i && npm start"

echo [2/2] Frontend inditasa...
start "FRONTEND" cmd /c "cd frontend && npm i && npm run dev"

echo.
echo Minden elindult! Ne zard be a felugro ablakokat!
pause