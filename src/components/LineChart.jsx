import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

const LineChart = ({data, borderColor, backgroundColor, text}) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(()=>{
        if(chartInstance.current){
            chartInstance.current.destroy();
        }
        const myChartRef = chartRef.current.getContext("2d");

        chartInstance.current = new Chart(myChartRef, {
            type: "line",
            data:{
                labels: ["M", "T", "W", "T", "F", "S", "S"],
                datasets: [
                    {
                        label: "Line Chart",
                        data: data,
                        fill: false,
                        borderColor: borderColor,
                        borderWidth: 2
                    }
                ]
            }
        })
        return ()=>{
            if(chartInstance.current){
                chartInstance.current.destroy();
            }
        }
    }, [])
  return (
    <div className="w-full h-full">
        <div className="flex space-x-3">
            <div className={`w-4 h-6 ${backgroundColor}`}></div>
            <h2 className="text-neutral-50 font-medium capitalize">{text}</h2>
        </div>
      <canvas ref={chartRef}/>
    </div>
  )
}

export default LineChart
