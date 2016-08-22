var stickyMessageErrorTrigger = $("#stickyMessageErrorTrigger");
var stickyMessageErrorContent = "This is error message.";

stickyMessageErrorTrigger.on('click', function () {
  var stickyMessageError = new TeraStickyMessage(stickyMessageErrorContent, {theme: 'is-error'});
})