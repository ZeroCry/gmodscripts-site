var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('myscripts', { title: "My Scripts" });
});

module.exports = router;