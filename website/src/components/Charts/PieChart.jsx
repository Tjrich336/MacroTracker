import React from 'react'
import { PieChart, Pie, Cell} from 'recharts';

const Charts = ({data}) => {
    const chartData = [
      { name: 'Fat', value: data.fat },
      { name: 'Protein', value: data.protein },
      { name: 'Carbs', value: data.carbs },
    ];
    const COLORS = ['rgb(213, 83, 104)', 'rgb(192, 52, 192)', 'rgb(209, 113, 147)'];

return (
        <PieChart width={400} height={200} className='pie-chart'>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={70}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
    );
}

export default Charts;