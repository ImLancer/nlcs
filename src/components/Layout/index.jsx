import React from "react";
import { Container } from "reactstrap";

const Layout = (props) => {
  return <Container className="themed-container" fluid={true} >{props.children}</Container>;
};

export default Layout;