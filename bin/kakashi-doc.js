#!/usr/bin/env node

var cp = require('child_process')

function start () {
  const p = cp.fork(__dirname + '/kakashi-doc', process.argv.slice(2))
  p.on('message', function (data) {
    if (data === 'restart') {
      p.kill('SIGINT')
      start()
    }
  })
}

if (!process.send) {
  start()
} else {
  var program = require('commander')
  program
    .command('install')
    .option('--tpl <path>', '文档模板', 'kakashi-doc-template')
    .action(function (options) {
      require('../lib/loadDownTemplate')(options.tpl)
    })

  program
    .version(require('../package').version, '-v, --version')
    .command('doc')
    .option('--init', '初始化项目')
    .option('--dest <dir>', '输出网站的目录, 默认 __site 目录', '__site')
    .option('--source <dir>', '文档源目录, 默认 examples 目录', 'examples')
    .option('--asset <dir>', '静态资源文件目录, 默认 ./tpl/static 目录', './tpl/static')
    .option('--tpl <path>', '模板文件, 默认 ./tpl/html/element.ejs 目录', './tpl/html/element.ejs')
    .option('--config <path>', 'config path of webpack.config, default webpack.config.js', 'webpack.config.js')
    .option('--port <number>', '网站的端口号, 默认 7788', '7788')
    .option('--build', '生成网站')
    .option('--publicPath <dir>', '发布到网站的二级目录', '/')
    .option('--index <path>', '首页地址, 默认 ./examples/install.html', './examples/install.html')
    .option('-w, --watch', '已监听模式启动')
    .action(function (options) {
      options.cwd = process.cwd()
      require('../lib/doc')(options)
    })

  program.parse(process.argv)
  require('atool-monitor').emit()
}
