const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5180',
    })
  );

  app.use(
    '/coursePics',
    createProxyMiddleware({
      target: 'http://localhost:5180',
    })
  );
};