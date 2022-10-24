import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { Button, Grid, Input, Pagination, Select, useTheme, useToasts } from '@geist-ui/react';
import SearchIcon from '@geist-ui/react-icons/search';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Course, CoursesResponse, Meta } from 'interfaces/coursesResponse';
import { baseAPI } from 'api/baseApi';
import MyCardCourse from '@/components/cardCourse';
import { MyModal } from '@/components/model-custom';
import { AddCourseForm } from '@/components/add-course-form';
import { CreateCourseResponse } from 'interfaces/actionsResponse';
import { SocketContext } from 'context/SocketProvider';

const Page = () => {
  const theme = useTheme();
  type Timer = ReturnType<typeof setTimeout>;
  const debounceRef = useRef<Timer>();
  const [reloadCourse, setReloadCourse] = useState(false);
  const [, setToast] = useToasts();

  const [program, setProgram] = useState<string | string[]>('1');
  const [period, setPeriod] = useState<string | string[]>('1');
  const [currentPage, setCurrentPage] = useState(1);

  const [courses, setCourses] = useState([]);
  const [courseData, setCourseData] = useState({});
  const [metadatos, setMetadatos] = useState<Meta>({} as Meta);

  const [loading, setLoading] = useState(false);
  const { socket } = useContext(SocketContext);

  // Modal
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Modal
  const showModal = () => {
    setIsVisibleModal(true);
    setModalContent(<AddCourseForm setCourseData={setCourseData} program={program} period={period} />);
  };

  // Modal
  const closeModal = () => {
    setCourseData({});
    setIsVisibleModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const courses = await baseAPI.get<CoursesResponse>(
        `/course?page=${currentPage}&programa=${program}&periodo=${period}`
      );
      setCourses(courses.data.data);
      setMetadatos(courses.data.meta);
    };
    fetchData();
    setReloadCourse(false);
  }, [reloadCourse]);

  const changeProgram = async (program: string | string[]) => {
    const response = await baseAPI.get(`/course?programa=${program}&periodo=${period}`);
    setCourses(response.data.data);
    setProgram(program);
  };

  const changePeriod = async (period: string | string[]) => {
    const response = await baseAPI.get(`/course?programa=${program}&periodo=${period}`);
    setCourses(response.data.data);
    setPeriod(period);
  };

  const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(async () => {
      const search = event.target.value;
      if (search.length === 0) {
        const response = await baseAPI.get<CoursesResponse>(
          `/course?programa=${program}&periodo=${period}&page=${currentPage}`
        );
        setCourses(response.data.data);
        setMetadatos(response.data.meta);
        return;
      }
      const response = await baseAPI.get<CoursesResponse>(
        `/course?programa=${program}&periodo=${period}&search=${search}`
      );
      setCourses(response.data.data);
      setMetadatos(response.data.meta);
    }, 350);
  };

  const nextPage = async (page: number) => {
    const response = await baseAPI.get(`/course?programa=${program}&periodo=${period}&page=${page}`);
    setCurrentPage(page);
    setCourses(response.data.data);
    setMetadatos(response.data.meta);
  };

  const addCourse = async () => {
    setLoading(true);
    const response = await baseAPI.postForm<CreateCourseResponse>('/course', courseData);
    const { message, course } = response.data;
    socket.emit('new-course');
    setToast({ text: `El curso ${course.nombre} fue ${message.toLowerCase()}`, delay: 3000 });
    setReloadCourse(true);
    setIsVisibleModal(false);
    setLoading(false);
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
              onChange={onQueryChanged}
              placeholder="Search..."
            />
            <Select placeholder="Contabilidad" type="default" value="1" scale={1.25} onChange={changeProgram}>
              <Select.Option value="1">Contabilidad</Select.Option>
              <Select.Option value="2">Enfermeria</Select.Option>
            </Select>
            <Select placeholder="Primer Periodo" type="default" value="1" scale={1.25} onChange={changePeriod}>
              <Select.Option value="1">Primer Periodo</Select.Option>
              <Select.Option value="2">Segundo Periodo</Select.Option>
              <Select.Option value="3">Tercer Periodo</Select.Option>
              <Select.Option value="4">Cuarto Periodo</Select.Option>
              <Select.Option value="5">Quinto Periodo</Select.Option>
              <Select.Option value="6">Sexto Periodo</Select.Option>
            </Select>
            <Button auto type="success" marginLeft={1} onClick={showModal}>
              Agregar Curso
            </Button>

            <MyModal
              title="Agregar Curso"
              nameAction="Guardar"
              stateInitial={isVisibleModal}
              loading={loading}
              setState={setIsVisibleModal}
              closeHandler={closeModal}
              exec={addCourse}
            >
              {modalContent}
            </MyModal>
          </div>
          <Grid.Container gap={2} marginTop={1} justify="flex-start">
            {courses.map((course: Course) => (
              <Grid xs={24} sm={12} md={8} key={course.id}>
                <MyCardCourse
                  course={course}
                  courseData={courseData}
                  setReloadCourse={setReloadCourse}
                  setCourseData={setCourseData}
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
