import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../../features/auth/containers/PrivateRoute';
import LoginPage from '../../features/auth/pages/LoginPage';
import ProfilePage from '../../features/auth/pages/ProfilePage';
import HomePage from '../../features/HomePage';

const RouteManager = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            // <PrivateRoute>
            <HomePage />
            // </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<>Not Found page</>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteManager;
