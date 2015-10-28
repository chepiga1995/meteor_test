Template.body.events({
  "submit .new-task": function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var text = event.target.text.value;
    // console.log(event);
    // Insert a task into the collection
    Meteor.call("addTask", text);

    // Clear form
    event.target.text.value = "";
  },
  "change .hide-completed input": function (event) {
    Session.set("hideCompleted", event.target.checked);
  }
  
});

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

// Template.task.events({
//   "click .toggle-checked": function () {
//     // Set the checked property to the opposite of its current value
//     Meteor.call("setChecked", this._id, ! this.checked);
//   },
//   "click .delete": function () {
//     Meteor.call("deleteTask", this._id);
//   },
//   "click .toggle-private": function () {
//     Meteor.call("setPrivate", this._id, ! this.private);
//   }
// });


Template.query.events({
  'submit #query': function(event,template){
    event.preventDefault();

    var params = {
             ll:"35.684071537,139.75292899",
             query: template.$('#venueQuery').val(),
             limit: template.$('#venueLimit').val(),
             radius: template.$('#venueRadius').val()
        }; 
    Meteor.call('getVenues', params, function(err, res){
      if(err)
        return 0;
      // console.log(res);
      Session.set('venues', res);
      
      
    });
    template.$('#venueQuery').val('');
    template.$('#venueLimit').val('');
    template.$('#venueRadius').val('');
  }
});