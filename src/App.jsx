
import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/UI/Navbar/Navbar';
import AppRouter from './components/UI/AppRouter';
import { AuthContextProvider } from './context/context';
import { AppContextProvider } from './context/appContext';

function App() {


  return (
    <AuthContextProvider>
      <AppContextProvider>
      <BrowserRouter>
        <div className="App">
          <Header>
            <Navbar />
          </Header>
          <AppRouter />
        </div>
      </BrowserRouter>
      </AppContextProvider>
    </AuthContextProvider>
  );
}

export default App;
