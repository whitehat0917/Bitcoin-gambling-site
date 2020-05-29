import React from 'react';
import { FaFlag } from 'react-icons/fa';
import { FaCertificate } from 'react-icons/fa';
import '../styles/Cell.css';

const openStyle = {
  backgroundImage: 'linear-gradient(to right, #27bf3c, #4ce53c)'
}

const bombStyle = {
  backgroundImage: 'linear-gradient(to right, #e91a19, #b82520)',
  color: 'black'
}


export default class Cell extends React.Component {
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
    this._handleRightClick = this._handleRightClick.bind(this);
  }

  _handleClick(e) {
    e.preventDefault();
    this.props.onClick(this.props.x, this.props.y);
  }

  _handleRightClick(e) {
    e.preventDefault();
    this.props.onRightClick(this.props.x, this.props.y);
  }

  render() {
    let content = this.props.cell.flagged ? <FaFlag /> : '';
    let style = {};
    if (this.props.cell.open) {
      style = Object.assign({}, style, openStyle);
      if (this.props.cell.bomb) {
        content = <FaCertificate style={{ marginTop: 2 }} />
        style = Object.assign({}, style, bombStyle);
      } else {
        content = this.props.cell.guess;
      }
    }
    return (
      <div
        className="cell"
        style={style}
        onClick={this._handleClick}
        onContextMenu={this._handleRightClick}
      >
        <span>{content}</span>
      </div>
    )
  }
}
