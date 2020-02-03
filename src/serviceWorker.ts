export default null
declare var self: ServiceWorkerGlobalScope

const urlsToCache = ['/', '/app.js', '/sw.js', '0.worker.js', '/manifest.json']

self.addEventListener('install', (event: any) => {
  self.skipWaiting()
  event.waitUntil(caches.open('yapp').then(cache => cache.addAll(urlsToCache)))
})

self.addEventListener('fetch', event => {
  if (event.request.url.startsWith('https://yapp-images.s3')) {
    event.respondWith(
      caches.open('yapp-dynamic').then(cache =>
        cache.match(event.request).then(
          response =>
            response ||
            fetch(event.request).then(response => {
              cache.put(event.request, response.clone())
              return response
            })
        )
      )
    )
  } else {
    event.respondWith(
      caches
        .match(event.request)
        .then(response => (response ? response : fetch(event.request)))
    )
  }
})
