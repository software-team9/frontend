// setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/users', {
      target: 'https://jsonplaceholder.typicode.com',
      changeOrigin: true,
    }),
  );

  app.use(
    createProxyMiddleware('/api/breeds', {
      target: 'https://dog.ceo',
      changeOrigin: true,
    }),
  );

  app.use(
    createProxyMiddleware('/trends/trendingsearches', {
      target: 'https://trends.google.co.kr',
      changeOrigin: true,
    }),
  );

  app.use(
    createProxyMiddleware('/members', {
      target: 'http://15.165.26.32:8080',
      changeOrigin: true,
    }),
  );
};