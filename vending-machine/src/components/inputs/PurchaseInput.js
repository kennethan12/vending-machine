import React from "react";

class PurchaseInput extends React.Component {

  render() {
    let { handlePurchase, itemChosen, isSuccess, message } = this.props;

    return (
      <div className="text-center">
        <h5>Messages</h5>
        <div className="border" id="currentMessage">
          {
            isSuccess == true ?
              <div>Thank you!</div> :
              <div>{message.message}</div>
          }
        </div>
        <div>
          Item: <span className="border" id="currentItem">{itemChosen}</span>
        </div>
        <button onClick={handlePurchase}>Make Purchase</button>
      </div>
    )
  }
}

export default PurchaseInput;