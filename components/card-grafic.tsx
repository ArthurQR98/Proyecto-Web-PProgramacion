import React, { ReactElement } from 'react';
import { Text, Card } from '@geist-ui/react';
interface Props {
  name: string;
  children: ReactElement;
}

export type CardGraficProps = Props;

const Card_Grafic: React.FC<CardGraficProps> = ({ children, name }) => {
  return (
    <>
      <Card shadow width="100%" height="100%">
        <div className="card__title">
          <Text h3>{name}</Text>
        </div>
        {children}
      </Card>
    </>
  );
};

export default Card_Grafic;
