var chalk = require('chalk')
var fs = require('fs')
var _ = require('lodash')
var logger = require('./logger.js')
var tab = '-- '

module.exports = [
  {
    name: 'launch',
    command: launch,
    help: 'Launch a cluster'
  },
  {
    name: 'destroy',
    command: destroy,
    help: 'Destroy a cluster'
  },
  {
    name: 'login',
    command: login,
    help: 'Login to a cluster'
  },
  {
    name: 'execute',
    command: execute,
    help: 'Execute a command on a cluster'
  },
  {
    name: 'list',
    command: list,
    help: 'List nodes on a cluster'
  }
]

function launch(input) {
  var args = input._[0]
  var cloud = input._[1]
  var log = new logger(args.command)
  if (!args.key) return log.error('Error: Must provide key name (-k)')
  cloud.launch( function(err, data) {
    if (err) log.error(err)
  })
}

function destroy(input) {
  var args = input._[0]
  var cloud = input._[1]
  var log = new logger(args.command)
  cloud.destroy( function(err, data) {
    if (err) log.error(err)
  })
}

function login(input) {
  var args = input._[0]
  var cloud = input._[1]
  var log =  new logger(args.command)
  if (!args.keyfile) return log.error('Error: Must provide identity keyfile (-i)')
  cloud.login(args.tag, args.id, args.keyfile, function(err, data) {
    if (err) log.error(err)
  })
}

function execute(input) {
  var args = input._[0]
  var cloud = input._[1]
  var log =  new logger(args.command)
  if (!args.keyfile) return log.error('Error: Must provide identity keyfile (-i)')
  if (!args.exec) return log.error('Error: Must provide executable command or file (-e)')
  var exec
  try {
    exec = fs.readFileSync(args.exec).toString()
  } catch (e) {
    if (e.code === 'ENOENT') {
      exec = args.exec
    } else {
      return log.error('Error: Exception trying to parse executable')
    }
  }
  cloud.execute(args.tag, args.id, args.keyfile, exec, function(err, data) {
    if (err) log.error(err)
  })
}

function list(input) {
  var args = input._[0]
  var cloud = input._[1]
  var log = new logger(args.command)
  cloud.summarize(args. tag, function(err, data) {
    if (err) return log.error(err)
    data.forEach(function (instance) {
      log.message(chalk.blue(instance.id))
      log.message(tab + instance.group.replace(args.cluster + '-', ''))
      if (instance.state === 'running') {
        log.message(tab + chalk.green(instance.state))
      } else {
        log.message(tab + chalk.yellow(instance.state))
      }
    })
  })
}
