const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        "/api/*",
        createProxyMiddleware({
            //   target: "https://cryptic-fortress-60566.herokuapp.com/",
            target: "http://localhost:4000",
        })
    );
};
