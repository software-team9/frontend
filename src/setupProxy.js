// setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(createProxyMiddleware('/login', {
    target: "http://15.165.26.32:8080",
    changeOrigin: true,
  })
  )
};