var debug = require('debug')('routes');

module.exports = function(app) {
	var routes = require('require-dir')('./routes', {recurse: true});

	function useOrRecurse(routes, path) {
		if(typeof routes === 'object')
			Object.keys(routes).forEach(function(key) {
        if(key === 'index' && typeof routes[key] === 'function')
          useOrRecurse(routes[key], path + "/");
        else
          useOrRecurse(routes[key], path + "/" + key);
			});
		else {
      debug('using rout: ' + path);
			app.use(path, routes);
    }
	}

	useOrRecurse(routes, "");
};  