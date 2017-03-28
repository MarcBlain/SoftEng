import { Template } from 'meteor/templating';

import { Tasks } from '/imports/api/todolist/todolistCollections.js';

import './task.html';

Template.task.events({
'click .toggle-checked'(){
	/*
	//set the checked property to the opposite of its current value
	Tasks.update(this._id,{
		$set :{ checked: !this.checked}, 
	});*/
	Meteor.call('tasks.setChecked', this._id, !this.checked);

},

'click .delete'(){
	Meteor.call('tasks.remove', this._id);
},

'keyup [name=taskItem]': function(event){
if(event.which == 13 || event.which ==27){
	$(event.target).blur();
}
else{
	const documentId = this._id;
	const taskItem = event.target.value;
	
	console.log("Calling function");

	Meteor.call('tasks.update',documentId,taskItem);
}
//var taskItem = $(event.target).val(); j query

	
},

});

