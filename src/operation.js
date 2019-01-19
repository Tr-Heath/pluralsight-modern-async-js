const delayms = 1;

function getCurrentCity(callback) {
  setTimeout(function () {

    const city = "New York, NY";
    //callback(new Error("test error"), city);
    callback(null, city);

  }, delayms)
}

function getWeather(city, callback) {
  setTimeout(function () {

    if (!city) {
      callback(new Error("City required to get weather"));
      return;
    }

    const weather = {
      temp: 50
    };

    callback(null, weather)

  }, delayms)
}

function getForecast(city, callback) {
  setTimeout(function () {

    if (!city) {
      callback(new Error("City required to get forecast"));
      return;
    }

    const fiveDay = {
      fiveDay: [60, 70, 80, 45, 50]
    };

    callback(null, fiveDay)

  }, delayms)
}



suite("operations");
//function for fetchCurrentCity
//it will call getCurrentCity and define callbacks to use both a success result and an error result.
function fetchCurrentCity() {
  let operation = {
    successReactions: [],
    errorReactions: []
  };
  getCurrentCity(function(error, result) {
    if(error) {
      //call all error reactions
      operation.errorReactions.forEach(r => r(error));
      return;
    }
    //call all success reactions
    operation.successReactions.forEach(s => s(result));
  });
  operation.setCallbacks = function setCallbacks(onSuccess, onError){
    //onSuccessArray
    operation.errorReactions.push(onError);
    operation.successReactions.push(onSuccess);
  };
  return operation;
}

test("fetchCurentCity function we can pass many callbacks -- all will be called", function(done) {
  let operation = fetchCurrentCity();
  //mocha will not let multiple calls of done()
  //So let's make a wrapper that counts how many times "done()" is called and then finally call the mocha done() when hit.
  const multiDone = callDone(done).afterNCalls(3);

  operation.setCallbacks(result => multiDone());
  operation.setCallbacks(otherThing => multiDone());
  operation.setCallbacks(finalThing => multiDone());
});

test("fetchCurentCity function will define callbacks for both error and success results", function(done) {
  let operation = fetchCurrentCity();
  operation.setCallbacks(result => done(), error => done(error));
});
