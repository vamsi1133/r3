import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddItems from "../../components/addItems";
import Logout from "../../HOC/logout";
import { useSelector, useDispatch } from "react-redux";
import { ADD_ITEM } from "../../store/util";
import "./Home.css";
import { addAddon, addItem } from "../../store/actions";

const addOns = [
  "PERI PERI",
  "Olives",
  "chese burst",
  "sause",
  "thin crust",
  "regular",
  "medium",
  "large",
];

const Home = () => {
  const dispatch = useDispatch();
  const item = useSelector(({ items }) => items.item);
  const [showMessage, setShowMessage] = useState(false);
  const [clr, setClr] = useState("red");
  // const [selectedAddons, setSelectedAddons] = useState([]);
  const selectedAddons = useSelector(({ items }) => items.addons);
  const history = useNavigate();
  const getLoop = (val) => {
    let res = 0;
    for (let i = 0; i < val * 100000; i++) {
      res += i;
    }
    return res;
  };

  const getCounted = useMemo(() => {
    getLoop(item);
  }, [item]);

  // const itemCounter = useEffect(() => {
  //   setItem(0);
  // }, []);

  useEffect(() => {
    if (item >= 5) {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
    if (item < 0) {
      dispatch({ type: ADD_ITEM, payload: { item: 0 } });
    } else if (item > 5) {
      dispatch({ type: ADD_ITEM, payload: { item: 1 } });
    }
    return () => {
      console.log("umounted");
    };
  }, [item]);

  const updateItems = (e, type) => {
    if (type === "inc") {
      dispatch(addItem(item + 1));
      // setItem((prev) => prev + 1);
    } else if (type === "dec") {
      dispatch({ type: ADD_ITEM, payload: { item: item - 1 } });

      // setItem((prev) => prev - 1);
    } else {
      const { value } = e.target;
      // setItem(value);
      dispatch({ type: ADD_ITEM, payload: { item: value } });
    }
  };

  const msg = () => {
    if (showMessage) {
      return <h1>order exceeded</h1>;
    } else {
      return <h1>go ahead</h1>;
    }
  };

  const addOnHandler = (e) => {
    // console.log(e.target.checked)
    // const xyz = e.target.value;
    const { value, checked } = e.target;
    const temp = [...selectedAddons];
    if (checked) {
      temp.push(value);
      // setSelectedAddons((prev) => [...prev, value]);
      // setSelectedAddons(temp);
      dispatch(addAddon(temp));
    } else {
      const ind = temp.indexOf(value);
      temp.splice(ind, 1);
      // setSelectedAddons(temp);
      dispatch(addAddon(temp));
    }
  };

  const buyhandler = () => {
    axios
      .get("http://localhost:8000/buy", {
        headers: { auth: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res);
      })
      .catch(({ response }) => {
        if (!response.data.success) {
          history("/login");
        }
      });
  };

  return (
    <>
      <div className="home">
        <h1> Welocme to My Food {getCounted}</h1>
        <Link to="/cart">Cart</Link>
        {msg()}
        {item > 0 ? (
          <span>please proceed with the order</span>
        ) : (
          <span>order the delicious pizza</span>
        )}
        <div>
          <img
            style={{ width: "500px", objectFit: "contain", display: "" }}
            src="https://nomoneynotime.com.au/uploads/recipes/shutterstock_2042520416-1.jpg"
          />
          <br />
          <b>Price: 150₹ </b>
          <AddItems
            item={item}
            updateItems={updateItems}
            showMessage={showMessage}
          >
            ADD ITEMS IN HOME
          </AddItems>
          <br />
          {showMessage && (
            <span
              onMouseEnter={() => setClr("brown")}
              onMouseLeave={() => setClr("cyan")}
              style={{ color: clr }}
            >
              maximum number of pizzas is 5
            </span>
          )}
        </div>
        <div>{item}</div>
        <div onChange={addOnHandler}>
          {addOns.map((val, index) => {
            return (
              <label key={index} htmlFor={val} style={{ marginRight: "10px" }}>
                {val}
                <input id={val} type={"checkbox"} name={val} value={val} />
              </label>
            );
          })}
        </div>
        <div>
          selectedAddons:
          {selectedAddons.map((val, index) => {
            return (
              <div className="addons" key={val}>
                {val}
              </div>
            );
          })}
        </div>
        <Button variant="contained" onClick={buyhandler}>
          BUY NOW
        </Button>
      </div>
    </>
  );
};

export default Logout(Home);
