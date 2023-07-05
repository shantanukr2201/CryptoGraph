import React, { useState, useEffect } from "react";
import CardSection from "./components/CardSection";
import ChartSection from "./components/ChartSection";
import Header from "./components/Header";

const App = () => {
  // Component state
  const [state, setState] = useState({
    Id: "bitcoin",
    Data: {},
  });

  // Fetch data function
  const fetchData = async () => {
    let data = await fetch(
      "https://api.coingecko.com/api/v3/coins/" + state.Id
    );
    let JsonData = await data.json();
    setState({ ...state, Data: JsonData });
  };

  // Handle submit function
  const handleSubmit = async (event) => {
    console.log(event.target.value);
    await setState({ ...state, Id: event.target.value });
    fetchData();
  };

  // Component lifecycle hooks
  useEffect(() => {
    fetchData();
    const interval = setInterval(() => fetchData(), 2000);

    // Cleanup function
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <Header handle_Submit={handleSubmit} />
      <CardSection
        coinName={state.Data.name}
        currentPrice={
          state.Data.market_data
            ? state.Data.market_data.current_price["usd"]
            : ""
        }
        mCap24={
          state.Data.market_data
            ? state.Data.market_data.market_cap_change_percentage_24h
            : ""
        }
        ath={state.Data.market_data ? state.Data.market_data.ath.usd : ""}
        atl={state.Data.market_data ? state.Data.market_data.ath.usd : ""}
        sentiment={state.Data.sentiment_votes_up_percentage}
        high24={
          state.Data.market_data ? state.Data.market_data.high_24h["usd"] : ""
        }
        low24={
          state.Data.market_data ? state.Data.market_data.low_24h["usd"] : ""
        }
      />
      <ChartSection
        Id={state.Id}
        priceChange24={
          state.Data.market_data
            ? state.Data.market_data.price_change_24h_in_currency.usd
            : ""
        }
        MarketCap={
          state.Data.market_data ? state.Data.market_data.market_cap.usd : ""
        }
        TotVol={
          state.Data.market_data ? state.Data.market_data.total_volume.usd : ""
        }
        Circulating={
          state.Data.market_data
            ? state.Data.market_data["circulating_supply"]
            : ""
        }
        twitterF={
          state.Data.community_data
            ? state.Data.community_data.twitter_followers
            : ""
        }
      />
    </div>
  );
};

export default App;
