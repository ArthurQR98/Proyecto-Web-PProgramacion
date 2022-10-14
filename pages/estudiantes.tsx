import React, { useState } from 'react';
import { Button, Grid, Input, Pagination, Select, useTheme } from '@geist-ui/react';
import SearchIcon from '@geist-ui/react-icons/search';
import MyCardStudent from '@/components/my-cardStudent';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { MyModal } from '@/components/model-custom';
import { AddEstudentForm } from '@/components/add-estudent-form';
import { Student } from 'interfaces/studentsResponse';
import { useStudentPage } from 'hooks/useStudentPage';

const Page = () => {
  const theme = useTheme();
  const [studentData, setStudentData] = useState({});
  const [loading, setLoading] = useState(false);

  // Modal
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Modal
  const showModal = () => {
    setIsVisibleModal(true);
    setModalContent(<AddEstudentForm status={status} setStudentData={setStudentData} />);
  };

  // Modal
  const closeModal = () => {
    setStudentData({});
    setIsVisibleModal(false);
  };

  const {
    setReloadStudent,
    status,
    currentPage,
    onQueryChanged,
    selectHandler,
    students,
    metadatos,
    nextPage,
    addUser
  } = useStudentPage(studentData, closeModal, setLoading);

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
              clearable
              onChange={onQueryChanged}
            />
            <Select
              placeholder="Estudiante"
              type="default"
              value="1"
              scale={1.25}
              onChange={(value) => selectHandler(value)}
            >
              <Select.Option value="1">Estudiante</Select.Option>
              <Select.Option value="2">Egresado</Select.Option>
            </Select>
            <Button auto onClick={showModal} type="success" marginLeft={1}>
              Agregar Estudiante
            </Button>

            <MyModal
              title="Agregar Estudiante"
              nameAction="Guardar"
              stateInitial={isVisibleModal}
              loading={loading}
              setState={setIsVisibleModal}
              closeHandler={closeModal}
              exec={addUser}
            >
              {modalContent}
            </MyModal>
          </div>

          <Grid.Container gap={2} marginTop={1} justify="flex-start">
            {students.map((student: Student) => (
              <Grid xs={24} sm={12} md={8} key={student.id}>
                <MyCardStudent
                  student={student}
                  setReloadStudent={setReloadStudent}
                  studentData={studentData}
                  setStudentData={setStudentData}
                  loading={loading}
                  setLoading={setLoading}
                />
              </Grid>
            ))}
          </Grid.Container>
        </div>
        <div className="page__content">
          <Grid.Container>
            <Grid xs={24} justify="center">
              <Pagination
                count={metadatos.lastPage}
                page={currentPage}
                limit={metadatos.perPage}
                onChange={(pageNumber) => nextPage(pageNumber)}
              >
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
