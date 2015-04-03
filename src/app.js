// insert your new code here

// such as a 'role' attribute that equals 'student'
// such as a 'imgUrl' attribute that equals 'http://placepuppy.it/200/200'
// such as a 'firstName' attribute that equals an empty string ''
// such as a 'lastName' attribute that equals an empty string ''


var areGirlDevelopersCool = true;


/*Backbone Model Definition
*  Holds the data
*/
var Person = Backbone.Model.extend({
    //giving my Person model defaults when instantiated
    defaults: {
        role: 'student',
        imgUrl: 'http://placepuppy.it/200/200',
        firstName: '',
        lastName: ''
    },
    //defining a function generateUserName that generates a user name using Person's
    generateUserName: function() {
        var user = this.get('firstName') + this.get('lastName');
        this.set('userName', user);
        return user;
    },

    //initializer function runs when an object is instantiated
    initialize: function(){
        //calling generateUserName() at initialization
        this.generateUserName();
    }
});

//Backbone Collection definition
//A collection is an ordered list of Backbone models
var People = Backbone.Collection.extend({
    model: Person,
    //comparator function sets rules for how the collection is ordered
    comparator: function(Person) {
        return Person.get('lastName').toLowerCase();
    }
});

//instancing and setting values of a model
var person = new Person({
    firstName: "Grace",
    lastName: "Hopper",
    role: "Computer Scientist",
    imgUrl: "http://www.history.navy.mil/photos/images/h96000/h96920k.jpg"
});

//instancing and setting values of a collection
var people = new People([
    {
        firstName: "Brenda",
        lastName: "Jin",
        role: "teacher",
        imgUrl: "https://pbs.twimg.com/profile_images/494918967329165312/_DNh8TnK.jpeg"
    },
    {
        firstName: "Pamela",
        lastName: "Fox",
        role: "teacher",
        imgUrl: "https://pbs.twimg.com/profile_images/458674563044233216/Rya_AmpS.jpeg"
    },
    {
        lastName: "Djaja",
        role: "TA",
        imgUrl: "https://lh6.googleusercontent.com/-RXfQUhzv7uQ/AAAAAAAAAAI/AAAAAAAAAAA/vO3ax0T-UzY/s128-c-k/photo.jpg"
    }
]);

//appending collection with an additional person
people.add({
    firstName: 'Julee',
    lastName: 'Burdekin',
    role: 'Adobe host'
});

//Backbone View
//used to display what models look like and listen/react to events
var PersonView = Backbone.View.extend({
    //assinging a class
    className: 'rolodex',
    
    //initializer function that listens for 'ready' status of view; then renders
    initialize: function() {
        this.listenTo(this.model, 'ready', this.render())
    },
    //render will display my model
    render: function() {
        var imgUrl = this.model.get('imgUrl');
        var newNode = $('<img src="' + imgUrl + '">');
        //el refers to the DOM object, not DOM object has been created then backbone will create one
        this.$el.append(newNode);
        return this;
    }
    //defining events
    , events: {
        'click': 'onClick'
    },
    //defining functions for events
    onClick: function () {
    }

});

//instantiating a view
var personView = new PersonView({
    model: person

});

//creating a view for a collection
var RolodexView = Backbone.View.extend({
    
    className: 'rolodexView',
    
    initialize: function() {

        this.listenTo(this.collection, 'change', this.render);
    },

    render: function() {
        //using a template system called Handlebars to help me reference values from my model
        var source = $("#rolodex-template").html();
        var template = Handlebars.compile(source);
        var rendered = template({people: this.collection.toJSON()});

        this.$el.append(rendered);
        return this;
    }

    
});
//instantiating my view
var rolodexView = new RolodexView({
    collection: people
});

//when the document is ready, append rolodexView to the DOM
$(document).ready(function() {
    // $('body').append(personView.render().$el);
    $('body').append(rolodexView.render().$el);
});

