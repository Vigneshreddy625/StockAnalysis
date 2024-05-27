import React, { useState, useEffect, useCallback } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

const ChartComponent = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Dataset",
        data: [],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  });

  const [loading, setLoading] = useState(false);
  const [symbol, setSymbol] = useState("MONTHLY");
  const [timeSeries, setTimeSeries] = useState("Monthly Time Series");

  const handleDailyClick = () => {
    setSymbol("DAILY");
    setTimeSeries("Time Series (Daily)");
  };

  const handleMonthlyClick = () => {
    setSymbol("MONTHLY");
    setTimeSeries("Monthly Time Series");
  };

  const handleWeeklyClick = () => {
    setSymbol("WEEKLY");
    setTimeSeries("Weekly Time Series");
  };

  const fetchData = useCallback(async (symbol, timeSeries) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_${symbol}&symbol=IBM&apikey=YND40EGTDDFYG3TK`
      );
      const rep = await response.json();

      if (rep[timeSeries]) {
        const dateClosePairs = Object.entries(rep[timeSeries]).map(
          ([date, values]) => {
            return { date, close: parseFloat(values["4. close"]) };
          }
        );

        const labels = dateClosePairs.map((pair) => pair.date);
        const datas = dateClosePairs.map((pair) => pair.close);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: `Dataset for ${symbol}`,
              data: datas,
              fill: false,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
            },
          ],
        });
      } else {
        console.error("Invalid response:", rep);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData(symbol, timeSeries);
  }, [symbol, timeSeries, fetchData]);

  const calculateAverage = (data) => {
    const total = data.reduce((sum, value) => sum + value, 0);
    return total / data.length;
  };

  const averagePlugin = {
    id: "averageLine",
    afterDatasetsDraw: (chart) => {
      const {
        ctx,
        scales: { y, x },
        data,
      } = chart;
      const average = calculateAverage(data.datasets[0].data);
      const averageY = y.getPixelForValue(average);

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x.left, averageY);
      ctx.lineTo(x.right, averageY);
      ctx.strokeStyle = "orange";
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.restore();
      ctx.fillStyle = "white";
      ctx.fillText(
        `Average: ${average.toFixed(2)}`,
        x.right - 100,
        averageY - 10
      );
    },
  };

  Chart.register(averagePlugin);

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: "IBM",
      },
      averageLine: true,
    },
    scales: {
      x: {
        display: true,
      },
      y: {
        display: true,
      },
    },
  };

  return (
    <div className="bg-black w-full">
      <h1 className="text-white">Stock Data Chart</h1>
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <Line data={chartData} options={chartOptions} />
      )}
      <div className="w-1/2 flex justify-around text-white pl-10">
        <button onClick={handleDailyClick}>Day</button>
        <button onClick={handleWeeklyClick}>Week</button>
        <button onClick={handleMonthlyClick}>Month</button>
      </div>
    </div>
  );
};

export default ChartComponent;
