import React, { Component } from "react";
// import "./style.css";

 class Tes extends Component {
  state = {
    holiday: [],
  };

  saveInput = (e) => {
    this.setState({ input: e.target.value });
  };

  addNewItem = () => {
    let { holiday, input } = this.state;
    holiday.push(input);
    // this.state.holiday.push(this.state.input); // same as above, though bad practice 
    console.log(this.state)
  };

  render() {
    return (
      <div>
        <input
          type="date"
          onChange={this.saveInput}
        />
        <button onClick={this.addNewItem}> Add Item </button>
        <ol>
        {
          this.state.holiday.map((subItems, sIndex) => {
          return <li key={`${subItems}${sIndex}`}> {subItems}</li>;
          })
        }
        </ol>
      </div>
    );
  }
}

export default Tes