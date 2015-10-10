# clicloud

Utility for building composable CLIs for cloud deployments, using minimist, cliopts, subcommand. Meant to be used alongside the "cloud" family of modules for deployments, for examples see tinycloud and icecloud.

## install

Add to your project with npm

```
npm install clicloud --save
```

## usage

To setup a command line tool for a `cloud`, first parse your arguments, then pass them to `init` alongside the `cloud`.

```
var clicloud = require('clicloud')

var cli = new clicloud()

var args = cli.parse(process.argv)
cli.init(args, cloud)
```

Here's a full example where we use `clicloud` to build a CLI for `tinycloud`

```
#! /usr/bin/env node

var clicloud = require('clicloud')
var tinycloud = require('tinycloud')

var cli = new clicloud()

var args = cli.parse(process.argv)

var groups = [
  {tag: 'master', count: 1},
  {tag: 'worker', count: args.count}
]

var cloud = new tinycloud(args, groups)

cli.init(args, cloud)
```

See tinycloud and its CLI for more examples of the resulting functionality.

## adding options

Options are formatted in the `cliclopts` style, and it's easy to extend `clicloud` with your own.

Just define `extra` with the desired options

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

```
var cli = clicloud(extra)
```

You'll now be able to use this command in your CLI, e.g.

```
cloud launch --cooloption=yay
```

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

And again include when constructing

```
var cli = clicloud(extra)
```

You'll now be able to use this command in your CLI, e.g.

```
cloud sweetcommand
```

When writing functions for you commands, `input._` will be an array with whatever you passed to `cli.init(args, cloud)`, where typically `args`  is the result of calling `cli.parse` and `cloud` is the result of calling `new tinycloud`.