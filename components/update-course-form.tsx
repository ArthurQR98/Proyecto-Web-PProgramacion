import { Avatar, Input, Radio, Spacer, useTheme } from '@geist-ui/react';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
const noAvatar = '/assets/no-avatar.png';
import { useDropzone } from 'react-dropzone';
import { Course } from '../interfaces/actionsResponse';

interface Props {
  course: Course;
  setCourseData: React.Dispatch<React.SetStateAction<{}>>;
}

interface StateCourse {
  nombre: string;
  creditos: string;
  nHoras: string;
  nDocente: string;
  image?;
}

export const UpdateCourseForm = ({ course, setCourseData }: Props) => {
  const { palette } = useTheme();

  const [stateCourse, setStateCourse] = useState<StateCourse>({
    nombre: '',
    creditos: '',
    nHoras: '',
    nDocente: ''
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (stateCourse) {
      setCourseData(stateCourse);
    }
  }, [stateCourse]);

  useEffect(() => {
    setStateCourse({
      nombre: course.nombre,
      creditos: course.creditos.toString(),
      nHoras: course.nHoras.toString(),
      nDocente: course.nDocente
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
      setAvatarUrl(course.url_image);
    }
  }, [avatar]);

  useEffect(() => {
    if (avatar) {
      setStateCourse({ ...stateCourse, ['image']: avatar.file });
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
    setStateCourse({ ...stateCourse, [event.target.name]: event.target.value });
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
      <div className="container column">
        <Input
          placeholder="Nombre"
          name="nombre"
          width="100%"
          value={stateCourse.nombre}
          clearable
          onChange={(event) => onChange(event)}
          autoFocus
        />
        <Spacer h={0.5} />
        <Input
          htmlType="number"
          placeholder="Creditos"
          name="creditos"
          value={stateCourse.creditos}
          width="100%"
          clearable
          onChange={(event) => onChange(event)}
        />
        <Spacer h={0.5} />
        <Input
          htmlType="number"
          placeholder="Nro.Horas"
          name="nHoras"
          value={stateCourse.nHoras}
          width="100%"
          clearable
          onChange={(event) => onChange(event)}
        />
        <Spacer h={0.5} />
        <Input
          placeholder="Docente"
          name="nDocente"
          width="100%"
          value={stateCourse.nDocente}
          clearable
          onChange={(event) => onChange(event)}
        />
        <Spacer h={0.5} />
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
