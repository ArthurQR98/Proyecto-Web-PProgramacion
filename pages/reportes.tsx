import React, { useState } from 'react';
import { Button, Select, Spacer, Text } from '@geist-ui/react';
import { ArrowDownCircle } from 'react-feather';
import { baseAPI } from 'api/baseApi';

const programs = [
  {
    id: '1',
    nombre: 'Contabilidad'
  },
  {
    id: '2',
    nombre: 'Enfermeria'
  }
];

const Page = () => {
  const [program, setProgram] = useState<string | string[]>('');

  const changeProgram = (value: string | string[]) => {
    setProgram(value);
  };

  const generateReport = () => {
    baseAPI({ method: 'post', url: `/enroll/report/program/${program}`, responseType: 'blob' }).then((res) => {
      const file = new Blob([res.data], { type: 'application/pdf' });
      const fileUrl = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = fileUrl;
      link.setAttribute(
        'download',
        `${Date.now()}-${programs.filter((prog) => prog.id === program).map((prog) => prog.nombre)}.pdf`
      );
      link.click();
      window.open(fileUrl);
    });
  };

  return (
    <>
      <div className="container">
        <Text p>Generar reporte de matriculados por programa.</Text>
        <div className="container select">
          <Select placeholder="Elige el Programa" onChange={changeProgram}>
            <Select.Option value="1">Contabilidad</Select.Option>
            <Select.Option value="2">Enfermeria</Select.Option>
          </Select>
          <Spacer h={0.5} />
          <Button scale={0.9} type="success" icon={<ArrowDownCircle />} onClick={generateReport}>
            Generar reporte
          </Button>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          text-align: center;
          height: 900px;
        }
        .select {
          margin: auto;
          flex-direction: row;
          justify-content: center;
        }
      `}</style>
    </>
  );
};

export default Page;
