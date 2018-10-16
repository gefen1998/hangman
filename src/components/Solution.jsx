import React, { Component } from 'react';
import Letter from './Letter';

class Solution extends Component {

    // changed key to "le" - since error occurred 
    generateLetterTags() {
        return this.props.word.split("").map(le => {
            return (<Letter 
                key= {le} 
                styleClass= "solutionLetter"
                letter= {this.props.letterStatus[le] ? le : "_ "} />)
        })
    }

    render() {
        return (
            <div>
                {/* Render only the hint for now */}
                <div key={this.props.hint}> {this.props.hint} </div>
                <span key={this.generateLetterTags()}> {this.generateLetterTags()} </span>
            </div>
            // are my keys okay?
        );
    }
}


export default Solution;