import React from 'react';
import Cell from './Cell';

export default class Row extends React.Component {
  renderCells() {
    const cells = [];
    this.props.row.forEach((cell, i) => {
      cells.push(
        <Cell
          key={i}
          cell={cell}
          x={this.props.x}
          y={i}
          onClick={this.props.onClick}
          onRightClick={this.props.onRightClick}
          onDoubleClick={this.props.onDoubleClick}
        />
      )
    })
    return cells;
  }

  render() {
    return (
      <div>
        {this.renderCells()}
      </div>
    )
  }
}
