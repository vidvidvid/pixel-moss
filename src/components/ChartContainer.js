import React, { useState } from "react";
import RealTimeChart from "./RealTimeChart";

const ChartContainer = ({ sensorData }) => {
  const [showAllData, setShowAllData] = useState(true);

  const toggleDataView = () => setShowAllData(!showAllData);

  const filteredChartData = sensorData
    .filter((dataItem) => {
      if (showAllData) return true;
      const dataDate = new Date(dataItem.timestamp).setHours(0, 0, 0, 0);
      const today = new Date().setHours(0, 0, 0, 0);
      return dataDate === today;
    })
    .map((dataItem) => ({
      time: dataItem.timestamp,
      lightLevel: dataItem.lightLevel,
      moistureLevel: dataItem.moistureLevel,
    }));

  return (
    <div
      style={{
        width: "80%",
        height: "80%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        marginTop: -20,
      }}
    >
      <RealTimeChart data={filteredChartData} />
      <div
        onClick={toggleDataView}
        style={{
          position: "absolute",
          bottom: -85,
          right: 0,
          display: "flex",
          alignItems: "center",
          width: 150,
          cursor: "pointer",
        }}
      >
        <div className='text-green voxel-font'>
          {showAllData ? "Show Today's Data" : "Show All Data"}
        </div>
      </div>
    </div>
  );
};

export default ChartContainer;
