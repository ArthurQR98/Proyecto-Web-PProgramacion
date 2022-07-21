import React, { Dispatch, SetStateAction, useState } from 'react';

interface Props {
  setIsVisibleModal: Dispatch<SetStateAction<boolean>>;
}

export const AddEstudentForm = ({ setIsVisibleModal }: Props) => {
  const [studentData, setStudentData] = useState({});
  return <div>add-estudent-form</div>;
};
