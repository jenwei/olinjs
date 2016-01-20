var http = require('http')
var url = require ('url')

function parseTime (time){
	return{
		hour: time.getHours(),
		minute: time.getMinutes(),
		second: time.getSeconds()
	}
}

function parseUNIX (time){
	return{
		unixtime: time.getTime()
	}
}

var server = http.createServer(function (req, res){
	var parsedUrl = url.parse(req.url, true)
	var time = new Date(parsedUrl.query.iso)
	var pathname = parsedUrl.pathname
	var result = ''
	// Example request: /api/parsetime?iso=2013-08-10T12:10:15.474Z  
	if(pathname == '/api/parsetime'){
		result = parseTime(time)
	} else if (pathname == '/api/unixtime'){
		result = parseUNIX(time)
	}

	if (result){
		res.writeHead(200, { 'Content-Type': 'application/json' }) // because the hints said so
		res.end(JSON.stringify(result))
	} else{
		res.writeHead(404) 
		res.end()
	}


})
server.listen(Number(process.argv[2]))

// SOLUTION
// var server = http.createServer(function (req, res){
// 	var parsedUrl = url.parse(req.url, true)
// 	var time = new Date(parsedUrl.query.iso)
// 	var result = ''
// 	// Example request: /api/parsetime?iso=2013-08-10T12:10:15.474Z  
// 	if(req.url.contains()){
// 		result = parseTime(time)
// 	} else if (/^\/api\/unixtime/.test(req.url)){
// 		result = parseUNIX(time)
// 	}
// })
// server.listen(Number(process.argv[2]))
