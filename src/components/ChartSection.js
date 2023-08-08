import React, { useState, useEffect, useRef } from "react";
import Chart from "react-apexcharts";

const ChartSection = ({
  Id,
  priceChange24,
  MarketCap,
  TotVol,
  Circulating,
  twitterF,
}) => {
  const [state, setState] = useState({
    Price: {
      options: {
        chart: {
          id: "area-datetime",
        },
        grid: {
          show: false,
        },
        title: {
          text: "Market Price (USD)",
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            color: "#9F91CC",
          },
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
        },
        dataLabels: {
          enabled: false,
        },
        yaxis: {
          show: false,
        },
        colors: ["#9F91CC"],
        tooltip: {
          y: {
            formatter: (value) => {
              return value.toFixed(2);
            },
          },
          theme: "dark",
        },
        selection: 365,
      },
      series: [
        {
          name: "Market Price",
          data: [[1645837250522, 39804.53519937617]],
        },
      ],
    },
    Market_Cap: {
      options: {
        grid: {
          show: false,
        },
        title: {
          text: "Market Cap (USD)",
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            color: "#ff69f5",
          },
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
        },
        dataLabels: {
          enabled: false,
        },
        yaxis: {
          show: false,
        },
        colors: ["#ff69f5"],
        tooltip: {
          y: {
            formatter: (value) => {
              return value.toFixed(2);
            },
          },
          theme: "dark",
        },
      },
      series: [
        {
          name: "Market Cap (USD)",
          data: [[1645837250522, 39804.53519937617]],
        },
      ],
    },
    Tot_Vol: {
      options: {
        grid: {
          show: false,
        },
        title: {
          text: "Market Volume",
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            color: "#00ffea",
          },
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
        },
        dataLabels: {
          enabled: false,
        },
        yaxis: {
          show: false,
        },
        colors: ["#00ffea"],
        tooltip: {
          y: {
            formatter: (value) => {
              return value.toFixed(2);
            },
          },
          theme: "dark",
        },
      },
      series: [
        {
          name: "Market Volume",
          data: [[1645837250522, 39804.53519937617]],
        },
      ],
    },
  });

  const prevId = useRef(Id);
  const prevSelection = useRef(state.Price.options.selection);

  useEffect(() => {
    const fetchData = async () => {
      let chartData = await fetch(
        `https://api.coingecko.com/api/v3/coins/${Id}/market_chart?vs_currency=usd&days=${state.Price.options.selection}`
      );
      let jsonChartData = await chartData.json();
      setState((prevState) => ({
        ...prevState,
        Price: {
          ...prevState.Price,
          series: [{ name: "Market Price", data: jsonChartData.prices }],
        },
        Market_Cap: {
          ...prevState.Market_Cap,
          series: [{ name: "Market Price", data: jsonChartData.market_caps }],
        },
        Tot_Vol: {
          ...prevState.Tot_Vol,
          series: [{ name: "Market Price", data: jsonChartData.total_volumes }],
        },
      }));
    };

    if (prevId.current !== Id) {
      prevId.current = Id;
      fetchData();
    }
    if (prevSelection.current !== state.Price.options.selection) {
      prevSelection.current = state.Price.options.selection;
      fetchData();
    }

    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [Id, state.Price.options.selection]);

  const handleSelection = (days) => {
    setState((prevState) => ({
      ...prevState,
      Price: {
        ...prevState.Price,
        options: {
          ...prevState.Price.options,
          selection: days,
        },
      },
    }));
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col" style={{ maxWidth: "610px" }}>
            <div id="chart">
              <div className="toolbar">
                <button id="one_month" onClick={() => handleSelection(1)}>
                  1D
                </button>
                &nbsp;
                <button id="six_months" onClick={() => handleSelection(7)}>
                  1W
                </button>
                &nbsp;
                <button id="one_year" onClick={() => handleSelection(30)}>
                  1M
                </button>
                &nbsp;
                <button id="ytd" onClick={() => handleSelection(182)}>
                  6M
                </button>
                &nbsp;
                <button id="all" onClick={() => handleSelection(365)}>
                  1Y
                </button>
              </div>
              <Chart
                options={state.Price.options}
                series={state.Price.series}
                type="area"
                height="400"
                width="600"
              />
            </div>
          </div>
          <div className="col" style={{ maxWidth: "200px" }}>
            <div className="card-body">
              <h6
                className="card-title"
                style={{ fontFamily: "NHaasGroteskDSPro-65Md" }}
              >
                Market Cap
              </h6>
              <p
                className="card-text fw-bold"
                style={{
                  fontFamily: "NHaasGroteskDSPro-65Md",
                  color: "#99DBF5",
                  fontSize: "small",
                }}
              >
                $ {MarketCap}
              </p>
            </div>
            <div className="card-body">
              <h6
                className="card-title"
                style={{ fontFamily: "NHaasGroteskDSPro-65Md" }}
              >
                Price Change 24hrs
              </h6>
              <p
                className="card-text fw-bold"
                style={{
                  fontFamily: "NHaasGroteskDSPro-65Md",
                  color: "#99DBF5",
                  fontSize: "small",
                }}
              >
                $ {priceChange24}
              </p>
            </div>
            <div className="card-body">
              <h6
                className="card-title"
                style={{ fontFamily: "NHaasGroteskDSPro-65Md" }}
              >
                Total Volume
              </h6>
              <p
                className="card-text fw-bold"
                style={{
                  fontFamily: "NHaasGroteskDSPro-65Md",
                  color: "#99DBF5",
                  fontSize: "small",
                }}
              >
                $ {TotVol}
              </p>
            </div>
            <div className="card-body">
              <h6
                className="card-title"
                style={{ fontFamily: "NHaasGroteskDSPro-65Md" }}
              >
                Circulating Supply
              </h6>
              <p
                className="card-text fw-bold"
                style={{
                  fontFamily: "NHaasGroteskDSPro-65Md",
                  color: "#99DBF5",
                  fontSize: "small",
                }}
              >
                {Circulating}
              </p>
            </div>
            <div className="card-body">
              <h6
                className="card-title"
                style={{ fontFamily: "NHaasGroteskDSPro-65Md" }}
              >
                Twitter Followers
              </h6>
              <p
                className="card-text fw-bold"
                style={{
                  fontFamily: "NHaasGroteskDSPro-65Md",
                  color: "#99DBF5",
                  fontSize: "small",
                }}
              >
                {twitterF}
              </p>
            </div>
          </div>
          <div className="col" style={{ maxWidth: "310px" }}>
            <div>
              <Chart
                options={state.Market_Cap.options}
                series={state.Market_Cap.series}
                type="line"
                height="200"
                width="300"
              />
            </div>
            <div>
              <Chart
                options={state.Tot_Vol.options}
                series={state.Tot_Vol.series}
                type="line"
                height="200"
                width="300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
