import React, { Component } from 'react';

class Result extends Component {
  render() {
    return (
      <div className="relsutLine">
        <div className="box">
            2048
        </div>
        <div className="score">
            <div>得分</div>
            <div>{this.props.score}</div>
        </div>
      </div>
    );
  }
}

export default Result;
