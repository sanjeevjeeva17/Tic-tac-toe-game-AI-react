import React, { Component } from 'react';
import './App.css';
import Announcement from './components/Announcement';
import ResetButton from './components/ResetButton';
import Tile from './components/Tile';

class App extends Component {
  constructor() {
    super();
    this.state = {
      boardState: [
        '', '', '',
        '', '', '',
        '', '', ''
      ],
      lastMove: {
        char: 'X', 
        position: '' 
      },
      turn: 'X',
      winner: null,
      maxPlayer: 'X',
      minPlayer: 'O'
    }
  }

  resetBoard() {
    this.setState({
      boardState: [
        '', '', '',
        '', '', '',
        '', '', ''
      ],
      lastMove: {
        char: 'X', 
        position: '' 
      },
      turn: 'X',
      winner: null,
      maxPlayer: 'X',
      minPlayer: 'O'
    });
  }

  tie(board) {
    var moves = board.join('').replace(/ /g, '');
    if (moves.length === 9) {
      return true;
    }
    return false;
  }

  winner(board, player) {
    if ((board[0] === player && board[1] === player && board[2] === player) ||
      (board[3] === player && board[4] === player && board[5] === player) ||
      (board[6] === player && board[7] === player && board[8] === player) ||
      (board[0] === player && board[3] === player && board[6] === player) ||
      (board[1] === player && board[4] === player && board[7] === player) ||
      (board[2] === player && board[5] === player && board[8] === player) ||
      (board[0] === player && board[4] === player && board[8] === player) ||
      (board[2] === player && board[4] === player && board[6] === player)
    ) {
      return true;
    } else {
      return false;
    }
  }

  copyBoard(board) {
    return board.slice(0);
  }

  validMove(move, player, board) {
    var newBoard = this.copyBoard(board);
    if (newBoard[move] === "") {
      newBoard[move] = player;
      return newBoard;
    } else
      return null;
  }

  findAiMove(board) {
    var bestMoveScore = 100;
    let move = null;
    //Test Every Possible Move if the game is not already over.
    if (this.winner(board, 'X') || this.winner(board, 'O' || this.tie(board))) {
      return null;
    }
    for (var i = 0; i < board.length; i++) {
      let newBoard = this.validMove(i, this.state.minPlayer, board);
      if (newBoard) {
        var moveScore = this.maxScore(newBoard);
        if (moveScore < bestMoveScore) {
          bestMoveScore = moveScore;
          move = i;
        }
      }
    }
    return move;
  }

  minScore(board) {
    if (this.winner(board, 'X')) {
      return 10;
    } else if (this.winner(board, 'O')) {
      return -10;
    } else if (this.tie(board)) {
      return 0;
    } else {
      var bestMoveValue = 100;
      let move = 0;
      for (var i = 0; i < board.length; i++) {
        var newBoard = this.validMove(i, this.state.minPlayer, board);
        if (newBoard) {
          var predictedMoveValue = this.maxScore(newBoard);
          if (predictedMoveValue < bestMoveValue) {
            bestMoveValue = predictedMoveValue;
            move = i;
          }
        }
      }
      //console.log("Best Move Value(minScore):", bestMoveValue);
      return bestMoveValue;
    }
  }

  maxScore(board) {
    if (this.winner(board, 'X')) {
      return 10;
    } else if (this.winner(board, 'O')) {
      return -10;
    } else if (this.tie(board)) {
      return 0;
    } else {
      var bestMoveValue = -100;
      let move = 0;
      for (var i = 0; i < board.length; i++) {
        var newBoard = this.validMove(i, this.state.maxPlayer, board);
        if (newBoard) {
          var predictedMoveValue = this.minScore(newBoard);
          if (predictedMoveValue > bestMoveValue) {
            bestMoveValue = predictedMoveValue;
            move = i;
          }
        }
      }
      return bestMoveValue;
    }
  }

  gameLoop(move) {
    let player = this.state.turn;
    let currentGameBoard = this.validMove(move, player, this.state.boardState);
    if (this.winner(currentGameBoard, player)) {
      this.setState({
        boardState: currentGameBoard,
        lastMove: {
          char: player, 
          position: move 
        },
        winner: player
      });
      return;
    }
    if (this.tie(currentGameBoard)) {
      this.setState({
        boardState: currentGameBoard,
        lastMove: {
          char: player,
          position: move
        },
        winner: 'd'
      });
      return;
    }

    this.callAi(currentGameBoard, move);
  }

  callAi(currentGameBoard, move){
    let player = 'O';
    currentGameBoard = this.validMove(this.findAiMove(currentGameBoard), player, currentGameBoard);
    if (this.winner(currentGameBoard, player)) {
      this.setState({
        boardState: currentGameBoard,
        lastMove: {
          char: player,
          position: move
        },
        winner: player
      });
      return;
    }
    if (this.tie(currentGameBoard)) {
      this.setState({
        boardState: currentGameBoard,
        lastMove: {
          char: player,
          position: move
        },
        winner: 'd'
      });
      return;
    }
    this.setState({
      boardState: currentGameBoard
    });
  }
  


  render() {
    return (
      <div className="container">
        <div className="menu">
          <h1>Tic Tac Toe Game</h1>
          <Announcement winner={this.state.winner} />
          <div className="centre-button">
          <ResetButton reset={this.resetBoard.bind(this)} />
          </div>
         
        </div>
        {this.state.boardState.map((value, i) => {
          return (
            <Tile
              key={i}
              loc={i}
              value={value}
              turn = {this.state.turn}
              winner = {this.state.winner}
              gameLoop={this.gameLoop.bind(this)} 
              />
          );
        })}
      </div>
    );
  }
}

export default App;
