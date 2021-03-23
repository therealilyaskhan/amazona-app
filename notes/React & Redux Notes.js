///////////////////////////////////////////////
//            REACT FUNDAMENTALS
///////////////////////////////////////////////
/* 
SINGLE PAGE APPLICATION (SPA):

THE HEAR , THE CORE OF REACT:
            "To show different components to users depending
            upon their actions while remaining on the front-end"

To understand the concept of SPAs we first have to understand the Multi Pages Applications [by pages we mean html]

MPA ARCHITECTURE:
        If you remember in php, where we had a lot of template files containing the markup such as:
        =>contact.php
        =>header.php
        =>footer.php
        =>product.php
        =>catalog.php
        =>login.php
        =>signup.php
        =>profile.php

Now we had to include inside each of the rest of the files at the top the header.php and at the end the footer.php, where all the markup was calculated on the server i:e all the queries to the database etc used to get calculated on the server and then at the end the server would respond you with a file;

For Example: i am on the homepage and there is a product, upon clicking that product, a get request (to some URL) would be sent over to the server , and based upon that URL the server would go to that particular product.php file and render that file for that very product on the server and send me back a fresh file along with the required css and javascript;

HOWEVER IN CASE OF SINGLE PAGE APPLICATIONS: 
            "this is not the case"

--> In SPA we only have one singleton .html file;
--> Only ever one dot .html file on our server, which is served to the browser in the beginning;
--> In SPA you still need to make an initial request to the server and the server gives you back that single html file;
--> After the browser receives that initial response, the REACT takes over the application;
--> As along with the .html file the server also sends over to the client JavaScript and CSS as static assets;
--> if now you click a link to the contact page, your request won't be sent over to the server but rather would be intercepted by the REACT in the browser and will be handled by the react;
--> based upon the URL there will be routing already coded, the react will say okay you want to see the components related to the contact page so the /contact request will be routed to a specific component and will load those components onto the UI;
--> So what a single page application is doing is that it is showing different components to the user on the UI based upon the user actions and what actually the user is trying to see on the screen;
--> No new html files are going to be downloaded from the server because in face there isn't any other html file on the server besides the one the user already have, all the rest of the Markup is rendered on to the browser by the "react-dom" and "babel" via JSX;
--> The beauty of react is that what it allows you to do is to only create different components and simply routing different URLs to these components;
--> what react is going to do is that it will inject different components dynamically into the root div inside of the once ever served index.html file based upon what components user is accessing; for example if a user is accessing the home page then the 'root' container in the index.html will be filled only with those components that has to do with the homepage;
--> similarly, if user accesses a product page, the stuff currently filled inside the 'root' container will be replaced with new components that has to do with product page;
--> Requests are made to the server but not for the markup, only for the data that is required by the requested page;
--> when using react you almost never have to work with the .html markup files , all of your concern is going to be inside of the JavaScript files; Whether it is to add markup, you will do it form inside of the javascript files, even if it comes to adding styles to your markup you have to include / import your style sheets inside of the JavaScript file(s) [this is what webpack takes care of];
--> when you have to add styles which are global to all the components then you will add those styles to a file index.css inside the src folder in your react app; this index.css file is imported into the index.js file inside the same src folder, and this index.js is the file which is going to render / mount react components to the 'root' container inside the index.html file that lives inside the public folder;
--> and in case when you want to add styles that are specific to only a particular component; then you have to import such css file at the top of that very component;
--> remember in a react application it is only one single ReactDOM.render() call at the end of the day that is going to mount a single react functional component called <App /> on a 'root' container inside the html markup file; and from inside of that function react component called "App" we are going to refer to all other different components as its children and will route different URLs to different components from inside of it;

///////////////////////////////////////////
FOLDER STRUCTURE FOR A REACT APPLICATION
///////////////////////////////////////////
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── index.css
    ├── index.js
    └── serviceWorker.js

public Folder:
        In this folder there is going to be everything that is going to be served to the client like images, the html file etc;

src Folder:
        We create our components inside this folder;
        create react app by default creates for us an <App /> component inside of this src folder in a file names App.js;
        the index.js in src folder is responsible for rendering the components to the DOM (inside the index.html file on the root container;)
        Here is also where you add css files which will be specific to certain components you add in this src folder;
        In here is going to be all the source files, here is where we are going to spend most of our time and do our modifications such as adding components etc, creating different subfolders for components;
*/
/*
what does this evaluates to ?
<Car> <h1> blah </h1> </Car>

////////////////////
SOME TERMINOLOGIES:
///////////////////
GLOSSARY OF REACT TERMINOLOGIES:
https://reactjs.org/docs/glossary.html#react-elements

What are react components ?
A React Component putting simply is a function constructor that returns an object / Node which can be then attached to the real dom via the dot .render() method; now there is a lot of process involved but let's say we have a React Component Car:

function Car(props){
   return <div><h1> a whole dom fragment is returned </h1></div>
}

now Car is a React Component because it is capable of returning React Element; but how to instantiate it ? the old school way is:

React.createElement(Car, null);

while the JSX way of instantiating it is simply:

<Car/>

what's returned by these above two same but seemingly different things is a React Element which can be mounted to the actual dom via the render() method;

We normally refer to <Car /> as a react element cuz it returns a react element; and what is attached to the DOM and rendered onto the screen via the dot .render() method is normally referred to as a react component though in actual the react component is the factory function which returns the react element;

A "React Component" "Car" (the functional or classic component) takes optional input (props); JSX returns a "React Element";  and writing jsx: "<Car />" is same as writing:
 React.createElement(Car, null)  
<Car /> is a custom defined JSX and some are predefined JSXs such as: <h1></h1> translates to:
 [React.createElement(h1, null)
and the React's method createElement returns a React Node called "React Element" which means that:
      "A JSX returns React Element"
A React Element got via dot .createElement() is mountable and can be "Mount" to the actual DOM at a particular specified position and thereafter "Rendered" To the Screen via the ReactDOM.render() method; The rendered React Element returned by "<Car />"  and then mounted to DOM via the render method is then called simply a "Component" which is an independent object/node/piece on the screen;

We normally refer to this thing --> <Car /> as a react element but in fact this is the producer of the react element , this <Car /> itself is JSX which gets translated to React.createElement() call;

<Car /> and <h1></h1> these both JSX actually returns "React Elements" or "React Nodes" which are the virtual representation and then they are mounted onto the real dom via the render() method;

/////////////////////////
JSX
////////////////////////
JSX produces "React elements”. 

Each JSX tag represents JavaScript Object called "React Element";

React Element is discussed below;

JSX gets compiled to React.createElement() calls which return plain JavaScript object called “React element”.

JSX allows you to put markup in JS, React component contains both markup and the logic means both the markup and the functions/methods/event handlers to manipulate the markup are coupled together inside independent react components (function constructors); each component has a separate concern;
JSX allows to put HTML into JavaScript just so as to couple both markup and logic together inside a react component;

///////////////////
React.createElement()
///////////////////
Syntax:
React.createElement(
  type,
  [props],
  [...children]
);

Creates and returns a new React element of the given type. The type argument can be either a tag name string (such as 'div' or 'span'), a React component type (a class or a function such as Car)

Code written with JSX will be converted to use React.createElement(). You will not typically invoke React.createElement() directly if you are using JSX.

///////////////////
///////////////////

JSX is a javascript extension that allows you to write HTML in javascript files;
Unlike the past, instead of putting JavaScript into HTML, JSX transpilers allows us to put HTML into JavaScript just so as to couple both markup and logic together via something called component; each component has a separate concern; JSX transpiler is part of the react;

react offers us JSX and thus we can assign HTML to a javascript variable via JSX as follows:
var jsVar = (
    <ul id="nav">
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
    </ul>
);

in the above expression we are actually assigning an object's reference to the jsVar referencer; the object is the one returned by the JSX; the above expression is translated into something as follows:

var jsVar  =  React.createElement('ul', {id: 'nav'}, React.createElement('li', {href: #}, 'home'), React.createElement('li', {href: #}, 'About'));

so this very long expresssion will create an object and will return that object;

HERE <ul> IS THE PARENT COMPONENT & <li> ARE THE CHILD COMPONENTS;

And ReactDOM will transform it into this:

var jsVar = React.createElement(

   "ul",

   { id: "nav" },

   React.createElement(
      "li",
      null,
      React.createElement(
         "a",
         { href: "#" },
         "Home"
      )
   ),
   React.createElement(
      "li",
      null,
      React.createElement(
         "a",
         { href: "#" },
         "About"
      )
   )
);

You can think of JSX as a shorthand for calling React.createElement()

//////////////////////////////////////////////////////////////
react props / react properties / in React-terms props = tacos
//////////////////////////////////////////////////////////////
props:-
"props are input to react components that's it"
"props are args to react element constructor that's it"
“a way of passing data from parent component to child components.” That’s it. In essence, props are just a communication channel between components, always moving from top (parent) component to bottom (child) component


props are like the html attributes: <Car className='blah /> converted to javascript function arguments, so className: 'blah passed to Car() as arg so props.className = 'blah';;
react props are immutable an attempt to change them will throw error;


///////////////////////////////////////////
react state object / state object VS props
//////////////////////////////////////////
Remember that props are readonly. They should not be modified in any way:
props.number = 44 ; //WRONG

A component cannot change its props (props are never personal property btw they come from somewhere above and that's why they are totally not allowed to be changed), but since state is something personal so component can change its state.

If you need to modify some value in response to user input or a network response, use state instead.

Both props and states are plain Javascript objects.

state means internal data of a react component(the react element constructor class because function constructors are stateless react components); props means ,the data which is transferred from component above to the components below.

props: are something passed to the react component (the react elements constructor function or class) as html attributes like the follows: <Car age='20'/>; 

<Car age='20'/> is actually a JSX of the .createElement() method on the React interface and it invokes the react component which in turn returns a react element (which is an object / node and is mountable)

The state of a react component can change i:e the properties of the state object can change over time mostly as a result of user events;

State is optional. a Component without state is preferable. Even though you clearly can’t do without state in an interactive app, you should avoid having too many Stateful Components.

Functional components are more preferable;

User events would update a property in the component’s state by calling setState(), and the update is rendered in HTML.

Tip: a state can be initialized by the props values;

////////////////////////////////////////
WHAT IS A REACT COMPONENT ?
///////////////////////////////////////
A component is basically a blue print or a template that can be reused over and over;

A React Component (wether a class (stateful) or a functional one) both contains within itself both the logic and the markup and it returns full fledged react element which is in fact an object / node and that object can be tacked onto the real DOM via the React.render() method;

Component returns exactly one JSX or say only one single React.createElement() call but that one JSX can have nested JSXs, or say that one createElement() call can have multiple createElement() calls inside it, that's why 2 sibling JSX are not returnable cuz two things can't be returned at one time by the return keyword; only one thing can be returned at one time; the other objects will then be child objects to the top most JSX

Simply put, a component is a JavaScript class or function that optionally accepts inputs i.e. properties(props) and returns a UI element.

Both props and states are plain Javascript objects.

Components Simply describes what to render;

There are two types of react components:
1) class components
2) function components

Wether it's a class component or a function component but the mere purpose of component is to return a ready made HTML group of elements with events and handlers attached;

//////////////////////////////////////////////
FUNCTIONAL COMPONENTS
///////////////////////////////////////////////
These are nothing but functions that takes properties as argument and those properties are by default stored in the this.props referencer, these properties are utilized and ultimately the function(component) returns the HTML element or fragment you want to render to a particular position in the DOM;

///////////////////////////////////////////////////////
WHAT HAPPENS WHEN A REACT COMPONENT IS MOUNT / REUSED
//////////////////////////////////////////////////////
The components are actually nothing but classes;

For example consider the following React component:

        class Car extends React.Component {
         render(){
           return (//some HTML);
         }
        }

So the above component is a react classic component called "Car"

Now: At this point nothing's happened and it's total silence;

BUT NOW IF WE SAY:
                  let mik = <Car/>     //React Element / Node obj

this particular thing <Car /> returns something called React Element which can be mounted to the real dom via the render method later; We in general call the <Car /> a react element but this is actually JSX what's returned by it is the actual react element which is a plain javascript object holding information about what type of instance is going to be created;

So what's "mik" above and what does it do? yet at this point nothing has happened, our component class Car hasn't been instantiated yet; in the above expression mik = <Car /> , <Car /> just returns a plain JavaScript object that looks something like below:
            {
              key: null
              props: {}
              ref: null
              type: Car
            }

This plain javascript object at this stage is a mere information holder; it only holds information about what sort of and more precisely what type of Instance to be created in the memory, that object to be created by passing the information held by this object is gonna have this this particular properties and methods;

This is not an instance of the Car component class but is rather an instance of the JavaScript Object class;

function Car(props) {
   return (<div><h1> a whole dom fragment is returned </h1></div>);
}

let mik = <Car />;

console.log(mik instanceof Car); //false

Furthermore this <Car /> is not what's Mounted or Rendered to the actual dom , it is not a node or fragment, it is simply a plain JS object that holds info about what sort of node should be generated which has both the markup and logic embedded and then that is something which is rendered or say mounted onto the actual DOM;

What returned by the <Car /> is a plain JS object called react element and this react element object is the:
               "VIRTUAL REPRESENTATION"

it is just a JSX , what's returned by it is the virtual representation which thereafter is going to be rendered to the real dom;

React elements are mounted at a particular place in the DOM via the dot .render() method;

ReactDOM.render(<Car />, domContainer);

Here The "mounting process" begins:
1) ReactDOM.render(reactEleReturnedHere, domContainer) method upon passing it the React Element and the specified domContainer will create an instance of the "Car" class by calling the constructor() of the Car class in context of this particular being created instance;
2) After the instance is full fledged created then react will call render() method in context of that instance
3) What's returned by the render() method will be mounted onto the Real DOM;

Whenever we mount a React Element we are basically creating a new unique instance / an object having bunch of properties and methods;

the constructor function inside the component is called once for each object upon each mount;

//////////////////////////////
super() method
//////////////////////////////
the super() is almost always called inside the constructor of a component;

The super() method is a special method that means “call this same method on whichever class I inherited from.”


////////////////////////////////
MOUNTING VS RENDERING: both are almost same things
////////////////////////////////
From React Documentation:
React is so fast because it never talks to the DOM directly. React maintains a fast in-memory representation of the DOM called "VIRTUAL DOM".

A component can render multiple times after it's mounted once onto the acutal DOM such as upon props/state change;

///////////////////////////////////
COMPONENT TYPES:
//////////////////////////////////
1) Stateful Components
2) Stateless Components

“Stateful” components are of the class type, while “stateless” components are of the function type. though a class can also be stateless if you dont have any state properties defined still functional components are preferred;

STATEFUL:
        component having the state object with properties in it; These one components are good when your components must retain some state;

STATELESS:
        Only props, no state.
        To have a smaller syntax for stateless components, React provides us with a function style called functional components(discussed above). We create a function that takes properties as an argument and returns the view(VIEW means the UI Elements to be rendered).


/////////////////////////////////////////////////////
REACT ELEMENT VS REACT COMPONENT VS INSTANCES
/////////////////////////////////////////////////////
-> The class itself is a COMPONENT; Are small, reusable pieces of code that return a React element to be rendered to the page. The simplest version of React component is a plain JavaScript function that returns some markup(JSXs):
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

-> REACT ELEMENT:
   JSX produces React “elements”. 
   <Car /> <== this thing is not React Element; This is JSX just like: <h1></h1>, These preceding HTML-alike tags are JSX which gets translated to:
            React.createElement(type, props, children);

   What's returned by the <Car /> or <h1></h1> or any other JSX is actually plain JavaScript object and that plain javascript object is called “React element”.

   something like following:
             {
              type: 'h1',
              props: {
              className: 'greeting',
              children: 'Hello, world!'
                     }
            }

   React Element describes what you want to see on the screen. React elements are immutable. And you have to specify The where part for the "what you wanna see part";

   The React Element is NOT AN INSTANCE of the component, it's a plain javascript object that is simply a description of the component's instance to be created. It's an object with key, props, ref and type properties.

FROM DOCS:
   React element is a plain object describing a component instance or DOM node and its desired properties. It contains only information about the component type (for example, a Button or Car), its properties (for example, its color), and any child elements inside it.
   You can’t call any methods on the element. It’s just an immutable description object with two fields: type: (string | ReactClass) and props: Object1.

SIMPLE FORMULA:
            React Elements == Plain JS objects

            React Elements or say The Plain JS special objects are something which is rendered to the actual DOM and hence the UI;

            So you can also directly pass the render function a react element directly, i mean the JS object directly and no harm done;

            because what's returned by the <Car /> is also at the end of the day an object;

            React elements are immutable.

            Means

            These objects are immutable and you can't make changes to one of its properties;

-> An INSTANCE of the component gets created when an element gets  RENDERED

////////////////////////////////
A TYPICAL REACT APP SINGLE PAGE
////////////////////////////////
Such an app has only one root container in its html markup index.html; and in the JS file we render only one custom React Element called <App /> to that root container; 

From inside of the <App /> we refer to all other components of our UI as children;

as below:

function App(props){
   return (
      <div> 
      <Car model='20'/> 
      <h1> blah </h1> 
      <Bike brand='honda' />
      <a href=#>
      <img src='./p1.jpg />
      </a>
      </div>
      );
}

/////////////////////////////////////////////////////////////
componentDidMount VS componentWillMount / LIFECYCLE METHODS
/////////////////////////////////////////////////////////////
Mounting: Adding React Nodes to the Actual Dom
UnMounting: Removing a React Component from the actual DOM

You can tell React to "mount" a react element into a DOM container by calling: ReactDOM.render(foo, domContainer);

componentWillMount() gets invoked just before first render whereas componentDidMount() is invoked immediately right after first render / mount.

Both of these methods from each component gets called only once through the entire lifecycle of a react component and that's why they are called lifecycle methods;

componentWillMount() : deprecated and should avoid using this ( it is a legacy method and will be removed in upcoming react version ).

You should use the constructor method in place of the componentWillMount() method;

//////////////////////////////////////////////
ARROW FUNCTIONS *this* VS NORMAL FUNCTIONS *this*
//////////////////////////////////////////////
TO THINK IN SIMPLE WAY ABOUT *this* INSIDE ARROW FUNCTIONS:
               " the value of *this* inside an arrow functions
                 is encapsulated / enclosed to whatever the
                 current value of *this* was at the time the function definition was encountered <<<-- THIS
                 IS SOMETHING IMPORTANT TO KNOW: "at time when the function definition was encountered, the value
                 of *this* is NOT calculated at the time of the
                 function call;" via the mechanism of closures
                 so PUTTING REALLY SIMPLE:- the value of *this*
                 is captured inside arrow function AND the value
                 of *this* inside a normal function is decided at
                 the time of when the function is invoked; "

                 so: the value of "this" is fixed inside the arrow function since the value is captured at time of function definition while the vlaue of "this" inside normal functions is dynamic and is evaluated at the time of function call;
ARROW FUNCTIONS: where ?
            LONG STORY SHORT:
                     the this within the arrow is the one that was current.
            The Value of *this* depends upon where the function lives lexically;
            The value of *this* inside an arrow function associates with the value of *this* inside the execution context above it in the execution stack chain;
            For example:
            let blah = {
               arrow: ()=>{
                  return this;
               }
            } 
            blah.arrow() returns Window because when we call blah.arrow() the execution context above is the global execution context and in global execution context *this* always refers to the Window object so the *this* inside the arrow function will imitate/replicate it and will possess the same value;
NORMAL FUNCTIONS: how?
            The value of *this* is regardless of where the function physically lives but is totally dependent on how the function(means in what context) the function is being called;

            Example:
            let blah = {
               method: function(){
                  return this;
               }
            }

            blah.method() returns the same object blah in which the method resides cuz we know that the method was called in context of the blah object whereas in case arrow functions the HOW part is out of question; what matters is WHERE no matter in what context and however you call the function the value of *this* is always gonna follow up the value of *this* inside its parent execution context up the chain;



PERFECT EXAMPLE ARROW FUNCTION:

const myObject = {
  myArrowFunction: null,
  myMethod: function () {
    this.myArrowFunction = () => { console.log(this) };
  }
};

ABOVE:
   this.myArrowFunction = :- here the value of this is inside the normal function which reside inside the myObject;
   AND
   ()=>{console.log(this)} :- here the value of this is inside the arrow function

   the value of this inside the arrow function definition ()=>{} here this definition will capture the value of this and this is the perfect example of CLOSURES; arrow function definition doesn't produce their own *this* rather they copy the value of the current *this* , whatever current *this* is they will occupy the same value; THIS IS PERFECT EXPLANATION;

We need to call myObject.myMethod() to initialize myObject.myArrowFunction and then let's see what the output would be:

myObject.myMethod() // this === myObject

myObject.myArrowFunction() // this === myObject

const myarrow = myObject.myArrowFunction;
myarrow() // this === myObject


//////////////////////////////////////////////////////////////////
IMPLICIT SUPER CALL / IMPLICIT INVOCATION OF PARENT CONSTRUCTOR
//////////////////////////////////////////////////////////////////
*/

