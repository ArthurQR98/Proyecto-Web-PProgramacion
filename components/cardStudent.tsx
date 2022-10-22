import React, { Dispatch, SetStateAction, useState } from 'react';
import { Avatar, Button, Text, Card, useTheme, useToasts, Snippet } from '@geist-ui/react';
import { Edit3, Trash2 } from 'react-feather';
import { MyModal } from './model-custom';
import { baseAPI } from '../api/baseApi';
import { DeleteStudentResponse } from 'interfaces/actionsResponse';
import { Student } from 'interfaces/studentsResponse';
import { UpdateEstudentForm } from './update-estudent-form';
const noAvatar = '/assets/no-avatar.png';

interface Props {
  student: Student;
  studentData: {};
  setReloadStudent: Dispatch<SetStateAction<boolean>>;
  setStudentData?: React.Dispatch<React.SetStateAction<{}>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export type MyCardProps = Props;

const MyCardStudent: React.FC<MyCardProps> = ({
  student,
  studentData,
  loading,
  setLoading,
  setStudentData,
  setReloadStudent
}) => {
  const theme = useTheme();
  const [exec, setExec] = useState('');
  const [titleModal, setTitleModal] = useState('');
  const [actionModal, setActionModal] = useState('');
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [, setToast] = useToasts();

  const updateModal = () => {
    setTitleModal('Actualizar Estudiante');
    setActionModal('Actualizar');
    setIsVisibleModal(true);
    setModalContent(<UpdateEstudentForm student={student} setStudentData={setStudentData} />);
    setExec('update');
  };

  const update = async () => {
    setLoading(true);
    const response = await baseAPI.putForm(`/student/${student.id}`, studentData);
    const {
      data: { message, students }
    } = response;
    setToast({
      text: `El Estudiante ${students.nombres} ${students.apellidos} fue ${message.toLowerCase()}`,
      delay: 3000
    });
    setIsVisibleModal(false);
    setReloadStudent(true);
    setLoading(false);
  };

  const removeModal = () => {
    setTitleModal('Eliminar Estudiante');
    setActionModal('Eliminar');
    setIsVisibleModal(true);
    setModalContent(<Text p>{`¿Estas seguro que quieres eliminar a ${student.nombres} ${student.apellidos}?`}</Text>);
    setExec('remove');
  };

  const closeModal = () => {
    setIsVisibleModal(false);
  };

  const remove = async () => {
    setLoading(true);
    const response = await baseAPI.delete<DeleteStudentResponse>(`/student/${student.id}`);
    const {
      data: { message, students }
    } = response;
    setToast({
      text: `El Estudiante ${students.nombres} ${students.apellidos} fue ${message.toLowerCase()}`,
      delay: 3000
    });
    setIsVisibleModal(false);
    setReloadStudent(true);
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
            {/* ?? (Coalescing) if the value is null or undefined then assign noAvatar  */}
            <Avatar src={student.url_image ?? noAvatar} height={5} width={5} marginRight={0.75} className="card-icon" />
            <div className="card-title__content">
              <Text margin={0} font="16px" style={{ fontWeight: 500, lineHeight: '1.5rem' }}>
                {student.nombres}
              </Text>
              <Text margin={0} font="16px" style={{ fontWeight: 500, lineHeight: '1.5rem' }}>
                {student.apellidos}
              </Text>
              <Snippet
                text={student.codigo}
                font="0.875rem"
                padding={'4px'}
                width={9}
                symbol=""
                toastText="Copiado correctamente!"
                toastType="default"
              />
            </div>
          </div>
          <Card.Footer style={{ justifyContent: 'center' }}>
            <Button icon={<Edit3 />} type="success" ghost auto scale={2 / 3} px={0.6} onClick={updateModal}>
              Actualizar
            </Button>
            <Button icon={<Trash2 />} type="error" ghost auto scale={2 / 3} px={0.6} onClick={removeModal}>
              Eliminar
            </Button>
          </Card.Footer>
        </Card>

        <MyModal
          title={titleModal}
          nameAction={actionModal}
          stateInitial={isVisibleModal}
          loading={loading}
          setState={setIsVisibleModal}
          closeHandler={closeModal}
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

export default MyCardStudent;
