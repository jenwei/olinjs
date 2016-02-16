var $add = $("#addIngredient");
var $edit = $("#editIngredient");

var onSuccess = function(data, status) {
  console.log('succeeded!');
  console.log(data);
  var newIngred = "<p>"+data.name+"-"+data.price+"</p>";
  $("#ingredients").prepend(newIngred);
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$add.submit(function(event) {
  event.preventDefault();
  var name = $add.find("[name='name']").val();
  var price = $add.find("[name='price']").val();
  $.post("addIngredient", {
    name: name,
    price: price,
    inStock: true
  })
    .done(onSuccess)
    .error(onError)
});
