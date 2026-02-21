@echo off
echo ========================================
echo   EduLearn - Demarrage du Backend
echo ========================================
echo.

REM Verifier si MongoDB est installe
where mongod >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERREUR] MongoDB n'est pas installe ou n'est pas dans le PATH
    echo.
    echo Veuillez installer MongoDB depuis:
    echo https://www.mongodb.com/try/download/community
    echo.
    echo OU utilisez MongoDB Atlas (cloud):
    echo https://www.mongodb.com/cloud/atlas
    echo.
    pause
    exit /b 1
)

echo [OK] MongoDB est installe
echo.

REM Verifier si MongoDB est deja en cours d'execution
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo [OK] MongoDB est deja en cours d'execution
) else (
    echo [INFO] Demarrage de MongoDB...
    start "MongoDB" mongod --dbpath C:\data\db
    timeout /t 3 >nul
    echo [OK] MongoDB demarre
)

echo.
echo ========================================
echo   Installation des dependances
echo ========================================
echo.

if not exist "node_modules" (
    echo [INFO] Installation des packages npm...
    call npm install
) else (
    echo [OK] Les dependances sont deja installees
)

echo.
echo ========================================
echo   Initialisation de la base de donnees
echo ========================================
echo.

echo Voulez-vous initialiser la base de donnees avec des donnees de test? (O/N)
set /p INIT_DB=

if /i "%INIT_DB%"=="O" (
    echo [INFO] Initialisation de la base de donnees...
    node seed.js
    echo.
)

echo.
echo ========================================
echo   Demarrage du serveur
echo ========================================
echo.

echo Le serveur va demarrer sur http://localhost:3000
echo.
echo Appuyez sur Ctrl+C pour arreter le serveur
echo.

npm run dev
