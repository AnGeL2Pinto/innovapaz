const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// Middleware básico
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Endpoint de salud básico (sin dependencias)
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

// Cargar rutas una por una con manejo de errores
const loadRoute = (path, mount, description) => {
  try {
    const route = require(path);
    app.use(mount, route);
    console.log(`✅ ${description} cargada`);
  } catch (error) {
    console.error(`❌ Error cargando ${description}:`, error.message);
  }
};

// Rutas básicas sin parámetros complejos
loadRoute('./routes/auth', '/api/auth', 'Autenticación');

// Endpoints de cron
loadRoute('./routes/cron.routes', '', 'Cron jobs');

// Rutas de gestión básica
loadRoute('./routes/users', '/api/users', 'Usuarios');
loadRoute('./routes/companies', '/api/companies', 'Empresas');
loadRoute('./routes/plans', '/api/plans', 'Planes');
loadRoute('./routes/roles', '/api/roles', 'Roles');

// Rutas de funcionalidades
try {
  const reportsRoutes = require('./routes/reports.routes');
  app.use('/api/reports', reportsRoutes);
  console.log('✅ Reportes cargados');
} catch (error) {
  console.error('❌ Error cargando reportes:', error.message);
}

try {
  const uploadRoutes = require('./routes/upload.routes');
  app.use('/api/upload', uploadRoutes);
  console.log('✅ Upload cargado');
} catch (error) {
  console.error('❌ Error cargando upload:', error.message);
}

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
  
  // Configurar cron jobs para verificar suscripciones (solo en desarrollo)
  try {
    const { setupCronJobs } = require('./services/cronService');
    setupCronJobs();
    console.log('⏰ Cron jobs configurados');
  } catch (error) {
    console.error('⚠️ Error configurando cron jobs:', error.message);
  }
}

// Para Vercel (exportar la app)
module.exports = app;
