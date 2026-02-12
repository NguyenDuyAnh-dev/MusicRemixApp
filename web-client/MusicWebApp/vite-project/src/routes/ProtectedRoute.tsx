import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import type { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useAuth(); // lấy loading
  const location = useLocation();

  // Chờ xác định trạng thái đăng nhập
  if (loading) {
    return <div>Loading...</div>; // hoặc <></> nếu muốn trắng trang
  }

  // Nếu chưa đăng nhập, redirect về login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Nếu đã login thì render children
  return children as React.ReactElement;
}