// the below examples shows that the arrow methods inside a class doesn't go onto the prototype of the class but rather attaches to the instance itself while in case of the normal methods the normal methods go onto the prototype of the class and becomes part of inheritance and when we don't specify a constructor() method inside a class an implicit one is auto created and the implicit or explicit constructor inside the super class is called from it;

class A {
   //this method will go inside of the implicit constructor method since it is going to be part of the instance not the prototypal chain
   handleClick = () => {
      console.log("A handleClick");
   };
}

class B extends A {
   handleClick = () => {
      // super.handleClick(); //when we call super.handleClick(); so this is gonna give a fucking error because there is no fucking handleClick on the A.prototype; 
      console.log('B handleClick');
   };
}
new B().handleClick();

class C extends A {
   handleClick() {
      console.log('C handleClick');
      super.handleClick();
      console.log('No one is paying my implementation a damn heed');
   }
}
new C().handleClick();


class G {
   constructor() {
      this.i = 'k';
   }

}

class F extends G {
   /* when we don't specify constructor inside the child class: implicitly a constructor will be created inside that class and the super() function will be called from that constructor hence importing everything from the parent classs's constructor and in short words the constructor of the parent class will become the constructor of the child class 
   */
}

console.log(new F());

//ANOTHER IMPORTANT INTERSTING CASE SCENARIO W.R.T THIS KEYWORD INSIDE CLASSES:

