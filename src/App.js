import React, { useState, useEffect } from "react";
import "./App.css";
import getSum from "./utils/getSum";
import getDiscount from "./utils/getDiscount";
import data from "./data";

function App() {
  const [item, setItem] = useState([]);
  const [count, setCount] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [cost, setCost] = useState(0);
  const [total, setTotal] = useState(0);
  const [typeDiscount, setTypeDiscount] = useState(0);
  const [message, setMessage] = useState("");

  //On first render all info is displayed properly
  useEffect(() => {
    setItem(data);
    // Add all the prices of items and set it to cost
    setCost(getSum(data));
    // Add all the discounts of items and set it to discount
    setDiscount(getDiscount(data));
    // Subtract the discount(gotten from getDiscount) from cost(gotten from getSum)
    setTotal(getSum(data) - getDiscount(data));
    localStorage.setItem("cost", cost);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      document.getElementById("delete").classList.remove("active");
      setMessage("");
    }, 8000);
  }, [message]);

  // Gets latest items from local storage
  useEffect(() => {
    const data = localStorage.getItem("data");
    try {
      if (data) {
        // setItem(JSON.parse(data));
      }
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }, []);

  // Puts latest data into local storage
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(item));
  });

  //Updates the cost,discount and total after deleting items
  useEffect(() => {
    setCost(getSum(item));
    setDiscount(getDiscount(item));
    setTotal(getSum(item) - getDiscount(item));
  }, [item]);

  // Deletes the items
  function deleteItem(id) {
    const data = item.filter((i) => i.id !== id);
    setItem(data);
    localStorage.setItem("data", data);
    // Add the active class only when the item is deleted
    setMessage("Item deleted");
    document.getElementById("delete").classList = "active";
  }

  // Decrement the quantity of items
  function decrement(item) {
    if (item.count > 0) {
      item.count = item.count - 1;
      setCount(item.count);
      // Add respective item's price to current price
      setCost(cost - item.price);
      // Add respective item's discount to current discount
      setDiscount(discount - item.discount);
      // Update the total
      setTotal(cost - item.price - (discount - item.discount));
      if ((item.type === "fiction") & (typeDiscount > 0)) {
        setTypeDiscount(typeDiscount - 5);
        setTotal(cost - item.price - (discount - item.discount) - 5);
      }
    }
  }

  // Increment the quantity of items
  function increment(item) {
    item.count = item.count + 1;
    setCount(item.count);

    // Add respective item's price to current price
    setCost(cost + item.price);
    // Add respective item's discount to current discount
    setDiscount(discount + item.discount);
    // Update the total
    setTotal(cost + item.price - (discount + item.discount));
    if (item.type === "fiction") {
      setTypeDiscount(5);
      setTotal(cost + item.price - (discount + item.discount) - 5);
    }
  }

  return (
    <div>
      <h1>Order summary</h1>
      <p id="delete">{message}</p>
      <div className="App">
        <div className="cart">
          <ul className="title">
            <li>Items</li>
            <li>Quantity</li>
            <li>Price</li>
          </ul>
          <ul>
            {item.map((item) => (
              <div className="items" key={item.id}>
                <li className="info" key={item.id}>
                  <span>
                    <img src={item.img_url} alt={item.name} />
                  </span>
                  {item.name}
                  <button className="close" onClick={() => deleteItem(item.id)}>
                    &times;
                  </button>
                </li>
                <li className="add">
                  <button onClick={() => decrement(item)}>-</button>
                  <span className="qty">{item.count}</span>
                  <button onClick={() => increment(item)}>+</button>
                </li>
                <li className="price">{item.price}</li>
              </div>
            ))}
          </ul>
        </div>

        <div className="total">
          <h3>Total</h3>
          <p>
            Items: <span id="cost">${cost}</span>
          </p>
          <p>
            Discount: <span>${discount}</span>
          </p>
          <p>
            Type discount: <span>${typeDiscount}</span>
          </p>
          <p>
            Order total: <span>${total}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
