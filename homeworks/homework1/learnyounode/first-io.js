var fs = require('fs');
var content = fs.readFileSync(process.argv[2], 'utf8'); //read content
var lineCounter = content.toString().split('\n').length - 1; //split content by new line spaces
//ALTERNATIVE
// var lineCounter = content.toString().match(/\n/g).length); //counts the number of \ns
console.log(lineCounter);
