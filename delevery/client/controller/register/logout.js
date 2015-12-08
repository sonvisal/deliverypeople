Template.nav.events({
    'click #logout': function(event){
        event.preventDefault();
        Session.set('content',"");
        Session.set('profile',"");
        Meteor.logout();
        Router.go('login');
    }
});
