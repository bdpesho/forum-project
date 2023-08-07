import React from 'react';
import cl from './Profile.module.css';

const Profile = ({ children }) => {
  return (
    <div className={cl.Profile}>
      {children}
      <div>
        <h2>Profile Page</h2>
      </div>
    </div>
  );
};

export default Profile;
