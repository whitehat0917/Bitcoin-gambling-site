import React from 'react';
import Row from './Row';
import '../styles/Board.css';

export default class Board extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  renderRows() {
    const rows = [];
    this.props.board.forEach((row, i) => {
      rows.push(
        <Row
          key={i}
          row={row}
          x={i}
          onClick={this.props.onClick}
          onRightClick={this.props.onRightClick}
        />
      )
    })
    return rows;
  }

  render() {
    return (
      <div className={"board " + this.props.processing + " gameover-" + this.props.gameover}>
        {this.renderRows()}
      </div>
    )
  }
}
