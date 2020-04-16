import React, { Component, Props} from 'react';
import './App.css';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  Modal, ModalBody, ModalHeader 
} from "shards-react";
import autobind from 'class-autobind';
import axios from 'axios';
import { appContext } from './appContext';

export class App extends Component<any> {

  constructor(props){
    super(props)
    autobind(this);
  }

  state = {
    host : false,
    join : false,
    code : "",
    name : ""
  }

  form = React.createRef();


  private handleFile(e){
    const file = e.target.files[0];
    if(!file){
return
    }
    this.setState({
      loading : true
    })
    const formData = new FormData();
    formData.append("doc",file);
    
  const r  =  axios.post("https://wit-voip.herokuapp.com/setup", formData, {
    headers : {
      'Content-Type': 'multipart/form-data'
    }
    });

    r.then( (data) => {
      //uploaded successfully 
      this.context.room = data.data.remoteRoom;
      this.context.token = data.data.token
      this.context.username = data.data.username
      this.context.roomName =  data.data.room.name;
      this.context.isHost = true;

      console.log("context: ", this.context)
      this.props.history.push("session")
    });




  }

  private handleJoin(){
    console.log(this.state.code)
    const r  =  axios.get("https://wit-voip.herokuapp.com/room/"+this.state.code + "?name="+this.state.name);
    r.then( data => {
      console.log(data)
      this.context.token = data.data.token;
      this.context.username = this.state.name
      this.context.roomName = this.state.code;
      this.context.isHost = false;
      this.context.room = data.data.room
      this.props.history.push("session")
    })

  }
  private renderJoinModal(){
      return(
        <Modal fade={true} size="sm" open={this.state.join} toggle={this.join}>
        <ModalHeader>Join</ModalHeader>
        <ModalBody>
        <h3>Enter your name below:</h3>
        <input  value={this.state.name} onChange={ (e) => { 
           this.setState({name : e.target.value })
           }} type="text"></input>

          <h3>Enter code:</h3>
         <input  value={this.state.code} onChange={ (e) => { 
           this.setState({code : e.target.value })
           }} type="text"></input>
         <Button onClick={this.handleJoin}> Go</Button>
        </ModalBody>
      </Modal>
      );
    
  }
  
  private renderHostModal(){
    return(
      <Modal fade={true} size="sm" open={this.state.host} toggle={this.host} >
      <ModalHeader>Host</ModalHeader>
      <ModalBody>
        <h4>Choose a file to upload:</h4>
        <input type="file" name="doc" onChange={ this.handleFile } />
        </ModalBody>
    </Modal>
    );
  
}

  private host(){
    this.setState({
      host : !this.state.host,
    })
  }

  private join(){
    this.setState({
      join : !this.state.join
    })
  }


  render(){ 
    return(
      
    <div className="App" style={{  width : '100%', height : '100vh'}}>
        { this.renderJoinModal() }
        { this.renderHostModal() }
       <Card style={{ maxWidth: "300px", marginLeft : 'auto', marginRight: 'auto'} }>
      <CardHeader>Welcome!</CardHeader>

      <CardBody>
        <CardTitle>Choose an option</CardTitle>
        
        <Button onClick={this.join} style={{marginBottom : 50}}>Join Session &rarr;</Button>
        <Button onClick={this.host} >Host Session &rarr;</Button>

      </CardBody>
    </Card>

    </div>
    
  );
}
}
App.contextType = appContext;