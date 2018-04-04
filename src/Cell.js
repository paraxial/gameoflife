import React, { Component } from 'react';

class Cell extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.living === this.props.living) { return false }
    return true;
  }

  onClick(coords, event) {
    // Don't do anything unless left mouse button is down
    if(event.type !== 'click' && event.buttons !== 1) { return };

    const { running, handleClick } = this.props;
    if (running) { return null; }

    handleClick(coords.row, coords.column)
  }

  render() {
    const { living, row, column } = this.props;
    const visualClass = living ? 'live' : 'dead';
    var background = `rgb(${parseInt(Math.random()*255, 10)},${parseInt(Math.random()*255, 10)},${parseInt(Math.random()*255, 10)})`;

    return (
      <div
        className={`square ${visualClass}`}
        style={ living ? { backgroundColor : background } : {} }
        onMouseOver={this.onClick.bind(null, {row, column})}
        onClick={this.onClick.bind(null, {row, column})}
      />
    )
  }
}

export default Cell;
