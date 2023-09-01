var currencies = null;
var reverse = {};
var values = null;

// SAVE TITLES
$.get('https://openexchangerates.org/api/currencies.json', function(data) {
   currencies = data;
   var headerList = ["<option>Select a Currency</option>"];

   $.each(currencies, function (short, long) {

      // MAKE LIST OF HEADERS FOR DROPDOWN
      headerList.push("<option>" + long + "</option>");

      // CREATE OBJECT IN REVERSE ORDER TO FETCH SHORTHAND TO PLACEHOLDER
      reverse[long] = short;
   });

   // CREATE NEEDED SELECT OPTIONS
   $("#select-to").html(headerList.join(""));
});

// SAVE EXCHANGE VALUES
$.get('https://openexchangerates.org/api/latest.json', {app_id: 'efde46f514f8464a9c4b88c307981b1e'}, function(data) {
   values = data;

   $("#footer").text("Latest rate release - " + timeConverter(data.timestamp));
});

$("input, select").on('keydown keyup change', function() {

   // SAVE CURRENT VALUES
   var selectTo = $("#select-to").val();
   var inputFrom = $("#input-from").val();
   var inputTo = $("#input-to").val();

   // SET NEW PLACEHOLDER
   if (selectTo != "Select a Currency") {
      var newPH = reverse[selectTo];
      $("#input-to").attr("placeholder", newPH);

      $("#input-from").prop('disabled', false);
      $("#input-to").prop('disabled', false);

      // PICK UP SOURCE ID
      var source = $(event.target).attr("id");

      // MODIFY INPUT VALUES BASED ON LAST CHANGE
      if (source == "input-to") {
         toValue = inputTo / values.rates[reverse[selectTo]];

         if (toValue > 0) {
            $("#input-from").val(toValue.toFixed(2));
         } else {
            $("#input-from").val("");
         }
      } else {
         toValue = inputFrom * values.rates[reverse[selectTo]];

         if (toValue > 0) {
            $("#input-to").val(toValue.toFixed(2));
         } else {
            $("#input-to").val("");
         }
      }

   } else {
      $("#input-to").attr("placeholder", "Select a Currency");

      $("#input-from").prop('disabled', true);
      $("#input-to").prop('disabled', true);
   }

});

function timeConverter(UNIX_timestamp){
   var a = new Date(UNIX_timestamp * 1000);
   var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
   var month = months[a.getMonth()];
   var date = a.getDate();
   var hour = a.getHours();
   var min = a.getMinutes();
   var time = date + '/' + month + ' @ ' + hour + ':' + min + '0';
   return time;
 }