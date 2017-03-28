
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '/imports/api/todolist/todolistCollections.js';

import { Lists } from '/imports/api/todolist/todolistCollections.js';

import './list.js';
import './task.js';

import './todolistcontainer.html';



Template.todolist.onCreated(function bodyOnCreated(){
	this.state = new ReactiveDict();
	Meteor.subscribe('tasks');
	Meteor.subscribe('lists');
});

Template.todolist.helpers({
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

	incompleteCount(){
			return Tasks.find({ checked: {$ne: true }}).count();
	},

	//this returns all of the tasks 
	lists(){
		return Lists.find({},{sort: {createdAt : -1}});
	},



});

Template.todolist.events({
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
		

	//if you add a task that has no list then it is put on the default list
	var Default = "default";
	Meteor.call('tasks.insert',text,Default);


	//clear form
	target.text.value = "";
	},
	'change .hide-completed input'(event, instance){
		instance.state.set('hideCompleted', event.target.checked);
	},

	//submitting a new list 

	'submit .new-list'(event){
		event.preventDefault();
		//get value from form element
		const target = event.target;
		const text = target.text.value;

	Meteor.call('lists.insert',text);
	console.log('Added new List: ' + text);
	//clear form
	target.text.value = "";
	},
});
