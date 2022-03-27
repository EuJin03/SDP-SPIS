import { createProxyMiddleware } from "http-proxy-middleware";
import { __proxy } from "./constant.js";

export default app => {
  app.use(
    "/api/v1",
    createProxyMiddleware({
      target: __proxy || "http://127.0.0.1:5000",
      changeOrigin: true,
    })
  );
};
