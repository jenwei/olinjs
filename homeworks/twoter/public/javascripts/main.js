var $add = $("#twoteForm");
var $del = $(".deleteTwote");

// json shortcuts for list populating
var $templateLi = $('#hidden-template-li');
var $twotesList = $('.twotes');

var onSuccess = function(data, status) {
  console.log('succeeded!');
  console.log(data);

  // Get info from form
  var user = data.user;
  var message = data.message;

  // Fill in the template li with the information from the form
  var $newLi = $templateLi.clone();
  $newLi.removeAttr('id');
  $newLi.find('.message').html(message);
  $newLi.find('.user').html(user);

  // Insert the modified template into the page
  $twotesList.prepend($newLi);

  // Clear the form fields
  $add.find("[name='message']").val("");
  $add.find("[name='user']").val("");
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$add.submit(function(event) {                          
  event.preventDefault();

  $.post("addTwote", {
    // QUESTION: this doesn't exist? user: $add.find("[name='user']").val(),
    message: $add.find("[name='message']").val(),
    })
    .done(onSuccess)
    .error(onError)
    return;
});

$del.submit(function(event) {
  event.preventDefault();
  debugger;
  var twotteId = $(this).parent.attr("id");
  $("#"+twotteId).remove()
});