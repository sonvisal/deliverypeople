Meteor.methods({
	registerUser:function(firstname, lastname, email, username, password,rerole){
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
		}
});
