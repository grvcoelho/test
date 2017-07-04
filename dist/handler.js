const Credstash = require('nodecredstash')

const VERSION = 10

process.env.STAGE = 'sandbox'

module.exports = {
  migrate: migrate,
  hello: hello
}

function migrate (event, context, callback) {
  console.log('VERSION->', VERSION)

  return Promise.resolve()
    .then(getDatabasePassword)
    .then(x => {
      console.log('Success')
      console.log(x)
      callback(null, x)
    })
    .catch(x => {
      console.log('Error')
      console.log(x)
      callback(x)
    })
};

function getDatabasePassword () {
  const Credstash = require('nodecredstash')

  const credstash = Credstash({
    table: 'credential-store',
    awsOpts: { region: 'us-east-1' }
  })

  return credstash.getSecret({
    name: `${process.env.STAGE}/database/password`,
    version: 1,
    context: {}
  })
}

function hello (event, context, callback) {
  console.log('VERSION', VERSION)

  const credstash = new Credstash({
    table: 'credential-store',
    awsOpts: { region: 'us-east-1' }
  })

  console.log('before getSecret')

  credstash.getSecret({
    name: `${process.env.STAGE}/database/password`
  })
    .then((x) => {
      console.log('after getSecret', x)
      callback(null, x)
    })
    .catch((x) => {
      console.log('catch getSecret', x)
      callback(x)
    })
}
