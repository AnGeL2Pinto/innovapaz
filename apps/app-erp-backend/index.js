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

// Importar y configurar rutas con manejo de errores
try {
  // Rutas básicas
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/users', require('./routes/users'));
  app.use('/api/companies', require('./routes/companies'));
  app.use('/api/plans', require('./routes/plans'));
  app.use('/api/roles', require('./routes/roles'));
  app.use('/api/roles-plantilla', require('./routes/rolesPlantilla'));
  app.use('/api/subscriptions', require('./routes/subscription'));
  app.use('/api/invitations', require('./routes/invitations'));
  
  // Rutas de funcionalidades
  const reportsRoutes = require('./routes/reports.routes');
  app.use('/api/reports', reportsRoutes);

  const taskRoutes = require('./routes/task.routes');
  app.use(taskRoutes);
  
  const inventoryRoutes = require('./routes/inventories.routes');
  app.use('/api', inventoryRoutes);
  
  const catalogRoutes = require('./routes/catalog.routes');
  app.use('/api', catalogRoutes);
  
  const clientsRoutes = require('./routes/clients.routes');
  app.use('/api/clients', clientsRoutes);
  
  const categoriesRoutes = require('./routes/categories.routes');
  app.use('/api/client-categories', categoriesRoutes);
  
  const salesRoutes = require('./routes/sales.routes');
  app.use('/api/sales', salesRoutes);
  
  const quotesRoutes = require('./routes/quotes.routes');
  app.use('/api/quotes', quotesRoutes);
  
  const orderRoutes = require('./routes/order.routes');
  app.use('/api', orderRoutes);
  
  const inventoryMovementsRoutes = require('./routes/inventory-movements.routes');
  app.use('/api/inventory', inventoryMovementsRoutes);
  
  const uploadRoutes = require('./routes/upload.routes');
  app.use('/api/upload', uploadRoutes);
  
  const cronRoutes = require('./routes/cron.routes');
  app.use(cronRoutes);

  console.log('✅ Todas las rutas cargadas correctamente');
  
} catch (error) {
  console.error('❌ Error cargando rutas:', error.message);
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
