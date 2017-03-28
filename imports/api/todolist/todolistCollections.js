//Create tasks collection here
//all meteor methods are here

import { Mongo } from 'meteor/mongo';
import { Meteor} from 'meteor/meteor';
import { check } from 'meteor/check';

export const Lists = new Mongo.Collection('lists');
export const Tasks = new Mongo.Collection('tasks');

//add publication for tasks

if(Meteor.isServer){
//this code only runs on server

Meteor.publish('tasks', function tasksPublication(){
	return Tasks.find();
});

Meteor.publish('lists',function listsPublication(){
	return Lists.find();
});

}


Meteor.methods({
//tasks.insert is the name of the method.
'tasks.insert'(text,currentList) {
	check(text, String);

	// Make sure the user is logged in before inserting a task
	if(! this.userId){
		throw new Meteor.Error('not-authorized');
	}

	Tasks.insert({
		name : text,
		createdAt: new Date(),
		owner: this.userId,
		listId: currentList,
		username: Meteor.users.findOne(this.userId).username,
	});

	console.log("added new task : "+ text);
},

'tasks.remove'(taskId){
check(taskId,String);
//check first if the task is a string


//calling remove function from mongoDb
Tasks.remove(taskId);


},

'tasks.setChecked'(taskId,setChecked){
	check(taskId,String);
	check(setChecked,Boolean);

	Tasks.update(taskId,{ $set: {checked: setChecked} });
},

'tasks.update'(taskId,text){
	check(taskId,String);
	check(text,String);

	Tasks.update(taskId,{ $set: {name : text}});


},

'lists.insert'(text){
	check(text,String);

	if(!this.userId){
		throw new Meteor.Error('not-authorized');
	}

	Lists.insert({
		name : text,
		createdAt: new Date(),
	});
},

'lists.remove'(listId){
	check(listId,String);

	//
	Lists.remove(listId);
},

});