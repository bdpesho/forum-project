import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Home from '../../views/Home/Home';
import About from '../../views/About/About';
import Profile from '../../views/Profile/Profile';
import Signup from '../../views/Signup/Signup';
import Ranking from '../../views/Ranking/Ranking';
import Login from '../../views/Login/Login'
import UserProfile from '../../views/UserProfile/UserProfile';
import CreateThread from '../../views/Threads/CreateThread';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase-config';

const PrivateRoute = ({ element }) => {
  const [user] = useAuthState(auth);
  return user ? element : <Navigate to="/login" />;
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home><Sidebar /></Home>} />
      <Route path="/about" element={<About><Sidebar /></About>} />
      <Route path="/ranking" element={<Ranking><Sidebar /></Ranking>} />
      <Route path="/login" element={<Login><Sidebar /></Login>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile><Sidebar /></Profile>} />
      <Route path="/create-thread" element={<PrivateRoute element={<CreateThread />} />} />
    </Routes>
  );
};

export default AppRouter;

