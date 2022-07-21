import React, { useEffect, useState } from 'react';
import { Button, Grid, Input, Pagination, Select, useTheme } from '@geist-ui/react';
import SearchIcon from '@geist-ui/react-icons/search';
import MyCard from '@/components/my-card';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { getCourses } from 'api/courses';

const Page = () => {
  const theme = useTheme();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const student = await getCourses();
      setCourses(student.data?.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="page__wrapper">
        <div className="page__content">
          <div className="actions-stack">
            <Input
              scale={1.25}
              width="100%"
              icon={<SearchIcon color={theme.palette.accents_5} />}
              placeholder="Search..."
            />
            <Select placeholder="Contabilidad" type="default" value="1" scale={1.25}>
              <Select.Option value="1">Contabilidad</Select.Option>
              <Select.Option value="2">Enfermeria</Select.Option>
            </Select>
            <Select placeholder="Primer Periodo" type="default" value="1" scale={1.25}>
              <Select.Option value="1">Primer Periodo</Select.Option>
              <Select.Option value="2">Segundo Periodo</Select.Option>
              <Select.Option value="3">Tercer Periodo</Select.Option>
              <Select.Option value="4">Cuarto Periodo</Select.Option>
              <Select.Option value="5">Quinto Periodo</Select.Option>
              <Select.Option value="6">Sexto Periodo</Select.Option>
            </Select>
            <Button auto type="success" marginLeft={1}>
              Agregar Curso
            </Button>
          </div>
          <Grid.Container gap={2} marginTop={1} justify="flex-start">
            {courses.map((course) => (
              <Grid xs={24} sm={12} md={8} key={course.id}>
                <MyCard name={course.nombre} image={course.url_image} info={course.nDocente} />
              </Grid>
            ))}
          </Grid.Container>
        </div>
        <div className="page__content">
          <Grid.Container>
            <Grid xs={24} justify="center">
              <Pagination count={2} initialPage={1} limit={5}>
                <Pagination.Next>
                  <ChevronRight />
                </Pagination.Next>
                <Pagination.Previous>
                  <ChevronLeft />
                </Pagination.Previous>
              </Pagination>
            </Grid>
          </Grid.Container>
        </div>
      </div>
      <style jsx>{`
        .page__wrapper {
          background-color: ${theme.palette.accents_1};
          min-height: calc(100vh - 172px);
        }
        .page__content {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          width: ${theme.layout.pageWidthWithMargin};
          max-width: 100%;
          margin: 0 auto;
          padding: calc(${theme.layout.unit} * 2) ${theme.layout.pageMargin};
          box-sizing: border-box;
        }
        .actions-stack {
          display: flex;
          width: 100%;
        }
        .actions-stack :global(.input-wrapper) {
          background-color: ${theme.palette.background};
        }
        .actions-stack :global(input) {
          font-size: 14px;
        }
      `}</style>
    </>
  );
};

export default Page;