class M {
   blah = () => {
      console.log('I am executing though i dont deserve!!!');
   };
}

class N extends M {
   blah() {
      console.log('no one is paying a fucking heed to me!!!');
   }
}

let haha = new N();

haha.blah(); //i am executing though i don't deserve :D 

/*
REASON ? :- WELL:-
///////////////////////
   IMPLICIT SUPER CALL
////////////////////////
    > reason is that an arrow function in the super class M is transpiled by babel to ES5 as follows:

    constructor() {
       this.blah = () =>{
           console.log('I am executing though i dont deserve!!!');
        }
     }

     Now since we are not mentioning the constructor in child class N so implicitly inside the child class the javascript will reform an implicit constructor and inside that constructor it will execute the same constructor from M class using the super keyword for the class N's instance;

     BUT NOW IF AT THE SAME TIME IF  WE :

     Again define an arrow function with the same name blah() inside the class N as a property:

     blah = () =>{
           console.log('OH YES I AM EXECUTED!!!')
        }

     now since all arrow functions inside a class are thrown into the constructor so the blah() inside the N will be thrown into the implicit constructor and then the super keyword will be called from the constructor which will cause the N's blah to be overridden by the M's blah since the constructor of the M also contains a method by the same name;

     BUT INTERESTINGLY:

     if we don't define this function by same name 'blah' as an arrow function inside the child class but rather we choose to define it as A NORMAL FUNCTION, then the blah will not go into the constructor but will rather become part of the N.prototype an not a literal part of any individual instance of the N class itself;

     Since despite of all what is said in the above paragraph , and as a matter of fact we aren't writing any constructor in the child class N so the implicit constructor will be reformed by the JS inside the class N and will call the super() which will as a result import the arrow ()=> function which was part of the parent constructor and will make it also the part of the instance of the class N , since the methods and properties inside the Object.hasOwnProperty are always prefered first and approache first as compared to those of the prototypal so the arrow function which came from the parent will be executed as a preference in place of the prototypal blah();

     That;s why no one is paying it a HEED :D
    }
    */
