// Importing some required modules and setting variables
var http = require("http");
var seaport = require("seaport");
var sp = seaport.connect("localhost", 9090);

// Function that finds the sum of 1 and all numbers below 100.000, using a simple for loop
function findSum() {
  let result = 0;
  for (var i = 0; i < 100000; i++) {
    result = result + i;
  }
  return result;
}
console.log(findSum());

// Varibale pings keeps track of the pings recieved, it does not know globally how many pings have been recieved, only locally on the individuall server
let pings = 0;
// Creating the server
var server = http.createServer(function (req, res) {
  pings++;
  // When the server recieves a respons, print the sums of the function and the port adress
  res.end(`Function Sum: ${findSum()} from port: ` + this.address().port);
  console.log("Server A responded to request " + pings);
});
// Statement that prints which port the server is listening to
server.listen(sp.register("server"), function () {
  console.log("Server A is listening on port: " + this.address().port);
});

//curl http://localhost:8080
