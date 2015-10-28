Meteor.startup(function() {  
  	GoogleMaps.load();
});
Template.map.onCreated(function() {  
	GoogleMaps.ready('map', function(map) {
		console.log("I'm ready!");
		google.maps.event.addListener(map.instance, 'click', function(event) {
      		console.log(event.latLng.lat() + "  " + event.latLng.lng() );
    	});
	});
});