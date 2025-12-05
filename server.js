const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// --- Optimización ---
// Leemos el archivo una sola vez al iniciar el servidor y lo guardamos en memoria.
// Esto es mucho más eficiente que leerlo del disco en cada solicitud.
let countriesData = [];
try {
  const countriesPath = path.join(__dirname, 'countries.json');
  const rawData = fs.readFileSync(countriesPath, 'utf8');
  countriesData = JSON.parse(rawData);
  console.log('✅ Datos de países cargados en memoria.');
} catch (err) {
  console.error("❌ Error crítico al cargar countries.json:", err);
  // Si no podemos cargar los datos, el servidor no puede funcionar.
  // En una app real, podríamos tener un mecanismo de fallback o reintento.
  process.exit(1); 
}

// Habilitar CORS para permitir solicitudes desde el frontend
app.use(cors());

// Endpoint de la API para obtener todos los países
app.get('/api/countries', (req, res) => {
  // Servimos los datos directamente desde la variable en memoria.
  res.status(200).json(countriesData);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
