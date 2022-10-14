import { Modal } from '@geist-ui/react';

interface Props {
  title: string;
  stateInitial: boolean;
  loading?: boolean;
  nameAction: string;
  children: () => JSX.Element;
  closeHandler: () => void;
  setState: (state: boolean) => void;
  exec?: () => void;
}

export const MyModal = ({ stateInitial, loading, title, children, closeHandler, nameAction, exec }: Props) => {
  return (
    <Modal visible={stateInitial} onClose={closeHandler}>
      <Modal.Title>{title}</Modal.Title>
      <Modal.Content>{children}</Modal.Content>
      <Modal.Action passive onClick={closeHandler}>
        Cancelar
      </Modal.Action>
      <Modal.Action onClick={exec} loading={loading}>
        {nameAction}
      </Modal.Action>
    </Modal>
  );
};
