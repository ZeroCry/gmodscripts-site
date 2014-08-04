var express = require('express');
var spawn = require('child_process').spawn;
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  var child = spawn('git', ['pull']);
  child.on('exit', function(code) {
    res.send('git pulled, restarting now.');
    process.exit(1);
  });
});

module.exports = router;
