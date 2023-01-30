import React, { Component } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    ncols: 5,
    nrows: 5,
    chanceLightStartsOn: Math.random() * 5,
  };

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard(),
    };
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    for (let i = 0; i < this.props.nrows; i++) {
      let curArr = [];
      for (let j = 0; j < this.props.ncols; j++) {
        let curCell = Math.random() * 5;
        if (curCell > this.props.chanceLightStartsOn) {
          // light is on
          curArr.push(true);
        } else {
          // light is off
          curArr.push(false);
        }
      }
      board.push(curArr);
    }

    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      //if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    function allFalse(arr) {
      return arr.every((element) => element.every((x) => x === false));
    }

    // flip self
    flipCell(y, x);

    // flip north neighbor
    flipCell(y + 1, x);

    // flip south
    flipCell(y - 1, x);

    // east (right)
    flipCell(y, x + 1);

    // west (left)
    flipCell(y, x - 1);

    this.setState((st) => (st.board = board));

    // win when every cell is turned off
    this.setState((st) => {
      st.hasWon = allFalse(st.board);
    });
  }

  /** Render game board or winning message. */

  render() {
    // make table board
    const board = this.state.board;

    const hasWon = this.state.hasWon;

    let markup = board.map((row, index) => (
      <tr key={index}>
        {board[index].map((cell, cellIndex) => (
          <Cell
            key={cellIndex}
            isLit={board[index][cellIndex]}
            flipCellsAroundMe={this.flipCellsAround.bind(this)}
            coord={`${index}-${cellIndex}`}
          />
        ))}
      </tr>
    ));

    return (
      // if the game is won, just show a winning msg & render nothing else
      <div className="Board">
        {hasWon ? (
          <div>
            <h1 className="Board-neon">You</h1>
            <h1 className="Board-flux">Win!</h1>
          </div>
        ) : (
          <div>
            <h1 className="Board-neon">Lights</h1>
            <h1 className="Board-flux">Out</h1>
            <table className="Board-container">
              <tbody>{markup}</tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default Board;
