
//Initialize function
var init = function () {

    console.log("init() called");
    
    // Wait for Cordova to connect with the device
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // init all panels (needed for menu panels, they must be initialized manually)
    $(function () {
        $("[data-role=panel]").panel().enhanceWithin();
    });
    // initialize pages when they are displayed
    $('#pageCompass').on('pagebeforeshow', function(event) {
        alert('Compass started');
        startWatchCompass();
        
    });
    
    // ------------------------------------------------------------------------------------------------------
    // Exit the application via back button event. Note: this works on android, not on ios. Apple doesn't allow exit 
    // ------------------------------------------------------------------------------------------------------
    document.addEventListener("exitButton", function() {
        exitApp(); };
    
$(document).ready(init);
    
function onDeviceReady() {
    alert('Device Ready');
}