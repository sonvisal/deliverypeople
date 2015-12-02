Meteor.methods({
	updateprofile: function(id,attr){
		Meteor.users.update({_id:id},{$set: attr});
	}
});