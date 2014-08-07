var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('moderation', { title: "Moderation Panel" });
});

module.exports = router;