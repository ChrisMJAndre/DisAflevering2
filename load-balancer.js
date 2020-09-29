var http = require('http')
var httpProxy = require('http-proxy')
var seaport = require('seaport')
var sp = seaport.connect('localhost', 9090);



// Reference til step 4
var i = - 1

var proxy = httpProxy.createProxyServer({});

var server = http.createServer(function (req, res){
    var addresses = sp.query();
    if (addresses.length == 0) {
        res.end("No Servers Available");
    }
    // Reference til step 4
    i = (i + 1) % addresses.length;
    var host = addresses[i].host.split(":").reverse()[0];
    var port = addresses[i].port;
    proxy.web(req, res, { target: 'http://' + host + ':' + port });	
});

server.listen(8080, "localhost");