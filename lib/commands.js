var chalk = require('chalk')

var cmd = function(action) {return chalk.gray('[' + action + '] ')}
var tab = '-- '

module.exports = [
  {
    name: 'launch',
    command: launch
  },
  {
    name: 'destroy',
    command: destroy
  },
  {
    name: 'login',
    command: login
  },
  {
    name: 'list',
    command: list
  }
]

function launch(input) {
  var args = input._[0]
  var cloud = input._[1]
  var prefix = cmd(args.action)
  if (!args.key) {
    console.log(prefix + chalk.red('Error: must provide key for launch'))
    process.exit()
  }
  cloud.launch( function(err, data) {
    if (err) console.log(prefix + chalk.red(err))
  })
}

function destroy(input) {
  var args = input._[0]
  var cloud = input._[1]
  var prefix = cmd(args.action)
  cloud.destroy( function(err, data) {
    if (err) console.log(prefix + chalk.red(err))
  })
}

function login(input) {
  var args = input._[0]
  var cloud = input._[1]
  var prefix = cmd(args.action)

  cloud.login(args.tag, args.id, args.keyfile, function(err, data) {
    if (err) console.log(prefix + chalk.red(err))
  })
}

function list(input) {
  var args = input._[0]
  var cloud = input._[1]
  var prefix = cmd(args.action)
  cloud.summarize(args. tag, function(err, data) {
    if (err) return console.log(prefix + chalk.red(err))
    data.forEach(function (instance) {
      console.log(prefix + chalk.blue(instance.id))
      console.log(prefix + tab + instance.group.replace(args.cluster + '-', ''))
      if (instance.state === 'running') {
        console.log(prefix + tab + chalk.green(instance.state))
      } else {
        console.log(prefix + tab + chalk.yellow(instance.state))
      }
    })
  })
}
