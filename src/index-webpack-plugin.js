import { readFileSync } from 'fs'
import { render } from 'ejs'

function addContentToAssets (content, filename, compilation) {
  /* eslint-disable no-param-reassign */
  compilation.assets[filename] = {
    source: () => content,
    size: () => content.length
  }
}

export default function IndexWebpackPlugin (options) {
  const { file, template, indexHtml } = {
    template: 'tpl/html/index.ejs',
    file: 'index.html',
    indexHtml: options.indexHtml
  }

  const apply = compiler => {
    compiler.plugin('emit', (compilation, cb) => {
      const content = render(readFileSync(template, 'utf-8'), {
        indexHtml
      })

      addContentToAssets(content, file, compilation)
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
