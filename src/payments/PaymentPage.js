import React, { Component } from "react";
import "braintree-web";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import { url } from "../App";
import SessionContext from "../contexts/SessionContext";
import {
  Jumbotron,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

import grab from "../assets/grab.png";

class Payment extends Component {
  // static contextType = SessionContext;
  instance;

  state = {
    clientToken: null,
  };

  async componentDidMount() {
    try {
      // Get a client token for authorization from your server
      const response = await axios.get(`${url}/transactions/new`);
      const clientToken = response.data.client_token;

      this.setState({ clientToken });
    } catch (err) {
      console.error(err);
    }
  }

  async buy() {
    try {
      // Send the nonce to your server
      const { nonce } = await this.instance.requestPaymentMethod();
      // const { checkoutMeal } = this.context;
      console.log(this.props.checkoutMeal);
      const response = await axios.post(`${url}/transactions/checkout`, {
        headers: {
          "Access-Control-Allow-Origin": "application/json",
        },
        payment_method_nonce: nonce,
        numOfMeals: 1,
        user: localStorage.getItem("user_id"),
        meal: this.props.checkoutMeal.id,
      });
      console.log(response);
      // if response success then redirect
      this.props.history.push("/success");
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    console.log(this.props.checkoutMeal.id);

    if (!this.state.clientToken) {
      return (
        <div style={{ paddingTop: "20%", textAlign: "center" }}>
          <h1>Loading...</h1>
        </div>
      );
    } else {
      return (
        <div style={{ paddingTop: "20%", textAlign: "center" }}>
          <div
            style={{
              padding: "2%",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <h1>1 x {this.props.checkoutMeal.name}</h1>
              <h3>Total Payment: 15 RM</h3>
              <h5>Please pay with Credit/Debit Card</h5>
            </div>
          </div>
          <DropIn
            style={{ height: "30vh", width: "20vw" }}
            options={{
              authorization: this.state.clientToken,
            }}
            onInstance={(instance) => (this.instance = instance)}
          />
          <Button
            style={{
              marginBottom: "5%",
              width: "30vw",
              marginLeft: "2%",
              backgroundColor: "#ff914d",
              border: "none",
              color: "whitesmoke",
            }}
            onClick={this.buy.bind(this)}
          >
            Buy
          </Button>
        </div>
      );
    }
  }
}

export default Payment;
