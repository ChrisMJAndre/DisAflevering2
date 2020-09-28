var http = require('http')
var seaport = require('seaport')
var sp = seaport.connect('localhost', 9090);


function findSum() { 
    let result = 0;
    for (var i = 0; i < 100000; i++){
        result = result + i; 
    }
    return result;
}
console.log(findSum());


var server = http.createServer(function (req, res){
    res.end(findSum(),9090);
    console.log("Server responded");
})


server.listen(sp.register("server"), () => {
    console.log("Server is listening")
}); 
