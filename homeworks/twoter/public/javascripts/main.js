var $add = $("#twotForm");
var $del = $("#deleteTwote");

var onSuccess = function(data, status) {
  console.log('succeeded!');
  console.log(data);
  var newTwote = "<p>"+data.message+"-"+data.user+"</p>";
  $("#twotes").prepend(newTwote);
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$add.submit(function(event) {
  event.preventDefault();
  var name = $add.find("[name='user']").val();
  var message = $add.find("[name='message']").val();
  $.post("addTwote", {
    user: name,
    message: message
  })
    .done(onSuccess)
    .error(onError)
    return;
});