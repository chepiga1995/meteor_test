
Template.authorization.events({
  "click #in": function(){
    Meteor.loginWithGoogle({
      requestPermissions: ['email', 'profile']
    }, function (err) {
      if (err)
        Session.set('errorMessage', err.reason || 'Unknown error');
    });
  },
  "click #out": function(){
    Meteor.logout(function(err){
      if (err)
        Session.set('errorMessage', err.reason || 'Unknown error');
    })
  }
});

Template.history.events({
  'click .glyphicon-remove': function(event){
    var id = $(event.target).parent().parent().attr('id');
    Meteor.call('deleteQuery', id);
  }
});

Template.query.events({
  'submit #query': function(event,template){
    event.preventDefault();
    var alert = $('#query').find('.alert');
    var query = template.$('#venueQuery').val(),
        limit = template.$('#venueLimit').val(),
        radius = template.$('#venueRadius').val();
    if(!(query && limit && radius)){
      alert.show();
      return;    
    }
    alert.hide();
    var params = {
             ll:"35.684071537,139.75292899",
             query: query,
             limit: limit,
             radius: radius
        }; 
    Meteor.call('getVenues', params, function(err, res){
      if(err)
        return 0;
      
      Session.set('venues', res); 
    });
    Meteor.call('addQuery', query, radius, limit);
    template.$('#venueQuery').val('');
    template.$('#venueLimit').val('');
    template.$('#venueRadius').val('');
  }
});