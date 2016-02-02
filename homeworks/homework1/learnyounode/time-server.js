var net = require ('net');

function padFront(i){
	// Pad front with zeros if < 10
	if(i < 10){
		return '0'+i
	}
	return i
}

function currTime(){
	var date = new Date()
	var yr = date.getFullYear()  
    var mth = padFront(date.getMonth() + 1)      // starts at 0  
    var day = padFront(date.getDate())      // returns the day of month  
    var hr = padFront(date.getHours())  
    var min = padFront(date.getMinutes())  
    return yr+'-'+mth+'-'+day+' '+hr+':'+min // format: "YYYY-MM-DD hh:mm" "2013-07-06 17:42"  
}

var server = net.createServer(function(socket){
	// socket handling logic 
	socket.end(currTime() + '\n')
})
server.listen(Number(process.argv[2]));
