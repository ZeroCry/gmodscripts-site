/*  All extra routing goes below this comment, example:

	app.get("/test", function (req, res) {
		res.send('test');
	});
*/

// Routing
module.exports = function(app) {
	var requireDir = require('require-dir');
	var routes = requireDir('./routes', {recurse: true});

	// Include index page
	app.use("/", routes['index']);

	// Recurse through routes and include them
	function useOrRecurse(routes, path) {
		if(typeof routes === 'object')
			Object.keys(routes).forEach(function(key) {
				useOrRecurse(routes[key], path + key + '/');
			});
		else
			app.use(path, routes);
	}

	// If you replace the / below with for example /pages/, all pages will be under /pages/
	useOrRecurse(routes, "/");
}