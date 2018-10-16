import React, { Component } from 'react';

class Letter extends Component {

    selectLetter = () => {
        this.props.selectLetter(this.props.letter) // //calling App's selectLetter
        this.props.changedScore(this.props.letter)
    }
    
    render () {
        return (
            <span
                className={this.props.styleClass}
                onClick={this.selectLetter}> 
                {this.props.letter}
            </span>
        );
    }
}

export default Letter;