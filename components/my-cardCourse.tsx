import React, { Dispatch, SetStateAction, useState } from 'react';
import { Avatar, Button, Text, Card, useTheme } from '@geist-ui/react';
import { Edit3, Trash2 } from 'react-feather';
import { MyModal } from './model-custom';
import { baseAPI } from '../api/baseApi';

interface Props {
  name: string;
  info: string;
  image: string;
  id: number;
  setReloadStudent?: Dispatch<SetStateAction<boolean>>;
}

export type MyCardProps = Props;

const MyCardCourse: React.FC<MyCardProps> = ({ id, name, info, image, setReloadStudent }) => {
  const theme = useTheme();
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const removeHandler = () => {
    setIsVisibleModal(true);
    setModalContent(<Text p>{`¿Estas seguro que quieres eliminar a ${name}?`}</Text>);
  };

  const closeHandler = () => {
    setIsVisibleModal(false);
  };

  const remove = async () => {
    await baseAPI.delete(`/student/${id}`);
    setIsVisibleModal(false);
    setReloadStudent(true);
  };

  return (
    <>
      <div className="card__wrapper">
        <Card className="my__card" shadow>
          <div className="card-title__wrapper">
            <Avatar src={image} height={5} width={5} marginRight={0.75} className="card-icon" />
            <div className="card-title__content">
              <Text margin={0} font="16px" style={{ fontWeight: 500, lineHeight: '1.5rem' }}>
                {name}
              </Text>
              <Text margin={0} font="0.875rem" style={{ color: theme.palette.accents_6, lineHeight: '1.25rem' }}>
                {info}
              </Text>
            </div>
          </div>
          <Card.Footer style={{ justifyContent: 'center' }}>
            <Button icon={<Edit3 />} type="success" ghost auto scale={2 / 3} px={0.6}>
              Actualizar
            </Button>
            <Button icon={<Trash2 />} type="error" ghost auto scale={2 / 3} px={0.6} onClick={removeHandler}>
              Eliminar
            </Button>
          </Card.Footer>
        </Card>

        <MyModal
          title="Eliminar"
          nameAction="Eliminar"
          stateInitial={isVisibleModal}
          setState={setIsVisibleModal}
          closeHandler={closeHandler}
          exec={remove}
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
