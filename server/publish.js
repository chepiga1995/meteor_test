Meteor.publish("tasks", function () {
	return Tasks.find({
		$or: [
			{ private: {$ne: true} },
			{ owner: this.userId }
		]
	});
});
ServiceConfiguration.configurations.remove({
	service: "google"
});
ServiceConfiguration.configurations.insert({
	service: "google",
	clientId: "951038589102-u70dg1v3cpfncj55040agqa85kj3h08i.apps.googleusercontent.com",
	secret: "llf4kxeRXvaE3Mkdx8eHjjV1"
});
Accounts.onCreateUser(function(options, user) {
	console.log(user);
	user.profile = {};
	user.profile.email = user.services.google.email;
	user.profile.name = user.services.google.name;
	user.profile.picture = user.services.google.picture;
	return user;
});