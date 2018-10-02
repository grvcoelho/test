module.exports = {
  hello: hello,
  fizz: fizz,
  buzz: buzz,
  foo: foo,
  bar: bar
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

function foo (event, context, callback) {
  callback(null, {
    message: "Foo by Deployer!"
  })
}

function bar (event, context, callback) {
  callback(null, {
    message: "Bar by Deployer!"
  })
}
