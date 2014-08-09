var express = require('express');
var router = express.Router();
var github = require('../github');

/* GET home page. */
router.get('/', function(req, res) {
  github.getDeps('philxyz', 'SeriousRP', 'master');
  res.render('index', { title: 'Express' });
});

module.exports = router;
