var http = require('http');

var outputs = []

var finished_requests = 0

function all_requests_complete_yet(){
	finished_requests++
	if (finished_requests !== outputs.length){
		return
	}
	outputs.forEach(function(output){
		console.log(output)
	})
}

process.argv.slice(2).forEach(function(url, index){
	http.get(url, function(response){
		outputs[index] = ""
		response.on('data', function(data){
			outputs[index] += data
		})
		response.on('end', all_requests_complete_yet)
	})
})

// OFFICIAL SOLUTION
// var http = require('http')  
//  var bl = require('bl')  
//  var results = []  
//  var count = 0  
   
//  function printResults () {  
//    for (var i = 0; i < 3; i++)  
//      console.log(results[i])  
//  }  
   
//  function httpGet (index) {  
//    http.get(process.argv[2 + index], function (response) {  
//      response.pipe(bl(function (err, data) {  
//        if (err)  
//          return console.error(err)  
   
//        results[index] = data.toString()  
//        count++  
   
//        if (count == 3)  
//          printResults()  
//      }))  
//    })  
//  }  
   
//  for (var i = 0; i < 3; i++)  
//    httpGet(i)  
