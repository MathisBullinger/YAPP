export default null
declare var self: ServiceWorkerGlobalScope

const urlsToCache = ['/index.html', '/app.js', '/manifest.json']

self.addEventListener('install', (event: any) => {
  self.skipWaiting()

  event.waitUntil(caches.open('yapp').then(cache => cache.addAll(urlsToCache)))
})

self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    caches
      .match(event.request)
      .then(response => (response ? response : fetch(event.request)))
  )
})
