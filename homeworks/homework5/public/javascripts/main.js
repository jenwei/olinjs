var $add = $("#addIngredient");
var $edit = $("#editIngedient");

var onSuccess = function(data, status) {
  var img = "<img src='"+data+"'/>";
  $("#result").html(img);
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$add.submit(function(event) {
  event.preventDefault();
  console.log('hi');
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
