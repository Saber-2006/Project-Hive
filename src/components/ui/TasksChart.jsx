import { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";

export default function PieChart({ complted, todo }) {
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
    backgroundColor: "transparent",
    color: ["#22c55e", "#3b82f6"],
    textStyle: {
      color: labelColor,
    },
    series: [
      {
        type: "pie",
        label: {
          fontSize: 14,
          fontWeight: "bold",
          color: labelColor,
        },
        data: [
          { value: complted, name: `Completed Tasks: ${complted}` },
          { value: todo, name: `To Do: ${todo}` },
        ],
      },
    ],
  };

  return <ReactECharts option={option} notMerge={true} lazyUpdate={true} />;
}