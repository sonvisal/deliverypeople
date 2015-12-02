Router.configure({
	layoutTemplate:'mainLayout'
});
Router.route('/register',{
	name:'register'
});
Router.route('/login',{
	name:'login'
});
Router.route('/',{
	name:'home'
});
Router.route('/about',{
	name:'about'
});
Router.route('/content',{
	name:'content'
});
Router.route('/service',{
	name:'service'
});
Router.route('/page_detail',{
	name:'pagedetail'
});
Router.route('/contentlist',{
	name:'contentlist'
});
Router.route('/:username',{
	name:'profile',
	data:function(){
		var da = users.findOne({'profile.username': this.params.username});
		console.log(this.params.username);
		console.log(da);
		return da;
	}
});
