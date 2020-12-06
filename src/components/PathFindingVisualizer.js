import React, { Component } from "react";
import { bfs, traceBackPath } from "../algorithms";
import InfoModal from "./InfoModal";
import Node from "./Node/Node";
let rows = 16;
let columns = 50;
class PathFindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      wallMode: false,
      startRow: null,
      startCol: null,
      finishRow: null,
      finishCol: null,
      distance: null,
      showModal: true,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleWall = this.toggleWall.bind(this);
    this.toggleWallMode = this.toggleWallMode.bind(this);
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

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

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
  toggleWall(row, col) {
    let { grid } = this.state;
    let newGrid = [...grid];
    newGrid[row][col].isWall = true;
    this.setState({
      grid: newGrid,
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
      wallMode: false,
      startRow: null,
      startCol: null,
      finishRow: null,
      finishCol: null,
      showModal: true,
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
    for (let i = 1; i < path.length - 1; i++) {
      setTimeout(() => {
        let currNode = path[i];
        document
          .getElementById(`node-${currNode.row}-${currNode.col}`)
          .classList.add("path-node");
      }, i * 25);
    }
  }

  animateBFS(nodeSeq, grid) {
    for (let i = 1; i < nodeSeq.length - 1; i++) {
      setTimeout(() => {
        let currNode = nodeSeq[i];
        document
          .getElementById(`node-${currNode.row}-${currNode.col}`)
          .classList.add("visited-node");
      }, i * 25);
    }
  }
  toggleWallMode() {
    this.setState({
      wallMode: !this.state.wallMode,
    });
  }

  render() {
    console.log("rendering ");
    let { grid, distance, wallMode,showModal } = this.state;
    return (
      <React.Fragment>
        <InfoModal showModal={showModal} toggleModal={this.toggleModal} />
        <h3>Path Finding Visualizer</h3>
        <button className="btn btn-primary m-1" onClick={this.reset}>
          Reset
        </button>
        <button className="btn btn-warning" onClick={this.visualize}>
          Visualize
        </button>
        <div className="m-1">
          <div className="info-tab">
            <Node nodeType="start-node" />
            <span className="info-text">Start</span>
          </div>
          <div className="info-tab">
            <Node nodeType="destination-node" />
            <span className="info-text"> Destination</span>
          </div>
          <div className="info-tab">
            <Node nodeType="visited-node" />
            <span className="info-text">Visited</span>
          </div>
          <div className="info-tab">
            <Node nodeType="path-node" />
            <span className="info-text">Path</span>
          </div>

          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="wallMode"
              checked={wallMode}
              onChange={this.toggleWallMode}
            />
            <label className="custom-control-label" htmlFor="wallMode">
              WallMode
            </label>
          </div>
        </div>
        <p
          className="distance lead"
          style={{ visibility: distance ? "visible" : "hidden" }}
        >
          {distance !== -1
            ? `Shortest Distance is ${distance}`
            : "NO PATH FOUND"}
        </p>
        <div className="visualizer">
          {grid.map((row, rowIndex) => {
            return (
              <div key={`row${rowIndex}`} style={{ lineWidth: "0px" }}>
                {row.map((element, colIndex) => (
                  <Node
                    id={`node-${rowIndex}-${colIndex}`}
                    wallMode={wallMode}
                    toggleWall={this.toggleWall}
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
