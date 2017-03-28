import { Template } from 'meteor/templating';

import { Lists } from '/imports/api/todolist/todolistCollections.js';

import './list.html';


Template.list.helpers({

	

});

Template.list.events({

	'click .delete'(){
	Meteor.call('lists.remove', this._id);

},

});