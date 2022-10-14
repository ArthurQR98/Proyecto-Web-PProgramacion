import { Avatar, Input, Radio, Spacer, useTheme } from '@geist-ui/react';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
const noAvatar = '/assets/no-avatar.png';
import { useDropzone } from 'react-dropzone';
import { Student } from '../interfaces/actionsResponse';

interface Props {
  student: Student;
  setStudentData: React.Dispatch<React.SetStateAction<{}>>;
}

interface StateStudent {
  sexo: string;
  nombres: string;
  apellidos: string;
  direccion: string;
  nroTelefono: string;
  dni: string;
  edad: number;
  image?: any;
}

export const UpdateEstudentForm = ({ student, setStudentData }: Props) => {
  const { palette } = useTheme();

  const [stateStudent, setStateStudent] = useState<StateStudent>({} as StateStudent);
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  // important
  useEffect(() => {
    if (stateStudent) {
      setStudentData(stateStudent);
    }
  }, [stateStudent]);

  useEffect(() => {
    setStateStudent({
      nombres: student.nombres,
      apellidos: student.apellidos,
      direccion: student.direccion,
      nroTelefono: student.nroTelefono,
      sexo: student.sexo,
      dni: student.dni,
      edad: student.edad
    });
  }, []);

  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(student.url_image);
    }
  }, [avatar]);

  useEffect(() => {
    if (avatar) {
      setStateStudent({ ...stateStudent, ['image']: avatar.file });
    }
  }, [avatar]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] },
    noKeyboard: true,
    maxSize: 1000000,
    onDrop
  });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStateStudent({ ...stateStudent, [event.target.name]: event.target.value });
  };

  const changeSex = (value) => {
    setStateStudent({ ...stateStudent, sexo: value });
  };

  return (
    <>
      <div className="upload-avatar" {...getRootProps()}>
        <input {...getInputProps()}></input>
        {isDragActive ? (
          <Avatar src={noAvatar} height="150px" width="150px" />
        ) : (
          <Avatar src={avatarUrl ? avatarUrl : noAvatar} height="150px" width="150px" />
        )}
      </div>
      <span style={{ textAlign: 'center', color: palette.accents_3 }}>
        <p>El peso máximo para una foto es de un 1MB</p>
      </span>
      <div className="container">
        <Radio.Group value={stateStudent.sexo} useRow onChange={changeSex}>
          <Radio value="M">Masculino</Radio>
          <Radio value="F">Femenino</Radio>
        </Radio.Group>
      </div>
      <div className="container column">
        <Input
          placeholder="Nombre"
          name="nombres"
          width="100%"
          value={stateStudent.nombres}
          clearable
          onChange={(event) => onChange(event)}
          autoFocus
        />
        <Spacer h={0.5} />
        <Input
          placeholder="Apellidos"
          name="apellidos"
          value={stateStudent.apellidos}
          width="100%"
          clearable
          onChange={(event) => onChange(event)}
        />
        <Spacer h={0.5} />
        <Input
          placeholder="Direccion"
          name="direccion"
          value={stateStudent.direccion}
          width="100%"
          clearable
          onChange={(event) => onChange(event)}
        />
        <Spacer h={0.5} />
        <Input
          label="+51"
          placeholder="Nro. Celular"
          name="nroTelefono"
          value={stateStudent.nroTelefono}
          width="100%"
          clearable
          onChange={(event) => onChange(event)}
        />
        <Spacer h={0.5} />
      </div>

      <div className="container row">
        <Input
          htmlType="number"
          placeholder="DNI"
          name="dni"
          value={stateStudent.dni}
          width="100%"
          onChange={(event) => onChange(event)}
        />
        <Spacer h={0.5} />
        <Input
          htmlType="number"
          placeholder="Edad"
          name="edad"
          value={`${stateStudent.edad}`}
          width="100%"
          onChange={(event) => onChange(event)}
        />
      </div>

      <style jsx>{`
        .container {
          display: flex;
          padding: 0.2em;
          justify-content: center;
        }
        .column {
          flex-direction: column;
        }
        .row {
          flex-direction: row;
        }
        .upload-avatar {
          display: table;
          margin: 0 auto;
          border: 2px solid #9a9a9a;
          border-style: dashed;
          border-radius: 100px;
          padding: 10px;
          margin-bottom: 20px;
        }
      `}</style>
    </>
  );
};
