# Creating a new react file : ___file_.jsx !!
======================================================

Remember,
* We want to break components down to fundamental parts of the app
* Components can be nested to create parent-child relationships, like normal HTML
* We must export and import our components accordingly

<!-- https://github.com/Elevationacademy/react-hangman/tree/props -->
<!-- answers to prev lesson! -->

# Where exactly do we write non-JSX code in this file?

# Remember, Letters is a class, so we can define properties at the class level, but any logic has to be within a method!!!
* As such, here is a generateLetterStatus method that creates this object for us:

generateLetterStatus() {
  let letterStatus = {}
  for (let i = 65; i < 91; i++) {
    letterStatus[String.fromCharCode(i)] = false
  }
  return letterStatus
}

* Part of the trick uses ASCII characters. For instance, the number 65 represents the letter “A” in ASCII, 66 == "B", and so forth until 90 == "Z".

*  now let’s go back inside the render function and get that object. 
# Remember, we’re still in a class, hence the this to access the method

render() {
    let letterStatus = this.generateLetterStatus()
}

<!-- Props -->

* we want our Letter component to display each letter. That means we need to pass some data down to the Letter component.

# The way we pass data == down ==  in React (i.e. from a parent to its children) is by using props. props is short for properties, and it is something built-in to every react component.

* Now if we want to pass some data down, we just have to do this: (Letters.js)
<!-- parent -->

<!--  -->
render() {
  return (
    <div>
        <Letter letter="A" />
    </div>
  );
}
<!--  -->

* What we’re doing here is passing a variable called letter, whose value is "A" to the Letter component.

* And to access that variable in the Letter component, we’ll use the built-in props, like this: (Letter.js) =>
<!-- child -->

class Letter extends Component {
<!--  -->
  render() {
    return (
      <span>{this.props.letter}</span>
    );
  }
}
<!--  -->

* Now if you refresh the page you’ll see the letter “A” appear!
Here we’ve accessed the props in Letter, which is a child component of Letters. The parent gave its child a letter, and the child simply displayed it - it’s pretty similar to a function that receives an argument and does something with it!

# Most components can be customized when they are created, with different parameters. These creation parameters are called props.
The letter is a parameter of any Letter component we create.

* to pass a variable down we’ll have to wrap it in curly braces, 

<!--  -->
const letter = "A"
return (
    <div>
        <Letter letter={letter} />
    </div>
);
<!--  -->

<!-- Mapping Props -->

# since letterStatus is an object whose keys are the letters, we have to use Object.keys to extract those into an array*.

generateLetterTags (letterStatus) {
    let letterTags = []
    for (let letter of Object.keys(letterStatus)) {
      letterTags.push(<Letter letter={letter} />)
    }
    return letterTags
}
<!--  -->
* in the render func: 
<div>
    <div>Letters will be here</div>
    {this.generateLetterTags(letterStatus)}
</div>

# We haven’t touched our Letter component since we told it to render using props . that’s because it doesn’t care about anything except for what it should display. Talk about separation of concerns.

# we can and will use array methods instead of long loops:

generateLetterTags(letterStatus){
    return Object.keys(letterStatus).map(l => {
        return (<Letter letter={l} />)
    })
}

* map will iterate over something (Object.keys(letterStatus) array - which is just all our letters)
* Do something with each item (the l => above indicates that) - in this case, create the <Letter... tag
* Finally, return a new array with all our tags - map always returns an array

The two returns may be a little strange, but they make sense:
* The inner one returns each letter’s new form (inside a Letter tag)
* The outer one belongs to the function, and returns an array of all of the letters’ new forms

<!-- Props for Functional Components -->
# In the receiving side (in the functional component), we do not use this.props
# Instead, we just receive the props as *almost-normal* function parameters

<!-- //Parent -->
let someData = "Oliver"
<FunctionalComponent props={someData} />

<!-- //Child -->
const FunctionalComponent = function(props){
  console.log(props.props)
  return (<div> Got this data: {props.props} </div>)
}

<!-- clean up our code a bit. Notice the function parameter in this one: -->
<!-- //Parent -->
<FunctionalComponent data={someData} />

<!-- //Child -->
const FunctionalComponent = function( {data} ){
  console.log(data) //no need for braces
  return (<div> Got this data: {data} </div>) //JSX always needs braces for expressions
}

# Either way, the key in the parent ( data=... ) must match the parameter name in the child ( {data} )

<!-- Prop Keys -->
* Warning: Each child in an array or iterator should have a unique "key" prop.
# when we pass “an array or iterator*” to a child (to Letter in our case), we should somehow make it unique. And it even tells us to make it unique by using a key props.

# *iterators are just data structures that can be iterated over
* Just like we passed letter = { l } before, we can do the same thing with key:
<!--  -->
generateLetterTags(letterStatus){
    return Object.keys(letterStatus).map(l => {
        return (<Letter key={l} letter={l} />) //notice the key property we're passing
    })
}
<!--  -->
* This both takes care of the warning, and gives us a simple way to access each letter.

