#!/bin/bash

echo "🚀 Verificando preparación para deployment en Vercel..."
echo ""

# Verificar archivos necesarios
echo "📁 Verificando archivos necesarios:"

if [ -f "vercel.json" ]; then
    echo "  ✅ vercel.json encontrado"
else
    echo "  ❌ vercel.json NO encontrado"
fi

if [ -f "package.json" ]; then
    echo "  ✅ package.json encontrado"
else
    echo "  ❌ package.json NO encontrado"
fi

if [ -f ".env.example" ]; then
    echo "  ✅ .env.example encontrado"
else
    echo "  ❌ .env.example NO encontrado"
fi

if [ -f "VERCEL_DEPLOYMENT.md" ]; then
    echo "  ✅ VERCEL_DEPLOYMENT.md encontrado"
else
    echo "  ❌ VERCEL_DEPLOYMENT.md NO encontrado"
fi

echo ""

# Verificar dependencias
echo "📦 Verificando dependencias principales:"
if grep -q '"express"' package.json; then
    echo "  ✅ Express encontrado"
else
    echo "  ❌ Express NO encontrado"
fi

if grep -q '"pg"' package.json; then
    echo "  ✅ PostgreSQL (pg) encontrado"
else
    echo "  ❌ PostgreSQL (pg) NO encontrado"
fi

echo ""

# Verificar scripts
echo "🔧 Verificando scripts en package.json:"
if grep -q '"start":' package.json; then
    echo "  ✅ Script 'start' encontrado"
else
    echo "  ❌ Script 'start' NO encontrado"
fi

if grep -q '"build":' package.json; then
    echo "  ✅ Script 'build' encontrado"
else
    echo "  ❌ Script 'build' NO encontrado"
fi

echo ""

# Verificar estructura del index.js
echo "📄 Verificando index.js:"
if grep -q "module.exports = app" index.js; then
    echo "  ✅ App exportada correctamente para Vercel"
else
    echo "  ❌ App NO exportada - necesaria para Vercel"
fi

echo ""
echo "🎯 Resumen:"
echo "  - Si todos los checks están en ✅, estás listo para deployment"
echo "  - Si hay ❌, revisa los archivos correspondientes"
echo ""
echo "📚 Próximos pasos:"
echo "  1. Configura variables de entorno en Vercel Dashboard"
echo "  2. Configura tu base de datos PostgreSQL"
echo "  3. Haz deployment con 'vercel' o conecta tu repo en vercel.com"
echo "  4. Configura tareas programadas en cron-job.org"
echo ""