/*

//////////////////////////////////////////////////////////////
PREFERED WAY OF WRITING METHODS INSIDE REACT CLASS COMPONENTS
//////////////////////////////////////////////////////////////
you should always first try to go along with declaring your methods in the prototype (means as normal functions inside a class) and if you want to have grasp over the *this* then only bound it using the dot .bind() method to the context if you need to (if you pass it as prop or callback) but avoid arrow functions inside a class as follows:

    this.blah = this.blah.bind(this);

Conclusion
1) The initialization of arrow functions in class properties are transpiled into the constructor.
2) Arrow functions in class properties won’t be in the prototype and we can’t call them with super.
3) Arrow functions in class properties are much slower than bound functions, and both are much slower than usual function.
4) You should only bind with .bind() or arrow function a method if you’re going to pass it around.

//////////////////////////////////////////////////////////////////
CREATING ARRAY OF REACT ELEMENTS / COLLECTION OF REACT ELEMENTS / CREATING LIST OF REACT ELEMENTS / "KEY" ATTRIBUTE / KEY ATTRIBUTE
//////////////////////////////////////////////////////////////////
TLDR: always add a key attribute to the JSX elements while mapping an list of elements into list of JSX elements;

In react while creating an array of elements and feeding elements into an array one by one you need to provide react with a special attribute along with each element called "key"; This attribute helps react to monitor what goes inside the array and what has already gone inside the array and what was removed from inside of the array;

Usage of keys:
    The key attribute helps react keep track of the individual elements in the list of JSX elements; and thus keys helps react update(re-render) the elements from the list(array) efficiently if any change is made to the list i:e if an element is added or an existing element is removed from the list(array) then react is not gonna re-render the whole list of elements again but based upon the key attribute of each element in the list react will only render those elements out of the list which did change;

    so in short: keys are there to enable react to not re-render the entire elements in the list each time any change is made to only a single out of these elements but only re-render that element to which the change was made;

Remember that while creating an array of react elements , you can never have two react elements inside the array with the same key;

This behavior of react is really helpful; if you don't provide this attribute react by default will set indexed keys for each element that goes into the array and also will throw a WARNING!

The best way to pick a key is to use a string that uniquely identifies a list item among its siblings. Most often you would use IDs from your data as keys;

Keys serve as a hint to React but they don’t get passed to your components. If you need the same value in your component, pass it explicitly as a prop with a different name:

const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);

here the Post component will not recieve the key attribute so it means that you can't access it inside the Post component via the props.key;

WHERE EXACTLY YOU SHOULD ASSIGN KEY ATTRIBUTE ? WHAT PLACE IS THE RIGHT SPOT TO ASSIGN THE KEY ATTRIBUTE ? WHERE KEYS MAKE SENSE ?
Read it here: https://reactjs.org/docs/lists-and-keys.html#extracting-components-with-keys

A good rule of thumb is that elements inside the map() call need keys.

////////////////////////////////////////////////////////////////
RELATION BETWEEN KEYS AND VIRTUAL DOM / HOW ARE KEYS HELPFUL
/////////////////////////////////////////////////////////////////
React has something called "Virtual DOM" before changing the real DOM it compares the new virtual dom with the existing real DOM (which is referred to as the DOM of the past) and react looks for where to make changes to the real DOM, in other words where in the real DOM rendering should be done because for performance reasons react do not re-renders the entire actual DOM but only renders specific spots in it which mismatches with the new (virtual) DOM;

Now when we assign keys to elements in list, we are actually giving identity to each individual element inside the list; they key attribute basically gives identity to an element in a list;Since in a list of elements you can't really tell which element is which element; you can only identify elements based upon some limited parameters such as their index number inside the array / list in which they lives; and for react to recognize each element individually inside an array; we send "key" attribute along with the element and this attribute helps react to keep track of the element inside the array / list and knows which element is this and which element is that;

So when any change is made to a certain element out of a list of elements ; based upon the key attribute react compares an element in the new (virtual) DOM against the element with the same key in the current DOM and if react find any changes in both the elements ; it is gonna re-render it.

so keys helps react recognize elements; and therefore react looks how a particular element looked before (in actual dom) and how it looks now (in new virtual dom); in case of mismatch the element is re-rendered otherwise not;

//////////////////////////////////////////

//////////////////////////////////////////////////////////////
WHY ASSIGNING INDEX AS KEY TO A LIST ELEMENT IS INEFFICIENT ?
//////////////////////////////////////////////////////////////
It is inefficient because the list of elements is created via map method each time the render method executes upon state change; now let's suppose that we deleted a certain element from the array(that particular array which we are mapping out to list of react elements), now if we delete an element from the array or prepend an element to such an array then in such a situation the indices  get updated and the value of the "key" attribute in the NEW VIRTUAL DOM for each element will also get updated; now since react recognizes elements based upon their keys; so now if react compares an element having key=1 from the NEW VIRTUAL DOM against the element having the same key from the OLD / EXISTING DOM , react will see them both to mismatch and hence same goes for each and every element from the new and the old dom; and therefore again react will have to re-render the whole list of elements;

///////////////////////////////////////////////////
Step 1: Break The UI Into A Component Hierarchy
///////////////////////////////////////////////////

///////////////////////////////////////////////////
Step 2: Build A Static Version in React
///////////////////////////////////////////////////

////////////////////////////////////////////////////
Step 3: Identify The Minimal (but complete) Representation
Of UI State
CHOOSING THE RIGHT STATE / REACT STATE ATTRIBUTES
//////////////////////////////////////////////////
A react state must hold the following attributes:
1) is not getting computed / derived from any other piece of data;
2) is not passed as prop from parent to children via props
3) should be mutable (means should be something that changes over time)

How to decide a minimist state for your react app ?
Make a list of all pieces of data involved in your app;
And then choose that piece(s) of  data as your react app state that holds the above attributes;

/////////////////////////////////////////////////
Step 4: Identify Where Your State Should Live / Which component should possess the state?
/////////////////////////////////////////////////
To conclude which component should have the state that you identified in STEP 3 ; you have to do following things:
1) First off: Identify all those components that re-renders based on that state.
2) Then Find a common ancestor / owner component to all such components
3) you finally got it: Either the common owner or another component higher up in the hierarchy should own the state.
4) If you can’t find a component where it makes sense to own the state, create a new component solely for holding the state and add it somewhere in the hierarchy above the common owner component.

//////////////////////////////////
WHAT DOES JSX TRANSLATES  TO ?:
/////////////////////////////////
TLDR: JSX is an Expression Too and no matter how much ever a jsx expression is nested and long it is still one expression and gets translated to one single React.createElement() call which returns a React Element; the nesting of JSX expression only increases the number of arguments to the React.createElement() function call;

REMEMBER ALWAYS: One of the restrictions of JSX is that it doesn't allow you to write sibling JSX elements; for example:

         const inValidJSX =  (
                              <div> A Div </div>
                              <p> A Paragraph </p>
                             );

What Ever you write on the right hand side of the above is actually a single JSX expression which gets translated to ONLY A SINGLE JSX CALL:

         const JSXReturnsReactEle = React.createElement();

Wherein React.createElement([...infiniteArguments]) accepts infinite arguments; and only returns a single React Element no matter how long and nested the JSX expression is;

So we can say that:

         JSX expressions must have one / single parent element;

/////////////////////////////////////////////
WHAT ARE CURLY BRACES {} USED FOR ?
/////////////////////////////////////////////
Whenever a JSX tag is encountered the JSX parser comes to the play and parses the JSX expression; now JSX is javascript but whatever comes inside the opening JSX tag till the closing tag is parsed in a different way than that of the normal javascript code since this is a special JavaScript Syntax (an extension to JavaScript so it is Transpiled to normal JavaScript by the React JSX parser). Now if you want the JSX parser to sit back for a while and let the JavaScript V8 chrome engine to come into play then you have to make use of the CURLY BRACES here (what i just said onward "sit back" is literally not true but it was just for understanding purpose THEN WHAT IS TRUE? READ BELOW: search for : "WHAT IS TRUE ?");

Inside the { } curly braces you write a normal JavaScript expression (REMEMBER AN EXPRESSION NOT STATEMENT) you can't write if statements etc ; you can only write expressions , expressions are those which returns something; for example the followings are expressions:

            -> call to a function
            -> 2 + 2
            -> true ? 'a' : 'b'
            -> 'k'
            -> 3
            -> or a variable cuz variable returns the value it
               points to;

///////////////////////////////
WHAT IS TRUE ?
///////////////////////////////
Whenever JSX is encountered the v8 engine never comes back into play until the end of the JSX expression , the whole play is in the hand of the JSX parser;
curly braces doesn't let javascript come back; it is still the JSX parser which on encountering a curly brace changes it's perspective and look upon whatever is inside the curly braces as normal JavaScript and not JSX;

<h1 style={JSVariable}> is not technically JavaScript. It's JSX and its syntax calls for curly braces when you want to use a JS expression in JSX.

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

import React, { Component } from 'react';
//reason why things are imported like that above: https://stackoverflow.com/questions/31852933/why-es6-react-component-works-only-with-export-default
//TLDR: "default exports" from external js files are imported without the curly braces and there can be only one default export per js file, you can also rename default exports while importing them WHILE on the other hand while importing "named exports" which are actually the non-default exports from an external file you have to import them by writing them inside curly braces and have to import them exactly typing the name inside the curly braces with which they are exported; so you can't rename them while importing them; you have to import them exactly as they were exported;

//////////////////////////////////////////////////////////
                        HOOKS
//////////////////////////////////////////////////////////
Introduction:
            In react when you use class based components you get access to lifecycle methods(like componentDidMount, componentDidUpdate, etc). But when you want use a functional component and also you want to achieve the functionality that you would achieve via lifecycle methods inside a class component, you have HOOKS made available to you onwards react version 16.8 to let you achieve the features that were previously only achievable inside class based components.

Hooks are functions that can be used inside functional components to achieve stateful-ness and features same as lifecycle methods.

REACT SAYS:
            There are no Hook equivalents to the uncommon getSnapshotBeforeUpdate, getDerivedStateFromError and componentDidCatch lifecycles yet, but we plan to add them soon.

you can think of useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined.

Hooks are the functions which "hook into" React state and lifecycle features from function components. It does not work inside classes.

Only call Hooks at the top level of React functional components

=================
useEffect() Hook:
=================
the useEffect hook is used to render a piece of code on every render; By using this Hook, you tell React that your component needs to do something after render.

It accepts a function. The function passed to useEffect will run after the render is committed to the screen.

IN THE LINE ABOVE: the effect refers to the function that you pass to the useEffect() hook;

React defers running useEffect until after the browser has painted, so doing extra work is less of a problem.

By default, it runs both after the first render and after every update. So, instead of thinking in terms of “mounting” and “updating”, you might find it easier to think that the effect function is run simply: “after render”. React guarantees the DOM has been updated by the time it runs the effect.

It doesn't returns anything!

///////////////////////////////
   useEffect Dependencies
///////////////////////////////
CONDITIONALLY FIRING AN EFFECT(FUNCTION):
==> second argument to useEffect that is the array of values that the effect depends on. this array is called the DEPENDENCY ARRAY!! this array holds all those exceptional reactive values for which you want to trigger the effect function upon when they change!!!

==> If you want to run an effect only once on the first render (which is called a mount), so basically if you only want to run the effect upon mount, then simply pass an empty array [] as second argument. This tells React that your effect doesn’t depend on any reactive variable, and so the effect won't run if any reactive variable changes and the DOM re-renders;

While passing [] as the second argument is closer to the familiar componentDidMount

e:g:-

useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]);

In the example above, we pass [count] as the second argument. so effect Only re-run if the reactive variable count changes.

REMEMBER THAT:
         There is nothing passed to the effect function. The array of dependencies is not passed as arguments to the effect function.

============================================================
                        CUSTOM HOOKS
============================================================
Remember when you say inside a functional component:

const FunctionalComponent = () => {
   useEffect(effect);

   return (
      SOME JSX;
   );
}

Note that we are calling the useEffect() function before returning the JSX. The call to the useEffect(effect) will be made first and the useEffect will basically hook/attach your function(the effect) to one of the lifecycle methods which upon invocation after the render will also make the effect to be fired in context of your Component Object;

So at the end of the day, the useEffect(effect) is sort of Hooker, which will hook the effect function to one of the Component Object life cycle methods such that when the component object is rendered and is mounted onto the DOM and the lifecycle method is triggered by 'react' your effect which was chained to this lifecycle method for this particular Component Object will also be fired in context of this very given component object;

NOW COMING TOWARDS CUSTOM HOOKS:
A custom Hook is a JavaScript function whose name starts with ”use”
it’s just like a normal function.
==> Whenever you call a custom hook from inside of a component, this custom hook (baiscally the function starting with 'use') is going to be invoked in context of your current component object, and all the hooks from inside of this custom hook such as 'useState' and 'useEffect' will be executed in context of the same context in which the custom hook function was invoked i:e the given unique component instance/object;

every time you use a custom Hook, all state and effects inside of it are fully isolated.

JUST THINK THAT EACH TIME YOU INSTANTIATE A COMPONENT I:E EACH TIME YOUR SAY <COMPONENT /> EVERYTHING HAPPENING WILL BE ISOLATED FOR THAT VERY COMPONENT INSTANCE;

====================================
      useEffect() cleanup
====================================
SOLVING THE PROBLEM OF WHEN THE effect FUNCTION HOOKED ONTO LIFECYCLE METHOD VIA THE useEffect() Hook TRIES TO UPDATE THE STATE OF AN UNMOUNTED COMPONENT;

Solution:
         Whenever you return a function definition from inside of an effect function, that function is hooked to the "ComponentWillUnmount" lifecycle. Which means that this returned function will be run each time the function unmounts;

         Now taking advantage of this behaviour we simply return a function from the effect function, and this function is referred to in react as "CLEANUP FUNCTION";

         We implement this function's body in such a way that when a component is unmounted, the function body will run and will ABORT any operations and processes that are associated with the instance of something called "ABORT CONTROLLER";

         AbortController() is a built-in Javascript class that offers you bunch of methods; one of such methods is called: Abor

         What we do is that we create an instance of the AbortController() class and associate it with any process we want. For example if we want the AbortController instance to be associated with the fetch() call inside the 'effect' function, we pass the instance of the AbortController() class as second argument to the fetch() function as follows:

            fetch(url, {signal: instanceOfAbortCont.signal})

         now the AbortController() instance is associated with this very fetch() call;

         Now you have control over your fetch call, you at any time can use the instanceOfAbortCont to Abort the fetch() process at anytime you want;

         So we will Abort the fetch() call inside the "cleanup function" because the cleanup funciton will be invoked upon the component object umount, and when the component unmounts we don't want the fetch() call to proceed and as a result update / populate the state of our component with the data returned by the fetch() call;

         So the cleanup function will look something like follows:

         return () => instanceOfAbortCont.abort();

         REMEMBER THAT:
               When we abort a data fetch() process, the fetch will throw an Error an the name of that Error is going to be: 'AbortError'

////////////////////////////////////////////
            ROUTE PARAMETERS
////////////////////////////////////////////
Parameterized Routes that your define are the ones which are capable of accepting dynamic argument(s)

The changeable parts of such Routes are called "ROUTE PARAMETERS"

It is like a variable inside a route;

The component to which a Parameterized Route is directed, you can access the parameters from the route inside that component via a react hook called 'useParams()'

//////////////////////////////////////////////
INSTALLING AND RUNNING ESLINT AS A DEV DEPENDENCY:
//////////////////////////////////////////////
==> run in your project root folder:
         npm install -D eslint
==> then:
         ./node_modules/.bin/eslint --init

////////////////////////////////////////////
         THE DOT .env FILE
The .env File contains environment variables:
////////////////////////////////////////////
ON A QUICKER NOTE: after adding the .env file you need to restart your server in order to enable react to import all the enviroment variable's values form the .env file to your app's environment;

The environment for your react app is: process.env this is where all the environment variables are attached to;

REMEMBER THAT: every time you want to use environment variables in your react app, you should be really careful about naming such variables inside the .env file for your react project, because only those variables will be brought by react into the react environment from its .env file which follows a certain naming rule. and the naming rule is follows:

            "REACT_APP_"  <== React's environment variables should be prefixed by REACT_APP_ otherwise they won't be imported into the react's envvironment out of the dot .env file that belongs to the react app;

Environment variables are just like those variables that you set in windows after downloading python or node; e:g as sometimes when you download a piece of software and windows asks you after installation wether you would like to add it to environment variables; such that when these softwares would run in windows environment , the variables set in windows env are going to be readily available to these softwares;

The .env file holds environment variables for the environment in which your app runs; so basically it simply holds env variables for your app;

It’s actually a simple configuration text file that is used to define some variables you want to pass into your application’s environment;
a simple text configuration file for controlling your Applications environment constants.

.env files are line delimitated text files, meaning that each new line represents a single variable. By convention .env variable names are uppercase words separated by underscores. Variable names are followed directly by an = which, in turn is followed directly by the value, for example:

syntax:- ENV_VARIABLE=VALUE
and
In the case of Node.js: process.env[ENV_VARIABLE]=VALUE.

This file needs a something like a parser to make it work. The parser reads the variable definitions one-by-one and parses them to the environment.

They are not just parsed out of the box , you need an npm package to be able to use environment variables in your app;

it is interpreted by the npm dotenv package.

Nearly every programming language has a package or library that can be used to read environment variables from the .env file

Environment variables are one of the key ways software developers provide an application with sensitive information;

not only environment variables but you can also set configurations inside this file;

All your variables from this .env file are parsed by an npm package and During application initialization, these are loaded into the env property of the process object:- process.env. E:g then you would access them like follows:
         process.env.REACT_APP_METEORITE_STRIKE_DATASET

At runtime, the reference to the environment variable name is replaced with its current value.

////////////////////////////////////////////////////////////////
ADVANTAGE OF THIS FILE / WHY INFORMATION IS CONSIDERED SAFE IN THIS FILE ? WHY INFORMATION IN THE .ENV FILE IS CONSIDERED SAFE
////////////////////////////////////////////////////////////////
That's because there is not even a single place in the entire source code of your application where the value of these variables is evaluated!
The value of these variables is set outside of your program/application.
They lexically lives in your program but they can be seen nowhere in the program where they are derived from;
BECAUSE:
These variables are replace at runtime with the values they hold inside the .env file;


////////////////////////////////////////////////////////////////
         WHY WE DON'T USE *this* KEYWORD
         WHEN USING FUNCTIONAL STATEFUL COMPONENTS ?
         In a function component, we have no this. why ?
////////////////////////////////////////////////////////////////
When using functional stateful components, we don't use *this* keyword to control the state of our component that's because the setState function returned by the useState() hook holds a permanent reference to our state variable and therefore no matter where-ever this setState returned by the useState() is used to change the state variable , it will only change the very state to which it holds the reference unlike the classical components where you have to refer explicitly to the state of the current very component via the *this* keyword;

Normally, variables “disappear” when the function exits but state variables initialized via the useState() hook are preserved by React and the function that holds reference to them setState() are also preserved even after the functional component constructor exits.

What does useState return?
It returns a pair of values: the current state and a function that updates it. This is why we write const [count, setCount] = useState(). This is similar to this.state.count and this.setState in a class;

Docs says:
      useState returns a pair: the current state value and a function that lets you update it. You can call this function from an event handler or somewhere else. It’s similar to this.setState in a class
*/


