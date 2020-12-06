import React, { Component } from "react";
import { bfs, traceBackPath } from "../algorithms";
import InfoModal from "./InfoModal";
import NavBar from "./NavBar";
import Node from "./Node/Node";
let rows = 17;
let columns = 55;
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
      isMousePressed: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleWallMode = this.toggleWallMode.bind(this);
    this.toggleStartFinish = this.toggleStartFinish.bind(this);
    this.initalizeGrid = this.initalizeGrid.bind(this);
    this.reset = this.reset.bind(this);
    this.visualize = this.visualize.bind(this);
  }

  componentDidMount() {
    let screenSize = window.screen.availWidth;

    if (screenSize < 1400 && screenSize >= 1000) {
      columns = 38;
    } else if (screenSize < 1000 && screenSize >= 780) {
      columns = 30;
    } else if (screenSize < 780 && screenSize > 500) {
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
  getNewGridWithToggledWall = (row, col) => {
    let { grid } = this.state;
    let newGrid = [...grid];
    newGrid[row][col].isWall = true;
    return newGrid;
  };

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
      distance: null,
      showModal: true,
      isMousePressed: false,
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

  handleMouseDown = (row, col) => {
    let newGrid = this.getNewGridWithToggledWall(row, col);
    this.setState({
      grid: newGrid,
      isMousePressed: true,
    });
  };

  handleMouseUp = () => {
    this.setState({
      isMousePressed: false,
    });
  };

  handleMouseEnter = (row, col) => {
    let { isMousePressed } = this.state;
    if (isMousePressed) {
      let newGrid = this.getNewGridWithToggledWall(row, col);
      this.setState({
        grid: newGrid,
      });
    }
  };

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

  getStatusInfo = () => {
    let status = "default";
    let { wallMode, startRow, finishRow } = this.state;
    if (wallMode) {
      status = "Click on the blocks to add walls";
    } else if (startRow != null && finishRow != null) {
      status = "Ready to visualise";
    } else if (startRow != null) {
      status = "Select destination";
    } else {
      status = "Select source";
    }
    console.log(status);
    return status;
  };

  render() {
    let { grid, distance, wallMode, showModal } = this.state;
    return (
      <React.Fragment>
        <NavBar visualize={this.visualize} reset={this.reset} />
        <InfoModal showModal={showModal} toggleModal={this.toggleModal} />

        <div className="m-1"></div>

        <div className="info-tab">
          <div className="box start-node"></div>
          <span className="info-text">Start</span>
        </div>

        <div className="info-tab">
          <div className="box destination-node"></div>
          <span className="info-text"> Destination</span>
        </div>
        <div className="info-tab">
          <div className="box visited-node"></div>
          <span className="info-text">Visited</span>
        </div>
        <div className="info-tab">
          <div className="box path-node"></div>
          <span className="info-text">Path</span>
        </div>
        <div className="info-tab">
          <div className="box wall-node"></div>
          <span className="info-text">Path</span>
        </div>

        <div className="custom-control custom-checkbox mb-3">
          <input
            type="checkbox"
            className="custom-control-input"
            id="wallMode"
            checked={wallMode}
            onChange={this.toggleWallMode}
          />
          <label className="custom-control-label" htmlFor="wallMode">
            Wall Mode
          </label>
        </div>
        <span className="bg-dark text-white font-weight-light p-2 m-1">
          {!distance && this.getStatusInfo()}
          {distance &&
            (distance !== -1
              ? `Shortest Distance is ${distance}`
              : "NO PATH FOUND")}
        </span>
        <div className="visualizer mt-3">
          {grid.map((row, rowIndex) => {
            return (
              <div key={`row${rowIndex}`} style={{ lineWidth: "0px" }}>
                {row.map((element, colIndex) => (
                  <Node
                    id={`node-${rowIndex}-${colIndex}`}
                    wallMode={wallMode}
                    handleMouseDown={this.handleMouseDown}
                    handleMouseEnter={this.handleMouseEnter}
                    handleMouseUp={this.handleMouseUp}
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
