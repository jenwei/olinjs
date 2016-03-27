var $add = $("#twoteForm");
var $del = $(".deleteTwote");

// json shortcuts for list populating
var $templateLi = $('#hidden-template-li');
var $twotesList = $('.twotes');

// more shortcuts
var $currUser = $(".loggedInUser");

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
  $newLi.find('.user').html(" - " + user);

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

// Credit to Filippos (@flymperopoulos) for helping me with the delete
function deleteHandler(event) {
  event.preventDefault();
  var twoteID = $(this).parent().attr("id");
  var twoterOfDelTwote = $(this).siblings()[1].getAttribute("value"); // Somewhat sketchy approach :/
  if (twoterOfDelTwote === $currUser.attr("value")) {
    $('#'+twoteID).remove()
    $.post("/deleteTwote", {"twoteToDelete": twoteID})
  }
}

// On button click call the handler to delete the Twote
$del.click(deleteHandler);
