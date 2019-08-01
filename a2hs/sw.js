console.log("fdfd :"+self);
self.addEventListener('install', function(e) {
 console.log("e :"+e);
 e.waitUntil(
   caches.open('video-store').then(function(cache) {
     return cache.addAll([
      '/',
      '/Test/',
        '/Test/a2hs/index.html',
        '/Test/a2hs/index.js',
        '/Test/a2hs/images/fox1.jpg',
         '/Test/a2hs/images/fox2.jpg',
         '/Test/a2hs/images/fox3.jpg',
          '/Test/a2hs/images/fox4.jpg']);
   })
 );
});

self.addEventListener('fetch', function(e) {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
