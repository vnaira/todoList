import React,{Component} from "react";


export default class ToDoList extends Component{

    
    
    render(){
        const {name,description} = this.props;
        console.log('props',this.props);
        return(
            <>
            {name} - {description}
            </>
        )
    };
};