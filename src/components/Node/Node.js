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
      handleMouseDown,
      handleMouseUp,
      handleMouseEnter,
      toggleStartFinish,
    } = this.props;
    return (
      <div
        id={id}
        onClick={!wallMode ? () => toggleStartFinish(row, col) : null}
        onMouseDown={wallMode ? () => handleMouseDown(row, col) : null}
        onMouseUp={wallMode ? () => handleMouseUp(row, col) : null}
        onMouseEnter={wallMode ? () => handleMouseEnter(row, col) : null}
        className={classNames("box ", {
          "start-node": isStart,
          "destination-node": isFinish,
          "wall-node": isWall,
        })}
      ></div>
    );
  }
}

export default Node;
