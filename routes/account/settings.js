var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('settings', { title: "Account Settings" });
});

module.exports = router;