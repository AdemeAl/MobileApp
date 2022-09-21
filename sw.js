// const PREFIX = "v1";

// self.addEventListener("install", (event) => {
//     self.skipWaiting();
//     event.waitUntil(
//         (async () => {
//             const cache = await caches.open(PREFIX);
//             cache.add(new Request("/offline"))
//         })
//     )
// })



// self.addEventListener("fetch", (event) => {
//     console.log(`Fetching: ${event.request.url} , Mode: ${event.request.mode}`);

//     if (event.request.mode === "navigate") {
//         event.respondWith(
//             (async () => {
//                 try {
//                     const preloadResponse = await event.preloadResponse;
//                     if (preloadResponse) {
//                         return preloadResponse;
//                     }

//                     return await fetch(event.request);


//                 } catch (e) {
//                     return new Response("Bonjour");
//                 }
//             })()
//         );
//     }
// });



/*
Copyright 2015, 2019 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

// Incrementing OFFLINE_VERSION will kick off the install event and force
// previously cached resources to be updated from the network.
// const OFFLINE_VERSION = 1;
// const CACHE_NAME = 'offline';
// Customize this with a different URL if needed.
// const OFFLINE_URL = 'offline.html';

// const CACHE_FILE1 = 'style.css';

// const CACHE_FILE2 = 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT';

// self.addEventListener('install', (event) => {
//     event.waitUntil((async () => {
//         const cache = await caches.open(CACHE_NAME);
//         // Setting {cache: 'reload'} in the new request will ensure that the response
//         // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
//         await cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
//     })());
// });

// event.waitUntil(
//     (async () => {
//      const cache = await caches.open("v1")) ;
//       await Promise.all (
//         [ ... CACHED_FILES , " /offline.html"].map((path ) ⇒ {
//           return cache.add ( new Request ( path ) ) ;
//         } )
//      ) ;
//    } ) ( )


// self.addEventListener('install', (event) => {
//     event.waitUntil((async () => {
//         const cache = await caches.open(CACHE_NAME);
//         // Setting {cache: 'reload'} in the new request will ensure that the response
//         // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
//         await cache.add(new Request(CACHE_FILE1, { cache: 'reload' }));
//     })());
// });

// self.addEventListener('install', (event) => {
//     event.waitUntil((async () => {
//         const cache = await caches.open(CACHE_NAME);
//         // Setting {cache: 'reload'} in the new request will ensure that the response
//         // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
//         await cache.add(new Request(CACHE_FILE2, { cache: 'reload' }));
//     })());
// });

// self.addEventListener('activate', (event) => {
//     event.waitUntil((async () => {
//         // Enable navigation preload if it's supported.
//         // See https://developers.google.com/web/updates/2017/02/navigation-preload
//         if ('navigationPreload' in self.registration) {
//             await self.registration.navigationPreload.enable();
//         }
//     })());

//     // Tell the active service worker to take control of the page immediately.
//     self.clients.claim();
// });

// self.addEventListener('fetch', (event) => {
//     // We only want to call event.respondWith() if this is a navigation request
//     // for an HTML page.
//     if (event.request.mode === 'navigate') {
//         event.respondWith((async () => {
//             try {
//                 // First, try to use the navigation preload response if it's supported.
//                 const preloadResponse = await event.preloadResponse;
//                 if (preloadResponse) {
//                     return preloadResponse;
//                 }

//                 const networkResponse = await fetch(event.request);
//                 return networkResponse;
//             } catch (error) {
//                 // catch is only triggered if an exception is thrown, which is likely
//                 // due to a network error.
//                 // If fetch() returns a valid HTTP response with a response code in
//                 // the 4xx or 5xx range, the catch() will NOT be called.
//                 console.log('Fetch failed; returning offline page instead.', error);

//                 const cache = await caches.open(CACHE_NAME);
//                 const cachedResponse = await cache.match(OFFLINE_URL);
//                 return cachedResponse;
//             }
//         })());
//     }

//     // If our if() condition is false, then this fetch handler won't intercept the
//     // request. If there are any other fetch handlers registered, they will get a
//     // chance to call event.respondWith(). If no fetch handlers call
//     // event.respondWith(), the request will be handled by the browser as if there
//     // were no service worker involvement.
// });


/*  service_worker.js  */

const offlineCache = './offline-page.html';
// Adding the offline page 
// when installing the service worker
self.addEventListener('install', e => {
    // Wait until promise is finished 
    // Until it get rid of the service worker
    e.waitUntil(
        caches.open(offlineCache)
            .then(cache => {
                cache.add(offlineCache)
                    // When everything is set
                    .then(() => self.skipWaiting())
            })
    );
})

// Call Activate Event
self.addEventListener('activate', e => {
    console.log('Service Worker - Activated')
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(
                    cache => {
                        if (cache !== offlineCache) {
                            console.log(
                                'Service Worker: Clearing Old Cache');
                            return caches.delete(cache);
                        }
                    }
                )
            )
        })
    );

});

// Call Fetch Event 
self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        // If there is no internet
        fetch(e.request).catch((error) =>
            caches.match(offlineCache)
        )
    );
});