import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
} from "recharts";
function ChartSetup({charts}) {
    if(!charts || charts.length===0 ){
        return null;
    }
  return (
    <div className='space-y-8'>
{charts.map((chart,index)=>(
    <div key={index} className='border border-gray-200 rounded-xl p-4 bg-white'>

    <h4 className='font-semibold text-gray-800 mb-3'>
        📊 {chart.title}
    </h4>
    <div className='h-72'>

    <ResponsiveContainer width="100%" height="100%">
    {chart.type === "bar" && (
        <BarChart data={chart.data}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
    )}
{chart.type === "line" && (
    <LineChart data={chart.data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone"
              dataKey="value"
              stroke="#6366f1"
              strokeWidth={3} />
    </LineChart>
)}
{chart.type === "pie" && (
    <PieChart>
        <Tooltip />
        <Pie data={chart.data}
             dataKey="value"
             nameKey="name"
             outerRadius={100}
             label>
        </Pie>
    </PieChart>
)}
    </ResponsiveContainer>
    </div>
    </div>
))}
</div>
  )
}

export default ChartSetup
