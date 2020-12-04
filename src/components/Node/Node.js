import React, { Component } from "react";
import "./Node.css";
import classNames from "classnames";
class Node extends Component {
  render() {
    let { id, isStart, isFinish, toggleStartFinish, isVisited } = this.props;
    return (
      <div
        id={id}
        onClick={toggleStartFinish}
        className={classNames("box border border-primary", {
          "bg-warning": isStart,
          "bg-danger": isFinish,
        })}
      ></div>
    );
  }
}

export default Node;
