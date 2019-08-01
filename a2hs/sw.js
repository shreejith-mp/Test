console.log("fdfd :"+self);
self.addEventListener('install', function(e) {
 console.log("e :"+e);
 e.waitUntil(
   caches.open('video-store').then(function(cache) {
     return cache.addAll([
      '/Test/a2hs',
        '/Test/a2hs/index.html',
        '/Test/a2hs/index.js',
        '/Test/a2hs/images/fox1.jpg',
         '/Test/a2hs/images/fox2.jpg',
         '/Test/a2hs/images/fox3.jpg',
          '/Test/a2hs/images/fox4.jpg']);
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
