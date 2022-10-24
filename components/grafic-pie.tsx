import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  info?: any;
  labels?: string[];
}

type GraficPieProps = Props;

export const GraficPie: React.FC<GraficPieProps> = ({ labels, info }) => {
  const { estudiantes, graduados, matriculados, sinMatricula } = info;
  const data = {
    labels: labels,
    datasets: [
      {
        data: [estudiantes || matriculados, graduados || sinMatricula],
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true
      }
    }
  };
  return <Doughnut data={data} options={options} />;
};
