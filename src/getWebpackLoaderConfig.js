
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import getBabelCommonConfig from './getBabelConfig'
var utils = require('./utils')

export default function getWebpackCommonConfig (args) {
  const babelQuery = getBabelCommonConfig()
  return {
    babel: babelQuery,
    devtool: args.devtool,
    module: {
      loaders: [{
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: babelQuery
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test (filePath) {
          return /\.less$/.test(filePath) && !/\.module\.less$/.test(filePath)
        },
        loader: ExtractTextPlugin.extract(
          'css?sourceMap!' +
          'less-loader?{"sourceMap":true}'
        )
      }]
    },
    vue: {
      loaders: utils.cssLoaders()
    }
  }
}
