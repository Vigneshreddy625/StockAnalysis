import { useState, useEffect } from "react";

function useStockList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://api.iex.cloud/v1/data/CORE/STOCK_COLLECTION/list?collectionName=mostactive&token=pk_ca36bae112604f1bbb67938abc9ad61d")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }, []);

  return data;
}

export default useStockList;