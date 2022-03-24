import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../../features/auth/containers/PrivateRoute';
import LoginPage from '../../features/auth/pages/LoginPage';
import ProfilePage from '../../features/auth/pages/ProfilePage';
import HomePage from '../../features/HomePage';
import CreateBlogPage from '../../features/blog/pages/CreateBlogPage';
import EditBlogPage from '../../features/blog/pages/EditBlogPage';
import ListBlogPage from '../../features/blog/pages/ListBlogPage';

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
        <Route path="/blogs" element={<ListBlogPage />} />
        <Route path="/blogs/create" element={<CreateBlogPage />} />
        <Route path="/blogs/edit/:id" element={<EditBlogPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteManager;
