import React, { useContext, useEffect, useState } from 'react';
import { Card, Grid, Text, useTheme } from '@geist-ui/react';
import Heading from '@/components/heading';
import { GraficBar } from '@/components/grafic-bar';
import { GraficPie } from '@/components/grafic-pie';
import { SocketContext } from 'context/SocketProvider';

export interface StudentState {
  estudiantes: number;
  graduados: number;
}

export interface EnrollState {
  matriculados: number;
  sinMatricula: number;
}

const Page = () => {
  const theme = useTheme();
  const [students, setStudents] = useState<StudentState>({
    estudiantes: 0,
    graduados: 0
  });
  const [enroll, setEnroll] = useState<EnrollState>({
    matriculados: 0,
    sinMatricula: 0
  });
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on('all-students', (data) => {
      setStudents(data);
    });
    return () => socket.off('all-students');
  }, [socket]);

  useEffect(() => {
    socket.on('enrolls', (data) => {
      setEnroll(data);
    });
    return () => socket.off('enrolls');
  }, [socket]);

  return (
    <>
      <Heading />
      <div className="page__wrapper">
        <div className="page__content">
          <Grid.Container gap={2} justify="center">
            <Grid xs={24}>
              <Card shadow width="100%" height="100%">
                <Text h3>Cursos</Text>
                <GraficBar />
              </Card>
            </Grid>
            <Grid xs={24} justify="center">
              <Card shadow width="480px" height="100%" margin={1}>
                <Text h3>Estudiantes</Text>
                <GraficPie labels={['Estudiantes', 'Egresados']} info={students} />
              </Card>
              <Card shadow width="480px" height="100%" margin={1}>
                <Text h3>Matriculados</Text>
                <GraficPie labels={['Matriculados', 'No Matriculados']} info={enroll} />
              </Card>
            </Grid>
          </Grid.Container>
        </div>
      </div>
      <style jsx>{`
        .page__wrapper {
          background-color: ${theme.palette.accents_1};
        }
        .page__content {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          width: ${theme.layout.pageWidthWithMargin};
          max-width: 100%;
          margin: 0 auto;
          padding: 0 ${theme.layout.pageMargin};
          transform: translateY(-35px);
          box-sizing: border-box;
        }
        .card {
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Page;
