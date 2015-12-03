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
Router.route('/content',{
	Template:'content'
});
// Router.route('/content',{
// 	name:'content',
// 	onBeforeAction:function(){
// 		if(!Meteor.Meteor.userId()){
// 			this.render('login');
// 		}else {
// 			this.next();
// 		}
// 	}
// });
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
Router.route('/:username',{
	name:'profile',
	data:function(){
		var da = users.findOne({'profile.username': this.params.username});
		console.log(this.params.username);
		console.log(da);
		return da;
	}
});
