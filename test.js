var pretape = require('./index')
  , tape = require('tape')
  , step = 1

var test = pretape({
    setup: setup
  , teardown: teardown
  , prerun: prerun
  , run: run
})

test('that it works', function(t) {
  t.equal(step++, 3)
  t.equal(this.val, 8)
  setTimeout(function() {
    t.equal(step++, 5)
    t.end()
  }, 10)
})

function setup(t, done) {
  this.val = 8
  t.equal(step++, 2)
  done()
}

function prerun(t) {
  t.equal(step++, 1)
}

function run(t) {
  t.equal(step++, 4)
  t.equal(this.val, 8)
}

function teardown(t) {
  t.equal(step++, 6)
  t.equal(this.val, 8)
}
