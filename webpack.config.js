var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        bundle: [
            'webpack-dev-server/client?http://localhost:10010', // WebpackDevServer host and port
            'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
            './src/index.js'
        ]
    },

    output: {
        path: __dirname+'/build',
        filename: 'bundle.js',
        publicPath: 'http://localhost:10010/',
        pathinfo: true
    },

    module: {
        loaders: [
            { test: /\.(js|jsx)$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            { test: /\.css$/, loaders: ['style', 'css'] },
            { test: /\.scss$/, loaders: ['style', 'css', 'sass'] }
        ]
    },

    resolve: {
        modulesDirectories: ['node_modules']
      },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            { from: 'src/fonts', to: 'src/fonts' },
            { from: 'src/deps', to: 'src/deps' }
        ]),
        new HtmlWebpackPlugin({
          title: 'AsherBlog',
          template: 'template.html',
          inject: true
        })
    ]
}
