// -----------------------------------------------EVENTS-----------------------------------------------
self.addEventListener('notificationclick', (event) => {
  console.log('On notification click: ', event.notification.tag);
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then((clientList) => {
    for (const client of clientList) {
      if (client.url === '/' && 'focus' in client)
      return client.focus();
    }
    if (clients.openWindow)
      return clients.openWindow('/');
  }));
})

self.addEventListener('notificationclose', (event) => {
  // clients
  console.log("notificationclose", event);
  return event
})

//Inside a service worker.
self.onnotificationclose = (event) => {
  console.log('On notification close: ', event.notification.tag);
};

// ----------------------------------offline----------------------------------
const CACHE_NAME = "version-1";
const urlsToCache = [ 'index.html', 'offline.html', 'pro_icon.svg', 'VNPT_Logo.svg' ];
// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                // console.log('Opened cache');

                return cache.addAll(urlsToCache);
            })
    )
});

// Listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request) 
                    .catch(() => caches.match('offline.html'))
            })
    )
});

// Activate the SW
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
            
    )
});

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyARG5SuaBFkyxXjyHBGzzGMH30cq4LrELo",
  authDomain: "vnpt-web-push.firebaseapp.com",
  databaseURL: "https://vnpt-web-push-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vnpt-web-push",
  storageBucket: "vnpt-web-push.appspot.com",
  messagingSenderId: "784077660924",
  appId: "1:784077660924:web:d2045125b517029d1fed79",
  measurementId: "G-QQYF7PNY6H"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

// IF WE WANT TO HANDLE BACKGROUND NOTIFICATION WE HAVE TO ADD THE FOLLOWING BLOCK OF CODE AS WELL

messaging.onBackgroundMessage((payload) => {
  // console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const {body: PAYLOAD_BODY, title: notificationTitle, tag=""} = payload.data || {body: 'Error', title: 'Error'}
  // Customize notification here
  const notificationOptions = {
    // actions: [ 
    //   {
    //     action: 'Open-action',
    //     title: 'Open',
    //     // icon: '/images/demos/action-1-128x128.png',
    //   }
    // ],
    // body: `${(new Date()).toISOString()}\n${(new Date()).toISOString()}\n${(new Date()).toISOString()}`,
    // body,
    icon: '/logo.png',
    tag,
    renotify: true,
  };
  // console.log(self.registration);
  // console.log(self.navigator)
  // self.navigator.serviceWorker.ready.then((registration) => {
  //   registration.showNotification().then(no=>console.log(no))
  //   return registration.getNotifications()
  // }).then(notigications => {
  //   notigications[0].body
  // })
    
    self.registration.getNotifications({tag}).then(async (notifications) => {
      // do something with your notifications
      //
      if (notifications[0])
        notificationOptions.body = notifications[0].body + PAYLOAD_BODY;
      else
        notificationOptions.body = PAYLOAD_BODY;
      
      await self.registration.showNotification(notificationTitle,
        notificationOptions);
      
    })

});
