class App extends Component {
  constructor() {
    super()
    this.state = {
        users: [
            {name: "", title:"", promotion:"" },
            {name: "", title:"", promotion:""}
        ]
    }
  }

  promotion = (name) => {
      let userToUpdate = this.state.users.find(u => u.name === name)
  }

  render () {
      return (
          <div>
          {this.state.users.map(u => <User key={u.name}
          name={u.name}
          title={u.title}

          promotion={this.promotion} />)} // passing down a method!!

          </div>
      )
  }

# when we're passing on a method, the child can now use it through *props!

# what we know so far:
* What components are and how to make them
* How to nest components + (how to load children components from a parent component)
* JSX
* How to pass data down from a parent to its children + (how to get that data in the child through props)
* What state is + (how to use it as well as setState) + (we can have local state as well)
* The top-down approach to data flow in React

<!-- In this lesson, we will talk about sending data back up the component tree - i.e. from a child back to its parent -->
# It’s great to have a top-down data flow because that assures us we only have one source of truth to all our data, and only one place where a change can take place.
# This change will update the DOM accordingly for us, and we need not worry about messing with DOM manipulation ourselves.
However, What happens if I want one of the children to trigger some change???

* When the user clicks a letter, we want that letter to be removed - i.e. show some visual cue that it’s been pressed - and we want it to appear elsewhere => But the letter is in our Letter component - that’s a grand-child of where our state is, which holds our letterStatus object.
So how does a single letter component trigger a change in App's state?

<!-- Events -->
# we send data downwards, But we can also send other things downwards. Specifically, a parent can send functions down to its children pretty much the same way it sends other data!!

*  in our App.js we have a deleteLetter method that - when invoked - removes the first letter of the letterStatus object. Before, we had a button click triggering that function.
* Instead, let’s pass the function down to the Letter component and have the letter itself invoke it.
remember:
1. You can pass a function the same way you pass anything else
2. You can access the function through props the same way you can access other data passed down
* *** Note *** : you’ll have to pass the function down twice, from the App component to the Letters component, and from Letters to Letter
<!-- ==== chart ====: https://s3-us-west-2.amazonaws.com/learn-app/lesson-images/react-data-flowchart.PNG -->

#  data (in the above, the deleteLetter function) goes down, and events (the invocation) come up !! - and when the events cause a change in the state, React will re-render our DOM accordingly and automatically!!!

* why we wanted a letterStatus object as opposed to just a letters array.
 when the user selects a letter,

 * it should have some visual marking on it that marks it as selected - this will come from Letters,
 * if that letter is part of the secret word, then it should appear in the Solution section - and be invisible otherwise =>
 # As such, both Solution and Letters need to display their letters differently depending on whether the letter was selected. That means we need to know the status of each letter at any given time

 <!-- Letters.jsx -->

 generateLetterTags() {
    const letterStatus = this.props.letterStatus
    return Object.keys(letterStatus).map(l => {
        return (<Letter
            key={l}
            styleClass={letterStatus[l] ? "selected" : null}
            letter={l}
            deleteLetter={this.props.deleteLetter} />)
    })
}
<!--  -->
A few things we’ve done:
* Changed the function signature - the function no longer receives letterStatus, but rather it gets it by itself from props
* Split our return to several lines for clarity - this is why we wrap our return value in parentheses, by the way.
* Added a styleClass property - we will use this inside of Letter to determine what styling to give each letter.

# What we’re doing is passing down the styleClass property conditionally - that is, if letterStatus[l] resolves to true, we’ll pass the string selected, otherwise we’ll pass null
    styleClass= {letterStatus[l] ? "selected" : null}

* The Letters parent will send a string of selected or null, and the Solution parent will always send solutionLetter - all those option, and our Letter component couldn’t care one bit. It just wants a styleClass so it can know which className to assign!

Now let’s talk about the deleteLetter method which we used as an example of how a child can access a parent.

Of course, we don’t want to delete a letter, we want to select one, and then in App change its status from false to true.

So first thing’s first, we’ll want to change the deleteLetter method in App to a selectLetter method.
* The method should accept one parameter, a letter
* It should make a copy of the state, like it did before
* It should change the letter’s status to true inside letterStatus
* It should call setState with the updated object

# Next, inside of Letter, we don’t want to directly call selectLetter. We need to call it and pass the selected letter - as per the function signature we just created.
As such, instead of onClick calling the method from props directly, we’ll call an internal method in Letter, like so:

<!--  -->
class Letter extends Component {
    selectLetter = () => { //new method we're adding to this class
        this.props.selectLetter(this.props.letter) //calling App's selectLetter
    }
    
    render() {
        return (
            <span
                className={this.props.styleClass} 
                onClick={this.selectLetter}> //calling this component's selectLetter
                {this.props.letter}
            </span>
        );
    }
}
<!--  -->

* So now onClick is calling Letter's own selectLetter function, which (using props) calls the selectLetter that was passed down to it from App. The Letter method passes the App method this.props.letter, and bam it’s done.

<!-- CHART =>
Shttps://s3-us-west-2.amazonaws.com/learn-app/lesson-images/react-data-flowchart-selectLetter.PNG -->

# So now an internal method of Letter is invoking App's selectLetter method - this gives us a lot more flexibility if we wanted to do other things before invocation (like maybe check if the user finished the game?)

## to sum-up: ##
Here’s an overall recap of the app:

# We have one letterStatus object in App's state
# Each letter is initially mapped to a value of false, representing that it has not been selected

# Both Letters and Solution use this object to display their letters/underscores/crossed-out-letters according to their status.
# The Letter component calls selectLetter when a letter is pressed
# The selectLetter method changes the status of the selected letter to true
# This change occurs through the setState function
# Both Letters and Solution get updated automatically because setState was called

# Now, whichever letter is mapped to true will be displayed differently