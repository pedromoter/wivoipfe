import React, { Component, Props } from 'react';

import autobind from 'class-autobind';
import { VideoComponent } from './VideoComponent';

export  class RoomPage extends Component {
    constructor(props){
        super(props);
        autobind(this);

    }

    render(){
        return(
            <VideoComponent></VideoComponent>
        );
    }

}
