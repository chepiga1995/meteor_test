Meteor.methods({
  addTask: function (text) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
 
    Tasks.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deleteTask: function (taskId) {
    var task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error("not-authorized");
    }
 
    Tasks.remove(taskId);
  },
  setChecked: function (taskId, setChecked) {
    var task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error("not-authorized");
    }
 
    Tasks.update(taskId, { $set: { checked: setChecked} });
  },
  setPrivate: function (taskId, setToPrivate) {
    var task = Tasks.findOne(taskId);
 
    // Make sure only the task owner can make a task private
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
 
    Tasks.update(taskId, { $set: { private: setToPrivate } });
  },
  getVenues: function(params){
    params.client_id = 'L15V5MYOVTICAECM5VAJRYZ3X151JL0ON0OYHQW2PUIT5H44';
    params.client_secret = 'FDU4KSNJOKNP040O0YCZM5FTTVQWQ5UPXRFAX45I2VMVI1ZR';
    params.v = 20151022;
    var wrap = Meteor.wrapAsync(function(params, callback){
      HTTP.call('GET', 'https://api.foursquare.com/v2/venues/search',{params: params}, function(err, res){
        if(err){
          return callback(err);
        } else{
          return callback(null, res.data.response.venues);
        }
      });
    });
    return wrap(params);
  }
});