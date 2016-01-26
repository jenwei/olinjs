/*requires the http module that ships with Node.js and
makes it accessible through the variable http*/
var http = require("http");
var url = require ("url");

function start(route, handle) {
	function onRequest(request, response) { 
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log ("Request for " + pathname + " received.");

		request.setEncoding("utf8");

		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data chunk '" + postDataChunk + "'.");
		})

		request.addListener("end", function() {
			route(handle, pathname, response, postData);
		});
	}

	/*createServer takes in a function onRequest and returns 
	an object with method listen that takes a numeric value that indicates the port #*/
	http.createServer(onRequest).listen(8888);

	console.log("Server has started.");
}

exports.start = start;
