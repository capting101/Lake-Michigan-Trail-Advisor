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
    //var textHeading = document.getElementById('compass');
    //textHeading.innerHTML = 'Magnetic Heading: ' + heading.magneticHeading;
    //var aPImage = document.getElementById('apfinderimage')
    //aPImage.css('-webkit-transform', 'rotate('+heading.magneticHeading+'deg)');
    updateCanvas(heading);
}

// onError: Failed to get the heading
//
function onErrorCompass(compassError) {
    alert('Compass error: ' + compassError.code);
}

function updateCanvas(heading) {
    var canvas = document.getElementById("compass");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var radius =  100;
    //draw two circles
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.arc(centerX, centerY, radius-10, 0, 2 * Math.PI, false);
    context.stroke();
    context.closePath();
    //draw center point
    context.beginPath();
    context.arc(centerX, centerY, 2, 0, 2 * Math.PI, false);
    context.fillStyle = "black";
    context.fill();
    context.closePath();
    //draw 4 lines at north, east, west and south
    var i = 4;
    context.strokeStyle = "black";
    context.lineWidth = 2;
    while(i > 0)
    {
        context.save();
        context.beginPath();
        context.translate(centerX, centerY);
        var angle = (i * 90) * Math.PI/180;
        context.rotate(angle);
        context.translate(0, -radius);
        context.moveTo(0, 0);
        context.lineTo(0, 10);
        context.stroke();
        context.closePath();
        context.restore();
        i --;
    }
    //write N, E, W and S for north, east, west and south
    context.font="20px Arial";
    context.fillText("N",centerX-7, 45);
    context.fillText("S",centerX-5, 190);
    context.fillText("E",180, centerY+5);                         
    context.fillText("W",23, centerY+8);
    context.rotate((360-heading.magneticHeading) * Math.PI/180);
    //draw line at required angle
    context.save();
    context.beginPath();
    context.strokeStyle = "red";
    context.translate(centerX, centerY);
    //context.rotate(-180 * Math.PI/180);
    
    context.lineWidth = 5;
    context.moveTo(0, 0);
    context.lineTo(0, radius-30);
    context.stroke();
    context.closePath();
    context.restore();
    
    }


    