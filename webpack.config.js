var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',

    output: {
        path: __dirname + '/build',
        publicPath: '/',
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            { test: /\.(js|jsx)$/, exclude: /(node_modules)/, loader: 'babel' },
            { test: /\.css$/, loaders: ['style', 'css', 'sass'] },
        ]
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
          'process.env': {
            // This can reduce react lib size and disable some dev feactures like props validation
            NODE_ENV: JSON.stringify('production')
          }
        }),
        new HtmlWebpackPlugin({
          title: 'AsherBlog',
          template: 'template.html',
          inject: true
        })
    ],

    devtool: 'source-map',
    devServer: {
        colors: true,
        historyApoFailback: true,
        inLine: true,
        hot: true,
        contentBase: './public'
    }


}
