import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  getStuff() {
    return (
      <li>
        <ul style={{ fontStyle: 'italic', color: 'magenta' }}>this is me</ul>
        <ul style={{ fontStyle: 'italic', color: 'magenta' }}>another pointless sentence</ul>
      </li>
    );
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p style={{ color: 'pink' }}>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <h4 style={{ backgroundColor: 'grey' }}>just adding something to check react</h4>
          <div> {this.getStuff()} </div>
        </header>
      </div>
    );
  }
}

class Sum extends Component {
  num1 = 50
  num2 = 42
  render() {
    return (
      <div className="App">
        <h1 style={{color:'purple', fontSize:14}}> the sum is {this.num1 + this.num2} </h1>
      </div>
    );
  }
}

// class App extends Component {
//   text = 'dynamically'
//   render() {
//     return (
//       <h1>Going to display some text...{this.text}</h1>
//     );
//   }
// }

// {this.text} => Going to display some text {dinamically}
// ====== We did a few things here =========
// 1. Define a text parameter for the class
// 2. Insert text* (our data) as part of our JSX, exactly where we want it to appear on the DOM-
// In this case, we want it in between the h1 tags

// 3. Wrap text with curly braces
// 4. This is JSX’s way of identifying JS expressions

// We could put any valid JS expression in these braces - operations, function calls...
// {this.text} - that’s because text is a class-level variable, and must be referenced 



// export default App;
export default Sum;

