const webpack = require('webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const port = 14440;

let config = {
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        contentBase: './*',
        port: port
    },
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:'+port,
        path.resolve(__dirname, 'app/main.jsx')
    ],
    output: {
        filename: './bundle.js',
        path: path.resolve(__dirname, 'build'),
        // [name] 默认是 ID，如果指定了chunkName则为指定的名字
        // [chunkhash] 对当前chunk 经过hash后得到的值，保证在chunk没有变化的时候hash不变，文件不需要更新，chunk变了后，可保证hash唯一，由于hash太长，这里截取了hash的12个字符足矣
        chunkFilename: '/js/[name].[chunkhash:12].chunk.js'
    },
    module: {
        loaders: [
            // JSX JS
            {
                test: /\.(jsx|js)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                plugins: ['transform-runtime'],
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            // CSS
            {
                test: /\.css$/, // Only .css files
                loader: 'style!css' // Run both loaders
            },
            // SCSS
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            // IMAGE
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=25000' //  limit 不大于 25KB 的话要自动在它从属的 css 文件中转成 BASE64 字符串。
            },
            // FONT
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json', '.scss', '.css'],
        // fallback: [path.join(__dirname, '../node_modules')],// 相对路径引用基础路径
        alias: {
            'static': path.resolve(__dirname, '../static'),
            'lib': path.resolve(__dirname, '../app/lib'),
            'config': path.resolve(__dirname, '../app/config'),
            'http': path.resolve(__dirname, '../app/http'),
            'components': path.resolve(__dirname, '../app/components'),
            'lang': path.resolve(__dirname, '../app/lang')
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({ url: 'http://localhost:'+port }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};

module.exports = config;