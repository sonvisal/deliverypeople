
Template.contentlist.helpers({
  baseUrl: function(){
     return Session.get('baseurl');
   },
   getImage: function(id){
    var img = images.findOne({_id:id});
    if(img){
     console.log(img.copies.images.key);
     return img.copies.images.key;
    }else{
     return;
    }
  },
  content:function(){
		return content.find();
  }
});
Template.contentlist.events({
	'click .remove': function(){
		var id = this._id;
		content.remove(id);
	},
	"click #update": function(event, template){
		event.preventDefault();
    var title = $("#title").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var price = $("#price").val();
    var locationstart = $("#locationstart").val();
    var locationend = $("#locationend").val();
    var datetime = $("#datetime").val();
    var message = $("#message").val();
    var img = Session.get("img_con");
    var error_message = "";
	
    if( title == "" || email =="" || phone =="" || phone =="" || price =="" || locationstart =="" || locationend ==""){
      if (title =="")
        error_message +="title is required";
      if (email =="")
          error_message +="email is required";
      if (phone =="")
          error_message +="phone is required";
      if (locationstart =="")
          error_message +="locationstart is required";
      if (locationend =="")
          error_message +="locationend is required";
      if (datetime =="")
          error_message +="datetime is required";
      if (message =="")
          error_message +="message is required";

      return Session.set("error_message",error_message);
    }else{
      Session.set("error_message","");
      delete Session.keys['error_message'];
      var attr={
          title:title,
          email:email,
          phone:phone,
          price:price,
          locationstart:locationstart,
          locationend:locationend,
          datetime:datetime,
          message:message,
          images:img

      }
      Meteor.call("updatecontent",attr);
	  Router.go('/contentlist');
    }
  },
  'change #image': function(event, template) {
    var files = event.target.files;
  for (var i = 0, ln = files.length; i < ln; i++) {
    images.insert(files[i], function (err, fileObj) {
     //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
    Session.set('img_con', fileObj._id);
   });
   //console.log(files[i]);
  }
  //console.log('img uploaded!');
 }

});
