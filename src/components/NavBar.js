import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";

const NavBar = (props) => {
  return (
    <div>
      <Navbar color="dark" light expand="md">
        <NavbarBrand href="/">
          <h3 className="text-white">Path Finding Visualizer</h3>
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <button className="btn btn-primary m-1" onClick={props.reset}>
              Reset
            </button>
            <button className="btn btn-warning" onClick={props.visualize}>
              Visualize
            </button>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;
