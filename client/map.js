Meteor.startup(function() {  
  	GoogleMaps.load();
});
Template.map.onCreated(function() {  
	GoogleMaps.ready('map', function(map) {
		// console.log("I'm ready!");
		// google.maps.event.addListener(map.instance, 'click', function(event) {
  //     		console.log(event.latLng.lat() + "  " + event.latLng.lng() );
  //   	});
    	var markers = {};
    	var code = '';
    	Tracker.autorun(function(){
    		var res = Session.get('venues');
    		if(!res)
    			return;
    		if(code == JSON.stringify(res))
    			return;
			code = JSON.stringify(res);   		
    		for(key in markers){
    			google.maps.event.clearListeners(markers[key], 'click');
    			markers[key].setMap(null);
    			delete markers[key];
    		}
	    	res.forEach(function(document){
				var marker = new google.maps.Marker({
					animation: google.maps.Animation.DROP,
					position: new google.maps.LatLng(document.lat, document.lng),
					map: map.instance,
					id: document.id
				});
				var content = '<h4>' + document.name + '</h4><br><b>Address: </b>'
					+ document.address + '<br><b>City: </b>'
					+ document.city;
				var infowindow = new google.maps.InfoWindow({
				    content: content
				});
				marker.addListener('click', function() {
				    infowindow.open(map.instance, marker);
				});
				markers[document.id] = marker;
	    	});
	    	
    	});
    	
	});
});