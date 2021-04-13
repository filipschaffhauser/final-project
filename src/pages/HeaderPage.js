import React from "react";
import { Jumbotron, Button } from "reactstrap";
import logo from "../assets/logo.png";
import "./HeaderPage.css";

export default function HeaderPage() {
  return (
    <div className="header" style={{ height: "100vh", textAlign: "center" }}>
      <Jumbotron>
        <img style={{ height: "45vh" }} src={logo} />
        <h1 style={{ fontSize: "150%" }}>
          Say hello to healthy meals. Become your own chef.
        </h1>

        <p className="lead">
          <Button href="#howItWorks" style={{ backgroundColor: "#ff914d", color: "whitesmoke", border: "none" }}>
            How it works
          </Button>
          <Button
            href="#meals"
            style={{ backgroundColor: "#ff914d", marginLeft: "1%", color: "whitesmoke", border: "none" }}
          >
            Start Cooking
          </Button>
        </p>
      </Jumbotron>
    </div>
  );
}
