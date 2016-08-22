var stickyMessageSuccessTrigger = $("#stickyMessageSuccessTrigger");
var stickyMessageSuccessContent = "This is success message.";

stickyMessageSuccessTrigger.on('click', function () {
  var stickyMessageSuccess = new TeraStickyMessage(stickyMessageSuccessContent, {theme: 'is-success'});
})