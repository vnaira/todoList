import React, {Component} from 'react';


class Counter extends Component{
    constructor(props){
        super(props);
        this.value = 0;

    }
    handleClick(event) {
        this.value++;
    }
    

    render(){
        
        console.log('props',this.props);
        return(
            <h3>component</h3>
        );
    }
};

export default Counter;