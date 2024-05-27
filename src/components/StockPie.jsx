import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import useStockApp from "../hooks/StockPerform";

const PieChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Dataset",
        data: [],
        fill: false,
        backgroundColor: [],
        borderColor: [],
      },
    ],
  });

  const data = useStockApp();
  const [loading, setLoading] = useState(true);

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const labels = data.map((pair) => pair.name);
      const datas = data.map((pair) => pair.performance);

      const colors = labels.map(() => getRandomColor());
      const borderColor = colors.map(color => color);

      setChartData({
        labels: labels,
        datasets: [
          {
            data: datas,
            fill: false,
            backgroundColor: colors,
            borderColor: borderColor,
          },
        ],
      });
      setLoading(false);
    }
  }, [data]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-black w-13/14 flex justify-center">
      <div className="w-1/2">
        <h1 className="text-white text-center">Sector Performance Chart</h1>
        {loading ? (
          <p className="text-white text-center">Loading...</p>
        ) : (
          <div className="relative">
            <Pie data={chartData} options={chartOptions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PieChart;
