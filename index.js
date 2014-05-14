var tape = require('tape')

module.exports = pre_tape

function pre_tape(hooks, harness, target) {
  var on_exit = null
    , stream

  harness = harness || tape
  process.on('exit', function() {
    on_exit && on_exit()
  })

  return function() {
    var args = [].slice.call(arguments)
      , cb = args.pop()
      , context = {}
      , stream
      , test

    args.push(hooks.setup ? wrap(cb, context) : cb.bind(context))
    test = harness.apply(harness, args)

    Object.keys(hooks).forEach(function(name) {
      if(name === 'end' || name === 'teardown', name === 'setup') {
        return
      }

      test.on(name, hooks[name].bind(context, test))
    })

    test.on('prerun', function(t) {
      on_exit = teardown
    })

    test.on('end', function() {
      on_exit = null
      process.nextTick(teardown)
    })

    function teardown() {
      hooks.end && hooks.end.call(context, test)
      hooks.teardown && hooks.teardown.call(context, test)
    }
  }

  function wrap(test, context) {
    return function(t) {
      hooks.setup.call(context, t, test.bind(context, t))
    }
  }
}
