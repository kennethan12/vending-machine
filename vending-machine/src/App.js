import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProductList from './components/products/ProductList'
import MoneyInput from './components/inputs/MoneyInput'
import PurchaseInput from './components/inputs/PurchaseInput'
import DisplayChange from './components/inputs/DisplayChange'

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const SERVICE_URL = "http://tsg-vending.herokuapp.com";

class App extends React.Component {

  constructor(props) {
    super(props);  // Don't call this.setState() here!  
    // this.state = { counter: 0 };  
    // this.handleClick = this.handleClick.bind(this);
  }

  state = {
    loading: false,
    money: "0.00",
    productId: "None",
    productData: [
      {
        "id": 1,
        "name": "name",
        "price": 0.00,
        "quantity": 1
      }
    ],
    product: {
      id: 1,
      name: "",
      price: 0.00,
      quantity: 1
    },
    change: {
      quarters: 0,
      dimes: 0,
      nickels: 0,
      pennies: 0,
      message: ""
    },
    isSuccess: false,
    displayChange: ""
  }

  componentDidMount() {
    console.log("App is now mounted.")
    this.loadProductData();
  }

  handleGetProduct = (event) => {
    if (event) event.preventDefault();
    this.setState({ productId: event.target.innerHTML })
    console.log(`Getting product #${this.state.productId}`)
  }

  // work on this later
  handleMakePurchase = (event) => {
    if (event) event.preventDefault();

    if (this.state.productId == "None") {
      this.setState({
        isSuccess: false, change: {
          message: "Please choose an item first."
        }
      })
      return
    }

    fetch(`${SERVICE_URL}/money/${this.state.money}/item/${this.state.productId}`, { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        // Check if data is an error message or not
        if (data.message) this.setState({ isSuccess: false })
        else this.setState({ isSuccess: true })

        console.log("Change:", data)
        console.log(this.state.isSuccess)
        this.setState({ change: data })
        this.loadProductData();
        this.handleChange();
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }

  loadProductData() {
    if (this.state.isSuccess == true) {
      this.setState({ money: "0.00 ", productId: "None" })
    }
    this.setState({ loading: false });
    console.log("Loading vending machine")
    fetch(SERVICE_URL + '/items')
      .then(data => data.json())
      .then(data => this.setState(
        { productData: data, loading: false }
      ));
  }

  addDollar = (event) => {
    if (event) event.preventDefault();
    console.log("Adding dollar")
    this.setState({
      money: (Number.parseFloat(this.state.money) + 1.00).toFixed(2)
    })
    console.log(this.state.money)
  }

  addQuarter = (event) => {
    if (event) event.preventDefault();
    console.log("Adding dollar")
    this.setState({
      money: (Number.parseFloat(this.state.money) + 0.25).toFixed(2)
    })
    console.log(this.state.money)
  }

  addDime = (event) => {
    if (event) event.preventDefault();
    console.log("Adding dollar")
    this.setState({
      money: (Number.parseFloat(this.state.money) + 0.10).toFixed(2)
    })
    console.log(this.state.money)
  }

  addNickel = (event) => {
    if (event) event.preventDefault();
    console.log("Adding dollar")
    this.setState({
      money: (Number.parseFloat(this.state.money) + 0.05).toFixed(2)
    })
    console.log(this.state.money)
  }

  handleChange() {

    let message = ""

    if (this.state.change.message != "") {
      console.log("reached")
      if (this.state.change.quarters > 1) {
        message += `${this.state.change.quarters} Quarters `
      } else if (this.state.change.quarter == 1) {
        message += `${this.state.change.quarters} Quarter `
      }

      if (this.state.change.dimes > 1) {
        message += `${this.state.change.dimes} Dimes `
      } else if (this.state.change.dimes == 1) {
        message += `${this.state.change.dimes} Dime `
      }

      if (this.state.change.nickels > 1) {
        message += `${this.state.change.nickels} Nickels `
      } else if (this.state.change.nickels == 1) {
        message += `${this.state.change.nickels} Nickel `
      }

      if (this.state.change.pennies > 1) {
        message += `${this.state.change.pennies} Pennies`
      } else if (this.state.change.pennies == 1) {
        message += `${this.state.change.pennies} Penny`
      }
    }

    this.setState({ displayChange: message })
  }

  returnChange = (event) => {
    if (event) event.preventDefault();

    let returnMoney = this.state.money
    console.log(returnMoney)

    let quartersReturned = Math.floor(returnMoney / 0.25)
    returnMoney -= this.roundTo((quartersReturned * 0.25), 2)
    returnMoney = this.roundTo(returnMoney, 2)
    console.log(returnMoney)

    let dimesReturned = Math.floor(returnMoney / 0.10)
    returnMoney -= this.roundTo((dimesReturned * 0.10), 2)
    returnMoney = this.roundTo(returnMoney, 2)
    console.log(returnMoney)

    let nickelsReturned = Math.floor(returnMoney / 0.05)
    returnMoney -= this.roundTo((nickelsReturned * 0.05), 2)
    returnMoney = this.roundTo(returnMoney, 2)
    console.log(returnMoney)

    let penniesReturned = Math.floor(returnMoney / 0.01)

    let data = {
      quarters: quartersReturned,
      dimes: dimesReturned,
      nickels: nickelsReturned,
      pennies: penniesReturned,
    }

    this.setState({
      change: data,
      isSuccess: true,
      money: "0.00"
    }, () => {
      console.log(this.state.change)
      this.handleChange()
    })
  }

  roundTo(n, digits) {
    if (digits === undefined) {
      digits = 0;
    }

    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    var test = (Math.round(n) / multiplicator);
    return +(test.toFixed(digits));
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <h1 className="text-center">Vending Machine</h1>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm={{ span: 6, offset: 1 }}>
            {/* Pass in method for clicking on each product through ProductList to ProductListItem */}
            <ProductList products={this.state.productData} handleGetItem={this.handleGetProduct} />
          </Col>
          <Col sm={{ span: 2, offset: 1 }}>
            <Row>
              <MoneyInput
                money={this.state.money}
                handleAddDollar={this.addDollar}
                handleAddQuarter={this.addQuarter}
                handleAddDime={this.addDime}
                handleAddNickel={this.addNickel}
                handleCancelTransaction={this.returnChange} />
            </Row>
            <hr />
            <Row>
              <PurchaseInput
                handlePurchase={this.handleMakePurchase}
                itemChosen={this.state.productId}
                isSuccess={this.state.isSuccess}
                message={this.state.change} />
            </Row>
            <hr />
            <Row>
              <DisplayChange
                displayChange={this.state.displayChange}
                isSuccess={this.state.isSuccess}
                itemChosen={this.state.productId} />
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
