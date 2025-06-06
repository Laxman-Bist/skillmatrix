import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  data: {
    labels: string[];
    values: number[];
  };
  title: string;
  colorScheme?: string[];
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ 
  data, 
  title,
  colorScheme = [
    '#1E3A8A', '#0F766E', '#F97066', 
    '#15803D', '#B45309', '#991B1B',
    '#4338CA', '#0891B2', '#BE185D'
  ] 
}) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: title,
        data: data.values,
        backgroundColor: colorScheme.slice(0, data.labels.length),
        borderColor: colorScheme.map(color => color),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          boxWidth: 12,
        },
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold' as const,
        },
        padding: {
          bottom: 20,
        },
      },
    },
    cutout: '70%',
  };

  return (
    <div className="bg-white rounded-xl shadow-card p-4 h-full">
      <div className="h-full flex items-center justify-center">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default DoughnutChart;