import React, { Component } from 'react';
import Result from './result';
import Game from './game';
import './App.css';
function changeToSec(arr){ //转换成二维数组
  let tmpArr = [];
  tmpArr.push(arr.slice(0,4),arr.slice(4,8),arr.slice(8,12),arr.slice(12,16));
  return tmpArr;
}
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      arr:[
        '','','','',
        '','','','',
        '','','','',
        '','','',''
      ]
    };
    this.startPos = {
      'x':0,
      'y':0
    };
    this.rowTo = 1; //大于0说明往上
    this.columnTo = 1; //大于0说明往右
  }
  componentDidMount(){
    this.reset();
  }

  render() {
    return (
      <div className="app">
        <Result/>
        <div className="tip">合并这些数字可以获得2048方块</div>
        <Game arr={this.state.arr}/>
      </div>
    );
  }
  reset(){
    let a =parseInt(Math.random() * 16);
    let b = parseInt(Math.random() * 16);
    let arr = this.state.arr.slice();
    console.log(a,b);
    arr[a] = 2;
    arr[b] = 2;
    this.setState({arr:arr});
  }
  touchStart(event){ //触摸事件开始
    let touch = event.targetTouches[0];
    this.startPos.x = touch.pageX;
    this.startPos.y = touch.pageY;
  }

  touchEnd(event){
    event.preventDefault();
    let touch = event.targetTouches[0];
    let rowTo = touch.pageX - this.startPos.x;
    let columnTo = touch.pageY - this.startPos.y;
    let arr = changeToSec(this.state.arr);
    if(rowTo>10){

    }
  }

  contactUp(arr){  //向上合并数组
    
  }
}

export default App;
