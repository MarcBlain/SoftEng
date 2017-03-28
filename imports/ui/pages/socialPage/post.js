import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';


import { Posts } from '/imports/api/posts/postcollections.js';

import './post.html'




Template.post.helpers({

	timeDiff : function ( postDate ){

		var timeDiff = new Date().getTime() - postDate.getTime();
		var diffDays = Math.floor(timeDiff/ (1000* 3600*24));
		var diffHours = Math.floor(timeDiff/ (1000* 3600));
		var diffMins = Math.floor(timeDiff/ (1000* 60));
		var diffSec = Math.floor(timeDiff/ (1000));

		if(diffDays > 0)
			return ("about " + diffDays + "d ago");
		else if(diffHours > 0)
			return ("about " + diffHours + "h ago");
		else if(diffMins > 0)
			return (diffMins + "m ago");
		else 
			return (diffSec + "s ago");
	},
	checked: function(users){
		if($.inArray(Meteor.userId(), users) > -1)
			return true;
		else 
			return false;
	},

	userCreated: function(createdBy){
		if(createdBy == Meteor.userId())
			return true;
		else 
			return false;
	},


});

Template.post.events({


'click .likeBox input' : function(event){

	console.log('Clicked like for post ' + this._id);

	if(event.toElement.checked){
		Meteor.call('likePost', this._id);
	}
	else{
		Meteor.call('unlikePost', this._id);
	}
},

'click .editBox input' : function ( event ){
	if(event.toElement.checked)
	{
		$('#edit'+this._id).removeClass('hidden');
		$('#post'+this._id).hide();
	}
	else
	{
		var post = $('#edit'+this._id).val();
		Meteor.call('updatePost', {id : this._id, post:post});
		$('#edit'+this._id).addClass('hidden');
		$('#post'+this._id).show();
	}
},

'click #deletePost'(){
	Meteor.call('deletePost',this._id);
}


});
