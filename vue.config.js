// vue.config.js 配置说明
const path = require("path");
const PrerenderSpaPlugin = require("prerender-spa-plugin");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("assets", resolve("src/assets"))
      .set("scss", resolve("src/assets/scss"));
  },
  devServer: {
    port: 8080, // 端口号
    host: "0.0.0.0",
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    // 配置跨域处理,只有一个代理
    proxy: {
      "/api": {
        //target: "http://localhost:8085", // 接口的域名
        target: "https://www.easy-mock.com/mock/5b878e179da5b94e1e89f23f", // 接口的域名
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        ws: true,
        pathRewrite: {
          //"^/api": "/public/api"
          "^/api": "/api"
        }
      }
    }
  },
  configureWebpack: {
    // plugins: [
    //   new PrerenderSpaPlugin({
    //     // npm run build的输出目录
    //     staticDir: path.resolve(__dirname, "dist"),
    //     // 需要进行预渲染的页面
    //     routes: ["/", "/city"]
    //   })
    // ]
  }
};
