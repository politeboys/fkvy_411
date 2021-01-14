import React from "react";
import Link from "next/link";
import { Navbar, Nav } from "react-bootstrap";

import logo from "../../assets/logo.png";

const constants = {
  NAVLINKS: [
    {
      text: "Home",
      url: "/",
      _blank: false,
    },
    // {
    //   text: "Media",
    //   url: "/#",
    //   _blank: false,
    // },
    {
      text: "Find a song",
      url: "/shop/song",
      _blank: false,
    },
    {
      text: "Upload custom cover",
      url: "/shop/custom",
      _blank: false,
    },
  ],
};

const NavbarComponent = () => {
  return (
    <Navbar
      style={{
        marginTop: "10px",
        width: "82%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
      className="mx-auto"
      collapseOnSelect
      expand="lg"
    >
      <a href="/">
        <img
          src={logo}
          className="mainLogo"
          style={{ width: "277px" }}
          alt="logo"
          href="/contractors"
        />
      </a>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav>
          {constants.NAVLINKS.map((data, id) => {
            const { text, url, _blank } = data;
            return (
              <Nav.Link
                target={_blank ? "_blank" : ""}
                href={url}
                key={text + id}
                className="h5 ml-3 mr-3"
                style={{
                  color: "#08003a",
                  fontWeight: "500",
                  fontSize: "18px",
                }}
              >
                {text}
              </Nav.Link>
            );
          })}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
