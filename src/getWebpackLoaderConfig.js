
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import getBabelCommonConfig from './getBabelConfig'
import path from 'path'
var utils = require('./utils')
// WEBPACK 的配置文件

export default function getWebpackCommonConfig ({cwd, devtool, theme}) {
  // ------------------------------------
  // Utilities
  // ------------------------------------
  var paths = (() => {
    const resolve = path.resolve

    const base = (...args) =>
      resolve.apply(resolve, [cwd, ...args])

    return {
      base,
      src: base.bind(null, './')
    }
  })()

  const babelQuery = getBabelCommonConfig()
  return {
    babel: babelQuery,
    devtool,
    postcss: [
      require('postcss-import')({
        path: paths.src(`themes/${theme}`)// ,
        // use webpack context
        // addDependencyTo: pack
      }),
      require('postcss-url')({
        basePath: paths.src('static')
      }),
      require('postcss-cssnext')({
        // see: https://github.com/ai/browserslist#queries
        browsers: 'Android >= 4, iOS >= 7',
        features: {
          customProperties: {
            variables: require(paths.src(`themes/${theme}/variables`))
          }
        }
      }),
      require('postcss-flexible')({
        remUnit: 75
      }),
      require('postcss-browser-reporter')(),
      require('postcss-reporter')()
    ],
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
        test: /\.css$/,
        loaders: [
          'style',
          'css',
          'postcss'
        ]
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
