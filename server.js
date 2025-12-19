const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// --- Optimización ---
let countriesData = [];
try {
  const countriesPath = path.join(__dirname, 'countries.json');
  const rawData = fs.readFileSync(countriesPath, 'utf8');
  countriesData = JSON.parse(rawData);
  console.log('✅ Datos de países cargados en memoria.');
} catch (err) {
  console.error("❌ Error crítico al cargar countries.json:", err);
  process.exit(1); 
}

// Habilitar CORS
app.use(cors());

// --- NUEVO: Servir archivos estáticos ---
// Esto le dice a Express que entregue los archivos de la carpeta actual (index.html, etc.)
app.use(express.static(__dirname));

// Endpoint de la API
app.get('/api/countries', (req, res) => {
  res.status(200).json(countriesData);
});

// --- NUEVO: Manejo de rutas del Frontend ---
// Si el usuario entra a cualquier ruta que no sea la API, le entregamos el index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor listo en el puerto ${PORT}`);
});
