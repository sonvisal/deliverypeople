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
Router.route('/search',{
	name:'searchcontent'
});
Router.route('/updatecontent/:_id',{
	name:'updatecontent',
	data: function(){
		return content.findOne({_id:this.params._id});
	}
});
Router.route('/service',{
	name:'service'
});
Router.route('/page_detail/:_id',{
	name:'pagedetail',
	data: function(){
		return content.findOne({_id:this.params._id});
	}
});
Router.route('/contentlist',{
	name:'contentlist'
});
Router.map(function () {
	this.route('/content', {
		name: 'content',
		onBeforeAction: function (pause) {
			if (!Meteor.user()) {
				// render the login template but keep the url in the browser the same
				Session.set('content',1);
				this.render('login');
			} else {
				this.next();
			}
		}
	})
});
Router.map(function () {
	this.route('/profile', {
		name: 'profile',
		data:function(){
			var da = users.findOne({'profile.username': this.params.username});
			console.log(this.params.username);
			console.log(da);
			return da;
		},
		onBeforeAction: function (pause) {
			if (!Meteor.user()) {
				// render the login template but keep the url in the browser the same
				Session.set('profile',2);
				this.render('login');
			} else {
				this.next();
			}
		}
	})
});
Router.route('/updatecontent/:_id',{
	name:'updatecontent',
	data: function(){
		return content.findOne({_id:this.params._id});
	}
});
