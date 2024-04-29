import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import GamePage from './pages/GamePage';
import SignUpPage from './pages/SignUpPage';
import AdminPage from './pages/AdminPage';
import EndGamePage from './pages/EndGamePage';
import './index.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='login' element={<LoginPage/>} />
        <Route path='signup' element={<SignUpPage/>} />
        <Route path='game' element={<GamePage/>} />
        <Route path='admin' element={<AdminPage/>} />
        <Route path='end' element={<EndGamePage/>} />
      </Routes>
    </Router>
  );
}

export default App;
