import React, { useState, useEffect } from "react";
import "./App.css";
import data from "./data";

function App() {
  const [item, setItem] = useState([]);
  const [count, setCount] = useState(1);
  const [cost, setCost] = useState(0);
  const [money, setMoney] = useState(0);

  useEffect(() => {
    setItem(data);
  }, []);

  function deleteItem(id) {
    const data = item.filter((i) => i.id !== id);
    setItem(data);
    document.getElementById("delete").innerHTML = "Item deleted";
  }

  function decrement(item) {
    setCount(item.count--);
  }

  function increment(item) {
    setCount(item.count++);
    setMoney((count + 1) * item.price);
  }
  console.log(count, money);
  return (
    <div>
      <h1>Order summary</h1>
      <span id="delete"></span>
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
            Items: <span id="cost">${money}</span>
          </p>
          <p>
            Discount: <span>{}</span>
          </p>
          <p>
            Order total <span>${money}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
