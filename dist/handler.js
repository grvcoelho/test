const Credstash = require('nodecredstash')

process.env.STAGE = 'sandbox'

function hello (event, context, callback) {
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

module.exports = {
  hello: hello
}

