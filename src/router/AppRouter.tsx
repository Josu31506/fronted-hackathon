import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { RoleRoute } from '../components/RoleRoute';
import { MainLayout } from '../components/layout/MainLayout';
import { LoginPage } from '../pages/LoginPage';
import { IncidentsListPage } from '../pages/IncidentsListPage';
import { IncidentDetailPage } from '../pages/IncidentDetailPage';
import { ReportIncidentPage } from '../pages/ReportIncidentPage';
import { AdminDashboardPage } from '../pages/AdminDashboardPage';
import { AssignedTasksPage } from '../pages/AssignedTasksPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const AppRouter = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />

    <Route element={<ProtectedRoute />}>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/incidents" replace />} />
        <Route path="/incidents" element={<IncidentsListPage />} />
        <Route path="/incidents/:id" element={<IncidentDetailPage />} />
        <Route path="/report" element={<ReportIncidentPage />} />

        <Route element={<RoleRoute allowedRoles={['staff']} />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
        </Route>
        <Route element={<RoleRoute allowedRoles={['autoridad']} />}>
          <Route path="/assigned" element={<AssignedTasksPage />} />
        </Route>
      </Route>
    </Route>

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
