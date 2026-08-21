import { Navigate, Route, Routes } from 'react-router';
import { AdminAuthProvider } from './AdminAuthProvider';
import { AdminProtectedRoute } from './AdminProtectedRoute';
import { AdminLayout } from './AdminLayout';
import { AdminLoginPage } from './AdminLoginPage';
import { AdminJobsPage } from './AdminJobsPage';
import { AdminJobFormPage } from './AdminJobFormPage';

export function AdminRoutes() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/login/" element={<AdminLoginPage />} />
        <Route path="/admin" element={<Navigate to="/admin/jobs/" replace />} />
        <Route path="/admin/" element={<Navigate to="/admin/jobs/" replace />} />
        <Route
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route path="/admin/jobs" element={<AdminJobsPage />} />
          <Route path="/admin/jobs/" element={<AdminJobsPage />} />
          <Route path="/admin/jobs/new" element={<AdminJobFormPage />} />
          <Route path="/admin/jobs/new/" element={<AdminJobFormPage />} />
          <Route path="/admin/jobs/:id/edit" element={<AdminJobFormPage />} />
          <Route path="/admin/jobs/:id/edit/" element={<AdminJobFormPage />} />
        </Route>
      </Routes>
    </AdminAuthProvider>
  );
}
