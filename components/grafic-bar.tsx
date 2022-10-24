import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { SocketContext } from 'context/SocketProvider';
import { useContext, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  data?: object;
  options?: object;
  labels?: [];
}

type GraficBarProps = Props;

interface CourseByProgramState {
  contabilidad: number;
  enfermeria: number;
}

export const GraficBar: React.FC<GraficBarProps> = ({}) => {
  const [courseByPrograms, setCourseByPrograms] = useState<CourseByProgramState>({
    contabilidad: 0,
    enfermeria: 0
  });
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on('courses-by-program', (data) => {
      setCourseByPrograms(data);
    });
    return () => socket.off('courses-by-program');
  }, [socket]);

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
    labels: ['Contabilidad', 'Enfermeria'],
    datasets: [
      {
        label: '# de Cursos',
        data: [courseByPrograms.contabilidad, courseByPrograms.enfermeria],
        backgroundColor: ['rgba(153, 102, 255, 0.2)', 'rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(153, 102, 255, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1
      }
    ]
  };
  return <Bar options={options} data={data} />;
};
