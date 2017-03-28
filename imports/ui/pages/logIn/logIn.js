import { Template } from 'meteor/templating';
import { Meteor} from 'meteor/meteor';


import './logIn.html';

Template.logIn.events({

	'submit form': function(event){

 		 event.preventDefault();
        var email = $('[name=loginEmail]').val();
        var password = $('[name=loginPassword]').val();
        
      Meteor.loginWithPassword(email, password, function(error){
  	  if(error){
        console.log(error.reason);
   	 } else {
       FlowRouter.go('/todolist');
   	 }
});
	}


});

Template.logIn.onRendered(function(){
    $('.logIn').validate();
});