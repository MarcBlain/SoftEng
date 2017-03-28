


import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';



import './register.html';

Template.register.events({

'submit form': function(event){

	event.preventDefault();

	var email = $('[name=Email]').val();
	var password = $('[name=Password]').val();

	Accounts.createUser({
		email: email,
		password: password
	}, function(error){
   		if(error){
        console.log(error.reason); // Output error if registration fails
    } else {
        Router.go("home"); // Redirect user if registration succeeds
    }

	});
	FlowRouter.go('/todolist');
},


});

Template.register.onRendered(function(){
    $('.register').validate();
});