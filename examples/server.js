/**
 * Created by qiqf on 2020/6/16
 */
const express = require("express")
const webpack = require("webpack")
const WebpackConfig = require("./webpack.config")

const app = express()

// compiler 实例
const compiler = webpack(WebpackConfig)

// 注册 webpack 开发中间件
app.use(require("webpack-dev-middleware")(compiler, {
    publicPath: WebpackConfig.output.publicPath,
    noInfo: true
}))

// hot-middleware 在开发应用代码中加入 HMR Runtime, 它是 HMR 的客户端用于和服务器通讯
// 接受更新的模块, 可以将更新代码实时应用到当前页面中
app.use(require("webpack-hot-middleware")(compiler))

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.use(express.static(__dirname))

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})