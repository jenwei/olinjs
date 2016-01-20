var mod = require('./module');

var callback = function(err, data){
	if (err){
		return console.error(err);
	}
	data.forEach(function(file){
		console.log(file);
	});
}

mod(process.argv[2], process.argv[3], callback);
