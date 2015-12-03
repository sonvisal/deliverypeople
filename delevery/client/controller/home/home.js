Template.home.helpers({
	mycontents: function(){
		return content.find({});
	},
	getImage: function(id){
	 var img = images.findOne({_id:id});
	 if(img){
		console.log(img.copies.images.key);
		return img.copies.images.key;
	 }else{
		return;
	 }
 }
});
Template.home.events({

});
