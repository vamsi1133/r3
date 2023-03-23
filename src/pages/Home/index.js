import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

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
  const [item, setItem] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [clr, setClr] = useState("red");
  const [selectedAddons, setSelectedAddons] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    setItem(0);
  }, []);

  useEffect(() => {
    if (item >= 5) {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
    if (item < 0) {
      setItem(0);
    } else if (item > 5) {
      setItem(5);
    }
    return () => {
      console.log("umounted");
    };
  }, [item]);

  const updateItems = (e, type) => {
    if (type === "inc") {
      setItem((prev) => prev + 1);
    } else if (type === "dec") {
      setItem((prev) => prev - 1);
    } else {
      const { value } = e.target;
      setItem(value);
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
      setSelectedAddons(temp);
    } else {
      const ind = temp.indexOf(value);
      temp.splice(ind, 1);
      setSelectedAddons(temp);
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

  const logoutHandler = () => {
    localStorage.clear();
    history("/login");
  };

  return (
    <>
      <div className="home">
        <h1> Welocme to My Food</h1>
        <Button onClick={logoutHandler}>Logout</Button>
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
          <button
            style={{ width: "50px", padding: "3px" }}
            onClick={() => updateItems(null, "dec")}
          >
            -
          </button>
          <input type="number" value={item} onChange={updateItems} />
          <button
            style={{ width: 50, padding: "3px" }}
            onClick={(e) => updateItems(e, "inc")}
            disabled={showMessage}
          >
            +
          </button>
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

export default Home;
