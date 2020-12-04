import React, { Component } from "react";
import Node from "./Node/Node";

let rows = 20;
let columns = 50;
class PathFindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      startRow: null,
      startCol: null,
      finishRow: null,
      finishCol: null,
    };
    this.toggleStartFinish.bind(this);
    this.initalizeGrid.bind(this);
    this.reset.bind(this);
  }

  componentDidMount() {
    this.initalizeGrid();
  }

  toggleStartFinish(row, col) {
    let { grid } = this.state;
    let { startRow, startCol, finishRow, finishCol } = this.state;
    let updatedGrid = [...grid];

    if (startRow && startCol && finishRow && finishCol) return;
    if (startRow && startCol) {
      updatedGrid[row][col].isFinish = true;
      finishRow = row;
      finishCol = col;
    } else {
      updatedGrid[row][col].isStart = true;
      startRow = row;
      startCol = col;
    }
    this.setState({
      grid: updatedGrid,
      startRow,
      startCol,
      finishRow,
      finishCol,
    });
  }

  initalizeGrid() {
    let grid = [];
    for (let row = 0; row < rows; row++) {
      let cols = [];
      for (let col = 0; col < columns; col++) {
        cols.push({
          row,
          col,
          isStart: false,
          isFinish: false,
        });
      }
      grid.push(cols);
    }
    this.setState({
      grid,
      startRow: null,
      startCol: null,
      finishRow: null,
      finishCol: null,
    });
  }

  reset() {
    this.initalizeGrid();
  }

  render() {
    let { grid } = this.state;
    return (
      <React.Fragment>
        <h1>Path Finding Visualizer</h1>
        <button className="btn btn-primary m-2" onClick={this.reset.bind(this)}>
          Reset
        </button>
        {grid.map((row, rowIndex) => {
          return (
            <div>
              {row.map((element, colIndex) => (
                <Node
                  {...grid[rowIndex][colIndex]}
                  toggleStartFinish={() =>
                    this.toggleStartFinish(rowIndex, colIndex)
                  }
                />
              ))}
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

export default PathFindingVisualizer;
