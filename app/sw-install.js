if ('serviceWorker' in navigator) {
  //window.addEventListener('install', installSw)

  //TODO uncomment to start caching
  //window.addEventListener('load', registerSw)
}

function installSw (event) {
  console.log('SW installing…')
}

function registerSw () {
  console.log('SW loading...')

  navigator.serviceWorker
  .register('/sw.js')
  .then(registration => {
    console.log('SW registered: ', registration)
  })
  .catch(registrationError => {
    console.log('SW registration failed: ', registrationError)
  })
}
