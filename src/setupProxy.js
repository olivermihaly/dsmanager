const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://192.168.0.65:5000",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    })
  );
};
