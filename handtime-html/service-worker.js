// service-worker.js

// Define o nome do cache
const CACHE_NAME = 'shareheart-cache-v1';

// Lista de recursos a serem armazenados em cache
const urlsToCache = [
  '/',
  'index.html',
  // Adicione aqui os URLs de todos os recursos estáticos que deseja armazenar em cache
  // Exemplo: 'css/style.css', 'js/main.js', 'img/logo.png', etc.
];

// Instalação do Service Worker
self.addEventListener('install', event => {
  // Performe a instalação do Service Worker
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta e responde às solicitações de busca de recursos
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - retorna a resposta do cache
        if (response) {
          return response;
        }
        // Não encontrou o recurso no cache - busca na rede
        return fetch(event.request);
      })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  // Remove caches antigos que não estão na whitelist
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});