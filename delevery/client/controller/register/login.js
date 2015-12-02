Template.login.events({
    'submit form': function(event,tpl){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
		/*$('.close').click();*/
		Meteor.loginWithPassword(email, password, function(error){
			if(error){
				alert(error.reason);
			} else {
				var loggedInUser = Meteor.user();
				var group = 'mygroup';
				var currentRouter1 = Session.get('contentid_login');
				var currentRouter2 = Session.get('like_login');
				console.log("Content ID:"+currentRouter1);
				if( currentRouter1!="" ){
					Router.go('/content_detail/more/'+currentRouter1);
				}else if(currentRouter2!=""){
					Router.go('/');
				}else{
					if (Roles.userIsInRole(loggedInUser, ["Admin"], group)) {
						Router.go('/admin');
						//$('.close').click();
					}
					else if (Roles.userIsInRole(loggedInUser, ["member"], group)) {	
							Router.go('/member/profile');
							//$('.close').click();
					 }else{
						var username = Meteor.user().profile.username;
						Router.go('/'+username);
						 //$('.close').click();
					 }
				}
			}
		});
    }
    /* 'click #poplogin': function(event){
    	//alert("jjss");
    	$("#squarespaceModal").modal({                    
			"backdrop"  : "static",
			"keyboard"  : true,
			"show"      : true   // show the modal immediately                  
		  });
    },
	'click .close': function(event){
    	//alert("jjss");
    	Router.go('/');
    },*/

});
Template.login.onRendered(function(){
	$("#squarespaceModal").modal({                    
			"backdrop"  : "static",
			"keyboard"  : true,
			"show"      : true   // show the modal immediately                  
		  });
});
