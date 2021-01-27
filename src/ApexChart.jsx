import React, { useState } from "react";
import Chart from "react-apexcharts";
import { useQuery } from "react-query";
const fetchData = async () => {
  const res = await fetch("http://localhost:9000/data");
  const data = await res.json();
  return data;
};
const ApexChart = () => {
  const [options, setOptions] = useState({
    chart: {
      backgroundColor: "#f4f4f4",
      foreColor: "#333",
    },
    xaxis: {
      categories: [],
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    fill: {
      colors: ["#f44360"],
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: "Largest Cities By Population",
      align: "center",
      margin: 20,
      offsetY: 20,
      style: {
        fontSize: "24px",
      },
    },
  });
  const [series, setSeries] = useState([
    {
      name: "Population",
      data: [],
    },
  ]);
  const handleClick = (e) => {
    setOptions({
      ...options,
      plotOptions: {
        ...options.plotOptions,
        bar: {
          ...options.plotOptions.bar,
          horizontal: !options.plotOptions.bar.horizontal,
        },
      },
    });
  };
  const { data, status } = useQuery("chartData", fetchData, {
    onSuccess: (data) => {
      const population = data.map((elem) => elem.population);
      const country = data.map((elem) => elem.country);
      setSeries([{ name: series.name, data: population }]);
      setOptions({
        ...options,
        xaxis: { categories: [...country] },
      });
    },
    // staleTime: Infinity,
  });

  return (
    <>
      {status === "loading" && <p>loading... </p>}
      {status === "error" && <p>getting error in fetching data </p>}

      {status === "success" && (
        <>
          <Chart
            options={options}
            series={series}
            type="bar"
            width="100%"
            height="500"
          />
          <button
            onClick={handleClick}
            style={{
              padding: "8px 30px",
              background: "#f44360",
              color: "#f4f4f4",
              fontSize: "1em",
              outline: "none",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Toggle Position
          </button>
        </>
      )}
    </>
  );
};

export default ApexChart;
