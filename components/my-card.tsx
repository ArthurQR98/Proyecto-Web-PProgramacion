import React from 'react';
import { Avatar, Button, Text, Card, useTheme } from '@geist-ui/react';
import { Edit3, Trash2 } from 'react-feather';

interface Props {
  name: string;
  info: string;
  image: string;
}

export type MyCardProps = Props;

const MyCard: React.FC<MyCardProps> = ({ name, info, image }) => {
  const theme = useTheme();

  return (
    <>
      <div className="card__wrapper">
        <Card className="my__card" shadow>
          <div className="card-title__wrapper">
            <Avatar src={image} height={5} width={5} marginRight={0.75} className="card-icon" />
            <div className="card-title__content">
              <Text margin={0} style={{ fontWeight: 500, lineHeight: '1.5rem' }}>
                {name}
              </Text>
              <Text margin={0} font="0.875rem" style={{ color: theme.palette.accents_6, lineHeight: '1.25rem' }}>
                {info}
              </Text>
            </div>
          </div>
          <Card.Footer style={{ justifyContent: 'center' }}>
            <Button icon={<Edit3 />} type="success" ghost auto scale={2 / 3} px={0.6}>
              Actualizar
            </Button>
            <Button icon={<Trash2 />} type="error" ghost auto scale={2 / 3} px={0.6}>
              Eliminar
            </Button>
          </Card.Footer>
        </Card>
      </div>
      <style jsx>{`
        .my__card .footer {
          display: flex;
          flex-direction: row;
        }
        .card__wrapper {
          width: 100%;
        }
        .card__wrapper :global(.my__card) {
          box-shadow: ${theme.type === 'dark' ? theme.expressiveness.shadowSmall : '0px 2px 4px rgba(0,0,0,0.1)'};
        }
        .card__wrapper :global(.my__card):hover {
          box-shadow: ${theme.type === 'dark'
            ? `0 0 0 1px ${theme.palette.foreground}`
            : '0px 4px 8px rgba(0,0,0,0.12)'};
        }
        .card-title__wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .card-title__wrapper :global(.card-icon) {
          background: #fff;
          border-radius: 50%;
          border: ${theme.type === 'dark' ? `1px solid ${theme.palette.foreground}` : 'none'};
        }
      `}</style>
    </>
  );
};

export default MyCard;
