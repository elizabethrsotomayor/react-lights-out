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
    console.log(`${y} ${x}`);

    function flipCell(y, x) {
      //if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
        console.log(board);
      }
    }

    // TODO: flip this cell and the cells around it
    // flip self
    flipCell(y, x);

    // flip north neighbor
    // flip south

    // win when every cell is turned off
    // TODO: determine is the game has been won

    //this.setState({ board, hasWon });
  }

  /** Render game board or winning message. */

  render() {
    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board
    const board = this.state.board;

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
      <table className="Board">
        <tbody>{markup}</tbody>
      </table>
    );
  }
}

export default Board;
