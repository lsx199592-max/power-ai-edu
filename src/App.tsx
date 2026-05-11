import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

const Home = lazy(() => import('./pages/Home'));
const Courses = lazy(() => import('./pages/Courses'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const Resources = lazy(() => import('./pages/Resources'));
const Membership = lazy(() => import('./pages/Membership'));
const Enterprise = lazy(() => import('./pages/Enterprise'));
const About = lazy(() => import('./pages/About'));
const Help = lazy(() => import('./pages/Help'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Profile = lazy(() => import('./pages/Profile'));
const SGCCMaterials = lazy(() => import('./pages/SGCCMaterials'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminCourses = lazy(() => import('./pages/admin/Courses'));
const AdminResources = lazy(() => import('./pages/admin/Resources'));
const AdminAds = lazy(() => import('./pages/admin/Ads'));
const AdminUsers = lazy(() => import('./pages/admin/Users'));
const AdminOrders = lazy(() => import('./pages/admin/Orders'));
const BatchUploadCourses = lazy(() => import('./pages/admin/BatchUploadCourses'));
const BatchUploadResources = lazy(() => import('./pages/admin/BatchUploadResources'));

const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  return (
    <HashRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/:slug" element={<CourseDetail />} />
            <Route path="resources" element={<Resources />} />
            <Route path="membership" element={<Membership />} />
            <Route path="enterprise" element={<Enterprise />} />
            <Route path="about" element={<About />} />
            <Route path="help" element={<Help />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="sgcc" element={<SGCCMaterials />} />
          </Route>
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<AdminCourses />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="courses/batch-upload" element={<BatchUploadCourses />} />
            <Route path="resources" element={<AdminResources />} />
            <Route path="resources/batch-upload" element={<BatchUploadResources />} />
            <Route path="ads" element={<AdminAds />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
