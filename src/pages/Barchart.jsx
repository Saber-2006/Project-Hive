import { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";

export default function Barchart({ categories, values }) {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const labelColor = isDark ? "#e5e7eb" : "#374151";
  const axisLineColor = isDark ? "#4b5563" : "#d1d5db";

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },

    textStyle: {
      color: labelColor,
    },

    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },

    xAxis: [
      {
        type: "category",
        data: categories,
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          color: labelColor,
        },
        axisLine: {
          lineStyle: {
            color: axisLineColor,
          },
        },
      },
    ],

    yAxis: [
      {
        type: "value",
        axisLabel: {
          color: labelColor,
        },
        axisLine: {
          lineStyle: {
            color: axisLineColor,
          },
        },
        splitLine: {
          lineStyle: {
            color: axisLineColor,
          },
        },
      },
    ],

    series: [
      {
        name: "Tasks per Project",
        type: "bar",
        barWidth: "60%",
        data: values,
        itemStyle: {
          color: "#3b82f6",
        },
      },
    ],
  };

  return <ReactECharts option={option} notMerge={true} lazyUpdate={true} />;
}