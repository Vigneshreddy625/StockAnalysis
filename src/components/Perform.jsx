import React from "react";
import useStockApp from "../hooks/StockPerform";

const Perform = () => {
  const data = useStockApp();
  const halfwayThrough = Math.ceil(data.length / 2);
  const firstHalf = data.slice(0, halfwayThrough);
  const secondHalf = data.slice(halfwayThrough);

  const calculateTotalPerformance = (dataArray) => {
    return dataArray.reduce((acc, item) => acc + item.performance, 0);
  };

  const renderData = (dataArray) => {
    return dataArray.map((item, index) => (
      <div key={index} className="flex justify-between items-center mb-2">
        <span className="font-medium text-gray-400">{item.name}</span>
        <span
          className={`px-2 py-1 rounded ${
            item.performance > 0
              ? "bg-gradient-to-l from-green-500 to-transparent text-green"
              : "bg-gradient-to-l from-red-500 to-transparent text-red"
          }`}
        >
          {item.performance.toFixed(4) > 0
            ? +item.performance.toFixed(4)
            : item.performance.toFixed(4)}
          %
        </span>
      </div>
    ));
  };

  return (
    <div className=" max-w-screen-md flex flex-col h-1/2 mx-10 my-10 rounded-md">
      <div className="w-full flex justify-between dark:bg-gray-800 px-4 py-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Sector Performance
        </h2>
        <p className="font-semibold  text-gray-400">% price change</p>
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full bg-gray-800">
          <div className="w-1/2 flex justify-between px-4 bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              All sectors
              <hr className="border border-purple-600"></hr>
            </h2>
            <p className="mt-4 text-sm px-4 font-medium text-gray-900 dark:text-white">
              {(
                calculateTotalPerformance(firstHalf) +
                calculateTotalPerformance(secondHalf)
              ).toFixed(4)}
              %
            </p>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-1/2 dark:bg-gray-800 px-4 py-4">
            {renderData(firstHalf)}
          </div>
          <div className="w-1/2 dark:bg-gray-800 px-4 py-4">
            {renderData(secondHalf)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perform;
