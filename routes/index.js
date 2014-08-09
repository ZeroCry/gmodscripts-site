var express = require('express');
var router = express.Router();
var github = require('../github');

/* GET home page. */
router.get('/', function(req, res) {
  // Temporary (debug)
  github.getDeps('gmodcoders', 'gmodscripts-site', 'master');

  res.render('index', { title: 'Express' });
});

module.exports = router;
