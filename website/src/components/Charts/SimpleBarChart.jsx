import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const SimpleBarChart = ({ data, goal }) => {
  const chartData = [
    { name: 'Fats', Value: data.fat, Goal: goal.fats},
    { name: 'Protein', Value: data.protein, Goal: goal.protein},
    { name: 'Carbs', Value: data.carbs, Goal: goal.carbs },
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
        <Bar dataKey="Value" fill="#fa553d" isAnimationActive={true} animationDuration={1000} />
        <Bar dataKey="Goal" fill="#07aee8" isAnimationActive={true} animationDuration={1750}/>
      </BarChart>
    
  );
};

export default SimpleBarChart;