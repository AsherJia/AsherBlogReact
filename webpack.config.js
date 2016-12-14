var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:10010', // WebpackDevServer host and port
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        './src'
    ],

    output: {
        path: __dirname,
        filename: 'bundle.js',
        publicPath: 'http://localhost:10010/',
        pathinfo: true
    },

    module: {
        loaders: [
            { test: /\.(js|jsx)$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            { test: /\.css$/, loaders: ['style', 'css', 'sass'] },
        ]
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
          title: 'AsherBlog',
          template: 'template.html',
          inject: true
        })
    ]
}
