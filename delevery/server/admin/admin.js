Meteor.methods({
	adduser:function(firstname, lastname, email, username, password, rerole){
		targetUserId = Accounts.createUser({
			email: email,
			password: password,
			profile:{
				firstname:firstname,
				lastname:lastname,
				username:username,
				password:password,
			}
		});
		console.log(targetUserId);
		//Roles.setUserRoles(id, roleid, 'noolab')
		Roles.setUserRoles(targetUserId, [rerole], 'mygroup')
	},
	deleteAdmin: function(id) {
		Meteor.users.remove(id);
	},
	updateuser: function(id,attr){
		Meteor.users.update({_id:id},{$set: attr});
	},
	updateroles:function(id,attrroles){
        Meteor.users.update(id,{$set:{roles:attrroles}});
    }
});