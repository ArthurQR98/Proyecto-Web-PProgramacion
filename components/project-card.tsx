import React from 'react';
import { Avatar, Button, Text, Link, Card, Dot, Tag, useTheme } from '@geist-ui/react';
import { Edit3, Trash2 } from 'react-feather';

interface Props {
  projectId: string;
  productionHostname?: string;
  framework: string;
}

export type ProjectCardProps = Props;

const ProjectCard: React.FC<ProjectCardProps> = ({ projectId, productionHostname, framework }) => {
  const theme = useTheme();

  return (
    <>
      <div className="project__wrapper">
        <Card className="project__card" shadow>
          <div className="project-title__wrapper">
            <Avatar
              src={`https://raw.githubusercontent.com/vercel/vercel/main/packages/frameworks/logos/${framework}.svg`}
              height={5.25}
              width={5.25}
              marginRight={0.75}
              className="project-icon"
            />
            <div className="project-title__content">
              <Text margin={0} style={{ fontWeight: 500, lineHeight: '1.5rem' }}>
                {projectId}
              </Text>
              <Text margin={0} font="0.875rem" style={{ color: theme.palette.accents_6, lineHeight: '1.25rem' }}>
                {productionHostname || `${projectId}.vercel.app`}
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
        .project__card .footer {
          display: flex;
          flex-direction: row;
        }
        .project__wrapper {
          width: 100%;
        }
        .project__wrapper :global(.project__card) {
          box-shadow: ${theme.type === 'dark' ? theme.expressiveness.shadowSmall : '0px 2px 4px rgba(0,0,0,0.1)'};
        }
        .project__wrapper :global(.project__card):hover {
          box-shadow: ${theme.type === 'dark'
            ? `0 0 0 1px ${theme.palette.foreground}`
            : '0px 4px 8px rgba(0,0,0,0.12)'};
        }
        .project-title__wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .project-title__wrapper :global(.project-icon) {
          background: #fff;
          border-radius: 50%;
          border: ${theme.type === 'dark' ? `1px solid ${theme.palette.foreground}` : 'none'};
        }
        .project-git-commit,
        .project-git-commit-error {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 3rem;
          margin: 1rem 0;
          font-size: 0.875rem;
        }
        .project-git-commit-error {
          padding: 0 ${theme.layout.unit};
          border-radius: ${theme.layout.radius};
          background: ${theme.palette.accents_1};
          border: 1px solid ${theme.palette.border};
          color: ${theme.palette.accents_5};
        }
      `}</style>
    </>
  );
};

export default ProjectCard;
