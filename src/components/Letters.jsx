import React, { Component } from 'react';
import Letter from './Letter';

class Letters extends Component {

  generateLetterTags() {
    const letterStatus = this.props.letterStatus
    //  the function no longer receives letterStatus, but rather it gets it by itself from props
    return Object.keys(letterStatus).map(l => {
      return (<Letter
        key= {l}
        styleClass={letterStatus[l] ? "selected" : null}
        letter={l}
        selectLetter= {this.props.selectLetter}
        changedScore= {this.props.changedScore} />)
    })
  }

  render() {
    return (
      <div>
        <div style= {{ fontWeight: "bold", color: "violet" }}> Available Letters </div>
        {this.generateLetterTags(this.props.letterStatus)}
      </div>
    );
  }
}

export default Letters;