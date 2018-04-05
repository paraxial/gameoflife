import React, { Component } from 'react';
import _ from 'lodash';
import Cell from './Cell';

class CellGrid extends Component {
  constructor() {
    super();

    this.drawGrid = this.drawGrid.bind(this);
    this.boundClick = this.boundClick.bind(this);
  }

  boundClick(row, column) {
    this.props.handleClick(row, column);
  }

  drawGrid() {
    const { cells, running } = this.props;

    const cellGrid = [];
    _.forEach(cells, (row, rowIndex) => {
      const rowList = [];

      _.forEach(row, (cell, columnIndex) => {
        rowList.push(<Cell
            running={running}
            living={cell}
            row={rowIndex}
            column={columnIndex}
            handleClick={this.boundClick}
            key={`${rowIndex}:${columnIndex}`}
          />);
      });

      cellGrid.push(<div className="row" key={rowIndex}>{rowList}</div>);
    });

    return cellGrid;
  }

  render() {
    return (
      <div className="cell-grid">
        {this.drawGrid()}
      </div>
    )
  }
}

export default CellGrid;
