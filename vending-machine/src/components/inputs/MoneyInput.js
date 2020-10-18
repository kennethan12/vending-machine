import React from "react";

class MoneyInput extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    var { money, handleAddDollar, handleAddQuarter, handleAddDime, handleAddNickel, handleCancelTransaction } = this.props
    return (
      <div className="text-center">
        <h4>Total $ In </h4>
        <div className="border" id="currentMoney">
          {money}
        </div>
        <br />
        <div className="row">
          <button onClick={handleAddDollar}>Add Dollar</button>
          <button onClick={handleAddQuarter}>Add Quarter</button>
        </div>
        <div className="row">
          <button onClick={handleAddDime}>Add Dime</button>
          <button onClick={handleAddNickel}>Add Nickel</button>
        </div>
        <div className="row">
          <button onClick={handleCancelTransaction}>Cancel Transaction</button>
        </div>
      </div>
    )
  }
}

export default MoneyInput;