chalk = require('chalk')

function Logger(command) {
  this.command = command
  this.prefix = chalk.gray('[' + command + '] ')
  return this
}

Logger.prototype.error = function(msg) {
  var self = this
  return console.log(self.prefix + chalk.red(msg))
}

Logger.prototype.success = function(msg) {
  var self = this
  return console.log(self.prefix + chalk.green(msg))
}

Logger.prototype.message = function(msg) {
  var self = this
  return console.log(self.prefix + msg)
}

module.exports = Logger