var connect = require("connect");
var serveStatic = require("serve-static");

connect()
  .use(serveStatic(__dirname + "/build"))
  .listen(3100, () => console.log("Server running on 3100..."));
