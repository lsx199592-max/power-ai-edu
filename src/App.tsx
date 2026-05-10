import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AdminDashboard from './pages/admin/Dashboard';

// 路由级代码分割：各页面独立 chunk
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
const AdminCourses = lazy(() => import('./pages/admin/Courses'));
const AdminResources = lazy(() => import('./pages/admin/Resources'));
const AdminAds = lazy(() => import('./pages/admin/Ads'));
const AdminUsers = lazy(() => import('./pages/admin/Users'));
const AdminOrders = lazy(() => import('./pages/admin/Orders'));
const BatchUploadCourses = lazy(() => import('./pages/admin/BatchUploadCourses'));
const BatchUploadResources = lazy(() => import('./pages/admin/BatchUploadResources'));

// 页面加载占位组件
const PageLoader: React.FC = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    color: '#8a8a8a',
    fontSize: '14px',
  }}>
    加载中...
  </div>
);

function App() {
  return (
    <HashRouter>
      <Suspense fallback={<PageLoader />}>
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
