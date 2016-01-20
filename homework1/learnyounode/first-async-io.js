var fs = require('fs');
var file = process.argv[2];
fs.readFile(file, 'utf8', function(err, data){
	if (err){
		return console.error(err);
	}
	var lineCounter = data.toString().split('\n').length - 1;
	console.log(lineCounter);
});

//ALTERNATIVE
//function handleFile(err, data){
//	if (err){
//		return console.error(err);
//	}
//	var lineCounter = data.toString().split('\n').length - 1;
//	console.log(lineCounter);
//}

// fs.readFile(file, 'utf8', handleFile);
