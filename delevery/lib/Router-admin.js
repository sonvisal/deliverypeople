Router.map(function () {
	this.route('admin', {
		path: '/admin',
		onBeforeAction: function (pause) {
			if (!Meteor.user()) {
				// render the login template but keep the url in the browser the same
				this.render('/login');
			}
			else{
				var loggedInUser = Meteor.user();
				if( Roles.userIsInRole(loggedInUser, ['Normal User','member'],'mygroup') ){
					alert('Need to logout and Log as Admin!')
					this.render('home');
				}else if( Roles.userIsInRole(loggedInUser, ['Admin User','admin'],'mygroup')){
					this.render('/admin');
				}
			}
		}

	})
});
Router.map(function () {
	this.route('adduser', {
		path: '/adduser',
		onBeforeAction: function (pause) {
			if (!Meteor.user()) {
				// render the login template but keep the url in the browser the same
				this.render('/login');
			}
			else{
				var loggedInUser = Meteor.user();
				if( Roles.userIsInRole(loggedInUser, ['Normal User','member'],'mygroup') ){
					this.render('/');
				}else if( Roles.userIsInRole(loggedInUser, ['Admin User','admin'],'mygroup')){
					this.render('/adduser');
				}
			}
		}

	})
});
/*Router.route('/adduser',{
	name:'adduser'
});*/
Router.route('/editadmin/edit/:_id', {
    template: 'editadmin',
	data:function(){
		//var username=this.params.username;
		return Meteor.users.findOne({_id: this.params._id});
		//return Meteor.users.findOne({username:username});
	}
	
});