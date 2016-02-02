var fs = require('fs')
var http = require('http')

var server = http.createServer(function (req, res){
	// request handling logic
	fs.createReadStream(process.argv[3]).pipe(res); // Appends the text to the res
});

server.listen(Number(process.argv[2]));
