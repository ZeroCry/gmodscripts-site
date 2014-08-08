/*  All extra routing goes below this comment, example:

	app.get("/test", function (req, res) {
		res.send('test');
	});
*/

// Routing
module.exports = function(app) {
	var requireDir = require('require-dir');
	var routes = requireDir('./routes', {recurse: true});

	// Recurse through routes and include them
	function useOrRecurse(routes, path) {
		if(typeof routes === 'object') {
			Object.keys(routes).forEach(function(key) {
				useOrRecurse(routes[key], path + '/' + key);
			});
		} else {
			// "index.js" will be treated as directory index
			// A directory containing "index.js" may not also contain a subdirectory called "index", and the other way around
			if(path.substr(-5) === 'index') {
				app.use(path.substr(0, path.length - 5), routes);
			} else {
				app.use(path, routes);
			}
			
		}
	}

	// If you replace the "" below with for example "/pages", ALL pages will be under /pages
	useOrRecurse(routes, "");
}