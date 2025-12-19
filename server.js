const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// --- Carga de Datos ---
let countriesData = [];
try {
  const countriesPath = path.join(process.cwd(), 'countries.json');
  const rawData = fs.readFileSync(countriesPath, 'utf8');
  countriesData = JSON.parse(rawData);
  console.log('✅ Datos de países cargados en memoria.');
} catch (err) {
  console.error("❌ Error al cargar countries.json:", err);
  // Fallback para evitar que el servidor muera
  countriesData = [];
}

app.use(cors());

// Servir archivos estáticos desde la raíz
app.use(express.static(process.cwd()));

// Endpoint de la API
app.get('/api/countries', (req, res) => {
  res.status(200).json(countriesData);
});

// Manejo de rutas del Frontend
app.get('*', (req, res) => {
  // Solo devolvemos index.html si no es una petición de la API
  // y si es una petición que probablemente espera HTML (como entrar a la raíz)
  if (req.url.startsWith('/api')) {
      return res.status(404).json({ error: 'Not found' });
  }
  
  res.sendFile(path.join(process.cwd(), 'index.html'));
});

// Para Vercel, exportamos la app pero también permitimos el listen local
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor local en http://localhost:${PORT}`);
    });
}

module.exports = app;
