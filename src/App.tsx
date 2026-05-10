import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Resources from './pages/Resources';
import Membership from './pages/Membership';
import Enterprise from './pages/Enterprise';
import About from './pages/About';
import Help from './pages/Help';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import SGCCMaterials from './pages/SGCCMaterials';
import AdminDashboard from './pages/admin/Dashboard';
import AdminCourses from './pages/admin/Courses';
import AdminResources from './pages/admin/Resources';
import AdminAds from './pages/admin/Ads';
import AdminUsers from './pages/admin/Users';
import AdminOrders from './pages/admin/Orders';
import BatchUploadCourses from './pages/admin/BatchUploadCourses';
import BatchUploadResources from './pages/admin/BatchUploadResources';

function App() {
  return (
    <HashRouter>
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
    </HashRouter>
  );
}

export default App;