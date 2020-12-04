import React, { Component } from "react";
import "./Node.css";
import classNames from "classnames";
class Node extends Component {
  render() {
    let { isStart, isFinish,toggleStartFinish } = this.props;
    return (
      <div
      onClick={toggleStartFinish}
        className={classNames("box border border-primary", {
          "bg-primary": isStart,
          "bg-danger": isFinish,
        })}
      ></div>
    );
  }
}

export default Node;
