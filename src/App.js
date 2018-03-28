import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      running: false,
      introText: 'Okay, start by clicking which cells you want to start off with:',
      cells: this.initialState(),
    }

    this.drawCells = this.drawCells.bind(this)
    this.simulateGenerations = this.simulateGenerations.bind(this)
    this.toggleSimulation = this.toggleSimulation.bind(this);
    this.handleClink = this.handleClick.bind(this);
    this.calculateGeneration = this.calculateGeneration.bind(this);
  }

  initialState() {
    const GRID_SIZE = 32;
    const emptyCells = [];

    for(let i = 0; i < GRID_SIZE; i++) {
      const row = [];
      for(let j = 0; j < GRID_SIZE; j++) {
        row.push(false);
      }
      emptyCells.push(row);
    }

    return emptyCells;
  }

  drawCells() {
    const { running } = this.state;

    if (running) { return this.simulateGenerations() }
  }

  handleClick(row, column) {
    const { cells } = this.state;

    const newCells = [...cells];
    const living = cells[row][column];
    newCells[row][column] = !living;

    this.setState({ cells: newCells });
  }

  simulateGenerations() {
    console.log('TODO');
    // const { running, cells } = this.state;

    // while(running) {
    //   this.setState({ cells: this.calculateGeneration(cells) });
    //   this.drawGrid();
    // }
  }

  calculateGeneration(cells) {
    return cells;
  }

  toggleSimulation() {
    const { running } = this.state;

    this.setState({ running: !running });
  }

  toggleButton(running) {
    return (
      <div onClick={this.toggleSimulation}>
        {`${running ? 'Stop': 'Start'} the simulation`}
      </div>
    );
  }

  render() {
    const { cells, introText, running } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Ah yes, the Game of Life</h1>
        </header>
        <p className="main-text">
          {introText}
        </p>
        {this.toggleButton(running)}
          <CellGrid cells={cells} running={running}/>
      </div>
    );
  }
}

class CellGrid extends Component {
  constructor() {
    super();

    this.drawGrid = this.drawGrid.bind(this);
  }

  drawGrid() {
    const { cells, running } = this.props;

    console.log('going to draw this grid');
    const cellGrid = [];
    _.forEach(cells, (row, rowIndex) => {
      _.forEach(row, (cell, columnIndex) => {
        cellGrid.push(<Cell
            running={running}
            living={cell}
            row={rowIndex}
            column={columnIndex}
            handleClick={this.handleClick}
            key={`${rowIndex}:${columnIndex}`}
          />)
      });
      cellGrid.push(<br />);
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

class Cell extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.living === this.props.living) { return false }
    return true;
  }

  onClick() {
    const { living, running, handleClick } = this.props;
    if (running) { return null; }

    handleClick(!living);
  }

  render() {
    const { living } = this.props;
    const visualClass = living ? 'live' : 'dead';

    return (
      <div className={`square ${visualClass}`} onClick={this.onClick} />
    )
  }
}

export default App;
