var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('request', { title: "All Requests" });
});

module.exports = router;