var request = require('request');
module.exports = {
  getDeps : function(githubUsername, projectName, branch) {

    var path = "/" + githubUsername.replace( /[^a-zA-Z0-9\-\_]/g, "") + "/" + projectName.replace( /[^a-zA-Z0-9\-\_]/g, "") + "/" + branch.replace( /[^a-zA-Z0-9\-\_]/g, "") + "/README.md"; //requires.json";

    request('https://raw.githubusercontent.com/' + path,

      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var deps = JSON.parse(body);
/*
          for (var key in deps) {
            if (deps.hasOwnProperty(key)) {
              console.log("Resolving Dependencies for Project '" + key + "' ...");
              for (var proj in deps[key]) {
                if (deps[key].hasOwnProperty(proj)) {
                  console.log("Project " .. proj .. " version " .. 
                }
              }
            }
          }
*/
        } else {
          console.log("HTTP error while talking to github: " + error);
        }
      }
    );
  }
};