<!--=========================     STATE     ============================-->

# Knowing how to pass things from a parent to a child is fundamental to React. This is known as a top-down approach to data flow, and one of the benefits is that children components are not aware of their parents - this allows us to reuse them anywhere so long as they receive the data (props) they need.

# State is an object that determines how [a] component*(and, possibly, its children) => renders & behaves  => it is where we will store component-specific data to be displayed.

* in our game- because we’re using a top-down approach to data flow, then it follows that we should store our state in App.js - the component that is the parent of both Letters, and the other component we haven’t created yet.

# Note: we do not always want to store our state in App. State should be stored at the closest common parent component - in our case, it just so happens that App is that component.

# Any component that doesn’t have its own state can be a functional component.

* Go on to your App.js file and - before the render method - create a constructor (regular OOP) inside the class. Inside the constructor, call super, and then add the following:
constructor() {
    super()
    this.state = {
    letterStatus: {}
 }
}

* Pass the letterStatus object from the state to the Letters component
* Since state is just a normal object, you should use this.state.letterStatus
* Inside the Letters component, remove the call to the generateLetterStatus function, and instead replace it with this.props.letterStatus

# State allows us to have one source of truth for our data . 
We have one place where we store our information, and everyone who needs access to it will get it from there.

# State helps us keep our top-down approach to data flow
The data will always flow down from the state in the parent to (the props in) the children

# State allows us to seamlessly update the DOM by only changing data in state

# Though we often pass data from one component’s state to its children, and the children retrieve that data using props - the two are not related at all!
# A component’s state is simply used for data storage that will determine the behavior/rendering of that component.

<!-- Updating State & (briefly) Events -->

<!-- We will eventually want to let the user “guess” a letter, which means it should be removed from the select-able letters -->
* So for now, we’re going to create a button in App that removes the first letter of the letterStatus object each time its pressed:
 instead of adding the onclick event that we know, React will have us using onClick (camelCase) => JSX.
 * Note: we’re not invoking the function in the onClick

# if we ** console.log(this)** inside of deleteLetter => undefined! =>  a React component does not automatically bind methods to itself 

# we have to bind methods to their components ourselves!!!
# we’re going to use ES6 arrow function syntax to do that!!!

<!-- Note: there are other ways to bind this =========================================================
https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56 -->

* we see that we have access to state through this now.
* we should not modify state directly!!!

# The only way you should ever modify the state is using React’s built-in (built-in to every component, accessed through **this**) setState method!!
* this.setState({propertyName: newValue})

# The setState method takes an object whose key* is some key in the state to be modified, and whose value is the updated value for that key. *** when we use setState, React will - among other things* - update the DOM for us, according to the new state.

# It is possible - and encouraged - to update multiple keys at once (instead of calling the method multiple times)

* When we use setState, we often need the property’s current value to start with:
<!-- if we have a Bank class which has a money property in its state -->
* this.setState({money: this.state.money * 2})
# Note that *** we are not modifying the state directly. We are merely accessing the money property, and multiplying it by 2. *** The modification is handled by setState

* // exe // => say we had a clients array as a property of state. And say we wanted to remove the last item in that array. We should not do this:
let currentClients = this.state.clients
currentClients.pop()
this.setState({clients: currentClients})

* This is bad because because this.state.clients is an array, which is a reference type - that means that even though we’ve created a new variable, currentClients, any modifications we make to that (the .pop() on the second line) will *** still affect the original array in state, as well.

 deleteLetter = () => {
      let letterStatus = {...this.state.letterStatus}
      const letters = Object.keys(letterStatus)
      let firstLetter = letters[0]

      delete letterStatus[firstLetter]

      this.setState({letterStatus: letterStatus}) // the right-hand side is the updated object
  }

* Create a new temporary variable, letterStatus*
* Get the letters using Object.keys like we have been doing
* Use the delete keyword to remove the first letter from letterStatus
* Call setState with an updated object

# The key should be the item in the state we wish to change
# The value should be the ** updated value of whatever we’re changing

# Note the use of the spread operator - this guarantees we do *** not modify the original state’s letterStatus. 
* Remember, objects (letterStatus. is an object) are also reference types.

# our components only render the current state, ever.

# setState is asynchronous: 
* once we call setState, we can’t write another line of code immediately after and expect it to be up-to-date with the new state =>
# For that, like with many asynchronous solves in JS, we need to use a callback. =>
setState has a second - optional - parameter for a function to be invoked once the state is done updating:

* //in the incr() method, change the set state and alert lines to this:
this.setState({ num: newNum }, function() {
  alert("New num is " + this.state.num);
});

* *Hint: Use split.(“”) to turn a string into an array
<!-- https://www.w3schools.com/jsref/jsref_split.asp -->

# The Object.keys() method returns an array of a given object's own property names, in the same order as we get with a normal loop.
<!--https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys -->