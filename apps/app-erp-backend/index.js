const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// Middleware básico
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Endpoints básicos sin dependencias
app.get('/', (req, res) => {
  res.json({
    message: 'Innovapaz Backend API funcionando correctamente',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    message: 'API funcionando correctamente'
  });
});

console.log('✅ Servidor configurado - solo endpoints básicos');

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('❌ Error en la aplicación:', err);
  return res.status(500).json({
    error: 'Error interno del servidor',
    message: err.message,
    timestamp: new Date().toISOString()
  });
});

// Ruta 404
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint no encontrado',
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

// Para desarrollo local
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 4000;
  app.listen(port);
  console.log(`🚀 Server on port ${port}`);
}

// Para Vercel (exportar la app)
module.exports = app;
