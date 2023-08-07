import { NavLink } from 'react-router-dom';
import cl from './Navbar.module.css';
import { IoMdNotifications } from 'react-icons/io';
import { FaUserAstronaut } from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '../../../context/context';
import { AppContext } from '../../../context/appContext';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { setAppState } = useContext(AppContext);

  const handleButtonClick = () => {
    setAppState((prevState) => ({
      ...prevState,
      showCreateThread: !prevState.showCreateThread,
    }));
  };

  return (
    <nav className={cl.Navbar}>
      <ul className={cl.Navbar__menu}>
        {user !== null ? (
          <>
            <li className={cl.menu__item}>
              <button onClick={handleButtonClick}>Create New Thread</button>
            </li>
            <li className={cl.menu__item}>
              <NavLink to="/">
                <IoMdNotifications />
              </NavLink>
            </li>
            <li className={cl.menu__item}>
              <NavLink to="/profile">
                <FaUserAstronaut />
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className={cl.menu__item}>
              <NavLink to="/signup">Register</NavLink>
            </li>
            <li className={cl.menu__item}>
              <NavLink to="/login">Login</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
