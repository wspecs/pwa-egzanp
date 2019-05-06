"use strict";var precacheConfig=[["/fonts.1eaed2c9.css","6d86a358ae9d8b52e21e129b635281aa"],["/icon-128x128.f410fc3f.png","c6d471643f65a2a2e6f1dd2e62bf8234"],["/icon-144x144.7d30bf15.png","bbce0ffc5f145add765a8f19e854ef75"],["/icon-152x152.e647e9e3.png","e54478e9d297daec13567d19def3bac2"],["/icon-192x192.7310e837.png","8e5de0c6e6a998ae49175537b575998e"],["/icon-384x384.b149cd99.png","0c398f80edc64f6ba5109c85a2b05a23"],["/icon-512x512.93896851.png","847b9d5abcba41f1301d36f51b3e590e"],["/icon-72x72.38aaa9f7.png","3d02a3ab4d0ae799691a0f6a503fa313"],["/icon-96x96.9d4e8b91.png","c2efd856352dc6ac4ccbf0360a18ab8e"],["/index.html","a18e21554650600d9a9fda17b76d2c1a"],["/open-sans-v16-latin_latin-ext-300.ccc924f8.woff","d2c6a4b3918b50c5f1854bb9c5d1de0e"],["/open-sans-v16-latin_latin-ext-300.f41f2a42.woff2","f3f1593860f828caac8d594f23416f9c"],["/open-sans-v16-latin_latin-ext-600.89481e27.woff","8d1f96760ca156600e72d529483660a8"],["/open-sans-v16-latin_latin-ext-600.a4afd6da.woff2","ba13b15f5586edb960ed4a1f2ab7a27b"],["/open-sans-v16-latin_latin-ext-700.49b0b7dd.woff","7f0bc4d2d95eb471662f447f10acad2e"],["/open-sans-v16-latin_latin-ext-700.99994c08.woff2","5717b08cf679657595d0383d291a04c3"],["/open-sans-v16-latin_latin-ext-regular.71ee2248.woff2","be21e759f9abd15b8cef68d92cedc081"],["/open-sans-v16-latin_latin-ext-regular.84ae3a27.woff","b7b7c77b83e9d67f6756aa2716f35eba"],["/pwa-egzanp.cc654d42.js","8b6121f88082dbf19815e61f83ff9c58"],["/service-worker.js","6eefa88137cf25fb72efef7be00933b7"],["/webcomponents-loader.d1f42c99.js","7497481556ffe01c6746dcb95fc7f496"]],cacheName="sw-precache-v3-pwa-egzanp-le-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,n){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=n),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(n){return new Response(n,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,n,t,a){var r=new URL(e);return a&&r.pathname.match(a)||(r.search+=(r.search?"&":"")+encodeURIComponent(n)+"="+encodeURIComponent(t)),r.toString()},isPathWhitelisted=function(e,n){if(0===e.length)return!0;var t=new URL(n).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,n){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return n.every(function(n){return!n.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var n=e[0],t=e[1],a=new URL(n,self.location),r=createCacheKey(a,hashParamName,t,/\.\w{8}\./);return[a.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!n.has(t)){var a=new Request(t,{credentials:"same-origin"});return fetch(a).then(function(n){if(!n.ok)throw new Error("Request for "+t+" returned a response with status "+n.status);return cleanResponse(n).then(function(n){return e.put(t,n)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!n.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var n,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(n=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),n=urlsToCacheKeys.has(t));!n&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(t=new URL("/index.html",self.location).toString(),n=urlsToCacheKeys.has(t)),n&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(n){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,n),fetch(e.request)}))}});