import React, { Component } from "react";
import { bfs } from "../algorithms";
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
    this.toggleStartFinish = this.toggleStartFinish.bind(this);
    this.initalizeGrid = this.initalizeGrid.bind(this);
    this.reset = this.reset.bind(this);
    this.visualize = this.visualize.bind(this);
  }

  componentDidMount() {
    this.initalizeGrid();
  }

  toggleStartFinish(row, col) {
    let { grid } = this.state;
    let { startRow, startCol, finishRow, finishCol } = this.state;
    let updatedGrid = [...grid];

    if (
      startRow != null &&
      startCol != null &&
      finishRow != null &&
      finishCol != null
    )
      return;
    if (startRow != null && startCol != null) {
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
          isVisited: false,
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
   // this.initalizeGrid();
   window.location.reload()
  }

  visualize() {
    let { grid, startRow, startCol, finishRow, finishCol } = this.state;
    console.log("inside visualize");
    if (
      startRow == null ||
      startCol == null ||
      !finishRow == null ||
      finishCol == null
    )
      return;

    let nodeSeq = bfs(
      grid[startRow][startCol],
      grid[finishRow][finishCol],
      grid,
      rows,
      columns
    );

    this.animateBFS(nodeSeq, grid);
  }

  animateBFS(nodeSeq, grid) {
    for (let i = 0; i < nodeSeq.length; i++) {
      setTimeout(() => {
        let currNode = nodeSeq[i];
        document
          .getElementById(`node-${currNode.row}-${currNode.col}`)
          .classList.add("visited");
      }, i * 25);
    }
  }

  render() {
    let { grid } = this.state;
    return (
      <React.Fragment>
        <h1>Path Finding Visualizer</h1>

        <button className="btn btn-primary m-2" onClick={this.reset}>
          Reset
        </button>

        <button className="btn btn-warning" onClick={this.visualize}>
          Visualize
        </button>

        {grid.map((row, rowIndex) => {
          return (
            <div key={`row${rowIndex}`}>
              {row.map((element, colIndex) => (
                <Node
                  id={`node-${rowIndex}-${colIndex}`}
                  key={`node-${rowIndex}-${colIndex}`}
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
