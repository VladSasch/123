import React from 'react';
//import Preloader from '../components/common/Preloader/Preloader';

export const withSuspense = (Component) => {
  return (
    <React.Suspense fallback={<div>Loading</div>}>
      <Component />
    </React.Suspense>
  );
};
