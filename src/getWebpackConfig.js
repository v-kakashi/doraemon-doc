import path, { join } from 'path'
import getWebpackLoaderConfig from './getWebpackLoaderConfig'
import webpack, { ProgressPlugin } from 'webpack'
import glob from 'glob'
import Copy from 'copy-webpack-plugin'
import Index from './index-webpack-plugin'

const root = path.join(__dirname, '..')

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

export default function (source, asset, dest, cwd, tpl, config) {
  const pkg = require(join(cwd, 'package.json'))

  const webpackConfig = getWebpackLoaderConfig({ cwd, devtool: '#inline-cheap-module-source-map' })

  const entry = getEntry(source)
  webpackConfig.entry = entry
  webpackConfig.output = {
    path: join(cwd, dest),
    publicPath: '/',
    filename: '[name].js'
  }
  webpackConfig.cwd = cwd
  webpackConfig.demoSource = source
  webpackConfig.resolve = {
    root: cwd,
    alias: {
      [`${pkg.name}$`]: join(cwd, 'index.js'),
      [pkg.name]: cwd
    },
    modulesDirectories: ['node_modules', join(__dirname, '../node_modules'), join(root, 'node_modules')],
    extensions: ['', '.web.js', '.js', '.vue']
  }

  webpackConfig.resolveLoader = {
    modulesDirectories: ['node_modules', join(__dirname, '../node_modules'), join(root, 'node_modules')]
  }

  webpackConfig.module.loaders = webpackConfig.module.loaders.map(i => {
    if (i.loader) {
      return {
        ...i,
        loader: i.loader.replace(/^.*extract-text-webpack-plugin\/loader.js((?!!).)*!/, 'style!')
      }
    }
    if (i.loaders) {
      return {
        ...i,
        loaders: i.loaders.map(item =>
          item.replace(/^.*extract-text-webpack-plugin\/loader.js((?!!).)*!/, 'style!')
        )
      }
    }
    return i
  })

  webpackConfig.module.preLoaders = webpackConfig.module.preLoaders || []
  webpackConfig.module.preLoaders.push({
    test: /\.md$/,
    loader: `babel?${JSON.stringify(webpackConfig.babel)}!atool-doc-md-loader?template=${tpl}`,
    include: path.join(cwd, source)
  })

  webpackConfig.module.preLoaders.push({
    test: /\.(vue|js)$/,
    loader: `babel?${JSON.stringify(webpackConfig.babel)}!atool-doc-js-loader?template=${tpl}`,
    include: path.join(cwd, source)
  })

  const link = {}
  Object.keys(entry).forEach(key => {
    link[path.relative(source, key)] = key
  })

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
    new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new Copy([{ from: asset, to: asset }]),
    new Index({
      params: {
        link
      }
    })
  ]

  return webpackConfig
}
