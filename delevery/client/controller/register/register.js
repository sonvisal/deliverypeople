// register 

Session.set('page_msg','');
Session.set("registerError","");
Template.register.events({
    'click #btnRegister': function(e, tpl){
		e.preventDefault();
		//alert("register"); 
			var firstname =$('#firstname').val();
			var lastname =$('#lastname').val();
			var username =$('#username').val();
			var email = $('#email').val();
			var password =$('#password').val();		
			var rerole = 'member';
			var result = users.find({email:email});
			var msg = '';
		if( result.count() > 0 || firstname == '' || lastname == '' || email == '' || password == ''){
			
			if( firstname == '' )
				msg += 'Firt Name is required.';
			if( lastname == '' )
				msg += 'Last Name is required.';
			if( email == '' )
				msg += 'Email is required.';
			if( password == '' )
				msg += 'Password is required.';
			
			if( result.count() > 0 ){
				msg = " Email name is already exist. ";
			}
			//console.log("required");
			Session.set("registerError", msg );
			Session.set('page_msg',msg);

		}else{
			Meteor.call('registerUser',firstname, lastname, email,username, password, rerole,function(err){
				if(err){
					console.log(err.reason);
					Session.set("registerError",err.reason);
				}else{
					Session.set("registerError","");
					Session.set("loginError","");
					Router.go('login'); 
				}
			});
		}	
    }

});
	

Template.register.helpers({
	
	getmsg: function(){
		var msg = Session.get('page_msg',msg);
		if( msg !="" ) return msg;
		else msg ='';
	},
	registerError:function(){
		var msg = Session.get("registerError");
		if( msg ) return true;
		else return false;
	},
	registerErrormsg: function(){
		return Session.get("registerError");
	}
});