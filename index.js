var tape = require('tape')

module.exports = pre_tape

function pre_tape(hooks, harness) {
  return function() {
    var args = [].slice.call(arguments)
      , cb = args.pop()
      , context = {}
      , test

    args.push(hooks.setup ? wrap(cb) : cb.bind(context))
    test = (harness || tape).apply(tape, args)

    Object.keys(hooks).forEach(function(name) {
      if(name === 'setup') {
        return
      }

      test.on(name === 'teardown' ? 'end' : name, hooks[name].bind(context, t))
    })
  }

  function wrap(test, context) {
    return function(t) {
      hooks.setup.call(context, t, test.bind(context, t))
    }
  }
}
