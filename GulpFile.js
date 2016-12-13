var gulp = require('gulp')
var gutil = require('gulp-util')
var webpack = require('webpack')
var webpackConfig = require('./webpack.config.js')
var WebpackDevServer = require('webpack-dev-server')

function startWebpackDevServer (config) {
  config.devtool = "sourcemap";
  config.debug = true;
  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
        colors: true,
        chunks: false
    }
  }).listen(10010, 'localhost', function(err) {
    if(err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }

    gutil.log('[webpack-dev-server]', 'http://localhost:10010');
  })
}

gulp.task('webpack-dev-server', function() {
    gutil.log('Begin to start webpack-dev-server', webpackConfig)
    startWebpackDevServer(webpackConfig)
    gutil.log('Webpack-dev-server start successfully')
})

gulp.task('dev', ['webpack-dev-server'])
