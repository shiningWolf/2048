import React, { Component } from 'react';
import Result from './result';
import Game from './game';
import './App.css';
function changeToSec(arr,type){ //一维数组转换成二维数组
  let tmpArr = [];
  if(type == 'column'){
    for(let i=0;i<4;i++){
      tmpArr[i] = [];
      for(let j=0;j<4;j++){
        tmpArr[i].push(arr[j*4+i]); 
      }
    }
  }else{
    tmpArr.push(arr.slice(0,4),arr.slice(4,8),arr.slice(8,12),arr.slice(12,16));
  }
  return tmpArr;
}

function mergeArr(arr,bool){ //true：向上和向左，即下标从大到小合并
  let newArr = [],score = 0;
  for(let i=0;i<arr.length;i++){
    newArr.push([]);
    if(!bool){
      for(let j=0;j<arr[i].length;j++){
        if(!arr[i][j]) continue;
        if(newArr[i][newArr[i].length-1] !== arr[i][j]){
          newArr[i].push(arr[i][j]);
        }else if(arr[i][j] && newArr[i][newArr[i].length-1] === arr[i][j]){
          newArr[i][newArr[i].length-1] = 2 *  newArr[i][newArr[i].length-1];
          score +=  newArr[i][newArr[i].length-1];
        }
      }
      while(newArr[i].length < 4){
        newArr[i].push('');
      }
    }else{
      for(let j=arr[i].length-1;j>=0;j--){
        if(!arr[i][j]) continue;
        if(newArr[i][0] != arr[i][j]){
          newArr[i].unshift(arr[i][j]) 
        }else{
          newArr[i][0] = 2 *  newArr[i][0];
          score += newArr[i][0];
        }
      }
      while(newArr[i].length < 4){
        newArr[i].unshift('')
      }
    }
  }
  return {newArr,score};
}

function returnOne(arr,type){  //回到一维数组
  let newArr = [];
  if(type == 'column'){
    for(let i=0;i<4;i++){
      for(let j=0;j<4;j++){
        newArr.push(arr[j][i]); 
      }
    }
  }else{
    newArr = newArr.concat(arr[0],arr[1],arr[2],arr[3]);
  }
  return newArr;
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
      ],
      score:0
    };
    this.startPos = {
      'x':0,
      'y':0
    };
    this.rowTo = 1; //大于0说明往上
    this.columnTo = 1; //大于0说明往右
    this.touchStart = this.touchStart.bind(this);
    this.touchEnd = this.touchEnd.bind(this);
  }
  componentDidMount(){
    this.reset();
  }

  render() {
    return (
      <div className="app">
        <Result score={this.state.score}/>
        <div className="tip">合并这些数字可以获得2048方块</div>
        <Game arr={this.state.arr} touchStart={this.touchStart} touchEnd={this.touchEnd}/>
      </div>
    );
  }
  reset(){
    let a =parseInt(Math.random() * 16);
    let b = parseInt(Math.random() * 16);
    let arr = this.state.arr.slice();
    arr[a] = 2;
    arr[b] = 2;
    this.setState({arr:arr});
  }
  touchStart(event){ //触摸事件开始
    let touch = event.targetTouches[0];
    this.startPos.x = touch.pageX;
    this.startPos.y = touch.pageY;
  }

  touchEnd (event){
    let touch = event.changedTouches[0];
    let rowTo = touch.pageX - this.startPos.x;
    let columnTo = touch.pageY - this.startPos.y;
    let tmpArr;
    let result = null;
    if(Math.abs(rowTo) > Math.abs(columnTo) && Math.abs(rowTo)>10){
      tmpArr = changeToSec(this.state.arr,'row');
      result = mergeArr(tmpArr,rowTo>10);
      tmpArr = returnOne(result.newArr,'row');
      event.preventDefault();
      tmpArr = this.getNum(tmpArr);
      this.setState({arr:tmpArr,score:result.score+this.state.score});
    }else if(Math.abs(columnTo) > Math.abs(rowTo) && Math.abs(columnTo)>10){
      tmpArr = changeToSec(this.state.arr,'column');
      result = mergeArr(tmpArr,columnTo>10);
      tmpArr = returnOne(result.newArr,'column');
      event.preventDefault();
      tmpArr = this.getNum(tmpArr);
      this.setState({arr:tmpArr,score:result.score+this.state.score});
    }

  }

  getNum(arr){
    let newArr = this.getNullIndex(arr);
    if(newArr.length > 0){  //还有空位
      let a = parseInt(Math.random() * newArr.length);
      arr[newArr[a]] = 2;
    }else{  //已经填满
      
    }
    return arr;
  }

  getNullIndex(arr){  //获取空的索引
    let newArr = [];
    for(let i=0;i<arr.length;i++){
      if(!arr[i])
        newArr.push(i);
    }
    return newArr;
  }

}

export default App;
