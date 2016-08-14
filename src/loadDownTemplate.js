import download from 'download-git-repo'
import rm from 'rimraf'
import ora from 'ora'
import request from 'request'

module.exports = function (template) {
  // use official templates
  // kakashi-doc-templates
  template = 'v-kakashi/' + template
  if (template.indexOf('#') === -1) {
    checkDistBranch(template, downloadAndGenerate)
  } else {
    downloadAndGenerate(template)
  }
}

/**
 * Check if the template has a dist branch, if yes, use that.
 *
 * @param {String} template
 * @param {Function} cb
 */

function checkDistBranch (template, cb) {
  request({
    url: 'https://api.github.com/repos/' + template + '/branches',
    headers: {
      'User-Agent': 'kakashi-doc'
    }
  }, function (err, res, body) {
    if (err) console.log(err)
    if (res.statusCode !== 200) {
      console.log(`${template} 模块不存在`)
    } else {
      var hasDist = JSON.parse(body).some(function (branch) {
        return branch.name === 'dist'
      })
      return cb(hasDist ? template + '#dist' : template)
    }
  })
}

/**
 * Download a generate from a template repo.
 *
 * @param {String} template
 */

function downloadAndGenerate (template) {
  var tmp = './tmp'
  var spinner = ora('正在下载...')
  spinner.start()
  rm.sync(tmp)
  download(template, tmp, { clone: false }, function (err) {
    spinner.stop()
    if (err) console.log(`${template}下载失败: ${err.message.trim()}`)
    console.log('下载成功')
  })
}
