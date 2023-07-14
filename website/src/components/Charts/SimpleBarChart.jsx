import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const SimpleBarChart = ({ data, goal }) => {
  const chartData = [
    { name: 'Fat', value: data.fat, goal: goal.fats},
    { name: 'Protein', value: data.protein, goal: goal.protein},
    { name: 'Carbs', value: data.carbs, goal: goal.carbs },
  ];

  return (
      <BarChart 
        data={chartData} 
        width={500}
        height={300}
        className='simple-bar-chart'
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="rgb(11, 103, 504)" isAnimationActive={true} animationDuration={1000} />
        <Bar dataKey="goal" fill="rgb(192, 52, 592)" isAnimationActive={true} animationDuration={1750}/>
      </BarChart>
    
  );
};

export default SimpleBarChart;