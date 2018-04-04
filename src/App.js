import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';
import CellGrid from './CellGrid';

const GRID_SIZE = 50;
let GENERATION = 0;

class App extends Component {
  constructor() {
    super();
    this.state = {
      running: false,
      cells: this.initialState(),
    }

    this.drawCells = this.drawCells.bind(this)
    this.update = this.update.bind(this)
    this.toggleSimulation = this.toggleSimulation.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getNeighbourhood = this.getNeighbourhood.bind(this);
  }

  componentDidMount() {
  }

  initialState() {
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
    const { running, cells } = this.state;

    return <CellGrid cells={cells} running={running} handleClick={this.handleClick}/>
  }

  handleClick(row, column) {
    const { cells } = this.state;

    const newCells = [...cells];
    const living = cells[row][column];
    newCells[row][column] = !living;

    this.setState({ cells: newCells });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  update() {
    const { cells, running } = this.state;
    if(!running) { return null; }

    const cellCopy = { ...cells };

    const newCells = this.handleGeneration(cellCopy);

    this.setState({ cells: newCells });
    this.sleep(100).then(() => {
      requestAnimationFrame(() => this.update());
    });
  }

  handleGeneration(cells) {
    const newCells = [];
    _.forEach(cells, (row, rowIndex) => {
      const newRow = [];
      _.forEach(row, (cell, columnIndex) => {
        const newCell = this.aliveOrDead(rowIndex, columnIndex, cell, cells);
        newRow.push(newCell);
      });
      newCells.push(newRow);
    });

    console.log(GENERATION += 1);
    return newCells;
  }

  aliveOrDead(row, column, signsOfLife, allTheCells) {
    const neighbours = this.getNeighbourhood(allTheCells, row, column);
    const numberAlive = _.countBy(neighbours, cell => (cell === true));

    if(signsOfLife && (numberAlive.true === 2 || numberAlive.true === 3)) { return true }
    if(!signsOfLife && (numberAlive.true === 3)) { return true }

    return false;
  }

  getNeighbourhood(cells, row, column) {
    const neighbours = [];
    const nextRow = Number(row) + 1;
    const lastRow = Number(row) - 1;
    const nextColumn = Number(column) + 1;
    const lastColumn = Number(column) - 1;
    const neighbourCoordinates = [
      {row: lastRow, column: lastColumn},
      {row: lastRow, column: Number(column)},
      {row: lastRow, column: nextColumn},
      {row: Number(row), column: lastColumn},
      {row: Number(row), column: nextColumn},
      {row: nextRow, column: lastColumn},
      {row: nextRow, column: Number(column)},
      {row: nextRow, column: nextColumn},
    ];

    _.forEach(neighbourCoordinates, (coords) => {
      if(!coords.row || !coords.column || coords.row < 0 || coords.row >= GRID_SIZE || coords.column < 0 || coords.column >= GRID_SIZE) { return }
      neighbours.push(cells[coords.row][coords.column]);
    });

    return neighbours;
  }

  toggleSimulation() {
    const { running } = this.state;

    const newState = {...this.state, running: !running };
    if(!running) { GENERATION = 0 };
    this.setState(newState);
  }

  toggleButton(running) {
    return (
      <div className={`toggle-button ${running? 'stop' : 'start'}`} onClick={this.toggleSimulation}>
        {`${running ? 'Stop': 'Start'} the simulation`}
      </div>
    );
  }

  render() {
    const { cells, introText, running } = this.state;
    if (running && GENERATION === 0) { requestAnimationFrame(() => {this.update()}) }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Conway's Game of Life</h1>
        </header>
        {this.toggleButton(running)}
        {this.drawCells()}
        <div className="desc">
          Disclaimer that the behaviour is currently broken around the sides thanks to edge conditions.
          <br />
          This was built just for ease of demonstration and may only possibly be improved at a later date.
          <br />
          Para O'Kelly built the demonstration framework and Alice McCullagh made aesthetic/usability improvements.
        </div>
      </div>
    );
  }
}

export default App;
