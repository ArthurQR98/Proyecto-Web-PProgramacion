import React from 'react';
import { Text } from '@geist-ui/react';

const Page = () => (
  // Para los componentes que tenga por defecto soporte la libreria (geist) se ingresa el css en el componente
  // por el prop llamado "style"
  // y para lo que no (div, table, ul, etc) esos tipos no tienen soporte por parte de libreria el ingreso
  // de css se ingresa con la declarativa <style jsx>`{.claseCss{atributos}}`</style>
  <Text h2 className="center" style={{ margin: '8rem 0', textAlign: 'center' }}>
    Matricula
  </Text>
);

export default Page;
