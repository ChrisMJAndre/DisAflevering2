var http = require('http');
var seaport = require('seaport');
var sp = seaport.connect('localhost', 9090);


function findSum() { 
    let result = 0;
    for (var i = 0; i < 100000; i++){
        result = result + i; 
    }
    return result;
}
console.log(findSum());

let pings = 0;
var server = http.createServer(function (req, res){
    pings++
    res.end(`Function Sum: ${findSum()} from port: ` + this.address().port);
    console.log("Server A responded to request " + pings);
});


server.listen(sp.register("server"), function()  {
    console.log("Server A is listening on port: " + this.address().port)
}); 


//curl http://localhost:8080
