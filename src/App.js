import React, { useState, useEffect } from "react";
import "./App.css";
import data from "./data";

function App() {
  const [item, setItem] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    setItem(data);
  }, []);

  function deleteItem(id) {
    const data = item.filter((i) => i.id !== id);
    setItem(data);
  }

  function decrement(id) {
    item.map((i) => {
      if (i.id === id) {
        setCount(count - 1);
      }
    });
  }

  function increment(id) {
    item.forEach((i) => {
      if (i.id === id) {
        setCount(count + 1);
      }
    });
  }

  return (
    <div className="App">
      <div className="cart">
        <ul>
          {item.map((item) => (
            <div className="items">
              <li key={item.id}>
                <span>
                  <img src={item.img_url} alt={item.name} />
                </span>
                {item.name}
                <span className="close" onClick={() => deleteItem(item.id)}>
                  &times;
                </span>
              </li>
              <li>
                <button onClick={() => decrement(item.id)}>-</button>
                <span className="qty">1</span>
                <button onClick={() => increment(item.id)}>+</button>
              </li>
              <li className="price">{item.price}</li>
            </div>
          ))}
        </ul>
      </div>
      <div className="total">
        <h3>Total</h3>
        {/* <p>Items:</p>
        <p>Order total</p> */}
      </div>
    </div>
  );
}

export default App;
