module.exports = {
  hello: hello,
  fizz: fizz
}

function hello (event, context, callback) {
  callback(null, {
    message: "Hello World!"
  }
}

function fizz (event, context, callback) {
  callback(null, {
    message: "Fizz Buzz!"
  }
}
