import React from 'react';

import MypostsContainer from './Myposts/MypostsContainer';
import Profileinfo from './Profileinfo/Profileinfo';

const Profile = (props) => {
  return (
    <div>
      <Profileinfo
        {...props}
        //saveProfile={props.saveProfile}
        //profile={props.profile}
        //status={props.status}
        //updateStatus={props.updateStatus}
      />
      <MypostsContainer />
    </div>
  );
};

export default Profile;
