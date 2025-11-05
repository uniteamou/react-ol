;(function () {
  const path = window.location.pathname

  // Check if we're on the index/root page
  const isIndexPage =
    path.endsWith('/index.html') ||
    path.endsWith('/') ||
    path.match(/\/v\d+\.\d+\.\d+\/?$/) // Handle versioned paths like /v0.0.5/

  if (isIndexPage) {
    // Redirect to Getting Started document
    // The path will be relative to current location
    const basePath = path.replace(/\/(index\.html)?$/, '')
    window.location.href = basePath + '/documents/Getting_Started.html'
  }
})()
