// from filter-ls
var fs = require('fs');
var path = require('path');

module.exports = function(dir_name, ext_string, callback){
	// Same as filtered-ls
	fs.readdir(dir_name, function(err, list){
		// Check if error
		if (err){
			return callback(err);
		}
		// Otherwise go through list and filter out anything that doesn't have the right extname
		// TEST print original list: console.log(list);
		list = list.filter(function(file){
			if (path.extname(file) == ('.'+ext_string)){
				return file;
			}
		});
		// TEST print modified list: console.log(list);
		callback(null, list);
	});
}
