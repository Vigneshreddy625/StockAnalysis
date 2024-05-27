import React from "react";
import useStockList from "../hooks/StockList";

const StockList = () => {
  const data = useStockList();

  const renderData = (dataArray) => {
    return dataArray.map((item, index) => (
      <div
        key={index}
        className="flex justify-around items-center hover:bg-gray-500 mb-2 rounded-md"
      >
        <div className=" w-1/2 font-medium text-gray-400">
          {item.companyName}
        </div>
        <div className=" w-1/4 font-medium text-white">{item.close}</div>
        <div
          className={` w-1/8 px-2 py-1 rounded ${
            item.change > 0 ? "text-green-900" : "text-red"
          }`}
        >
          {item.change}
        </div>
        <div
          className={`w-1/8 px-2 py-1 rounded ${
            item.changePercent > 0
              ? "bg-gradient-to-l from-green-500 to-transparent text-green"
              : "bg-gradient-to-l from-red-500 to-transparent text-red"
          }`}
        >
          {item.changePercent.toFixed(4)}%
        </div>
      </div>
    ));
  };

  return (
    <div className=" w-full flex justify-between h-auto mx-4 my-10 rounded-md">
      <div className=" w-full px-4 py-4 box-border">{renderData(data)}</div>
    </div>
  );
};

export default StockList;
