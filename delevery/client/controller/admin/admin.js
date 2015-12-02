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
		Meteor.call('adduser',firstname, lastname, email,username, password,facebook,instagram,twitter, role);
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
		
   }/*,
  // getmsg: function(){
    // var msg = Session.get('page_msg',msg);
    // if( msg !="" ) return msg;
    // else msg ='';
  // }*/
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
		console.log(firstname,lastname,username,email,password,facebook,instagram,twitter,role);

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