import React, { useState, useEffect } from "react";
import "./App.css";
import data from "./data";

function App() {
  const [item, setItem] = useState([]);
  const [count, setCount] = useState(1);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    setItem(data);
  }, []);

  console.log(cost);

  function deleteItem(id) {
    const data = item.filter((i) => i.id !== id);
    setItem(data);
  }

  function decrement(item) {
    setCount(item.count--);
  }

  function increment(item) {
    setCount(item.count++);
    let money = count * item.price;
    console.log(money);
  }

  return (
    <div>
      <h1>Order summary</h1>
      <div className="App">
        <div className="cart">
          <ul>
            {item.map((item) => (
              <div className="items" key={item.id}>
                <li className="info" key={item.id}>
                  <span>
                    <img src={item.img_url} alt={item.name} />
                  </span>
                  {item.name}
                  <span className="close" onClick={() => deleteItem(item.id)}>
                    &times;
                  </span>
                </li>
                <li>
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
            Order total <span>${cost}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