/****************************************************************
 ////////////////////////////////////////////////////////////////
                              REDUX
 ////////////////////////////////////////////////////////////////
 ****************************************************************/
/*
What is a state ?
At the end of the day state is what determines what a user should see on the screen!
For example: a state "isUserAuthenticated" is going to decide what components a user should have access to and therefore what a user should see on the screen!

Why need REDUX?
React library itself is very great at reacting to change in a state and updating the UI accordingly BUT MANAGING THE STATE can become very difficult especially when the number of components and therefore the associated number of states grows; Therefore as your application grows it can become very difficult to pass states around from one component to another such that to avoid duplicate states; also keeping states for two components in sync is not preferred rather lifting the state up is preferred over that; so things can becomes complicated; REDUX TO RESCUE!!!

WHY WE CAN'T USE A GLOBAL OBJECT TO STORE ALL OUR APP STATES ?
That's because if we do so and we make changes to that object inside of some event handler then react is not going to react to these changes, for example:

const globalState = {
   name: 'ilyas'
}

const FunctionalComponent = () => {
   const [name, setName] = useState(globalState.name);

   const handler = () => globalState.name = 'khan';

   return (
      <div onClick={handler}>
       {name}
      </div>
   );
}

upon clicking the div on the UI , the value of the name property inside the globalState object will change, now the our component internal state also held the same value as that of the name inside the globalState object but it only held it as a value not as a reference so it means that react won't react no matter how much we change the globalState object; so it means that we can't store our app state in a centralized object;

NOW: Redux also implements the same idea but it is implemented in such a way that it makes react to be reactive to a central state holder;

In each Redux applicaton we have a central storage that stores the entire application state;

Components interact with this central javascript object that redux offers BUT NOT DIRECTLY; Doing so the react's reactivity won't work;

There is a certain process that each component has to follow in order to utilize or manipulate the states stored inside the global states storage;

Your component is going to dispatch an ACTION that it wants to perform; think of the ACTION as a parcel/ a package / a box, that holds some information such as the type of action and payload (data need by the action which you are going to perform to the state in the redux); So in short ACTION is an information parcel that you are delivering to Redux

NOW this information package is not going directly to the store: rather it goes to something called "REDUCER" because it doesn't include the instruction on how to change the store , it just holds information on what to do, it is unaware of the "how" part;

The reducer a pure javascript function that is directly connected to the store; This reducer function accepts the information package, it opens it and based upon the information inside this package it makes changes to the storage;

Inside the reducer function you listen to different type of actions;

The reducer holds different pieces of code where each particular piece of code is going to be run by the reducer based upon the type of ACTION; so inside the reducer different action are routed to different pieces of codes;

The reducer spits out the updated state based upon the old state and the type of action and this updated state is stored in the store replacing the old state in the storage;

Now how is a component going to get back the updated state from the storage again ?
Via a mechanism called: 'SUBSCRIPTION MODEL'

Whenever a change is made to the states inside the storage: the store is going to trigger all the subscriptions

Now our components are going to subscribe to store updates, so the components will receive these updates automatically when the subscriptions are triggered; so each subscribing component will be like hey store i want to be notified whenever the state in the store changes;

SO IN SHORT FOR A COMPONENT TO:-
1) MAKE CHANGES TO THE STORE: component is going to submit a request like hey i want to change this particular state in the store;
2) GET A PARTICULAR STATE FROM THE STORE: component should subscribe to store changes like hey i want to be notified about any changes in the store

REMEMBER:
      You can't make changes to your application's current state inside the reducer function, you must return the updated state from the reducer function and the state in the store will be updated accordingly;

      What does that mean ? 
      This means that each time a component based upon some user action dispatches an action to the reducer function via the store.dispatch() method, the reducer function is going to receive the (state, action) where the state is the current state of the application and the action is the action object; So inside your reducer function now state refers to the current state of your application BUT YOU ARE NOT allowed to make changes to it directly inside the reducer function based upon the information you have inside the action object; rather what you should do is that create a fresh new object and inside this new object copy the current state of your application via the spread ... operator and then override the properties of your application's state with updated values; and return this new fresh updated object (which is not the state of your application) from the reducer function and the state inside your store which is the current state of your react app will be automatically compared and matched against this new object returned from the reducer function and hence will be updated!!!

REDUX offers a central state storage for your application;

You can think of a Redux as a giant javascript object that stores the state of your entire application;

Redux is a standalone third party state management library for react applications;

Central storage for the data needed by your application! central state for the components in your app; Each component can go and collect the data that it needs from the Redux; Redux passes the data to a component in form of props;

It is only the Reducer which is allowed to change the  (central data store)

*/
//A very basic redux workflow that we can integrate into a react app:
const redux = require('redux');

