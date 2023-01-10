import preloader from './../../../assets/images/index.svg';
import React from 'react';
let Preloader = (props) => {
  return (
    <div style={{ backgroundColor: 'white' }}>
      <img src={preloader} alt="" />
    </div>
  );
};

export default Preloader;
