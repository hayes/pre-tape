pre-tape
========

setup and teardown hooks for tape

```javascript
var setup = require('pretape')

var test = setup({
    setup: setup
  , teardown: teardown
  , // any events emited on the test such as prerun, run, test, etc
  , prerun: prerun
})

function setup(t, done) {
  var self = this
  
  setTimeout(function() {
    self.val = 5
  })
}

function prerun(t) {
  // do some pre run stuff
}

function teardown(t) {
  delete this.val
}

test('val is 5', function(t) {
  t.equal(this.val, 5)
  t.end()
})
```
