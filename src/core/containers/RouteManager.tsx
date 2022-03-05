import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GeneralPage from '../../features/general/pages/GeneralPage';
import EditGeneralPage from '../../features/general/pages/EditGeneralPage';
import AddGeneralPage from '../../features/general/pages/AddGeneralPage';
import PrivateRoute from '../../features/auth/containers/PrivateRoute';
import LoginPage from '../../features/auth/pages/LoginPage';
import ProfilePage from '../../features/auth/pages/ProfilePage';
import Home from '../../features/Home';
import HomeForm from '../../features/HomeForm';
import CreateBlogPage from '../../features/blog/pages/CreateBlogPage';

const RouteManager = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home/create" element={<AddGeneralPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/generals"
          element={
            <PrivateRoute>
              <GeneralPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/generals/create"
          element={
            <>
              {/* <AddGeneralPage /> */}
              <CreateBlogPage />
            </>
          }
        />
        <Route
          path="/generals/edit/:id"
          element={
            <PrivateRoute>
              <EditGeneralPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteManager;
