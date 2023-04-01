// -----------------------------------------------EVENTS-----------------------------------------------
self.addEventListener('notificationclick', (event) => {
  console.log('On notification click: ', event.notification.tag);
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
      })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === '/' && 'focus' in client) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow('/');
      }),
  );
});

self.addEventListener('notificationclose', (event) => {
  // clients
  console.log('notificationclose', event);
  return event;
});

//Inside a service worker.
self.onnotificationclose = (event) => {
  console.log('On notification close: ', event.notification.tag);
};

// ----------------------------------offline----------------------------------
const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html', 'pro_icon.svg', 'VNPT_Logo.svg'];
// Install SW
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // console.log('Opened cache');

      return cache.addAll(urlsToCache);
    }),
  );
});

// Listen for requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match('offline.html'));
    }),
  );
});

// Activate the SW
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        }),
      ),
    ),
  );
});
