Meteor.methods({
	userUpdate: function(id,attr){
		Meteor.users.update({_id:id},{$set: attr});
	}
});