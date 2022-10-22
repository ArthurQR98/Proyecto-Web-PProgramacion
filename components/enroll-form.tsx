import { AutoComplete, Select, Spacer } from '@geist-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { Frown } from '@geist-ui/react-icons';
import { baseAPI } from 'api/baseApi';
import { GetStudentByCodeResponse } from 'interfaces/actionsResponse';
import { Course } from 'interfaces/coursesResponse';

interface Props {
  setEnrollData: React.Dispatch<React.SetStateAction<{}>>;
}

interface AutoCompleteOptions {
  label: string;
  value: string;
}

export const EnrollForm: React.FC<Props> = ({ setEnrollData }) => {
  // const theme = useTheme();
  const [program, setProgram] = useState<string | string[]>('');
  const [period, setPeriod] = useState<string | string[]>('');
  const [dataCourses, setDataCourses] = useState<string | string[]>();

  const [courses, setCourses] = useState([]);
  const [options, setOptions] = useState<AutoCompleteOptions[]>();
  const [searching, setSearching] = useState(false);
  const timer = useRef<any>();

  useEffect(() => {
    if (options && dataCourses) {
      const coursesId: any = dataCourses;
      setEnrollData({ estudianteCode: options[0].value, cursosIds: coursesId.map((id) => Number(id)) });
    }
  }, [options, dataCourses]);

  const searchHandler = async (currentValue) => {
    if (!currentValue) return setOptions([]);
    setSearching(true);
    const response = await baseAPI.get<GetStudentByCodeResponse>(`/student/${currentValue}`);
    let data = [];
    if (response.data.student) {
      const { nombres, apellidos, codigo } = response.data.student;
      data = [
        {
          label: `${nombres} ${apellidos} - ${codigo}`,
          value: codigo
        }
      ];
    }

    timer.current && clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setOptions(data);
      setSearching(false);
      clearTimeout(timer.current);
    }, 1000);
  };

  const onSelect = (value) => {
    console.log(value);
  };

  const chooseProgram = (value: string | string[]) => {
    setProgram(value);
  };
  const choosePeriod = (value: string | string[]) => {
    setPeriod(value);
  };

  useEffect(() => {
    if (program && period) {
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
      <div className="container column">
        <AutoComplete
          width="100%"
          searching={searching}
          options={options}
          placeholder="Escribe el codigo del estudiante"
          onSearch={searchHandler}
          onSelect={onSelect}
        >
          <AutoComplete.Empty>
            <span>
              <Frown />
            </span>
          </AutoComplete.Empty>
        </AutoComplete>
        <Spacer h={0.5} />
      </div>

      <div className="container row">
        <Select placeholder="Elige Programa" type="default" onChange={chooseProgram}>
          <Select.Option value="1">Contabilidad</Select.Option>
          <Select.Option value="2">Enfermeria</Select.Option>
        </Select>
        <Spacer h={0.5} />
        <Select placeholder="Elige Periodo" type="default" onChange={choosePeriod}>
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
        <Select
          placeholder="Elige Cursos"
          multiple
          width="100%"
          value={dataCourses}
          onChange={onChange}
          disabled={period.length > 0 ? false : true}
        >
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
