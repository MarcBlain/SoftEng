import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';

import '../../ui/layouts/navbar/navbar.js';

import '../../ui/layouts/footer/footer.js';

import '../../ui/layouts/sidebar/sidebar.js';

import '../../ui/pages/home/home.js';

import '../../ui/pages/not-found/not-found.js';

import '../../ui/pages/logIn/logIn.js';

import '../../ui/pages/contactUs/contactUs.js';

import '../../ui/pages/aboutUs/aboutUs.js';

import '../../ui/pages/socialPage/posts.js';

import '../../ui/pages/register/register.js';

import '../../ui/pages/todolist/todolistcontainer.js';

import '../../ui/pages/todolist/listPage.js';





// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { navbar: "navbar" , main: 'App_home' , footer: "footer"});
  },
});

FlowRouter.route('/contactUs', {
  name: 'App.contactUs',
  action() {
    BlazeLayout.render('App_body', { navbar: "navbar" , main: 'contactUs', footer: "footer" });
  },
});

FlowRouter.route('/aboutUs', {
  name: 'App.aboutUs',
  action() {
    BlazeLayout.render('App_body', { navbar: "navbar" , main: 'aboutUs', footer: "footer" });
  },
});

FlowRouter.route('/logIn', {
  name: 'App.logIn',
  action() {
    BlazeLayout.render('App_body', { navbar: "navbar" , main: 'logIn', footer: "footer" });
  },
});



FlowRouter.route('/register', {
  name: 'App.register',
  action() {
    BlazeLayout.render('App_body', { navbar: "navbar" , main: 'register' , footer: "footer"});
  },
});

FlowRouter.route('/posts', {
  name: 'App.social',
  action() {
    BlazeLayout.render('App_body', { navbar: "navbar" , sidebar: 'sidebar' ,main: 'posts' , footer: "footer"});
  },
});

FlowRouter.route('/todolist', {
  name: 'App.todolist',
  action() {
    BlazeLayout.render('App_body', { navbar: "navbar" , sidebar: 'sidebar' ,main: 'todolist', footer: "footer" });
  },
});

FlowRouter.route('/list/:_id', {
  name: 'App.list._id',

  action(){
  	
    BlazeLayout.render('App_body', { navbar: "navbar" , sidebar: 'sidebar' ,main: 'listPage', footer: "footer" });
  },

});



FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
