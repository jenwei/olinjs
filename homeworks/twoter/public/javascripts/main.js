var $add = $("#twoteForm");
var $buttonDelete = $(".deleteTwote");

// json shortcuts for list populating
var $templateLi = $('#hidden-template-li');
var $twotesList = $('.twotes');
var $currentAuthor = $(".loggedInUser")

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

function deleteHandler(event){
  event.preventDefault();
  var twotteId = $(this).parent().attr("id");
  var authorOfDelTwotte = $(this).siblings()[1].children[0].getAttribute("value")
  debugger;
  if (authorOfDelTwotte === $currentAuthor[0].getAttribute("value")){
    $("#"+twotteId).remove()
    $.post("/deleteTwote", {"twotteToDelete":twotteId})
  }

}


$buttonDelete.click(deleteHandler);
