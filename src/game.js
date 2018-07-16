import React, { Component } from 'react';

class Game extends Component {
    constructor(props){
        super(props);
    }

    render() {
        let list = [];
        for(let i=0;i<16;i++){
            list.push(<div className="gameObj" key={i}>{this.props.arr[i]}</div>);
        } 
        return (
        <div className="gameBox" onTouchStart={this.props.touchStart} onTouchEnd={this.props.touchEnd}>
            {list}
        </div>
        );
    }
}

export default Game;
