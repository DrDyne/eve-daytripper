const version = 1
const CACHE_NAME = `edt-cache-${version}`

console.log('worker')

self.addEventListener('install', event => {
  console.log('installing sw', event)
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
      console.log('cache !', cache)
    })
  )
})
