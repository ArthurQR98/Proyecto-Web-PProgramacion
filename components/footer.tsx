import React from 'react';
import { Link, Text, useTheme } from '@geist-ui/react';

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <>
      <footer>
        <Link block target="_blank" href="https://github.com/ArthurQR98">
          Visit my GitHub.
        </Link>
      </footer>
      <style jsx>{`
        footer {
          border-top: 1px solid ${theme.palette.border};
          padding: ${theme.layout.gapQuarter} ${theme.layout.gap};
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default Footer;
