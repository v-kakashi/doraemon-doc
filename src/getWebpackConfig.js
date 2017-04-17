import path, { join } from 'path'
import webpack, { ProgressPlugin } from 'webpack'
import glob from 'glob'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import Copy from 'copy-webpack-plugin'
// import Index from './index-webpack-plugin'
import Menu from './menus-webpack-plugin'
import Index from './index-webpack-plugin'

const root = path.join(__dirname, '../')

const getDemoFiles = function (dir) {
  return glob.sync(join(dir, '**/*.{js,vue,html,md}'))
}

const getEntry = function (source) {
  const files = getDemoFiles(source)

  const entry = {}
  files.forEach(file => {
    const ext = path.extname(file)
    const name = path.basename(file, ext)
    const pathWithoutExt = join(path.dirname(file), name)
    // js/vue/md 必需要有所属的HTML
    if (
      ext === '.md' ||
      (ext === '.js' || ext === '.vue') && files.indexOf(`${pathWithoutExt}.html`) !== -1
    ) {
      entry[pathWithoutExt] = file
    }
  })

  return entry
}

const babelQuery = {
  "presets": [
    "es2015",
    "stage-0"
  ],
  "plugins": [
    "add-module-exports",
    "syntax-async-functions",
    "transform-regenerator",
    "dynamic-import-webpack"
  ],
  "comments": false
}

export default function (source, asset, dest, cwd, tpl, config, indexHtml, publicPath, duoshuoName) {
  const pkg = require(join(cwd, 'package.json'))

  var theme = 'default'
  // const webpackConfig = getWebpackLoaderConfig({ cwd, devtool: , theme })


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

  // ------------------------------------
  // Plugins
  // ------------------------------------

  const vueLoaderOptions = {
    postcss: pack => {
      // see: https://github.com/ai/browserslist#queries
      const browsers = 'Android >= 4, iOS >= 7'

      return [
        require('postcss-import')({
          path: paths.src(`themes/${theme}`)// ,
        }),
        require('postcss-url')({
          basePath: paths.src('static')
        }),
        require('postcss-cssnext')({
          browsers,
          features: {
            customProperties: {
              variables: require(paths.src('application/styles/variables'))
            },
            // 禁用 autoprefixer，在 postcss-rtl 后单独引入
            // 否则会跟 postcss-rtl 冲突
            autoprefixer: false
          }
        }),
        // 如果不需要 flexible，请移除
        require('postcss-flexible')({
          remUnit: 75
        }),
        require('autoprefixer')({
          browsers
        }),
        require('postcss-browser-reporter')(),
        require('postcss-reporter')()
      ]
    },
    autoprefixer: false
  }
  const entry = getEntry(source)
  console.log(path.join(cwd, source))
  const webpackConfig = {
    devtool: 'source-map',
    // target: 'web',
    entry: {
      'dddeeee': './vue.md'
    },
    resolve: {
      // root: cwd,
      alias: {
        // [`${pkg.name}$`]: join(cwd, 'index.js'),
        [pkg.name]: cwd
      },
      // modulesDirectories: ['node_modules', join(__dirname, '../node_modules'), join(root, 'node_modules')],
      extensions: ['.js', '.vue', '.md']
    },
    output: {
      path: join(cwd, dest),
      publicPath: '/',
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.md$/,
          loader: `babel-loader?${JSON.stringify(babelQuery)}!doraemon-md-loader?template=${tpl}&publicPath=${publicPath}&duoshuoName=${duoshuoName}`,
          // include: path.join(cwd, source),
          enforce: 'pre'
        }, {
          test: /\.(js|vue)$/,
          loader: `babel-loader?${JSON.stringify(babelQuery)}!atool-doc-js-loader?template=${tpl}`,
          include: path.join(cwd, source),
          enforce: 'pre'
        }, {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              css: ExtractTextPlugin.extract({
                use: 'css-loader?sourceMap',
                fallback: 'vue-style-loader'
              }),
              js: 'babel-loader'
            }
          }
        }, {
          test: /\.js$/,
          // platojs 模块需要 babel 处理
          exclude: /node_modules[/\\](?!platojs)/,
          loader: 'babel-loader',
          query: babelQuery
        }, {
          test: /\.html$/,
          loader: 'vue-html-loader'
        }, {
          test: /@[1-3]x\S*\.(png|jpg|gif)(\?.*)?$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash:7]'
          }
        }, {
          test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
          exclude: /@[1-3]x/, // skip encoding @1x/@2x/@3x images with base64
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '[name].[ext]?[hash:7]'
          }
        }, {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'postcss-loader' }
          ]
        }
      ]
    }
  }
/*
  webpackConfig.resolveLoader = {
    modulesDirectories: ['node_modules', join(__dirname, '../node_modules'), join(root, 'node_modules')]
  }
*/

  webpackConfig.plugins = [
    new ProgressPlugin((percentage, msg) => {
      const stream = process.stderr
      if (stream.isTTY && percentage < 0.71) {
        stream.cursorTo(0)
        stream.write(`💻   ${msg}`)
        stream.clearLine(1)
      } else if (percentage === 1) {
        console.log('\nwebpack: bundle build is now finished.')
      }
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      // minimize: true,
      options: {
        context: __dirname
      },
      vue: vueLoaderOptions
    }),
    // new ExtractTextPlugin('[name].[contenthash].css'),
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new Copy([{ from: asset, to: asset }]),
    new Index({ indexHtml }),
    new Menu({
      source,
      publicPath,
      entry,
      output: './menu.json'
    })
  ]

  return webpackConfig
}


