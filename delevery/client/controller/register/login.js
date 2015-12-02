Session.set("loginError","");
Template.login.events({
    'submit form': function(event,tpl){
		event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
		
        Meteor.loginWithPassword(email, password, function(error){
			if(error){
				console.log(error.reason);
				Session.set("loginError",error.reason);
			} else {
				Session.set("loginError","");
				 var loggedInUser = Meteor.user();
				 var group = 'mygroup';
				 if (Roles.userIsInRole(loggedInUser, ['admin'], group)) {
					Router.go('/admin');
					$('.close').click();
				}
				else if (Roles.userIsInRole(loggedInUser, ['member'], group)) {	
					Router.go('/profile');
						$('.close').click();
				}
				else{
					Router.go('/register');
					 $('.close').click();
				}
			}
		});
    }
	
});

// Template.nav.events({
	// 'click #poplogin': function(event){
    	// //alert("jjss");
    	// $("#squarespaceModal").modal({                    
			// "backdrop"  : "static",
			// "keyboard"  : true,
			// "show"      : true   // show the modal immediately                  
		// });
    // }
// });

Template.login.helpers({
	loginError:function(){
		var msg = Session.get("loginError");
		if( msg ) return true;
		else return false;
	},
	loginErrormsg: function(){
		return Session.get("loginError");
	}
});