const initialState = {
   counter: 0
};

// SETTING UP REDUCER
const rootReducer = (state = initialState, action) => {
   //here we will listen to different action types
   //the reducer function returns the updated state as a new fresh object without mutating the original state (which is inside the first arg)
   if (action.type === 'INT_COUNTER') {
      return {
         ...state,
         counter: state.counter + 1
      };
   }
   if (action.type === 'ADD_COUNTER') {
      return {
         ...state,
         counter: state.counter + action.payload.value
      };
   }
   //if none of the above condition matches the current state is going to be returned
   return state;
};

// CREATING STORE
//the createStore is a redux method that allows us to create a new redux store for storing the entire state of our app:-
const createStore = redux.createStore;
//a redux store is initialized via a reducer means the initial state of the store is decided by the reducer function that's why we pass the reducer to the store creator (the createStore store constructor); And also know that, the redux store is tightly in contact with the reducer and it is only the reducer that each time decides what the current situation of the store is going to be; 
const store = createStore(rootReducer);
//now your store is created with the state returned by the reducer inside it so:
console.log(store.getState()); //OUTPUTS: {counter:0} 

// SUBSCRIPTION TO STORE
// subscription to store makes sure that we only call the store.getState() to get the snapshot of the current state when a change is made to the store; so subscription helps us to getState() from the store only when we are sure that a change has been made to the store and we should now take snapshot of the new state in the store:
store.subscribe(() => {
   //the store's subscribe method takes a callback which is going to be executed always whenever the store is updated.
   //so this callback is sort of sitting in the listerner's environment and is listening for the store change event
});


// DISPATCHING ACTION
// the argument to the dispatch function is what we call action this is what is dispatched to the reducer, this action must be an object with a "must-have" property named "type" and the value of this type key should be in upper case by convention and there will be a listener associated with each action type you dispatch to the reducer function;
//the dispatch method is going to pass this action object as second argument to your rootReducer function and as first argument the current state of your application;
store.dispatch({ type: 'INC_COUNTER' });
store.dispatch({ type: 'ADD_COUNTER', payload: { value: 10 } });

/****************************************************
 ////////////////////////////////////////////////////
         CONNECTION REACT TO REDUX
   INTEGRATING REDUX INTO REACT APPLICATION
 ////////////////////////////////////////////////////
 ****************************************************/








