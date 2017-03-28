import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { Meteor} from 'meteor/meteor';


import './navbar.html';

Template.navbar.events({

	'click .logout': function(event){
		event.preventDefault();
		Meteor.logout();

		FlowRouter.go('/');
	},

});