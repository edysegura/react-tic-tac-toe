import React from 'react';
import ReactDOM from 'react-dom';
import { Board } from './board/Board';
import { calculateWinner } from './calculateWinner';
import './index.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        }
      ],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  nextPlayer() {
    return this.state.xIsNext ? 'X' : 'O';
  }

  checkGame(squares) {
    const winner = calculateWinner(squares);
    if (winner) {
      return 'Winner: ' + winner;
    }
    return 'Next player: ' + this.nextPlayer();
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares)) {
      return;
    }
    squares[i] = this.nextPlayer();
    this.setState({
      history: history.concat([{
        squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  getMoves(history) {
    const moves = history.map((step, move) => {
      const description = move
        ? 'Go to move #' + move
        : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{description}</button>
        </li>
      );
    });
    return moves;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const status = this.checkGame(current.squares);
    const moves = this.getMoves(history);
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
