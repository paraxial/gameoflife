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
    const { running, handleClick } = this.props;
    if (running) { return null; }

    handleClick(coords.row, coords.column)
  }

  render() {
    const { living, row, column } = this.props;
    const visualClass = living ? 'live' : 'dead';

    return (
      <div className={`square ${visualClass}`} onClick={this.onClick.bind(null, {row, column})} />
    )
  }
}

export default Cell;
