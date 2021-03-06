// Importing some required modules and setting variables
var http = require("http");
var httpProxy = require("http-proxy");
var seaport = require("seaport");
var sp = seaport.connect("localhost", 9090);

// Reference to step 4
var i = -1;

var proxy = httpProxy.createProxyServer({});
// Creating the server
var server = http.createServer(function (req, res) {
  // Creating variable containing all of the servers
  var addresses = sp.query();
  // If statement that checks if any servers are started
  if (addresses.length == 0) {
    res.end("No Servers Available");
  }
  // Some fancy code that checks the value of i and alternates the forwarding to a server (ROUND ROBIN)
  // Depending on the rest of (the amount of servers) and the value of i, this code will send the request to a different server 
  i = (i + 1) % addresses.length;
  var host = addresses[i].host.split(":").reverse()[0];
  var port = addresses[i].port;
  proxy.web(req, res, { target: "http://" + host + ":" + port });
});
// Server listening on port and IP (in this case localhost)
server.listen(8080, "localhost");
