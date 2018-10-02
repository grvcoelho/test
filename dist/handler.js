module.exports = {
  hello: hello,
  fizz: fizz,
  buzz: buzz
}

function hello (event, context, callback) {
  callback(null, {
    message: "Hello World by Deployer!"
  })
}

function fizz (event, context, callback) {
  callback(null, {
    message: "Fizz by Deployer!"
  })
}

function buzz (event, context, callback) {
  callback(null, {
    message: "Buzz by Deployer!"
  })
}
