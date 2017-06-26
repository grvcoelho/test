module.exports = {
  hello: hello,
  fizz: fizz
}

function hello (event, context, callback) {
  callback(null, {
    message: "Hello World by Deployer!"
  })
}

function fizz (event, context, callback) {
  callback(null, {
    message: "Fizz Buzz by Deployer!"
  })
}
