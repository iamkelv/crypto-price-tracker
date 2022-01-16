import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";
import { Coin } from "./Coin";

function App() {
  const [coin, setCoin] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    <h1>Loading...</h1>;
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoin(res.data);
        console.log(res.data);
      })
      .catch((error) => alert(error));
  }, []);
  const handleChange = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };
  const filteredcoin = coin.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency </h1>
        <form>
          <input
            className="coin-input"
            onChange={handleChange}
            placeholder="search"
            type="text"
          />
        </form>
      </div>
      {filteredcoin.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            image={coin.image}
            symbol={coin.symbol}
            market_cap={coin.market_cap}
            priceChange={coin.price_change_percentage_24h}
            total_volume={coin.total_volume}
          />
        );
      })}
    </div>
  );
}

export default App;
