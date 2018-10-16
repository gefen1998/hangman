import React, { Component } from 'react';
import Letters from './components/Letters';
import './App.css';
import Score from './components/Score';
import Solution from './components/Solution';


class App extends Component {
  constructor() {
    super()
    this.state = {
      letterStatus: this.generateLetterStatus(),
      score: 100,
      word: "CIGARETTE",
      hint: "you can smoke it!"
      // By doing this we’ve set our initial state in the constructor
    }
  }

  generateLetterStatus() {
    let letterStatus = {}
    for (let i = 65; i < 91; i++) {
      letterStatus[String.fromCharCode(i)] = false
    }
    return letterStatus
  }

  selectLetter = (letter) => {
    let letterStatus = { ...this.state.letterStatus }
    letterStatus[letter] = true
    this.setState({letterStatus: letterStatus})
  }

  // deleteLetter = () => {
  //   let letterStatus = { ...this.state.letterStatus }
  //   const letters = Object.keys(letterStatus)
  //   let firstLetter = letters[0]
    
  //   delete letterStatus[firstLetter]
  //   //    could also do this by: delete letterStatus[letters[0]]
  //   this.setState({ letterStatus: letterStatus }) // the right-hand side is the updated object
  // }
  //   we’ve changed the DOM by only changing the state (an object that determines how a component renders & behaves)
// =============================================
  // reduceScore = () => {
  //   this.setState({ score: this.state.score - 10 })
  // }

  changedScore = (letter) => {
    let letterExists= this.state.word.split("").some(l => {return (l=== letter)})
    if (letterExists) {
      this.setState({score: this.state.score + 5})
    } else {
      this.setState({score: this.state.score - 20})
    }
  }

  render() {
    return (
      <div>
        <Score 
          score={this.state.score} /> <br></br>
        {/* <button onClick={this.reduceScore}> Reduce By 10 </button> <br></br><br></br> */}
        <Solution 
          letterStatus={this.state.letterStatus}
          word={this.state.word}
          hint={this.state.hint} />
        <Letters 
          letterStatus={this.state.letterStatus}
          selectLetter={this.selectLetter} 
          changedScore={this.changedScore}/> 
      </div>
    );
  }
}

export default App;                                                                   