import React, { Component } from 'react';

export default class Input extends Component{
    state={
        text: ''
    };
    addTask = ()=>{

    }
    handleChange= (event)=>{
console.log(event.target.value);
    }
render(){
    return(
        <div>
            <input type="text"
                onChange={this.handleChange}
            />
            <button onClick={this.addTask}> Add Task</button>
        </div>
    )
}
}