import React, { Component } from "react";
import "./Node.css";
import classNames from "classnames";
class Node extends Component {
  render() {
    let {
      id,
      row,
      col,
      isStart,
      isFinish,
      wallMode,
      isWall,
      toggleWall,
      toggleStartFinish,
      nodeType = "",
    } = this.props;
    return (
      <div
        id={id}
        onClick={wallMode ? () => toggleWall(row, col) : toggleStartFinish}
        className={classNames("box border border-primary", {
          "start-node": isStart,
          "destination-node": isFinish,
          "wall-node": isWall,
          [nodeType]: true,
        })}
      ></div>
    );
  }
}

export default Node;
