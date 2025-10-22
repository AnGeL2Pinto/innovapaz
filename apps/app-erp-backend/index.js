const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { setupCronJobs } = require('./services/cronService');

const taskRoutes = require('./routes/task.routes');
const inventoryRoutes = require('./routes/inventories.routes');
const catalogRoutes = require('./routes/catalog.routes');
const reportsRoutes = require('./routes/reports.routes');
const clientsRoutes = require('./routes/clients.routes');
const categoriesRoutes = require('./routes/categories.routes');
const quotesRoutes = require('./routes/quotes.routes');
const salesRoutes = require('./routes/sales.routes');
const inventoryMovementsRoutes = require('./routes/inventory-movements.routes');
const uploadRoutes = require('./routes/upload.routes');
const cronRoutes = require('./routes/cron.routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/companies', require('./routes/companies'));
app.use('/api/plans', require('./routes/plans'));
app.use('/api/roles', require('./routes/roles'));
app.use('/api/roles-plantilla', require('./routes/rolesPlantilla'));
app.use('/api/subscriptions', require('./routes/subscription'));
app.use('/api/invitations', require('./routes/invitations'));
app.use('/api/reports', reportsRoutes);

app.use(taskRoutes);
app.use('/api', inventoryRoutes);
app.use('/api', catalogRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/client-categories', categoriesRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/quotes', quotesRoutes);
const orderRoutes = require('./routes/order.routes');
app.use('/api', orderRoutes);
app.use('/api/inventory', inventoryMovementsRoutes);
app.use('/api/upload', uploadRoutes);
app.use(cronRoutes);

app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});

// Para desarrollo local
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 4000;
  app.listen(port);
  console.log(`Server on port ${port}`);
  
  // Configurar cron jobs para verificar suscripciones (solo en desarrollo)
  setupCronJobs();
}

// Para Vercel (exportar la app)
module.exports = app;
