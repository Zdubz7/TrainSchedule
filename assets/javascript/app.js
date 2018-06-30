
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBpLXyPumeOZ6OwHfSeR8k5xSvCNlbSi9Q",
    authDomain: "trainschedule-30b5c.firebaseapp.com",
    databaseURL: "https://trainschedule-30b5c.firebaseio.com",
    projectId: "trainschedule-30b5c",
    storageBucket: "trainschedule-30b5c.appspot.com",
    messagingSenderId: "459778065137"
  };
  firebase.initializeApp(config);

  //get reference to database service
  var trainData = firebase.database();

  // In this section jquery conencts to firebase, everytime addTrainBtn is clicked its storing all of the inputs.
  $("#addTrainBtn").on("click", function(event){
      // This prevents default behavior which the results are displayed in the back end.
     event.preventDefault();

      // This variable grabs the user input for the train name
      var trainName = $("#trainNameInput").val().trim();
    // This variable grabs the user input for the destination.
      var destination = $("#destinationInput").val().trim();

      // This turns our first train input into a user variable, which is stored and displayed. It also aligns the input data into a hroizontal line.
      var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
      var frequency = $("#frequencyInput").val().trim();

      // This logs the Train name to the console.
      console.log(trainName);

      // This logs the destination to the console.
      console.log(destination);

      // This logs the First Train input to the console and displays it.
      console.log(firstTrain);

      // This logs the frequency of the train.
      console.log(frequency);
      
      //return false;

      // This temporarily holds all of the train data before the submit button is clicked for the data to be logged.
      var newTrain = {
          name: trainName,
          dest: destination,
          firstTime: firstTrain,
          freq: frequency,
      };
      // This is referencing firebase to push the data from the input fields to log it in the database.
      trainData.ref().push(newTrain);

        console.log(trainName.name);
        console.log(destination.dest);
        console.log(firstTrain.firstTime);
        console.log(frequency.freq);

    // This clears all of the text boxes after the submit button is clicked.
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

  });

 
// This is firebases initial loader
  trainData.ref().on("child_added",function(snapshot){
      var trainName=snapshot.val().name;
      var destination=snapshot.val().dest;
      var frequency=snapshot.val().freq;
      var firstTrain=snapshot.val().firstTime;

      console.log(name, destination, frequency, firstTrain);
      console.log(snapshot.val());
      // This gives the actual value to the function.
 
      var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
      var minutes = frequency - remainder;
      var arrival = moment().add(minutes,"m").format("hh:mm A");

      console.log(remainder);
      console.log(minutes);
      console.log(arrival);


      $("#trainTable > tBody").append("<tr><td>"+trainName+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");


  });

  