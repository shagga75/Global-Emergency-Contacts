const CACHE_NAME = 'global-emergency-contacts-v3'; // Bump version to ensure new SW installs
const urlsToCache = [
  '/',
  '/index.html',
  '/index.tsx',
  '/App.tsx',
  '/types.ts',
  '/utils.ts',
  '/components/CountryCard.tsx',
  '/components/SearchBar.tsx',
  '/components/ThemeToggle.tsx',
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  // Para las solicitudes a la API, priorizamos la red para tener datos frescos,
  // pero recurrimos al caché si no hay conexión (estrategia Network Falling Back to Cache).
  if (event.request.url.includes('/api/countries')) {
    event.respondWith(
      fetch(event.request).then(response => {
        // Si la respuesta es válida, la clonamos y la guardamos en caché para uso sin conexión.
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      }).catch(() => {
        // Si fetch falla (sin conexión), intentamos servir desde el caché.
        return caches.match(event.request);
      })
    );
    return;
  }

  // Para todos los demás recursos (assets de la app), usamos la estrategia Cache First.
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Servir desde el caché si está disponible.
        }
        // Si no está en caché, ir a la red.
        return fetch(event.request).then(
          (response) => {
            // No cacheamos recursos de terceros como CDNs en este bloque.
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      }
    )
  );
});


self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});