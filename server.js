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
    res.end(`Sum: ${findSum()} from port: 9090`);
    console.log("Server responded to request " + pings);
});


server.listen(sp.register("server"), function()  {
    console.log("Server is listening" + this.address().port)
}); 


//curl http://localhost:8080
