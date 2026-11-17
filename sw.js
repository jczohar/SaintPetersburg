const V='spb-20261117-01',SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V&&x!=='spb-media').map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.origin===location.origin){e.respondWith(fetch(r).then(x=>{if(x.ok){const c=x.clone();caches.open(V).then(ch=>ch.put(r,c))}return x}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))));return}
 if(/basemaps\.cartocdn\.com|upload\.wikimedia\.org/.test(u.host)){e.respondWith(caches.open('spb-media').then(async c=>{const m=await c.match(r);if(m)return m;try{const x=await fetch(r);if(x.ok||x.type==='opaque'){c.put(r,x.clone());c.keys().then(k=>{if(k.length>600)c.delete(k[0])})}return x}catch(err){return m||Response.error()}}))}});
