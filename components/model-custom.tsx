import { Modal } from '@geist-ui/react';

interface Props {
  title: string;
  stateInitial: boolean;
  children: () => JSX.Element;
  closeHandler: () => void;
  setState: (state: boolean) => void;
}

export const Model_custom = ({ title, stateInitial, children, closeHandler, setState }: Props) => {
  return (
    <Modal visible={stateInitial} onClose={closeHandler}>
      <Modal.Title>{title}</Modal.Title>
      <Modal.Content>{children}</Modal.Content>
      <Modal.Action passive onClick={() => setState(false)}>
        Cancelar
      </Modal.Action>
      <Modal.Action>Guardar</Modal.Action>
    </Modal>
  );
};
