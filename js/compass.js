// ------------------------------------------------------------------------------------------------------ 
// Compass
// ------------------------------------------------------------------------------------------------------

// The watch id references the current `watchHeading`
var watchIDAccelerometer = null;

// Start watching the compass
//
function startWatchCompass() {

    // Update compass every 100ms
    var options = { frequency: 100 };

    watchIDCompass = navigator.compass.watchHeading(onSuccessCompass, onErrorCompass, options);
}

// Stop watching the compass
//
function stopWatchCompass() {
    if (watchIDCompass) {
        navigator.compass.clearWatch(watchIDCompass);
        watchIDCompass = null;
    }
}

// onSuccess: Get the current heading
//
function onSuccessCompass(heading) {
    var textHeading = document.getElementById('compass');
    textHeading.innerHTML = 'Heading: ' + heading.magneticHeading;
    var aPImage = document.getElementById('APFinderImage');
    aPImage.WebkitTransform = "rotate("+heading+"deg)";
}

// onError: Failed to get the heading
//
function onErrorCompass(compassError) {
    alert('Compass error: ' + compassError.code);
}


    