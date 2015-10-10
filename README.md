# clicloud

Utility for building composable CLIs for cloud deployments, using minimist, cliopts, subcommand. Meant to be used alongside the "cloud" family of modules for deployments, for examples see tinycloud and icecloud.

## usage

To setup a command line tool for a `cloud`, first parse your arguments, then pass them to `init` alongside the `cloud`.

```
var clicloud = require('clicloud')

var args = clicloud.parse(process.argv)
clicloud.init(args, cloud)
```

Here's a full example where we use `clicloud` to build a CLI for `tinycloud`

```
#! /usr/bin/env node

var clicloud = require('clicloud')
var tinycloud = require('./index.js')

var args = clicloud.parse(process.argv)

var groups = [
  {tag: 'master', count: 1},
  {tag: 'worker', count: args.count}
]

var cloud = new tinycloud(args, groups)

clicloud.init(args, cloud)
```

This is how the CLI for tinycloud is built, see its usage there.

## adding options

Options are formatted in the `cliclopts` style, and it's easy to extend `clicloud` with your own.

Just define `extra` with the desired option schema

```
var extra = {
  options: [
    {
      name: 'cooloption',
      abbr: 'o',
      help: 'This setting is awesome!'
    },
  ]
}
```

And then include `extra` when constructing `clicloud`.

You'll now be able to use this command in your CLI, e.g.

```
cloud launch --cooloption=yay
``

## adding actions

Adding actions is similarly easy, just add commands when defining `extra`:

```
var extra = {
  commands: [
    {
      name: 'sweetcommand',
      command: go
    }
  ]
}

function go(input) {
  console.log('these are my arguments ' + input._[0])
  console.log('this is my cloud ' + input._[1])
}
```

You'll now be able to use this command in your CLI, e.g.

```
cloud sweetcommand
``