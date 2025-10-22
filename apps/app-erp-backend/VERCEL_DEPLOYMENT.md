# Deployment del Backend en Vercel

## Pasos para desplegar en Vercel

### 1. Preparación
Asegúrate de que todos los archivos están listos:
- ✅ `vercel.json` - Configuración de Vercel
- ✅ `package.json` - Scripts actualizados
- ✅ `index.js` - Exporta la app de Express
- ✅ `.env.example` - Variables de entorno documentadas

### 2. Instalar Vercel CLI (opcional)
```bash
npm install -g vercel
```

### 3. Desplegar desde el directorio del backend

#### Opción A: Usando Vercel CLI
```bash
# Navegar al directorio del backend
cd apps/app-erp-backend

# Hacer login en Vercel
vercel login

# Desplegar
vercel

# Para production
vercel --prod
```

#### Opción B: Usando Git y Vercel Dashboard (Detallado)

##### Paso 1: Preparar el repositorio Git
```powershell
# 1. Asegúrate de estar en el directorio raíz del proyecto
cd c:\Users\Usuario\Documents\proyecto\innovapaz

# 2. Verificar el estado de Git
git status

# 3. Agregar todos los cambios (incluyendo los nuevos archivos de configuración)
git add .

# 4. Hacer commit de los cambios
git commit -m "feat: configurar backend para deployment en Vercel

- Agregar vercel.json con configuración serverless
- Modificar index.js para exportar app de Express
- Actualizar scripts en package.json
- Crear endpoints para cron jobs (/api/cron/check-subscriptions)
- Documentar variables de entorno en .env.example
- Agregar guía de deployment y scripts de verificación"

# 5. Subir los cambios al repositorio remoto
git push origin develop

# 6. (Opcional) Hacer merge a main/master si es necesario
git checkout main
git merge develop
git push origin main
```

##### Paso 2: Acceder a Vercel Dashboard
1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en **"Sign up"** o **"Log in"**
3. Conecta con tu cuenta de GitHub (recomendado)
4. Autoriza el acceso a Vercel en GitHub

##### Paso 3: Importar el proyecto
1. En el dashboard de Vercel, haz clic en **"Add New..."**
2. Selecciona **"Project"**
3. Busca tu repositorio `innovapaz` en la lista
4. Haz clic en **"Import"** junto a tu repositorio

##### Paso 4: Configurar el proyecto (CRÍTICO)
En la pantalla de configuración del proyecto:

**🔧 General Settings:**
- **Project Name**: `innovapaz-backend` (o el nombre que prefieras)
- **Framework Preset**: Selecciona **"Other"**
- **Root Directory**: `apps/app-erp-backend` ⚠️ **MUY IMPORTANTE**

**📁 Build and Output Settings:**
- **Build Command**: `npm run build`
- **Output Directory**: (dejar **VACÍO**)
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

**🌿 Git Settings:**
- **Production Branch**: `main` (o `master` según tu configuración)
- **Automatic deployments**: ✅ Habilitado

##### Paso 5: Configurar variables de entorno
1. **NO hagas deploy todavía** - primero configura las variables
2. Ve a la pestaña **"Environment Variables"**
3. Agrega las siguientes variables **UNA POR UNA**:

```
Nombre: NODE_ENV
Valor: production
Environments: Production, Preview, Development ✅

Nombre: DB_USER
Valor: [tu_usuario_de_base_de_datos]
Environments: Production ✅

Nombre: DB_PASSWORD  
Valor: [tu_password_de_base_de_datos]
Environments: Production ✅

Nombre: DB_HOST
Valor: [tu_host_de_base_de_datos]
Environments: Production ✅

Nombre: DB_PORT
Valor: 5432
Environments: Production ✅

Nombre: DB_DATABASE
Valor: [nombre_de_tu_base_de_datos]
Environments: Production ✅

Nombre: JWT_SECRET
Valor: [tu_clave_secreta_jwt_muy_segura]
Environments: Production ✅

Nombre: CRON_SECRET
Valor: [clave_secreta_para_cron_jobs]
Environments: Production ✅
```

##### Paso 6: Realizar el deployment
1. Después de configurar todas las variables, haz clic en **"Deploy"**
2. Vercel comenzará el proceso de build y deployment
3. Puedes ver el progreso en tiempo real en la pantalla

