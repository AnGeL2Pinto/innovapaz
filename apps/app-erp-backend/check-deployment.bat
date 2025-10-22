@echo off
echo 🚀 Verificando preparación para deployment en Vercel...
echo.

REM Verificar archivos necesarios
echo 📁 Verificando archivos necesarios:

if exist "vercel.json" (
    echo   ✅ vercel.json encontrado
) else (
    echo   ❌ vercel.json NO encontrado
)

if exist "package.json" (
    echo   ✅ package.json encontrado
) else (
    echo   ❌ package.json NO encontrado
)

if exist ".env.example" (
    echo   ✅ .env.example encontrado
) else (
    echo   ❌ .env.example NO encontrado
)

if exist "VERCEL_DEPLOYMENT.md" (
    echo   ✅ VERCEL_DEPLOYMENT.md encontrado
) else (
    echo   ❌ VERCEL_DEPLOYMENT.md NO encontrado
)

echo.

REM Verificar dependencias
echo 📦 Verificando dependencias principales:
findstr /c:"express" package.json >nul
if %errorlevel%==0 (
    echo   ✅ Express encontrado
) else (
    echo   ❌ Express NO encontrado
)

findstr /c:"pg" package.json >nul
if %errorlevel%==0 (
    echo   ✅ PostgreSQL ^(pg^) encontrado
) else (
    echo   ❌ PostgreSQL ^(pg^) NO encontrado
)

echo.

REM Verificar scripts
echo 🔧 Verificando scripts en package.json:
findstr /c:"start" package.json >nul
if %errorlevel%==0 (
    echo   ✅ Script 'start' encontrado
) else (
    echo   ❌ Script 'start' NO encontrado
)

findstr /c:"build" package.json >nul
if %errorlevel%==0 (
    echo   ✅ Script 'build' encontrado
) else (
    echo   ❌ Script 'build' NO encontrado
)

echo.

REM Verificar estructura del index.js
echo 📄 Verificando index.js:
findstr /c:"module.exports = app" index.js >nul
if %errorlevel%==0 (
    echo   ✅ App exportada correctamente para Vercel
) else (
    echo   ❌ App NO exportada - necesaria para Vercel
)

echo.
echo 🎯 Resumen:
echo   - Si todos los checks están en ✅, estás listo para deployment
echo   - Si hay ❌, revisa los archivos correspondientes
echo.
echo 📚 Próximos pasos:
echo   1. Configura variables de entorno en Vercel Dashboard
echo   2. Configura tu base de datos PostgreSQL
echo   3. Haz deployment con 'vercel' o conecta tu repo en vercel.com
echo   4. Configura tareas programadas en cron-job.org
echo.
pause