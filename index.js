var subcommand = require('subcommand')
var cliclopts = require('cliclopts')
var minimist = require('minimist')
var chalk = require('chalk')

var options = require('./lib/options.js')
var commands = require('./lib/commands.js')

module.exports.parse = function(argv, extra) {

  if (extra && extra.options) options = options.concat(extra.options)

  var cliopts = cliclopts(options)
  var args = minimist(argv.slice(2), cliopts.options())
  args.action = args._[0]
  args.cluster = args._[1]
  args.tag = args._[2]
  args.id = args._[3]
  return args

}

module.exports.init = function(args, cloud, extra) {

  if (extra && extra.options) options = options.concat(extra.options)
  if (extra && extra.commands) commands = commands.concat(extra.commands)
  var cliopts = cliclopts(options)

  var actions = commands.map( function(action) {return action.name})
  var prefix = chalk.gray('[' + args.action + '] ')

  if (args.help || !args.action || !args.cluster) {
    console.log('Usage: tinycloud <action> <cluster> [options]')
    cliopts.print()
    process.exit()
  }

  if (actions.indexOf(args.action) < 0) {
    console.log(prefix + chalk.red('Action ' + args.action + ' not recognized'))
    console.log(prefix + 'Options are ' + chalk.blue(actions.join(" ")))
  }

  var config = {
    commands: commands
  }

  cloud.on('progress', function(data) {
    console.log(prefix + data)
  })

  cloud.on('success', function(data) {
    console.log(prefix + chalk.green(data))
  })

  var route = subcommand(config)
  route([args.action, args, cloud])

}