var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('account', { title: "My Account" });
});

module.exports = router;