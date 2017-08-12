var config={
  apiKey: "AIzaSyBnbrjNRxrwoL5m9KSzGuqKTgHLA5B_Z7U",
  authDomain: "trainfirebaseproject.firebaseapp.com",
  databaseURL: "https://trainfirebaseproject.firebaseio.com"
};

firebase.initializeApp(config);

var dataRef = firebase.database().ref();

var endLocation = "";
var startTime = "";
var intervalTrain = "";
var trainReturns = "";
var trainReturnsForm = "";
var minutesAway = "";
var convertedTime = "";
var currentTime = "";
var diffTime = "";
var timeRemainder = "";
var minutesReturn = "";
var keyHolder = "";
var getKey = "";


$(document).ready(function() {

     $("#add-train").on("click", function() {

     	name = $("#trainName").val().trim();
     	endLocation = $("#trainLocation").val().trim();
     	startTime = $("#startTime").val().trim();
     	intervalTrain = $("#intervalTrain").val().trim();
          convertedTime = moment(startTime, "hh:mm").subtract(1, "years");
          currentTime = moment();
          diffTime = moment().diff(moment(convertedTime), "minutes");
          timeRemainder = diffTime % intervalTrain;
          minutesReturn = intervalTrain - timeRemainder;
          trainReturns = moment().add(minutesReturn, "minutes");
          trainReturnsForm = moment(trainReturns).format("hh:mm");


     	keyHolder = dataRef.push({
     		name: name,
     		endLocation: endLocation,
     		startTime: startTime,
     		intervalTrain: intervalTrain,
        trainReturnsForm: trainReturnsForm,
        minutesReturn: minutesReturn
     	});

      $("#trainName").val("");
     	$("#trainLocation").val("");
     	$("#startTime").val("");
     	$("#intervalTrain").val("");


     });

     dataRef.on("child_added", function(childSnapshot) {


		$('.train-schedule').append("<tr class='table-row' id=" + "'" + childSnapshot.key + "'" + ">" +
               "<td>" + childSnapshot.val().name +
               "</td>" +
               "<td>" + childSnapshot.val().endLocation +
               "</td>" +
               "<td>" + childSnapshot.val().intervalTrain +
               "</td>" +
               "<td>" + childSnapshot.val().trainReturnsForm +
               "</td>" +
               "<td>" + childSnapshot.val().minutesReturn +
               "</td>" +
               "<td>" + "<input type='submit' value='remove train' class='remove-train btn btn-primary btn-sm'>" + "</td>" +
          "</tr>");

}, function(errorObject){

});

$("body").on("click", ".remove-train", function(){
     $(this).closest ("tr").remove();
     getKey = $(this).parent().parent().attr("id");
     dataRef.child(getKey).remove();
});

});
