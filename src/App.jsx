import { Routes, Route, Navigate } from 'react-router';
import Login from './pages/app/Login';
import CompleteProfile from './pages/app/CompleteProfile';
import Profile from './pages/user/Profile';

const App = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/completeProfile" element={<CompleteProfile />} />
      <Route exact path="/profile" element={<Profile/>} />
      <Route exact path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
