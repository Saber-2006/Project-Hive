import { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";

export default function ProjectPieChart({ Active, OnHold, Completed }) {
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

  const option = {
    color: ["#3B82F6", "#F59E0B", "#10B981"],

    textStyle: {
      color: labelColor,
    },

    legend: {
      orient: "vertical",
      x: "left",
      data: ["Active", "On Hold", "Completed"],
      textStyle: {
        color: labelColor,
      },
    },

    series: [
      {
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
          color: labelColor,
        },
        labelLine: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "25",
            fontWeight: "bold",
            color: labelColor,
          },
        },
        data: [
          { value: Active, name: "Active" },
          { value: OnHold, name: "On Hold" },
          { value: Completed, name: "Completed" },
        ],
      },
    ],
  };

  return <ReactECharts option={option} notMerge={true} lazyUpdate={true} />;
}