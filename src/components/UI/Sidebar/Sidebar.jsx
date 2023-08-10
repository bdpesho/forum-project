import { NavLink } from 'react-router-dom';
import cl from './Sidebar.module.css';
import { logoutUser } from '../../../services/auth.service';
import { useContext } from 'react';
import { AuthContext } from '../../../context/context';
import { AppContext } from '../../../context/appContext';
import ListIcon from '@mui/icons-material/List';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';


const Sidebar = () => {
  const { user, setAuthState } = useContext(AuthContext);
  const { setAppState } = useContext(AppContext)

  const onLogout = () => {
    logoutUser().then(() => {
      setAuthState({
        user: null,
        userData: null,
      });
      setAppState((prevState) => ({
        ...prevState,
        showCreateThread: false,
      }));
    });
  };

  return (
    <div className={cl.Home__sidebar}>
      <h2 className={cl.sidebar__title}>Menu</h2>
      <nav className={cl.Navbar}>
        <ul className={cl.Navbar__menu}>
          <li className={cl.menu__item}>
            <ListIcon />
            <NavLink to="/">Threads</NavLink>
          </li>
          <li className={cl.menu__item}>
            <LocalOfferIcon />
            <NavLink to="/about">Tags</NavLink>
          </li>
          <li className={cl.menu__item}>
            <WorkspacePremiumIcon />
            <NavLink to="/ranking">Ranking</NavLink>
          </li>
          <li className={cl.menu__item}>
            {user !== null ? (
              <NavLink to="/" onClick={onLogout}>
                Logout
              </NavLink>
            ) : null}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
