// Dependencies
var path = require("path");

// Routes
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/home", function(req, res) {
    res.sendFile(path.join(__dirname, "../layouts/home.html"));
  });

  
  app.get("/giver", function(req, res) {
    res.sendFile(path.join(__dirname, "../layouts/giver.html"));
  });

  
  app.get("/receiver", function(req, res) {
    res.sendFile(path.join(__dirname, "../layouts/receiver.html"));
  });


};