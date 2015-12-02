/*Template.nav.helpers({
	user:function(){
		return Meteor.user();
	}
});*/
Session.set('baseurl', '');
Session.set('basepath', '');
Session.set('img_pro','');
Template.profile.helpers({
	users:function(id){
		var id = Meteor.userId(id);
		return Meteor.users.find(id);
	},
	getProfileImage: function(){
		var user = Meteor.user();
		var img = "";
		if(user){
			img = images.findOne({_id:user.profile.image});
		}
		if(img){
			console.log(img.copies.images.key);
			return img.copies.images.key;
		}else{
			return;
		}
	},
	basePath: function(){
			return Session.get('basepath');
	},
	baseUrl: function(){
		return Session.get('baseurl');
	},
	haveImage: function(){
		var user = Meteor.user();
		var haveimage = user.profile.image;
		if( haveimage ){
			Session.set('img_pro', haveimage);
			return true;
		}else{
			return false;
		} 
			
	}
	
});

if (Accounts._resetPasswordToken) {
  Session.set('resetPassword', Accounts._resetPasswordToken);
}
Template.profile.events({
	  'click #updateProfile': function (event,tmp) {
        //alert(' update' );
		event.preventDefault();
		var fname = $('#fname').val();
		var lname = $('#lname').val();
		var username = $('#uname').val();
		var email = $('#email').val();
		var currpass = $('#currentpassword').val();
		var newpass= $('#newpassword').val();
		var confpass = $('#conformpassword').val();
		var facebook = $('#facebook').val();
		var instagram = $('#instagram').val();
		var twitter = $('#twitter').val();
		var img_id = Session.get('img_pro');
		
		var id = this._id;
		//console.log(fname+','+lname+','+username+','+email+','+currpass+','+newpass+','+confpass);
		
		var attr={
		
            emails:[{
				address:email
			}],
            profile:{
                firstname:fname,
				lastname:lname,
				username:username,
				password: newpass,
				facebook:facebook,
				instagram:instagram,
				twitter:twitter,
				image:img_id
            }
        };
		console.log( "image"+img_id);
		Meteor.call('updateprofile',id,attr);

		//users.update(id,{$set:attr});
		Router.go('/member/profile');
		
		/*
		event.preventDefault();
		console.log('curent:'+ currpass + ' new pass:'+ newpass + ' confirm pass:'+ confpass+" pass token:"+Session.get('resetPassword'));
		
		var resetPasswordForm = $(e.currentTarget),
        password = resetPasswordForm.find('#resetPasswordPassword').val(),
       passwordConfirm = resetPasswordForm.find('#resetPasswordPasswordConfirm').val();

    if (isNotEmpty(password) && areValidPasswords(password, passwordConfirm)) {
      Accounts.resetPassword(currpass, newpass, function(err) {
        if (err) {
          console.log('We are sorry but something went wrong.');
        } else {
          console.log('Your password has been changed. Welcome back!');
          Session.set('resetPassword', null);
        }
      });
    }
    return false;*/
	
	},
	'change #image': function(event, template) {
	//e.preventDefault();
    var files = event.target.files;
		for (var i = 0, ln = files.length; i < ln; i++) {
				images.insert(files[i], function (err, fileObj) {
				 //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
				Session.set('img_pro', fileObj._id);
				var userid = Meteor.userId();
				users.update(userid,{$set:{"profile.image":fileObj._id}})
				
			});
			//console.log(files[i]);
		}
		console.log('img uploaded!');
	}
  });
  
Template.profile.events({
	'click #updateProfile': function(event) {
		event.preventDefault();
		var currentPassword = $('#currentpassword').val();
		var newPassword = $('#newpassword').val();
		var conformpassword = $('#conformpassword').val();
		
		if(newPassword === conformpassword && currentPassword !=""){
			alert("Password is match!");
			console.log("Change password:"+ currentPassword + ' to ' + newPassword);
			Accounts.changePassword(currentPassword, newPassword, function(error) {
				if (error) {
					$('#form-messages').html(error.reason).css("color","red");
				} else {
					$('#form-messages').html('Your password is changed!').css("color","blue");
				}
			});
		}else{
			alert("Password is not match!");
		}
		
	}
});
