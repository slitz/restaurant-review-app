var staticCacheName = 'restaurant-reviews-static-v2';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache){
      return cache.addAll([
        '/',
        'css/styles.css',
        'data/restaurants.json',
        'img/',
        'js/'
      ]);
    })
  );
});

self.addEventListener('activate', function(event){
    event.waitUntil(
      caches.keys().then(function(cacheNames){
        return Promise.all(
          cacheNames.filter(function(cacheName){
            return cacheName.startsWith('restaurant-reviews') &&
              cacheName != staticCacheName;
          }).map(function(cacheName){
            return caches.delete(cacheName);
          })
        );
      })
    );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response){
      if(response) return response;
      return fetch(event.request);
    })
  );
});
