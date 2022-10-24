import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { Avatar, Button, Text, Card, useTheme, useToasts } from '@geist-ui/react';
import { Edit3, Trash2 } from 'react-feather';
import { MyModal } from './model-custom';
import { baseAPI } from '../api/baseApi';
import { Course } from 'interfaces/coursesResponse';
import { DeleteCourseResponse } from 'interfaces/actionsResponse';
import { UpdateCourseForm } from './update-course-form';
import { SocketContext } from 'context/SocketProvider';

interface Props {
  course: Course;
  courseData: {};
  setCourseData: Dispatch<SetStateAction<{}>>;
  setReloadCourse?: Dispatch<SetStateAction<boolean>>;
}

export type MyCardProps = Props;

const MyCardCourse: React.FC<MyCardProps> = ({ course, courseData, setReloadCourse, setCourseData }) => {
  const theme = useTheme();
  const [, setToast] = useToasts();

  const [nameAction, setNameAction] = useState('');
  const [titleModal, setTitleModal] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [exec, setExec] = useState('');
  const { socket } = useContext(SocketContext);

  const removeHandler = () => {
    setIsVisibleModal(true);
    setTitleModal('Eliminar Curso');
    setModalContent(<Text p>{`¿Estas seguro que quieres eliminar a ${course.nombre}?`}</Text>);
    setNameAction('Eliminar');
    setExec('remove');
  };

  const updateHandler = () => {
    setIsVisibleModal(true);
    setTitleModal('Actualizar Curso');
    setModalContent(<UpdateCourseForm course={course} setCourseData={setCourseData} />);
    setNameAction('Actualizar');
    setExec('update');
  };

  const closeHandler = () => {
    setIsVisibleModal(false);
  };

  const remove = async () => {
    setLoading(true);
    const response = await baseAPI.delete<DeleteCourseResponse>(`/course/${course.id}`);
    const { course: remove, message } = response.data;
    socket.emit('delete-course');
    setToast({ text: `El curso ${remove.nombre} fue ${message.toLowerCase()}`, delay: 3000 });
    setIsVisibleModal(false);
    setReloadCourse(true);
    setLoading(false);
  };

  const update = async () => {
    setLoading(true);
    const response = await baseAPI.putForm(`/course/${course.id}`, courseData);
    const {
      data: { message, course: updated }
    } = response;
    setToast({
      text: `El Curso ${updated.nombre} fue ${message.toLowerCase()}`,
      delay: 3000
    });
    setIsVisibleModal(false);
    setReloadCourse(true);
    setLoading(false);
  };

  const operations = {
    update,
    remove
  };

  return (
    <>
      <div className="card__wrapper">
        <Card className="my__card" shadow>
          <div className="card-title__wrapper">
            <Avatar src={course.url_image} height={5} width={5} marginRight={0.75} className="card-icon" />
            <div className="card-title__content">
              <Text margin={0} font="16px" style={{ fontWeight: 500, lineHeight: '1.5rem' }}>
                {course.nombre}
              </Text>
              <Text margin={0} font="0.875rem" style={{ color: theme.palette.accents_6, lineHeight: '1.25rem' }}>
                {course.nDocente}
              </Text>
            </div>
          </div>
          <Card.Footer style={{ justifyContent: 'center' }}>
            <Button icon={<Edit3 />} type="success" ghost auto scale={2 / 3} px={0.6} onClick={updateHandler}>
              Actualizar
            </Button>
            <Button icon={<Trash2 />} type="error" ghost auto scale={2 / 3} px={0.6} onClick={removeHandler}>
              Eliminar
            </Button>
          </Card.Footer>
        </Card>

        <MyModal
          title={titleModal}
          nameAction={nameAction}
          stateInitial={isVisibleModal}
          loading={loading}
          setState={setIsVisibleModal}
          closeHandler={closeHandler}
          exec={operations[exec]}
        >
          {modalContent}
        </MyModal>
      </div>
      <style jsx>{`
        .my__card .footer {
          display: flex;
          flex-direction: row;
        }
        .card__wrapper {
          width: 100%;
        }
        .card__wrapper :global(.my__card) {
          box-shadow: ${theme.type === 'dark' ? theme.expressiveness.shadowSmall : '0px 2px 4px rgba(0,0,0,0.1)'};
        }
        .card__wrapper :global(.my__card):hover {
          box-shadow: ${theme.type === 'dark'
            ? `0 0 0 1px ${theme.palette.foreground}`
            : '0px 4px 8px rgba(0,0,0,0.12)'};
        }
        .card-title__wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .card-title__wrapper :global(.card-icon) {
          background: #fff;
          border-radius: 50%;
          border: ${theme.type === 'dark' ? `1px solid ${theme.palette.foreground}` : 'none'};
        }
      `}</style>
    </>
  );
};

export default MyCardCourse;
