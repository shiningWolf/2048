import React, { Component } from 'react';
const COLOR = {
    1:'white',
    2:'#00ffc49e',
    3:'#c61e16d6',
    4:'#f5a719ed',
    5:'#7fce23',
    0:'#673ab7'
}
class Game extends Component {
    constructor(props){
        super(props);
    }

    render() {
        let list = [];
        for(let i=0;i<16;i++){
            let tmpColor = {color:'white'}
            tmpColor.color = this.props.arr[i] ? 
                COLOR[Math.log2(this.props.arr[i])%6] : 'white';
            list.push(<div className="gameObj" key={i} style={tmpColor}>{this.props.arr[i]}</div>);
        } 
        return (
        <div className="gameBox" onTouchStart={this.props.touchStart} onTouchEnd={this.props.touchEnd}>
            {list}
        </div>
        );
    }
}

export default Game;
