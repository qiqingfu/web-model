/**
 * Created by qiqf on 2020/6/16
 */
const fs = require("fs")
const path = require("path")
const webpack = require("webpack")
const VueLoaderPlugin = require("vue-loader/lib/plugin")

module.exports = {
    mode: "development",
    entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
        const fullDir = path.join(__dirname, dir)
        const entry = path.join(fullDir, "app.js")
        if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
            console.log(dir);
            entries[dir] = [entry, "webpack-hot-middleware/client"]
        }

        return entries
    }, {}),

    output: {
        path: path.join(__dirname, "__build__"),
        filename: "[name].js",
        chunkFilename: "[id].chunk.js",
        publicPath: "/__build__/"
    },

    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, use: ["babel-loader"] },
            { test: /\.vue$/, use: ["vue-loader"] },
            { test: /\.css$/, use: ["vue-style-loader", "css-loader"] }
        ]
    },

    resolve: {
        alias: {
            "web-model": path.resolve(__dirname, "../src/Model.js")
        },
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: "shared",
                    filename: "shared.js",
                    chunks: "initial"
                }
            }
        }
    },

    plugins: [
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(true),
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
}
