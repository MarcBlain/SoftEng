


import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';



import './register.html';

Template.register.events({

'submit form': function(event){

	event.preventDefault();

	var firstName = $('[name=first').val();
	var lastName = $('[name=last').val();
	var email = $('[name=Email]').val();
	var password = $('[name=Password]').val();


	Accounts.createUser({
		profile:{

			name:{ first: firstName, last: lastName},

		},
		email: email,
		password: password
	}, function(error){
   		if(error){
        console.log(error.reason); // Output error if registration fails
    } else {
       FlowRouter.go('/todolist'); // Redirect user if registration succeeds
    }

	});
	
},


});

Template.register.onRendered(function(){
    $('.register').validate();
});
