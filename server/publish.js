Meteor.publish("tasks", function () {
	return Tasks.find({
		$or: [
			{ private: {$ne: true} },
			{ owner: this.userId }
		]
	});
});


Accounts.onCreateUser(function(options, user) {
	// console.log(user);
	user.profile = {};
	user.profile.email = user.services.google.email;
	user.profile.name = user.services.google.name;
	user.profile.picture = user.services.google.picture;
	return user;
});