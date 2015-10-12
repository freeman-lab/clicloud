var subcommand = require('subcommand')
var cliclopts = require('cliclopts')
var minimist = require('minimist')
var spinner = require('simple-spinner');
var _ = require('lodash')
var options = require('./lib/options.js')
var commands = require('./lib/commands.js')
var logger = require('./lib/logger.js')

function CLI(extra) {
  if (extra && extra.options) options = options.concat(extra.options)
  if (extra && extra.commands) commands = commands.concat(extra.commands)
  this.name = (extra && extra.name) ? extra.name : 'cloud'
  this.options = cliclopts(options)
  this.commands = commands
  return this
}

CLI.prototype.parse = function(argsin) {
  var args = minimist(argsin.slice(2), this.options.options())
  args.command = args._[0]
  args.cluster = args._[1]
  args.tag = args._[2]
  args.id = args._[3]
  return args
}

CLI.prototype.init = function(args, cloud) {
  var cmdnames = commands.map( function(command) {return command.name})
  var log = new logger(args.command)

  if (args.help || !args.command || !args.cluster) {
    console.log('Usage: ' + this.name + ' <command> <cluster> [options]')
    console.log('')
    console.log('Commands:')
    _.forEach(commands, function(command) {
      var indent = 23 - command.name.length
      console.log('    ' + command.name + Array(indent).join(' ') + command.help)
    })
    console.log('')
    console.log('Options:')
    return this.options.print()
  }

  if (cmdnames.indexOf(args.command) < 0) {
    log.error('Action ' + args.command + ' not recognized')
    log.message('Options are: ' + cmdnames.join(" "))
  }

  var config = {
    commands: commands
  }

  cloud.on('status', function(data) {
    log.message(data)
  })

  cloud.on('success', function(data) {
    log.success(data)
  })

  cloud.on('start', function() {
    spinner.start(100, {hideCursor: true})
  })

  cloud.on('stop', function() {
    spinner.stop()
  })

  var route = subcommand(config)
  route([args.command, args, cloud])
}

module.exports = CLI
module.exports.logger = logger