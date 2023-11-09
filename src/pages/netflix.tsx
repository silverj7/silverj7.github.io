import * as React from 'react';
import { PageProps } from 'gatsby';
import NetFlixComponent from '@components/netflix/NetflixComponent';
import ResetStyle from '../config/ResetStyle';

const Netflix: React.FC<PageProps> = () => {
  return (
    <>
      <ResetStyle />
      <NetFlixComponent />
    </>
  );
};

export default Netflix;
