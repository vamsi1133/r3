import React, { useRef } from "react";

const AddItems = (props) => {
  const updateItems = props.updateItems;
  const myref = useRef();
  const countRef = useRef(0);
  const changeColor = () => {
    myref.current.style.color = "red";
  };

  return (
    <>
      <h3 ref={myref} onMouseOver={changeColor}>
        {props.children}
      </h3>
      <button
        style={{ width: "50px", padding: "3px" }}
        onClick={() => updateItems(null, "dec")}
      >
        -
      </button>
      <input type="number" value={props.item} onChange={updateItems} />
      <button
        style={{ width: 50, padding: "3px" }}
        onClick={(e) => updateItems(e, "inc")}
        disabled={props.showMessage}
      >
        +
      </button>
      {/* <button
        onClick={() => {
          countRef.current += 1;
        }}
      >
        {countRef.current}
      </button> */}
    </>
  );
};

export default AddItems;
