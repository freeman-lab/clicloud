chalk = require('chalk')

function Logger(command) {
  this.command = command
  this.prefix = chalk.gray('[' + command + '] ')
  return this
}

Logger.prototype.error = function(msg) {
  return console.log(this.prefix + chalk.red(msg))
}

Logger.prototype.success = function(msg) {
  return console.log(this.prefix + chalk.green(msg))
}

Logger.prototype.message = function(msg) {
  return console.log(this.prefix + msg)
}

module.exports = Logger