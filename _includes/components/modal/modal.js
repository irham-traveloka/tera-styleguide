var modalTrigger = $("#modalTrigger");
var modalContent = $("#modalContent").html();

modalTrigger.on('click', function () {
  var modal = new TeraModal(this, modalContent);
})