##### Paso 7: Verificar el deployment
1. Una vez completado, recibirás una URL como: `https://innovapaz-backend.vercel.app`
2. Verifica que funciona visitando: `https://tu-url.vercel.app/api/cron/health`
3. Deberías ver una respuesta JSON con el estado del servicio

##### Paso 8: Configurar deployments automáticos
1. Ve a **Settings > Git**
2. Verifica que **"Automatic deployments"** esté habilitado
3. Cada push a tu rama principal activará un nuevo deployment automáticamente

##### Paso 9: Configurar dominio personalizado (Opcional)
1. Ve a **Settings > Domains**
2. Agrega tu dominio personalizado si tienes uno
3. Configura los registros DNS según las instrucciones de Vercel

### 4. Configurar Variables de Entorno en Vercel

En el dashboard de Vercel, ve a Settings > Environment Variables y añade:

#### Variables Requeridas:
```
NODE_ENV=production
DB_USER=tu_usuario_db
DB_PASSWORD=tu_password_db
DB_HOST=tu_host_db
DB_PORT=5432
DB_DATABASE=tu_nombre_db
JWT_SECRET=tu_jwt_secret
CRON_SECRET=tu_cron_secret_para_tareas_programadas
```

#### Variables Opcionales (según tu configuración):
```
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
EMAIL_HOST=tu_email_host
EMAIL_PORT=587
EMAIL_USER=tu_email_user
EMAIL_PASS=tu_email_password
FIREBASE_PROJECT_ID=tu_project_id
FIREBASE_PRIVATE_KEY=tu_private_key
FIREBASE_CLIENT_EMAIL=tu_client_email
```

### 5. Base de Datos

#### Opciones recomendadas para PostgreSQL en la nube:

**🟢 Supabase (Recomendado para desarrollo)**
1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta y un nuevo proyecto
3. Ve a Settings > Database
4. Copia los datos de conexión:
   ```
   DB_HOST: db.xxxxxx.supabase.co
   DB_PORT: 5432
   DB_DATABASE: postgres
   DB_USER: postgres
   DB_PASSWORD: [tu-password]
   ```

