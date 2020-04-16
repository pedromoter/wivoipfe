import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import  { App } from "./App";
import { RoomPage } from "./room"
export class Router extends Component {

    render(){
        return(
<main>
            <Switch>
                <Route path="/" component={App} exact />
                <Route path="/session" component={RoomPage} exact />
            </Switch>
        </main>


        ); 
    }

}