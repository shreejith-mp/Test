self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('video-store').then(function(cache) {
     return cache.addAll([
      '/',
        '/index.html`,
        '/index.js`,
        '/styles/main.css`,
        '/images/fox1.jpg',
         '/images/fox2.jpg'
         '/images/fox3.jpg'
          '/images/fox4.jpg']);
   })
 );
});

addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;     // if valid response is found in cache return it
        } else {
          return fetch(event.request)     //fetch from internet
            .then(function(res) {
              return caches.open(CACHE_DYNAMIC_NAME)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());    //save the response for future
                  return res;   // return the fetched data
                })
            })
            .catch(function(err) {       // fallback mechanism
              return caches.open(CACHE_CONTAINING_ERROR_MESSAGES)
                .then(function(cache) {
                  return cache.match('/offline.html');
                });
            });
        }
      })
  );
}); 
