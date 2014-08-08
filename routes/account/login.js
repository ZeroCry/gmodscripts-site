var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('login', { title: "Login", user: req.user });
});

module.exports = router;