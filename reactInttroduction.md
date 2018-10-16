# React is - quite simply - a JS library for building User Interfaces. It is a great tool for building *SPAs* (Single Page Applications). Facebook has created React and open-sourced it for our use. =>

*In short, an SPA just means that the app re-writes the current page with new data whenever a change is made, as opposed to always asking the sever for a new page (new HTML).

# So far, any time we wanted to display/update information on our webpage (i.e. building our UI), we’ve used jQuery.
there’s nothing really wrong with jQuery, However it can become a mess to manage when your project grows.
<!-- https://reactjs.org/ -->

React is an extremely popular framework that is used throughout the industry. one of the most touted benefits is React’s speed.
# When we worked with jQuery and proper data flow, we always re-rendered our entire page’s data. We may not notice any performance issues on small-scale apps, but once our apps become bigger, then re-rendering everything isn’t as feasible.
Even just conceptually it makes sense to only update the thing that changed, rather than change everything.

# React comes with what’s known as a Virtual DOM - they did not invent this concept (and we’ll go more in depth later) - but briefly: the Virtual DOM is a copy of our actual DOM that is purely a *normal JS object.*

<!-- What is the Virtual DOM? -->
The virtual DOM (VDOM) is a programming concept where an ideal, or “virtual”, representation of a UI is kept in memory and synced with the “real” DOM by a library such as ReactDOM. This process is called reconciliation.

This approach enables the declarative API of React: You tell React what state you want the UI to be in, and it makes sure the DOM matches that state. This abstracts out the attribute manipulation, event handling, and manual DOM updating that you would otherwise have to use to build your app.

# Using the Virtual DOM, React does the following:
* Once an event happens, figure out what needs to change in the Virtual DOM
* Update the Virtual DOM accordingly (if it needs to update)
* Compare the Virtual and Real DOM
* In the comparison, React will look for differences
* When it finds a difference, it will update the actual DOM in that one location
# This may seem like a lot, but ultimately it is much easier and faster to work with objects than to render the DOM. So even though React does some behind-the-scenes work before updating the DOM, it eventually only has to update the relevant element(s) in the DOM.
* for exe - one div is physically affected when we delete an element.
* React is faster: Rendering the DOM is expensive, whereas manipulating objects is (generally) much cheaper. React renders less and manipulates objects more using the Virtual DOM.

<!-- START REACTING -->
<!-- Setup -->
To start a new react project we will use npm to do a lot of the heavy lifting for us. To that end, we’re going to install an npm package called create-react-app globally (will allow us to create a react application with all the necessary setup.)
Notice the global -g install so that we can use this command from anywhere.
# npm install -g create-react-app

The next part is to use that package, with a name for the project we want to create.
# create-react-app hangman

<!-- File Structure -->
Open up the project using
# code hangman
We already know node_modules, public, .gitignore, package.json, and the README.md.
So really all that’s new is the src folder and its contents. Of those, we’re really only interested (for now) in # App.js and index.js #

# npm start
* If you check out package.json you’ll see that under scripts.start we have react-scripts start - this is what we’re executing when we do npm start - this is what actually starts our react application

# index.js - It is a normal JavaScript file, You will likely never change it
ReactDOM.render(<App />, document.getElementById('root')); registerServiceWorker();
* ReactDOM gives us high-level methods for operations related to the DOM. 
*  One such method is…
ReactDOM.render(...) - this takes two parameters:
# What to render
# Where to render it …and renders the first param

<App /> - this is what we’re going to render.
# Though it looks remarkably similar, it’s not HTML. It is JSX (a syntax extension to JS which will eventually be used to render HTML). it is representing a component

document.getElementById('root') - this is where we’re going to render. find something on the DOM with an id of ‘root’

# ignore the registerServiceWorker() line 
# where is this root to which we’re adding whatever is? That’s in your index.html file - a file you will, again, not really want to touch.
* Inside the file, between all the comments, you should see a simple div. This is where everything in our app will render, eventually:
<div id="root"></div>

* ReactDOM.render(…) : take some JSX*, put it in the element with ID root.
* Behind the scenes, React takes this JSX and uses it to generate HTML. 
# JSX is not HTML - it is closer to JS.

* Add a class attribute to the h1 above, we would have to use className (camelCase) instead, like this:

ReactDOM.render(
    <h1 className='goldClass'> Hai. </h1>, 
    document.getElementById('root')
);

* This will be true for event handlers as well ( onClick instead of onclick )

# App.js - This is where the React fun begins.
Following a few imports, we see a class called App, which inherits from Component. This is just normal OOP that we’ve already learned!
* Component is just another class we’re inheriting from - React provides this class for us.
* react uses plain JS, no magic here.

