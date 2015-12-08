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
				Session.set("registerError","");
				 var loggedInUser = Meteor.user();
				 var group = 'mygroup';

				var currentRouter1 = Session.get('content');
				var currentRouter2 = Session.get('profile');
				var currentRouter3 = Session.get('addUser');
				var currentRouter4 = Session.get('content');
				console.log("Content ID:"+currentRouter1);
				console.log("Content ID:"+currentRouter2);
				if( currentRouter1 == 1){
					Router.go('/content');
				}
				else if( currentRouter2 == 2){
					Router.go('/profile');
				}
				else if (Roles.userIsInRole(loggedInUser, ['admin'], group)) {
					Router.go('/admin');
					$('.close').click();
				}
				else if (Roles.userIsInRole(loggedInUser, ['member'], group)) {	
					Router.go('/');
						$('.close').click();
				}
				else{
					Router.go('/');
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
