import React, { useEffect, useState } from 'react';
import { Button, Grid, Input, Pagination, Select, useTheme } from '@geist-ui/react';
import SearchIcon from '@geist-ui/react-icons/search';
import MyCard from '@/components/my-card';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Model_custom } from '@/components/model-custom';
import { AddEstudentForm } from '@/components/add-estudent-form';
import { getStudents } from 'api/students';

const Page = () => {
  const theme = useTheme();

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState(null);

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const student = await getStudents();
      setStudents(student.data?.data);
    };
    fetchData();
  }, []);

  const handler = () => {
    setIsVisibleModal(true);
    setModalTitle('Agregar Estudiante');
    setModalContent(<AddEstudentForm setIsVisibleModal={setIsVisibleModal} />);
  };
  const closeHandler = () => {
    setIsVisibleModal(false);
  };

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
            <Select placeholder="Estudiante" type="default" value="1" scale={1.25}>
              <Select.Option value="1">Estudiante</Select.Option>
              <Select.Option value="2">Egresado</Select.Option>
            </Select>
            <Button auto onClick={handler} type="success" marginLeft={1}>
              Agregar Estudiante
            </Button>
            <Model_custom
              title={modalTitle}
              stateInitial={isVisibleModal}
              setState={setIsVisibleModal}
              closeHandler={closeHandler}
            >
              {modalContent}
            </Model_custom>
          </div>

          <Grid.Container gap={2} marginTop={1} justify="flex-start">
            {students.map((student) => (
              <Grid xs={24} sm={12} md={8} key={student.id}>
                <MyCard name={student.nombres} image={student.url_image} info={student.codigo} />
              </Grid>
            ))}
          </Grid.Container>
        </div>
        <div className="page__content">
          <Grid.Container>
            <Grid xs={24} justify="center">
              <Pagination count={10} initialPage={1} limit={5}>
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
