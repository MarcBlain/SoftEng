
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '/imports/api/todolist/todolistCollections.js';

import { Lists } from '/imports/api/todolist/todolistCollections.js';

import './list.js';
import './task.js';
import './addshowtask.html';



Template.addshowtask.onCreated(function bodyOnCreated(){
	this.state = new ReactiveDict();
	Meteor.subscribe('tasks');
	Meteor.subscribe('lists');
});

Template.addshowtask.helpers({
	tasks(){
		const instance = Template.instance();
	if(instance.state.get('hideCompleted')){
		//show newest tasks at the top
		//if hide completed is checked, filter tasks
		return Tasks.find({ checked: { $ne: true } }, { sort: {createdAt: -1} });
	}
	else{
		return Tasks.find({},{ sort: {createdAt: -1} });

	}
	},

	


});

Template.addshowtask.events({
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

	Meteor.call('tasks.insert',text);


	//clear form
	target.text.value = "";
	},
	'change .hide-completed input'(event, instance){
		instance.state.set('hideCompleted', event.target.checked);
	},


});
