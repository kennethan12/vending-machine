import React from "react";

class DisplayChange extends React.Component {

  render() {
    let { displayChange, isSuccess, itemChosen } = this.props
    return (
      <div className="text-center">
        <h4>Change</h4>
        <div className="border" id="change">
          {
            isSuccess == true ?
              <div>{displayChange}</div> :
              <div>...</div>
          }
        </div>
      </div>
    )
  }
}

export default DisplayChange;