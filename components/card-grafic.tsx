import React, { ReactElement } from 'react';
import { Button, Text, Link, Card, Dot, Tag, useTheme } from '@geist-ui/react';
import * as Icons from 'react-feather';

interface Props {
  name: string;
  children: ReactElement;
}

export type CardGraficProps = Props;

const Card_Grafic: React.FC<CardGraficProps> = ({ children, name }) => {
  const theme = useTheme();

  return (
    <>
      <Card shadow width="100%" height="100%">
        <div className="project__title">
          <Text h3>{name}</Text>
        </div>
        {children}
      </Card>
    </>
  );
};

export default Card_Grafic;