# class App: 
class App extends Component {
  render() {
    return (/*some JSX*/)
  }
}

* method called render - required when you inherit from Component . You can do whatever you want inside of render,
but render can only return JSX!

* Note: you can return as much JSX as you want but it must all be encompassed within one tag (a div, li, any)
* Another note: generally, we wrap our returned JSX in parentheses to avoid issues with automatic semicolon insertion.
<!-- you should see all the changes appear on the page each time your save your file! -->

# JSX - stands for JavaScript XML.
# Don’t we always separate JS and HTML into separate files?
* It’s not HTML, it’s JSX
* React is different like that

# We’re still separating concerns, but we’re doing it with separate components instead of separate files.

# When we write JSX, React will use that to create React elements, which are effectively descriptions of where you want to see your data appear on the DOM. React will then read these elements (which are plain objects) and use them to create the DOM for us, and keep it up to date.

* Unlike jQuery/handlebars, we don’t have to “chase” our DOM in order to create/update it. When we use JS to work with our DOM, we can be certain that the logic we write will apply directly to the parts of the DOM that are relevant.

* We cannot have logic such as if-statements or for-loops inside of JSX. We can have logic like ternary operators and iterators.

# Components - a component will represent a part of our app that shows some data to the user.
If we had a restaurant app, we might have a component for the entire menu, and then sub (children) components for each menu item.
# components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.

# React handles all the “put-this-data-on-the-DOM” part - we just have to create a component that describes where in the DOM it should go once it’s rendered.

# Another benefit of components is that once we create one, we can re-use it anywhere in our app.

# A component, as we saw, is just a class that inherits from Component. If we define our components well, then much like normal classes, they should be independent and data-oriented, and therein lies their re-usability.

# export default app => 
exporting the class we created above, *important* because otherwise we could not access it from other files!
* we have an import at the top of index.js:
# import App from './App';
* (if we'd comment it out) : if we don’t export App, how can anyone import it?
#  you must export all your components so that others can import it.

<!-- More Components -->
<!-- The React docs themselves have a nice Thinking In React section which is worth checking out - 
https://reactjs.org/docs/thinking-in-react.html
but the short of it is that you should make your components small enough so they are maintainable and serve one specific purpose. -->

# To keep things organized, we’ve created a components folder inside of the src directory - and created an empty Letters.js file in there

* Notice that we use a capital letter for component files by convention.

* you should make your components small enough so they are maintainable and serve one specific purpose.

* We need to import Letters in App.js! import Letters from './components/Letters';

<!-- ========= Functional Components ========= -->
So far we understand a component to be just some class that returns some JSX to render some stuff.
# Some components either have a state or affect a state!

#  in certain situations, a component can be so simple that it doesn’t have or affect state at all. For these cases, we don’t need a class, not to mention the Component inheritance, or even the render method.

# components are just the building blocks of React. They’re like the HTML of a webpage; alone, they’re just placeholders for content.

# These components - (that render something on the page) - are called functional (stateless) components* => they’re just functions. *These are also known as presentational components, as opposed to our other container components that do have/affect state:

* example:

const Banner = function () {
    return (<div className="banner">THE LOGO</div>)
}

<!-- or better -->
const Banner = () => <div className="banner">THE LOGO</div>

<!-- ============ Component Tree ============ -->
<!-- https://s3-us-west-2.amazonaws.com/learn-app/lesson-images/react-component-tree-basic.PNG -->

* App is our root component
* we have Score and Letters as App's children
* we have Letter as a child of Letters.

# Note that the hierarchy of the component tree is determined by nesting the component tags in our JSX, which ultimately renders to normal nested HTML that we’ve seen before.

* we can imagine the hierarchy looking like this:

<!-- <App>

  <Letters>
    <Letter></Letter>
    <Letter></Letter>
    ....
  </Letters>

  <Score>
  </Score>

</App> -->

* Instead, we’ll see whatever is inside the JSX of each component’s render's return - but still in this hierarchy.

* We highly encourage you to draw out **** component trees when using React. ****

<!--========= QUIZ ========-->

* What is React? A UI library
* React uses a - Virtual DOM
* The Virtual DOM is good because: - It is a plain JS object which is faster to modify than the real DOM
* JSX is: An extension to Javascript that lets React to create React elements
* Unlike a normal component, a functional component: only uses 
1. normal JS functions, 
2. Has no state
3. Doesn’t need a render method

* What is a component tree? determains the hierarchy of the components by nesting the component tags in our JSX
