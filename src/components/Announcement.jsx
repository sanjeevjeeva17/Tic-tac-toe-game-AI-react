import React, { Component } from 'react';
import './Announcement.css';

export default class Announcement extends Component {
 render () {
     if(this.props.winner !== "d"){
        return (
            <div className= {this.props.winner ? 'visible': 'hidden'}>
             <h1>Player {this.props.winner} is the winner</h1>
                <h3>Game Over</h3>           
            </div>
        )
     }
     else {
         return (
            <div>
            <h1>Draw match</h1>
               <h3>Game Over</h3>           
           </div>
         )
     }
  
 }
}