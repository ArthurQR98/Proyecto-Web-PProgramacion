import React from 'react';
import { Button, Grid, Input, Pagination, useTheme } from '@geist-ui/react';
import SearchIcon from '@geist-ui/react-icons/search';
import ProjectCard from '@/components/project-card';
import { ChevronLeft, ChevronRight } from 'react-feather';

const Page = () => {
  const theme = useTheme();

  return (
    <>
      <div className="page__wrapper">
        <div className="page__content">
          <div className="actions-stack">
            <Input
              scale={1.25}
              width="100%"
              icon={<SearchIcon color={theme.palette.accents_5} />}
              placeholder="Search..."
            />
            <Button auto type="secondary" marginLeft={1}>
              Agregar Curso
            </Button>
          </div>
          <Grid.Container gap={2} marginTop={1} justify="flex-start">
            <Grid xs={24} sm={12} md={8}>
              <ProjectCard projectId="github-blog" framework="next" productionHostname="github.blog" />
            </Grid>
          </Grid.Container>
        </div>
        <div className="page__content">
          <Grid.Container>
            <Grid xs={24} justify="center">
              <Pagination count={10} initialPage={1} limit={5}>
                <Pagination.Next>
                  <ChevronRight />
                </Pagination.Next>
                <Pagination.Previous>
                  <ChevronLeft />
                </Pagination.Previous>
              </Pagination>
            </Grid>
          </Grid.Container>
        </div>
      </div>
      <style jsx>{`
        .page__wrapper {
          background-color: ${theme.palette.accents_1};
          min-height: calc(100vh - 172px);
        }
        .page__content {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          width: ${theme.layout.pageWidthWithMargin};
          max-width: 100%;
          margin: 0 auto;
          padding: calc(${theme.layout.unit} * 2) ${theme.layout.pageMargin};
          box-sizing: border-box;
        }
        .actions-stack {
          display: flex;
          width: 100%;
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
