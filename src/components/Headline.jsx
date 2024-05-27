import React from "react";

function Headline() {
  const status = true; 

  const bullish = status === true;

  const bullishColor = bullish ? "text-green-500" : "text-red-500";
  const arrowColor = bullish ? "text-green-500" : "text-red-500";

  const arrowUp = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`w-6 h-6 ${arrowColor}`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </svg>
  );

  const arrowDown = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`w-6 h-6 ${arrowColor}`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );

  return (
    <div className="flex flex-col justify-between h-100 bg-black w-1/2 mx-10 my-10 rounded-md">
      <div className="bg-black mx-4 my-4 flex items-center">
        <p className="text-gray-200 bg-gray-700 rounded-lg px-4 flex items-center">
          The markets are{" "}
          <span className={`ml-1 ${bullishColor}`}>
            {bullish ? "bullish" : "bearish"}
          </span>
        </p>
        <span className="ml-2 bg-gray-700 rounded-full">
          {bullish ? arrowUp : arrowDown}
        </span>
      </div>
      <div className="bg-black mx-4 my-4">
        <span className="text-gray-600 px-3">What you need to know</span>
        <p className="text-white text-2xl px-3 py-2">
          Jan Inflation surges, Squeezing Budgets; S&P 500 Rallies as Markets
          Face 'Bumpy' 2% Path
        </p>
      </div>
    </div>
  );
}

export default Headline;
