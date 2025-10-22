// Versión ultra-mínima para debugging
const express = require('express');
const app = express();

// Middleware básico esencial
app.use(express.json());

// Endpoint de prueba ultra-simple
app.get('/', (req, res) => {
  try {
    res.json({
      message: 'Backend funcionando - versión minimal',
      timestamp: new Date().toISOString(),
      status: 'ok'
    });
  } catch (error) {
    console.error('Error en endpoint raíz:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  try {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error en health:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para debugging de variables de entorno
app.get('/api/debug', (req, res) => {
  try {
    res.json({
      node_env: process.env.NODE_ENV,
      has_db_host: !!process.env.DB_HOST,
      has_jwt_secret: !!process.env.JWT_SECRET,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error en debug:', error);
    res.status(500).json({ error: error.message });
  }
});

// Error handler simple
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({
    error: 'Server error',
    message: err.message
  });
});

console.log('✅ Servidor minimal configurado');

// Para Vercel
module.exports = app;
