import React from 'react';
import cl from './About.module.css';
import UsefulInformationForm from '../../components/UI/UsefulInformationForm/UsefulInformationForm';

const About = ({ children }) => {
  return (
    <div className={cl.About}>
      {children}
      <div className={cl.About__content}>
        <h2>This is about page</h2>
      </div>
      <div>
        <UsefulInformationForm />
      </div>
    </div>
  );
};

export default About;
