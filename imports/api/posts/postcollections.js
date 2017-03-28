//Create tasks collection here
//all meteor methods are here

import { Mongo } from 'meteor/mongo';
import { Meteor} from 'meteor/meteor';
import { check } from 'meteor/check';

export const Posts = new Mongo.Collection('posts');

//add publication for tasks

if(Meteor.isServer){
//this code only runs on server

Meteor.publish('posts', function postsPublication(){
	return Posts.find();
});


}

Meteor.methods({

'posts.insert'(post){

	Posts.insert({
		post:post,
		date: new Date(),
		createdBy: this.userId,
		firstName : Meteor.users.findOne({ _id: this.userId}).profile.name.first,
		lastName : Meteor.users.findOne({ _id: this.userId}).profile.name.last,
		likes:{
			totalLikes:0,
			users:[]
		},
		//maybe add shares here

		/*
		function( error, result){
			if( error ) console.log ( error );
			if( result ) console.log ( result );
		});*/
	});

	console.log("Added new post : " + post);

},

'likePost'(postId){

	console.log('Post Liked');

	var update= true;

	Posts.update(
		{_id: postId},

		{$addToSet : {"likes.users": this.userId}}
		
		),

		function(error, result){
		if(error)
		{
			update = false;
				//user already liked
		}
		if(result){
			update = true;
				}
		};

	if(update){

		Posts.update(
			{_id: postId},
			{$inc : {"likes.totalLikes": 1}}
		),

			function(error, result){

		if(error) console.log(error);
		if(result) console.log(result);



		};
		

	}
},

'unlikePost'(postId){

	Posts.update(
		{_id: postId},
		{$inc : { "likes.totalLikes": -1}}
		),

		function(error, result){
			if(error) console.log ( error);
			if(result) console.log (result);
		};

		Posts.update(
			{_id: postId},
			{$pop : {"likes.users": this.userId}}
		),function(error,result){
			if(error) console.log ( error);
			if(result) console.log (result);
		};

			console.log('Post unliked');


},

'deletePost'(postId){
	Posts.remove(postId);
},


'updatePost'(postObj){
	Posts.update(
		{_id: postObj.id},
		{$set: {post : postObj.post}}
		);
}

});
