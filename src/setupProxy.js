// setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(createProxyMiddleware('/login', {
    target: "http://15.165.26.32:8080",
    changeOrigin: true,
  })
  )

  app.use(createProxyMiddleware('/logout', {
    target: "http://15.165.26.32:8080",
    changeOrigin: true,
  })
  )

  app.use(createProxyMiddleware('/members', {
    target: "http://15.165.26.32:8080",
    changeOrigin: true,
  })
  )

  app.use(createProxyMiddleware('/join', {
    target: "http://15.165.26.32:8080",
    changeOrigin: true,
  })
  )

  app.use(createProxyMiddleware('/wish', {
    target: "http://15.165.26.32:8080",
    changeOrigin: true,
  })
  )

  app.use(createProxyMiddleware('/seasonRank', {
    target: "http://15.165.26.32:8080",
    changeOrigin: true,
  })
  )

  app.use(createProxyMiddleware('/reviews', {
    target: "http://15.165.26.32:8080",
    changeOrigin: true,
  })
  )
};