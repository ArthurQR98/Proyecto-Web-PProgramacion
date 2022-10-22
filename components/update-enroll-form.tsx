import { Select, Spacer } from '@geist-ui/react';
import React, { useEffect, useState } from 'react';
import { baseAPI } from 'api/baseApi';
import { Enroll } from 'interfaces/actionsResponse';
import { Course } from 'interfaces/coursesResponse';

interface Props {
  enroll: Enroll;
  setEnrollData: React.Dispatch<React.SetStateAction<{}>>;
}

export const UpdateEnrollForm: React.FC<Props> = ({ enroll, setEnrollData }) => {
  const [program, setProgram] = useState<string | string[]>(enroll.cursos[0].programaId.toString());
  const [period, setPeriod] = useState<string | string[]>(enroll.cursos[0].periodoId.toString());
  const [dataCourses, setDataCourses] = useState<string | string[]>(
    enroll.cursos.map((course) => course.id.toString())
  );
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    baseAPI
      .get(`/course?programa=${enroll.cursos[0].programaId}&periodo=${enroll.cursos[0].periodoId}`)
      .then((response) => {
        setCourses(response.data.data);
      });
  }, []);

  useEffect(() => {
    if (dataCourses) {
      const coursesId: any = dataCourses;
      setEnrollData({ cursosIds: coursesId.map((id) => Number(id)) });
    }
  }, [dataCourses]);

  const chooseProgram = (value: string | string[]) => {
    setDataCourses([]);
    setProgram(value);
  };
  const choosePeriod = (value: string | string[]) => {
    setDataCourses([]);
    setPeriod(value);
  };

  useEffect(() => {
    if (program || period) {
      baseAPI.get(`/course?programa=${program}&periodo=${period}`).then((response) => {
        setCourses(response.data.data);
      });
    }
  }, [program, period]);

  const onChange = (values: string | string[]) => {
    setDataCourses(values);
  };

  return (
    <>
      <div className="container row">
        <Select placeholder="Elige Programa" type="default" onChange={chooseProgram} value={program}>
          <Select.Option value="1">Contabilidad</Select.Option>
          <Select.Option value="2">Enfermeria</Select.Option>
        </Select>
        <Spacer h={0.5} />
        <Select placeholder="Elige Periodo" type="default" onChange={choosePeriod} value={period}>
          <Select.Option value="1">Primer Periodo</Select.Option>
          <Select.Option value="2">Segundo Periodo</Select.Option>
          <Select.Option value="3">Tercer Periodo</Select.Option>
          <Select.Option value="4">Cuarto Periodo</Select.Option>
          <Select.Option value="5">Quinto Periodo</Select.Option>
          <Select.Option value="6">Sexto Periodo</Select.Option>
        </Select>
      </div>

      <div className="container column">
        <Spacer h={0.5} />
        <Select placeholder="Elige Cursos" multiple width="100%" value={dataCourses} onChange={onChange}>
          {courses.length > 0 &&
            courses.map((course: Course) => (
              <Select.Option key={course.id} value={course.id.toString()}>
                {course.nombre}
              </Select.Option>
            ))}
        </Select>
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
      `}</style>
    </>
  );
};
