$(document).ready(function() {
  // listen for save button clicks

  $(".saveBtn").on("click", function() {
    // get nearby values
    var value = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");

    // console.log('value:', value);
    // console.log('time:', time);

    // save the value in localStorage as time
    localStorage.setItem(time, value)
  });

  function hourUpdater() {
    // get current number of hours
    var currentHour = moment().hours();
    // console.log('current hour:', currentHour);

    // loop over time blocks
    $(".time-block").each(function() {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      // console.log("block hour:", blockHour);

      // if statements the check the time of the app and sets the classes for styling
      if (blockHour < currentHour) {
        $(this).attr("class", "row time-block past");
      } else if (blockHour <= currentHour) {
        $(this).attr("class", "row time-block present")
      } else {
        $(this).attr("class", " row time-block future")
      };
    });
  }

  // function that sets the text of the textarea to the saved text from the storage
  function loadData() {
    $(".time-block").each(function() {
      var id = $(this).attr("id");
      var text = $(this).children(".description")

      text.text(localStorage.getItem(id));
    });
  };

  // run functions at the start of the app, these are updated every 15 seconds
  hourUpdater();
  loadData();

  // interval to check time every 15 seconds and reloads the local storage
  setInterval(function() {hourUpdater(); loadData();}, 15000)

  // display current day on page
  $("#currentDay").text(moment().format("dddd, MMMM Do"));
});
