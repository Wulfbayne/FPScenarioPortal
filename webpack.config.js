const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        bundle: path.resolve(__dirname, 'devSite/index.js')
    },
    output: {
        path: path.resolve(__dirname, "website"),
        filename: '[name].js',
        clean: true
    },
    module:{
        rules:[
            {
                test: /\.scss$/,
                use: ['style-loader','css-loader','sass-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: "Freedom Park Scenario Portal",
            filename: "index.html",
            template: "devSite/template.html"
        })
    ],
    devServer:{
        static: {
            directory: path.join(__dirname, 'website'),
        },
        proxy: {
            '/': 'http://localhost:3000'
        },
        compress: true,
        port: 8080,
        open: true,
        hot: true,
        historyApiFallback: true
    }
}