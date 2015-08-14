if (geoPosition.init()) {
  geoPosition.getCurrentPosition(geoSuccess, geoError);
}

function geoSuccess(p) {
  alert("Found you at latitude " + p.coords.latitude +
        ", longitude " + p.coords.longitude);
}
 
function geoError() {
  alert("Could not find you!");
}

function lookup_location() {
  geoPosition.getCurrentPosition(show_map, show_map_error);
}

function show_map(loc) {
  $("#geo-wrapper").css({'width':'320px','height':'350px'});
  var map = new GMap2(document.getElementById("geo-wrapper"));
  var center = new GLatLng(loc.coords.latitude, loc.coords.longitude);
  map.setCenter(center, 14);
  map.addControl(new GSmallMapControl());
  map.addControl(new GMapTypeControl());
  map.addOverlay(new GMarker(center, {draggable: false, title: "You are here (more or less)"}));
}
function show_map_error() {
  $("#live-geolocation").html('Unable to determine your location.');
}