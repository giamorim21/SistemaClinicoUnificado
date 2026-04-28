import { Navigate } from 'react-router-dom';
import { isAuthenticated, getRole } from '../utils/auth';

export default function ProtectedRoute({ children, allowedRoles }) {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(getRole())) return <Navigate to="/" replace />;
  return children;
}
