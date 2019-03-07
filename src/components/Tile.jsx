import React, { Component } from 'react';
import './Tile.css';

export default class Announcement extends Component {
    tileClick (props) {
        if(props.value === ""){
            props.gameLoop(props.loc);
        }
    
    }

   
    render() {
        return (
            <div className = {"title " + this.props.loc} onClick = {() => this.tileClick(this.props)}>
               <p> {this.props.value}</p>
            </div>
        )
    }
}