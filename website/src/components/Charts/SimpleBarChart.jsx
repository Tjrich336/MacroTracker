import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SimpleBarChart = ({ data }) => {
  const chartData = [
    { name: 'Fat', value: data.fat, },
    { name: 'Protein', value: data.protein,},
    { name: 'Carbs', value: data.carbs, },
  ];

  return (
    
      <BarChart 
        data={chartData} 
        width={500}
        height={300}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
        <Bar dataKey="goal" fill="#82ca9d" />
      </BarChart>
    
  );
};

export default SimpleBarChart;
