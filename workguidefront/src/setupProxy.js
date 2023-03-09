const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5180',
      cookieDomainRewrite: 'localhost',
      changeOrigin: true,
    })
  );

  app.use(
    '/coursePics',
    createProxyMiddleware({
      target: 'http://localhost:5180',
      cookieDomainRewrite: 'localhost',
      changeOrigin: true
    })
  );
};