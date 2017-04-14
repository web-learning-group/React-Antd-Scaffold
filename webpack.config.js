var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool:"source-map",
    devServer: {
        contentBase: "./app",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    entry: __dirname + '/src/router.jsx',
    output:{
        path: __dirname + '/dist',
        filename: 'js/bundle.js'
    },

    module: {
        loaders: [
            // { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') }, //坑：不能用叹号链接，必须写成这种格式
            // { test: /\.less$/, loader: ExtractTextPlugin.extract('css!less') },
            // { test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel' }
            {
                test: /\.css?$/,
                loaders: "style-loader!css-loader"},
            {
                test: /\.less$/,
                loaders: "css-loader!less-loader"
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.png$/,
                exclude: /node_modules/,
                loader: 'url-loader'
            }
        ]
    },

    plugins: [new HtmlWebpackPlugin({
        template: 'index.html'
    })]

};