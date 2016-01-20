var fs = require('fs');
var path = require('path');

fs.readdir(process.argv[2], function(err, list){
	// Check if error
	if (err){
		return console.error(err);
	}
	// Otherwise go through list and log all that have the right extname
	list.forEach(function(file){
		if (path.extname(file) == ('.'+process.argv[3])){
			console.log(file);
		}
	})
});

// ALTERNATIVE
//fs.readdir(process.argv[2], function(err, list){
	// Check if error
//	if (err){
//		return console.error(err);
//	}
// var regexTest = new RegExp('.+\.' + process.argv[3] + '$'); // Any character (at least one) appends to dot + argv[3] at end of line ($)
// data.filter (function(elem){
//	return regexTest.test(elem); // filter if matches RegExp
//}).
//	forEach(function(elem){ //checking filtered elements and printing them
//		console.log(elem);
//	});
//});