/* Service worker : permet d'utiliser Muscu hors connexion.
   Stratégie « réseau d'abord » : quand il y a du réseau, tu as toujours la dernière version ;
   sans réseau (ou si le réseau met plus de 3 s), l'app s'ouvre depuis la copie enregistrée. */
const CACHE = 'muscu-v2';
const ASSETS = [
  './',
  'index.html',
  'styles.css',
  'data.js',
  'core.js',
  'body.js',
  'views.js',
  'app.js',
  'manifest.webmanifest',
  'icon-192.png',
  'icon-512.png',
  'apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => Promise.all(ASSETS.map((url) => cache.add(new Request(url, { cache: 'reload' })))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

async function fromCache(req) {
  return (await caches.match(req, { ignoreSearch: true })) || (await caches.match('index.html'));
}

function networkFirst(req) {
  return new Promise((resolve) => {
    let settled = false;
    const settle = (res) => { if (!settled && res) { settled = true; resolve(res); } };

    const timer = setTimeout(() => { fromCache(req).then(settle); }, 3000);

    fetch(req)
      .then((res) => {
        clearTimeout(timer);
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
        }
        settle(res);
      })
      .catch(() => {
        clearTimeout(timer);
        fromCache(req).then((res) => { if (res) settle(res); else if (!settled) { settled = true; resolve(Response.error()); } });
      });
  });
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(networkFirst(req));
});
