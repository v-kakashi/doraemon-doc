import { readFileSync } from 'fs'
import MT from 'mark-twain'

function addContentToAssets (content, filename, compilation) {
  /* eslint-disable no-param-reassign */
  compilation.assets[filename] = {
    source: () => content,
    size: () => content.length
  }
}

export default function MenusWebpackPlugin (options) {
  const apply = compiler => {
    compiler.plugin('emit', (compilation, cb) => {
      var navs = []
      // console.log(path.relative(resourcePath,resource.demoPath))
      Object.keys(options.entry).forEach(key => {
        var content = readFileSync(options.entry[key], 'utf-8')
        var mate = MT(content).meta
        options.publicPath === '/' && (options.publicPath = '')
        mate.url = `${options.publicPath}/${key}.html`
        navs.push(mate)
      })
      addContentToAssets(JSON.stringify(navs), options.output, compilation)
      cb()
    })

    /*
    compiler.plugin('after-compile', (compilation, cb) => {
      const { context } = compiler
      compilation.fileDependencies.push(getFileFullPath(template, context))
      fileDependencies.forEach(dep => {
        compilation.fileDependencies.push(getFileFullPath(dep, context))
      })
      contextDependencies.forEach(dep => {
        compilation.contextDependencies.push(getFileFullPath(dep, context))
      })
      cb()
    })
    */
  }
  return {
    apply
  }
}
