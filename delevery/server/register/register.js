Meteor.methods({
	registerUser:function(firstname, lastname, email, username, password, facebook, instagram, twitter, rerole){
			targetUserId = Accounts.createUser({
				email: email,
				password: password,
				profile:{
					firstname:firstname,
					lastname:lastname,
					username:username,
					password:password,
					facebook:facebook,
					instagram:instagram,
					twitter:twitter
				}
			});
			console.log(targetUserId);
			//Roles.setUserRoles(id, roleid, 'noolab')
			Roles.setUserRoles(targetUserId, [rerole], 'mygroup')
		}
});
