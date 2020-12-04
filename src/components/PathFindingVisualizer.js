import React, { Component } from "react";
import { bfs, traceBackPath } from "../algorithms";
import Node from "./Node/Node";
let rows = 18;
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
      distance: null,
    };
    this.toggleStartFinish = this.toggleStartFinish.bind(this);
    this.initalizeGrid = this.initalizeGrid.bind(this);
    this.reset = this.reset.bind(this);
    this.visualize = this.visualize.bind(this);
  }

  componentDidMount() {
    let screenSize = window.screen.availWidth;

    if (screenSize < 1300 && screenSize > 700) {
      columns = 25;
    } else if (screenSize < 700 && screenSize > 500) {
      columns = 20;
    } else if (screenSize < 500) {
      columns = 14;
    }
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
    window.location.reload();
  }

  visualize() {
    let { grid, startRow, startCol, finishRow, finishCol } = this.state;
    if (
      startRow == null ||
      startCol == null ||
      !finishRow == null ||
      finishCol == null
    )
      return;

    let { visitedNodes, path, distance } = bfs(
      grid[startRow][startCol],
      grid[finishRow][finishCol],
      grid,
      rows,
      columns
    );

    this.animateBFS(visitedNodes, grid);
    setTimeout(() => {
      this.animatePath(path);
      this.setState({
        distance,
      });
    }, visitedNodes.length * 25);
  }

  animatePath(path) {
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        let currNode = path[i];
        document
          .getElementById(`node-${currNode.row}-${currNode.col}`)
          .classList.add("path-node");
      }, i * 25);
    }
  }

  animateBFS(nodeSeq, grid) {
    for (let i = 0; i < nodeSeq.length; i++) {
      setTimeout(() => {
        let currNode = nodeSeq[i];
        document
          .getElementById(`node-${currNode.row}-${currNode.col}`)
          .classList.add("visited-node");
      }, i * 25);
    }
  }

  render() {
    let { grid, distance } = this.state;
    return (
      <React.Fragment>
        <h3>Path Finding Visualizer</h3>
        <button className="btn btn-primary m-1" onClick={this.reset}>
          Reset
        </button>
        <button className="btn btn-warning" onClick={this.visualize}>
          Visualize
        </button>
        <div className="m-2">
          <div className="info-tab">
            <Node value="start-node" />
            <span className="info-text">Start</span>
          </div>
          <div className="info-tab">
            <Node value="destination-node" />
            <span className="info-text"> Destination</span>
          </div>
          <div className="info-tab">
            <Node value="visited-node" />
            <span className="info-text">Visited</span>
          </div>
          <div className="info-tab">
            <Node value="path-node" />
            <span className="info-text">Path</span>
          </div>
        </div>
        <p
          className="distance lead"
          style={{ visibility: distance ? "visible" : "hidden" }}
        >
          Shortest Distance is {distance}
        </p>
        <div className="visualizer">
          {grid.map((row, rowIndex) => {
            return (
              <div key={`row${rowIndex}`} style={{ lineWidth: "0px" }}>
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
        </div>
      </React.Fragment>
    );
  }
}

export default PathFindingVisualizer;
