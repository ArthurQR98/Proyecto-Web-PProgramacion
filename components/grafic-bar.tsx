import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  data?: object;
  options?: object;
  labels?: [];
}

type GraficBarProps = Props;

export const GraficBar: React.FC<GraficBarProps> = ({ data: info }) => {
  const labels = ['Enfermeria', 'Contabilidad'];
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

  const data = {
    labels,
    datasets: [
      {
        label: 'Enfermeria',
        data: 5,
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      },
      {
        label: 'Contabilidad',
        data: 10,
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      }
    ]
  };
  return <Bar options={options} data={data} />;
};
