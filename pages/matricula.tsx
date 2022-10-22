import React, { useEffect, useState } from 'react';
import { Button, Grid, Pagination, useTheme, useToasts } from '@geist-ui/react';
import Heading from '@/components/heading';
import { MyModal } from '@/components/model-custom';
import { EnrollForm } from '@/components/enroll-form';
import { baseAPI } from 'api/baseApi';
import { CreateEnrollResponse, GetEnrollResponse, Meta } from 'interfaces/actionsResponse';
import { CardEnroll } from '@/components/cardEnroll';
import { ChevronLeft, ChevronRight } from 'react-feather';

const Page = () => {
  const theme = useTheme();
  const [enrolls, setEnrolls] = useState([]);
  const [reloadEnroll, setReloadEnroll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enrollData, setEnrollData] = useState({});
  const [metadatos, setMetadatos] = useState<Meta>({} as Meta);
  const [currentPage, setCurrentPage] = useState(1);
  const [, setToast] = useToasts();

  // Modal
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    baseAPI.get<GetEnrollResponse>(`/enroll?page=${currentPage}`).then((res) => {
      setEnrolls(res.data.data);
      setMetadatos(res.data.meta);
    });
    setReloadEnroll(false);
  }, [reloadEnroll]);

  // Modal
  const showModal = () => {
    setIsVisibleModal(true);
    setModalContent(<EnrollForm setEnrollData={setEnrollData} />);
  };

  // Modal
  const closeModal = () => {
    setEnrollData({});
    setIsVisibleModal(false);
  };

  const addEnroll = async () => {
    setLoading(true);
    const response = await baseAPI.post<CreateEnrollResponse>('/enroll', enrollData);
    const {
      message,
      enroll: { estudiante }
    } = response.data;
    setToast({ text: `El estudiante ${estudiante.nombres} ${estudiante.apellidos} fue ${message.toLowerCase()}` });
    setEnrollData({});
    setIsVisibleModal(false);
    setLoading(false);
    setReloadEnroll(true);
  };

  const nextPage = async (page: number) => {
    const response = await baseAPI.get(`/enroll?page=${page}`);
    setCurrentPage(page);
    setEnrolls(response.data.data);
    setMetadatos(response.data.meta);
  };

  return (
    <>
      <Heading />
      <div className="page__wrapper">
        <div className="page__content">
          <div className="actions-stack">
            <Button auto type="success" marginLeft={1} onClick={showModal}>
              Agregar Matricula
            </Button>

            <MyModal
              title="Crear Matricula"
              nameAction="Guardar"
              stateInitial={isVisibleModal}
              loading={loading}
              setState={setIsVisibleModal}
              closeHandler={closeModal}
              exec={addEnroll}
            >
              {modalContent}
            </MyModal>
          </div>
          <Grid.Container gap={4} justify="flex-start">
            {enrolls.map((enroll) => (
              <Grid key={enroll.id} xs={24} sm={12} md={8}>
                <CardEnroll
                  enroll={enroll}
                  setReloadEnroll={setReloadEnroll}
                  enrollData={enrollData}
                  setEnrollData={setEnrollData}
                />
              </Grid>
            ))}
          </Grid.Container>
        </div>
        <div className="page__content">
          <Grid.Container>
            <Grid xs={24} justify="center" mt={4}>
              <Pagination
                count={metadatos.lastPage}
                page={metadatos.currentPage}
                limit={metadatos.perPage}
                onChange={nextPage}
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
        }
        .page__content {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          width: ${theme.layout.pageWidthWithMargin};
          max-width: 100%;
          margin: 0 auto;
          padding: 0 ${theme.layout.pageMargin};
          transform: translateY(-50px);
          box-sizing: border-box;
        }
        .card {
          width: 100%;
        }
        .actions-stack {
          display: flex;
          width: 100%;
          flex-direction: row-reverse;
          margin-bottom: 20px;
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
