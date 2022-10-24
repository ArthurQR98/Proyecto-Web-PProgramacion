import { Button, Card, Divider, Image, Select, Text, useToasts } from '@geist-ui/react';
import { SocketContext } from 'context/SocketProvider';
import { DeleteEnrollResponse, Enroll, UpdateEnrollResponse } from 'interfaces/actionsResponse';
import { useContext, useState } from 'react';
import { Edit3, Trash2, ArrowDownCircle } from 'react-feather';
const noAvatar = '/assets/no-avatar.png';
import { baseAPI } from '../api/baseApi';
import { MyModal } from './model-custom';
import { UpdateEnrollForm } from './update-enroll-form';

interface Props {
  enroll: Enroll;
  enrollData: {};
  setReloadEnroll: React.Dispatch<React.SetStateAction<boolean>>;
  setEnrollData: React.Dispatch<React.SetStateAction<{}>>;
}

export const CardEnroll: React.FC<Props> = ({ enroll, enrollData, setReloadEnroll, setEnrollData }) => {
  const [loading, setLoading] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [actionModal, setActionModal] = useState('');
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [exec, setExec] = useState('');
  const [, setToast] = useToasts();
  const { socket } = useContext(SocketContext);

  const downloadReport = () => {
    baseAPI({ method: 'post', url: `/enroll/report/${enroll.id}`, responseType: 'blob' }).then((res) => {
      const file = new Blob([res.data], { type: 'application/pdf' });
      const fileUrl = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = fileUrl;
      link.setAttribute('download', `${Date.now()}-${enroll.estudiante.nombres} ${enroll.estudiante.apellidos}.pdf`);
      link.click();
      window.open(fileUrl);
    });
  };

  const updateModal = () => {
    setTitleModal('Actualizar Matricula');
    setActionModal('Actualizar');
    setIsVisibleModal(true);
    setModalContent(<UpdateEnrollForm enroll={enroll} setEnrollData={setEnrollData} />);
    setExec('update');
  };

  const update = async () => {
    setLoading(true);
    const response = await baseAPI.put<UpdateEnrollResponse>(`/enroll/${enroll.id}`, enrollData);
    const { message } = response.data;
    setToast({
      text: `La matricula fue ${message.toLowerCase()}`,
      delay: 3000
    });
    setIsVisibleModal(false);
    setReloadEnroll(true);
    setLoading(false);
  };

  const removeModal = () => {
    setTitleModal('Eliminar Matricula');
    setActionModal('Eliminar');
    setIsVisibleModal(true);
    setModalContent(
      <Text
        p
      >{`¿Estas seguro que quieres eliminar la matricula del estudiante ${enroll.estudiante.nombres} ${enroll.estudiante.apellidos}?`}</Text>
    );
    setExec('remove');
  };

  const remove = async () => {
    setLoading(true);
    const response = await baseAPI.delete<DeleteEnrollResponse>(`/enroll/${enroll.id}`);
    const {
      message,
      enroll: { estudiante }
    } = response.data;
    socket.emit('delete-enroll');
    setToast({
      text: `La Matricula del estudiante ${estudiante.nombres} ${estudiante.apellidos} fue ${message.toLowerCase()}`,
      delay: 3000
    });
    setIsVisibleModal(false);
    setReloadEnroll(true);
    setLoading(false);
  };

  const closeModal = () => {
    setIsVisibleModal(false);
  };

  const operations = {
    update,
    remove
  };

  return (
    <>
      <Card width="400px" shadow>
        <Image src={enroll.estudiante.url_image ?? noAvatar} height="200px" width="300px" draggable={false} />
        <Text h4 mb={0}>
          {`${enroll.estudiante.nombres} ${enroll.estudiante.apellidos}`}
        </Text>
        <Text type="secondary" small>
          Cursos : {enroll.estado.toLowerCase()}
        </Text>
        <Divider />
        <Select
          placeholder="Cursos"
          multiple
          width="100%"
          clearable={false}
          initialValue={enroll.cursos.map((curso) => curso.id.toString())}
          disabled
        >
          {enroll.cursos.map((curso) => (
            <Select.Option key={curso.id} value={curso.id.toString()}>
              {curso.nombre}
            </Select.Option>
          ))}
        </Select>
        <Card.Footer style={{ justifyContent: 'center' }}>
          <Button icon={<ArrowDownCircle />} type="success" ghost auto scale={2 / 3} px={0.6} onClick={downloadReport}>
            Reporte
          </Button>
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
      <style jsx>{``}</style>
    </>
  );
};