**🟢 Railway (Fácil de usar)**
1. Ve a [railway.app](https://railway.app)
2. Crea un proyecto y añade PostgreSQL
3. Ve a la pestaña "Connect" para obtener las credenciales

**🟢 Neon (Serverless PostgreSQL)**
1. Ve a [neon.tech](https://neon.tech)
2. Crea una base de datos
3. Copia la connection string y extrae los datos

**🟡 Amazon RDS (Para producción)**
- Más complejo pero más robusto
- Requiere configuración de VPC y security groups

#### Migración de datos:
Si tienes datos locales que migrar:

```powershell
# 1. Exportar datos locales
pg_dump -h localhost -U tu_usuario -d tu_bd_local > backup.sql

# 2. Importar a la nueva base de datos
psql -h tu_nuevo_host -U tu_nuevo_usuario -d tu_nueva_bd -f backup.sql
```

#### Configuración de SSL:
Tu código ya maneja SSL automáticamente para hosts de Render. Para otros proveedores, verifica la configuración en `db.js`.

### 6. Verificar el Deployment

Una vez desplegado, tu API estará disponible en:
```
https://tu-proyecto.vercel.app/api/
```

#### Tests básicos que puedes hacer:

**✅ Test de salud del servicio:**
```
GET https://tu-proyecto.vercel.app/api/cron/health
```
Respuesta esperada:
```json
{
  "status": "healthy",
  "timestamp": "2025-10-22T...",
  "message": "Servicio de tareas programadas funcionando correctamente"
}
```

**✅ Test de conexión a base de datos:**
Si tienes un endpoint de health check para la DB, pruébalo.

**✅ Test de autenticación:**
Prueba un endpoint de login para verificar que JWT funciona.

### 7. Configuración Post-Deployment

#### A. Configurar CORS para tu frontend
Si tu frontend está en un dominio diferente, actualiza la configuración de CORS en `index.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',           // Desarrollo local
    'https://tu-frontend.vercel.app',  // Frontend en producción
    'https://tu-dominio.com'           // Dominio personalizado
  ],
  credentials: true
}));
```

#### B. Configurar tareas programadas externas
1. Ve a [cron-job.org](https://cron-job.org) y crea una cuenta
2. Crea una nueva tarea:
   - **URL**: `https://tu-proyecto.vercel.app/api/cron/check-subscriptions`
   - **Method**: POST
   - **Headers**: `Authorization: Bearer tu_cron_secret`
   - **Schedule**: `0 0 * * *` (diario a medianoche)
   - **Timezone**: America/La_Paz

#### C. Monitoreo y alertas
1. En Vercel Dashboard, configura notificaciones
2. Ve a Settings > Notifications
3. Habilita alertas para:
   - Build failures
   - Function errors
   - Domain issues

#### D. Configurar logs persistentes (Opcional)
Para logs más detallados, considera integrar servicios como:
- **LogRocket**
- **Sentry** (para error tracking)
- **DataDog** (para monitoreo avanzado)

### 7. Configurar CORS

Si tu frontend está en un dominio diferente, asegúrate de configurar CORS correctamente en tu backend.

### Notas Importantes:

1. **Serverless Functions**: Vercel usa funciones serverless, por lo que los cron jobs no funcionarán. 

2. **Tareas Programadas**: He creado endpoints alternativos para reemplazar los cron jobs:
   - `POST /api/cron/check-subscriptions` - Verificar suscripciones expiradas
   - `GET /api/cron/health` - Verificar estado del servicio
   
   Usa servicios como [cron-job.org](https://cron-job.org) para llamar estos endpoints:
   - Configura una tarea que llame a `POST https://tu-app.vercel.app/api/cron/check-subscriptions`
   - Incluye el header: `Authorization: Bearer tu_cron_secret`
   - Programa para ejecutarse diariamente a las 00:00 hora de Bolivia

3. **Timeouts**: Las funciones en Vercel tienen un límite de tiempo (30s en el plan gratuito).

4. **Cold Starts**: Las funciones pueden tener cold starts, lo que puede hacer que la primera petición sea más lenta.

5. **File Uploads**: Los archivos subidos no persisten entre invocaciones. Usa servicios como Cloudinary para almacenamiento.

### Troubleshooting

#### Problemas comunes con Git y Vercel Dashboard:

**❌ Error: "Build failed" - Module not found**
- **Causa**: Root Directory mal configurado
- **Solución**: Ve a Settings > General > Root Directory y asegúrate que esté en `apps/app-erp-backend`

**❌ Error: "Connection timeout" en la base de datos**
- **Causa**: Variables de entorno incorrectas o base de datos no accesible
- **Solución**: 
  1. Verifica las variables en Settings > Environment Variables
  2. Asegúrate que tu DB permita conexiones externas
  3. Revisa los logs en la pestaña "Functions"

**❌ Error: "Cannot find module './routes/..'"**
- **Causa**: Rutas relativas incorrectas después del cambio de estructura
- **Solución**: Todas las rutas en el código deben ser relativas al archivo `index.js`

**❌ Error: "502 Bad Gateway" o "Function timeout"**
- **Causa**: La función tardó más de 30 segundos (límite gratuito)
- **Solución**: Optimiza las consultas a la base de datos o considera upgrade del plan

**❌ Los cron jobs no funcionan**
- **Causa**: Las funciones serverless no mantienen procesos background
- **Solución**: Usa los endpoints `/api/cron/check-subscriptions` con servicios externos como cron-job.org

#### Verificar logs y debugging:
1. Ve a tu proyecto en Vercel Dashboard
2. Haz clic en la pestaña **"Functions"**
3. Selecciona una función para ver logs detallados
4. Los errores aparecerán en tiempo real durante las peticiones

#### Re-deployment después de cambios:
1. Haz cambios en tu código local
2. Commit y push a tu repositorio:
   ```powershell
   git add .
   git commit -m "fix: corregir configuración"
   git push origin main
   ```
3. Vercel detectará automáticamente el cambio y hará re-deploy

- **Error de conexión a DB**: Verifica las variables de entorno
- **Error 500**: Revisa los logs en el dashboard de Vercel
- **Timeout**: Optimiza las consultas a la base de datos
- **CORS**: Configura correctamente los origins permitidos