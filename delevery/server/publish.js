Meteor.publish("users",function(){
	return Meteor.users.find();
});
Meteor.publish('images', function (){ 
  return images.find({})
});




