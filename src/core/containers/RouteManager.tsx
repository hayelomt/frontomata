import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../../features/auth/containers/PrivateRoute';
import LoginPage from '../../features/auth/pages/LoginPage';
import ProfilePage from '../../features/auth/pages/ProfilePage';
import HomePage from '../../features/HomePage';
import ListImpactPage from '../../features/impact/pages/ListImpactPage';
import CreateImpactPage from '../../features/impact/pages/CreateImpactPage';
import EditImpactPage from '../../features/impact/pages/EditImpactPage';

const RouteManager = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
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

        <Route
          path="/impacts"
          element={
            <>
              <ListImpactPage />
            </>
          }
        />

        <Route
          path="/impacts/create"
          element={
            <>
              <CreateImpactPage />
            </>
          }
        />
        <Route
          path="/impacts/edit/:id"
          element={
            <>
              <EditImpactPage />
            </>
          }
        />

        <Route path="*" element={<>Not Found page</>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteManager;
