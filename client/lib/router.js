//this sets the default layout for all templates
Router.configure({
  layoutTemplate: 'homeLayout'
});
 
Router.route('/', function() {
   
        //this should put home template into {{> yield}}   
        this.render('home');
 
        this.render('navbar',{to: 'navbar'});
 
        this.render('footer',{to: 'footer'});
});
 
Router.route('/aboutUs',function(){
 
 
        //this should put home template into {{> yield}}   
        this.render('aboutUs');
 
        this.render('navbar',{to: 'navbar'});
 
        this.render('footer',{to: 'footer'});
 
 
});
 
Router.route('/contactUs',function(){
 
 
        //this should put home template into {{> yield}}   
        this.render('contactUs');
 
        this.render('navbar',{to: 'navbar'});
 
        this.render('footer',{to: 'footer'});
 
 
});
 
 
Router.route('/logIn',function(){
 
 
        //this should put home template into {{> yield}}   
        this.render('logIn');
 
        this.render('navbar',{to: 'navbar'});
 
        this.render('footer',{to: 'footer'});
 
 
});