import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from "reactstrap";
import "./index.css";

import checkImg from "../../assets/images/switch-off.png";
import checkImgComp from "../../assets/images/switch-on.png";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [byHand, setByHand] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  let url = checkImg;

  const checkByHand = () => {
    setByHand(!byHand);
    props.handleClickApp(byHand);
  };

  if (byHand) {
    url = checkImgComp;
  }

  return (
    <div>
      <Navbar color="dark" light expand="md" className="head">
        <NavbarBrand>
          <a
              className="header__link header__title"
              href="https://www.ctu.edu.vn/"
              rel="noopener noreferrer"
              target="_blank"
              style={{ fontSize: "1.75rem", textDecoration: "none" }}
          >
          CTU
          </a>
        </NavbarBrand>
        <NavbarToggler className="mr-2" onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink>
                <Link
                    exact
                    className="header__link"
                    to="/greedy"
                    activeClassName="header__link--active"
                >
                    Home
                </Link>
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink>
                <Link
                    exact
                    className="header__link"
                    to="/brandbound"
                    activeClassName="header__link--active"
                >
                    Brandbound
                </Link>
              </NavLink>
            </NavItem> */}
          </Nav>
          <NavbarText>
            <img onClick={checkByHand} src={url} width="30px" alt="" />
            <span style={{ color: "white" }}> Handle by hand</span>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;