@echo off
echo Starting EduStream Development Environment...

echo.
echo Starting Laravel Backend Server...
start "Laravel Backend" cmd /k "cd backend && php artisan serve"

echo.
echo Starting React Frontend Server...
start "React Frontend" cmd /k "cd frontend && set REACT_APP_API_URL=http://localhost:8000/api && npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
pause
