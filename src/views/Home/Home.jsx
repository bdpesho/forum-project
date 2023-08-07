import cl from './Home.module.css';
import UsefulInformationForm from '../../components/UI/UsefulInformationForm/UsefulInformationForm';
import { useContext } from 'react';
import { AppContext } from '../../context/appContext';
import CreateThread from '../Threads/CreateThread';

const Home = ({ children }) => {
  const { showCreateThread } = useContext(AppContext);

  return (
    <div className={cl.Home}>
      {children}
      <div className={cl.Home__content}>
        <h2>Home Content</h2>
        {showCreateThread && <CreateThread />}
      </div>
      <div>
        <UsefulInformationForm />
      </div>
    </div>
  );
};

export default Home;
