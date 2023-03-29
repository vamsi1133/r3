import React from "react";
import AddItems from "../../components/addItems";
import Logout from "../../HOC/logout";
import { connect } from "react-redux";
import { addItem } from "../../store/actions";

class Cart extends React.Component {
  state = {
    // items: 0,
    cost: 32,
    totalCost: null,
  };
  componentDidMount() {
    console.log("mounted");
    this.setState({ totalCost: this.props.items * this.state.cost });
  }

  shouldComponentUpdate(nextprops, nextstate) {
    if (
      this.props.items !== nextprops.items ||
      this.state.totalCost !== nextstate.totalCost
    ) {
      return true;
    }
    return false;
  }

  componentDidUpdate(prevprops, prevstate) {
    if (this.props.items !== prevprops.items) {
      this.setState({ totalCost: this.props.items * this.state.cost });
    }
  }

  componentWillUnmount() {
    console.log("unmounted");
  }
  updateItems = (e, type) => {
    if (type === "inc") {
      // this.setState({ items: this.state.items + 1 });
      this.props.addCartItem(this.props.items + 1);
    } else if (type === "dec") {
      // this.setState({ items: this.state.items - 1 });
      this.props.addCartItem(this.props.items - 1);
    } else {
      const count = e.target.value;
      // this.setState({ items: count });
      this.props.addCartItem(count);
    }
  };

  render() {
    return (
      <div className="home">
        <label htmlFor="items">
          <AddItems item={this.props.items} updateItems={this.updateItems}>
            ADD ITEMS CART
          </AddItems>
        </label>
        <div>cost per item:{this.state.cost}</div>
        <div>total Cost:{this.state.totalCost || "--"}</div>
        <div>discount: {this.props.discount}%</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    items: state.items.item,
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    addCartItem: (data) => dispatch(addItem(data)),
  };
};

export default connect(mapStateToProps, mapDispatchProps)(Logout(Cart));
