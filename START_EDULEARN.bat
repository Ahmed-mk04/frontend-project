@echo off
echo ========================================
echo   EduLearn - Demarrage Rapide
echo ========================================
echo.
echo Ce script va demarrer MongoDB et le serveur backend
echo.

REM Verifier Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERREUR] Node.js n'est pas installe
    echo Telechargez-le depuis: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js est installe
echo.

REM Demarrer MongoDB (si installe localement)
echo Verification de MongoDB...
where mongod >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
    if "%ERRORLEVEL%"=="1" (
        echo [INFO] Demarrage de MongoDB...
        if not exist "C:\data\db" mkdir "C:\data\db"
        start "MongoDB" mongod --dbpath C:\data\db
        timeout /t 3 >nul
    )
    echo [OK] MongoDB est en cours d'execution
) else (
    echo [INFO] MongoDB n'est pas installe localement
    echo Assurez-vous d'utiliser MongoDB Atlas ou installez MongoDB
)

echo.
echo ========================================
echo   Demarrage du Backend
echo ========================================
echo.

cd backend

REM Installer les dependances si necessaire
if not exist "node_modules" (
    echo Installation des dependances...
    call npm install
)

REM Demarrer le serveur
echo.
echo Demarrage du serveur sur http://localhost:3000
echo.
start "EduLearn Backend" cmd /k "npm run dev"

echo.
echo ========================================
echo   Instructions
echo ========================================
echo.
echo 1. Le backend est maintenant en cours d'execution
echo 2. Ouvrez le frontend avec Live Server (VS Code)
echo    OU ouvrez index.html dans votre navigateur
echo.
echo 3. Allez sur: http://localhost:5500/auth/login.html
echo.
echo 4. Utilisez ces comptes de test:
echo    Admin: admin@edulearn.com / admin123
echo    Etudiant: ahmed.benali@student.com / student123
echo.
echo Appuyez sur une touche pour fermer cette fenetre...
pause >nul
