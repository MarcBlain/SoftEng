import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';


import { Posts } from '/imports/api/posts/postcollections.js';

import './posts.html';
import './post.js';


Template.posts.onCreated(function bodyOnCreated(){
	this.state = new ReactiveDict();
	Meteor.subscribe('posts');
	
});

Template.posts.helpers({

	charsRemaining: function(){

		return Session.get('CharactersRemaining');
	},

	posts : function(){
		return Posts.find({},{sort: {date: -1}});
	}
});

Template.posts.events({

	'keyup #inputPost': function(event){

		var inputText = event.target.value;

		Session.set("CharactersRemaining", (140-inputText.length) + " characters remaining");
	},

		'submit #postForm' : function(event){
			event.preventDefault();

			var post = event.target.inputPost.value;

			event.target.reset();

			Session.set("CharactersRemaining", 140 + " characters remaining");

			Meteor.call('posts.insert', post);
	},
	

});

Template.posts.onRendered(function(){

	$("#postForm").validate();

});