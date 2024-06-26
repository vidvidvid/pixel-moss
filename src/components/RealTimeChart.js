import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import { TooltipComponent, GridComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([LineChart, TooltipComponent, GridComponent, CanvasRenderer]);

function RealTimeChart({ data }) {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartRef.current && !chartInstance) {
      const myChart = echarts.init(chartRef.current, "dark");
      setChartInstance(myChart);
    }
  }, [chartInstance]);

  useEffect(() => {
    if (chartInstance) {
      const option = {
        backgroundColor: "transparent",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
          backgroundColor: "black",
          textStyle: {
            color: "white",
          },
          borderColor: "#333",
          borderWidth: 1,
          padding: 10,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "time",
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
            },
          },
        },
        series: [
          {
            name: "Light Level",
            type: "line",
            data: data.map((item) => [new Date(item.time), item.lightLevel]),
            lineStyle: {
              color: "#D3FF00",
              width: 2,
            },
            itemStyle: {
              color: "#D3FF00",
            },
          },
          {
            name: "Moisture Level",
            type: "line",
            data: data.map((item) => [new Date(item.time), item.moistureLevel]),
            lineStyle: {
              color: "#C6A4FF",
              width: 2,
            },
            itemStyle: {
              color: "#C6A4FF",
            },
          },
        ],
      };

      chartInstance.setOption(option, true);
    }
  }, [data, chartInstance]);

  useEffect(() => {
    return () => {
      if (chartInstance) {
        chartInstance.dispose();
      }
    };
  }, [chartInstance]);

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
}

export default RealTimeChart;
