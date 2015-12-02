Router.route('/admin',{
	name:'admin'
});
Router.route('/adduser',{
	name:'adduser'
});
Router.route('/editadmin/edit/:_id', {
    template: 'editadmin',
	data:function(){
		//var username=this.params.username;
		return Meteor.users.findOne({_id: this.params._id});
		//return Meteor.users.findOne({username:username});
	}
	
});