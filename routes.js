// Extra routes go below this line (for example all app.get's)

// Routing
module.exports = function(app) {
	var requireDir = require('require-dir');
	var routes = requireDir('./routes', {recurse: true});
	//console.log(routes);

	// Include index page
	app.use("/", routes['index']);

	// Recurse through routes and include them
	function addRoute(routes, path) {
		for(route in routes) {
			if(typeof routes[route] === 'function') {
				app.use(path + route, routes[route]);
			} else {
				addRoute(routes[route], path + route + '/');
			}
		}
	}

	addRoute(routes, "/");
}