function getTrainData(cb) {
    localforage.getItem("trainData").then(function(results) {
    cb(results || []);
    });
}
function setTrainData(newTrains, cb) {
    localforage.setItem("trainData", newTrains).then(function() {
    cb();
    });
}
function displayTrains() {
    getTrainData(function(recentTrains) {
    const mostRecentTrains = document.getElementById("train-table");
    mostRecentTrains.innerHTML = "";
    for (let i = 0; i < recentTrains.length; i++) {
        const train = recentTrains[i];
        const tr = document.createElement("tr");
        tr.innerHTML = "<td>" + train.name + "</td>" + "<td>" + train.destination + "</td>" + "<td>" + train.frequency + "</td>" + "<td>" + train.firstTrain + "</td>" + "<td>" + train.minutesAway + "</td>"
        mostRecentTrains.append(tr);
    }
    });
}
document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault();
    const trainName = document.getElementById("name").value.trim();
    const destination = document.getElementById("destination").value.trim();
    const firstTrain = document.getElementById("firstTrain").value.trim();
    const frequency = document.getElementById("frequency").value.trim();

    handleNewTrain({ name:trainName , destination: destination, firstTrain: firstTrain, frequency: frequency })});
displayTrains();
function handleNewTrain(newTrain) {
    getTrainData(function(recentTrain) {
    recentTrain.unshift(newTrain);
    
    setTrainData(recentTrain, displayTrains);
    });
}

//document.getElementById("submit").addEventListener("click", function (event) {
   // event.preventDefault();
   // const trainName = document.getElementById("name").value.trim();
   // const destination = document.getElementById("destination").value.trim();
   // const firstTrain = document.getElementById("firstTrain").value.trim();
   // const frequency = document.getElementById("frequency").value.trim();

  //  handleNewTrain({ name:trainName , destination: destination, firstTrain: firstTrain, frequency: frequency })});
///