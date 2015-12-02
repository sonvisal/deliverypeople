// register 

Session.set('page_msg','');
Template.register.events({
    'click #btnRegister': function(e, tpl){
		e.preventDefault();
		//alert("register"); 
			var firstname =$('#firstname').val();
			var lastname =$('#lastname').val();
			var username =$('#username').val();
			var email = $('#email').val();
			var password =$('#password').val();		
			var facebook =$('#fb').val();
			var instagram = $('#insta').val();
			var twitter =$('#twitter').val();
			var rerole = 'member';
			var result = users.find({email:email});
			var msg = '';
		if( result.count() > 0 || firstname =="" || lastname == "" || username == "" || email == "" || password == ""){
			
			if( firstname == ""){
				msg += " first name is required. ";
			}
			if(lastname ==""){
				msg += " lastname is required. ";
			}
			if(username ==""){
				msg += " username is required. ";
			}
			if(email ==""){
				msg += " email is required. ";
			}
			
			if( result.count() > 0 ){
				msg = " Email name is already exist. ";
			}
			if(password ==""){
				msg += " password is required. ";
			}
			console.log("required");
			Session.set('page_msg',msg);

		}else{
			Meteor.call('registerUser',firstname, lastname, email,username, password,facebook,instagram,twitter, rerole);
				//alert("Success Register!");
			Router.go('login');
}	
		
    }	
});


Template.register.helpers({
	
	getmsg: function(){
		var msg = Session.get('page_msg',msg);
		if( msg !="" ) return msg;
		else msg ='';
	}
});