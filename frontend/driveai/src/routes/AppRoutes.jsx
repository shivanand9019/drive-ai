import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import DashboardLayout from '@/layouts/DashboardLayout';
import {
  MyFiles, Upload, AIInsights, Favorites, Recent, Trash, SettingsPage,
} from '@/pages/DashboardPages';
import ProtectedRoute from "@/routes/ProtectedRoute.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
     <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="files" element={<MyFiles />} />
        <Route path="upload" element={<Upload />} />
        <Route path="insights" element={<AIInsights />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="recent" element={<Recent />} />
        <Route path="trash" element={<Trash />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
         <Route path="*" element={<Navigate to="/" replace />} />
    </Route>


    </Routes>
  );
}
