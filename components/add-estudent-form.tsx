import { Avatar, Input, Radio, Spacer, useTheme } from '@geist-ui/react';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
const noAvatar = '/assets/no-avatar.png';
import { useDropzone } from 'react-dropzone';

interface Props {
  setStudentData: React.Dispatch<React.SetStateAction<{}>>;
  status: string | string[];
}

export const AddEstudentForm = ({ setStudentData, status }: Props) => {
  const { palette } = useTheme();

  const [genero, setGenero] = useState('M');
  const [student, setStudent] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  // important
  useEffect(() => {
    if (student) {
      setStudentData(student);
    }
  }, [student]);

  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(null);
    }
  }, [avatar]);

  useEffect(() => {
    if (avatar) {
      setStudent({ ...student, ['image']: avatar.file });
    }
  }, [avatar]);

  useEffect(() => {
    if (genero) {
      setStudent({ ...student, estado: status, ['sexo']: genero });
    }
  }, [genero]);

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
    setStudent({ ...student, [event.target.name]: event.target.value });
  };

  const handler = (value) => {
    setGenero(value);
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
        <Radio.Group value={genero} useRow onChange={handler}>
          <Radio value="M">Masculino</Radio>
          <Radio value="F">Femenino</Radio>
        </Radio.Group>
      </div>
      <div className="container column">
        <Input
          placeholder="Nombre"
          name="nombres"
          width="100%"
          clearable
          onChange={(event) => onChange(event)}
          autoFocus
        />
        <Spacer h={0.5} />
        <Input placeholder="Apellidos" name="apellidos" width="100%" clearable onChange={(event) => onChange(event)} />
        <Spacer h={0.5} />
        <Input placeholder="Direccion" name="direccion" width="100%" clearable onChange={(event) => onChange(event)} />
        <Spacer h={0.5} />
        <Input
          label="+51"
          placeholder="Nro. Celular"
          name="nroTelefono"
          width="100%"
          clearable
          onChange={(event) => onChange(event)}
        />
        <Spacer h={0.5} />
      </div>

      <div className="container row">
        <Input htmlType="number" placeholder="DNI" name="dni" width="100%" onChange={(event) => onChange(event)} />
        <Spacer h={0.5} />
        <Input htmlType="number" placeholder="Edad" name="edad" width="100%" onChange={(event) => onChange(event)} />
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
