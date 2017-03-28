import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Lists } from '/imports/api/todolist/todolistCollections.js';

import { Tasks } from '/imports/api/todolist/todolistCollections.js';

import { FlowRouter } from 'meteor/kadira:flow-router';

import './list.js';
import './task.js';
import './listPage.html';



Template.listPage.onCreated(function bodyOnCreated(){
	this.state = new ReactiveDict();
	Meteor.subscribe('tasks');
	Meteor.subscribe('lists');
});


Template.listPage.helpers({
  lists() {
  	
    return Lists.findOne(FlowRouter.getParam('_id'));
  },


tasks(){
		const instance = Template.instance();
		var currentList = FlowRouter.getParam('_id');
	if(instance.state.get('hideCompleted')){
		//show newest tasks at the top
		//if hide completed is checked, filter tasks
		return Tasks.find({ checked: { $ne: true } }, { sort: {createdAt: -1} });
	}
	else{
		return Tasks.find({ listId : currentList},{ sort: {createdAt: -1} });

	}
	},

 
});


Template.listPage.events({
	'submit .new-task'(event){
		//Prevent default browser form submit
		event.preventDefault();

		//get value from form element
		const target = event.target;
		const text = target.text.value;

		//Insert Task into the collection
		//We dont use this anymore since this is an insecure method
		/*
	Tasks.insert({
		text,
		createdAt: new Date(), 
		owner: Meteor.userId(),
		username: Meteor.user().username,
	});*/
	var currentList = FlowRouter.getParam('_id');
	Meteor.call('tasks.insert',text,currentList);


	//clear form
	target.text.value = "";
	},
	'change .hide-completed input'(event, instance){
		instance.state.set('hideCompleted', event.target.checked);
	},


});
