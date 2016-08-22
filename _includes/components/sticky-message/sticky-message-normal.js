var stickyMessageNormalTrigger = $("#stickyMessageNormalTrigger");
var stickyMessageNormalContent = "This is neutral message.";

stickyMessageNormalTrigger.on('click', function () {
  var stickyMessageNormal = new TeraStickyMessage(stickyMessageNormalContent);
})