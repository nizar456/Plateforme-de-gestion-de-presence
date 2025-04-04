"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"
import { useTheme } from "../../context/ThemeContext"

function BarChart({ data }) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")

    // Définir les couleurs en fonction du thème
    const textColor = theme === "dark" ? "#e5e7eb" : "#374151"
    const gridColor = theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: textColor,
              font: {
                size: 12,
                family: "'Inter', sans-serif",
              },
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
            backgroundColor: theme === "dark" ? "#374151" : "#ffffff",
            titleColor: theme === "dark" ? "#e5e7eb" : "#111827",
            bodyColor: theme === "dark" ? "#e5e7eb" : "#374151",
            borderColor: theme === "dark" ? "#4b5563" : "#e5e7eb",
            borderWidth: 1,
          },
        },
        scales: {
          x: {
            grid: {
              color: gridColor,
            },
            ticks: {
              color: textColor,
              font: {
                size: 11,
                family: "'Inter', sans-serif",
              },
            },
          },
          y: {
            grid: {
              color: gridColor,
            },
            ticks: {
              color: textColor,
              font: {
                size: 11,
                family: "'Inter', sans-serif",
              },
            },
            beginAtZero: true,
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data, theme])

  return <canvas ref={chartRef} />
}

export default BarChart

