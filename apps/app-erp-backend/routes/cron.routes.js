const express = require('express');
const SubscriptionService = require('../services/subscriptionService');
const router = express.Router();

/**
 * Endpoint para verificar suscripciones expiradas
 * Este endpoint puede ser llamado por servicios externos como cron-job.org
 * para reemplazar los cron jobs en Vercel
 */
router.post('/api/cron/check-subscriptions', async (req, res) => {
  try {
    // Verificar que la petición venga de una fuente autorizada
    const authHeader = req.headers.authorization;
    const cronSecret = process.env.CRON_SECRET || 'your-secret-key';
    
    if (authHeader !== `Bearer ${cronSecret}`) {
      return res.status(401).json({ 
        error: 'No autorizado para ejecutar tareas programadas' 
      });
    }

    console.log('🕛 Ejecutando verificación de suscripciones vía endpoint...');
    const result = await SubscriptionService.checkExpiredSubscriptions();
    
    console.log(
      `✅ Verificación completada: ${result.verificadas} empresas verificadas, ${result.actualizadas} actualizadas`
    );

    res.json({
      success: true,
      message: 'Verificación de suscripciones completada',
      result: {
        verificadas: result.verificadas,
        actualizadas: result.actualizadas,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Error en verificación de suscripciones:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno en verificación de suscripciones',
      message: error.message
    });
  }
});

/**
 * Endpoint de salud para verificar que el servicio está funcionando
 */
router.get('/api/cron/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    message: 'Servicio de tareas programadas funcionando correctamente'
  });
});

module.exports = router;