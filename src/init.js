import { existsSync } from 'fs'
import { join } from 'path'
import copydir from 'copy-dir'
import inquirer from 'inquirer'

module.exports = function (path) {
  if (existsSync(path)) {
    console.log(`${path} 已存在`)
  } else {
    copydir.sync(join(__dirname, '../examples'), path)
  }
}
