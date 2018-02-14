if (workbox) { console.log(`Yay! Workbox is loaded 🎉`); }
else { console.log(`Boo! Workbox didn't load 😬`); }

workbox.setConfig({
  debug: true,
})

workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

workbox.core.setCacheNameDetails({
  prefix: 'tt',
  suffix: 'v0-demo'
});

workbox.routing.registerRoute(
  new RegExp('(c|C)at(.+)\.(jpg|jpeg|png|gif|gifv)'),
  workbox.strategies.cacheFirst({
    cacheName: 'cats'
  })
)
