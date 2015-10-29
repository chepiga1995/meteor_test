Meteor.publish("history", function () {
	return QueryHistory.find({owner: this.userId });
});


Accounts.onCreateUser(function(options, user) {
	user.profile = {};
	user.profile.email = user.services.google.email;
	user.profile.name = user.services.google.name;
	user.profile.picture = user.services.google.picture;
	return user;
});