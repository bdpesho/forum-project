import React from 'react';
import cl from './Ranking.module.css';
import UsefulInformationForm from '../../components/UI/UsefulInformationForm/UsefulInformationForm';
import Typography from '@mui/material/Typography';

const Ranking = ({ children }) => {
  return (
    <div className={cl.Ranking}>
      {children}
      <div className={cl.Ranking__content}>
        <div>
          <h2>Ranking Page</h2>
        </div>
        <div>
          <div>
            <UsefulInformationForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
