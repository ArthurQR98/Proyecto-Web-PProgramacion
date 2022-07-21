import React from 'react';
import { Button, Card, Grid, Text, useTheme } from '@geist-ui/react';
import Heading from '@/components/heading';

const Page = () => {
  const theme = useTheme();

  return (
    <>
      <Heading />
      <div className="page__wrapper">
        <div className="page__content">
          <div className="actions-stack">
            <Button auto type="success" marginLeft={1} style={{}}>
              Agregar Matricula
            </Button>
          </div>
          <Grid.Container gap={2} justify="center">
            <Grid xs={24}>
              <Card shadow width="100%" height="100%">
                <p>Falta implementar</p>
              </Card>
            </Grid>
          </Grid.Container>
        </div>
      </div>
      <style jsx>{`
        .page__wrapper {
          background-color: ${theme.palette.accents_1};
        }
        .page__content {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          width: ${theme.layout.pageWidthWithMargin};
          max-width: 100%;
          margin: 0 auto;
          padding: 0 ${theme.layout.pageMargin};
          transform: translateY(-50px);
          box-sizing: border-box;
        }
        .card {
          width: 100%;
        }
        .actions-stack {
          display: flex;
          width: 100%;
          flex-direction: row-reverse;
          margin-bottom: 20px;
        }
        .actions-stack :global(.input-wrapper) {
          background-color: ${theme.palette.background};
        }
        .actions-stack :global(input) {
          font-size: 14px;
        }
      `}</style>
    </>
  );
};

export default Page;
