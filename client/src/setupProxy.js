const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/v1",
    createProxyMiddleware({
      target: "https://tuition-system-spis.herokuapp.com",
      changeOrigin: true,
    })
  );
};

//https://spis-backend.herokuapp.com
//https://tuition-system-spis.herokuapp.com
//http://localhost:5000
