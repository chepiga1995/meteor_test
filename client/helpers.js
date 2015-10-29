QueryHistory = new Mongo.Collection('history');

Template.history.helpers({
  history: function(){
    return QueryHistory.find();
  }
});
Template.map.helpers({  
  mapOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(35.68407153797412, 139.75292899820488),
        zoom: 11
      };
    }
  }
});
Template.venues.helpers({
  venues: function(){
    return Session.get('venues');
  }
});

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('MMMM Do YYYY, h:mm:ss a');
});
Template.registerHelper('plusOne', function(num) {
  return num + 1;
});
Template.registerHelper('setPrecision', function(num) {
  return num.toFixed(7);
});