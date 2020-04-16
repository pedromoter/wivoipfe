import React,  { Component, Props } from "react";
import  autobind from 'class-autobind';

export const appContext = React.createContext({});

export class AppProvider extends Component<Props<any>, any>{

    constructor(props){
        super(props)
        autobind(this);
    }
    state = {
        isActive : false,
        loading  : false,
        room : {}
    }

    render(){
        return(
            <appContext.Provider value={{...this.state }}>
                {this.props.children}
            </appContext.Provider>
        );

    }
    

}