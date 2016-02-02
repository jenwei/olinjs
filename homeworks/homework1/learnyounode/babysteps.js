var args = process.argv.slice(2)
var sum = 0
for (var i = 0; i < args.length; i++){
	sum += Number(args[i])
}

//ALTERNATIVE SOLUTION
//var sum = args.reduce(function(acc, curr){ //acc = accum curr = current
//	return +acc + +curr;
//});

console.log(sum)
