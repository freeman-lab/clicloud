module.exports = [
  {
    name: 'help',
    abbr: 'h',
    help: 'Show help',
    boolean: true
  },
  {
    name: 'key',
    abbr: 'k',
    help: 'Name of key pair'
  },
  {
    name: 'keyfile',
    abbr: 'i',
    help: 'Location of key pair .pem file'
  },
  {
    name: 'exec',
    abbr: 'e',
    help: 'Executable command or file'
  },
  {
    name: 'dry',
    abbr: 'd',
    boolean: true,
    default: false,
    help: 'Whether to execute a dry run'
  },
  {
    name: 'count',
    abbr: 'n',
    default: 1,
    help: 'Number of workers'
  },
  {
    name: 'type',
    abbr: 't',
    default: 'm3.medium',
    help: 'Type of instance'
  },
  {
    name: 'size',
    abbr: 's',
    default: '8',
    help: 'Size of root volume in GBs'
  },
  {
  	name: 'image',
  	abbr: 'm',
  	default: 'ami-d05e75b8',
  	help: 'Image type to use'
  },
  {
    name: 'ports',
    abbr: 'p',
    default: [22, 80],
    help: 'Ports to open'
  }
]