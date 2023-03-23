import React from "react";

export default class Cart extends React.Component {
  state = {
    items: 2,
    cost: 32,
    totalCost: null,
  };
  componentDidMount() {
    console.log("mounted");
    this.setState({ totalCost: this.state.items * this.state.cost });
  }

  shouldComponentUpdate(nextprops, nextstate) {
    if (
      this.state.items !== nextstate.items ||
      this.state.totalCost !== nextstate.totalCost
    ) {
      return true;
    }
    return false;
  }

  componentDidUpdate(prevprops, prevstate) {
    if (this.state.items !== prevstate.items) {
      this.setState({ totalCost: this.state.items * this.state.cost });
    }
  }

  componentWillUnmount() {
    console.log("unmounted");
  }

  updateItems = (e) => {
    const count = e.target.value;
    this.setState({ items: count });
  };

  render() {
    return (
      <div className="home">
        <label htmlFor="items">
          items:
          <input
            type={"number"}
            id="items"
            value={this.state.items}
            onChange={this.updateItems}
          />
        </label>
        <div>cost per item:{this.state.cost}</div>
        <div>total Cost:{this.state.totalCost || "--"}</div>
        <div>discount: {this.props.discount}%</div>
      </div>
    );
  }
}
