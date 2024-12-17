import { Routes, Route, Navigate } from 'react-router';
import Login from './pages/user/Login';
import CompleteProfile from './pages/app/CompleteProfile';
import HomePage from "./pages/app/HomePage.jsx";
import NavLayout from "./layout/NavLayout.jsx";

const App = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
        <Route exact path="/completeProfile" element={
            <NavLayout>
                <CompleteProfile />
            </NavLayout>} />
        <Route exact path="/" element={
            <NavLayout>
                <HomePage />
            </NavLayout>} />
      <Route exact path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
