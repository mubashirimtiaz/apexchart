import React from "react";
import ApexChart from "./ApexChart";
import { ReactQueryDevtools } from "react-query/devtools";
import "./ApexChart.css";
function App() {
  return (
    <div className="container">
      <ApexChart />
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}

export default App;
