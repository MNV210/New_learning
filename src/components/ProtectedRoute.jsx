import { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Component bảo vệ route, kiểm tra quyền người dùng
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { currentUser, checkAccess, verifyToken, tokenVerified } = useAuth();
  const location = useLocation();
  const [isVerifying, setIsVerifying] = useState(false);
  
  useEffect(() => {
    console.log('ProtectedRoute - Current user:', currentUser);
    console.log('ProtectedRoute - Current path:', location.pathname);
    console.log('ProtectedRoute - Token verified:', tokenVerified);
    
    // Xác thực token với server nếu có token nhưng chưa xác thực
    const verifyAuth = async () => {
      if (currentUser?.token && !tokenVerified && !isVerifying) {
        setIsVerifying(true);
        console.log('ProtectedRoute - Verifying token with server...');
        await verifyToken();
        setIsVerifying(false);
      }
    };
    
    verifyAuth();
    
    // Kiểm tra quyền truy cập sau khi đã xác thực token
    if (currentUser && tokenVerified) {
      const hasAccess = checkAccess(location.pathname);
      console.log('ProtectedRoute - Access check result:', hasAccess);
    }
  }, [location.pathname, checkAccess, currentUser, tokenVerified, verifyToken, isVerifying]);

  // Đang trong quá trình xác thực
  if (isVerifying) {
    console.log('ProtectedRoute - Verifying credentials, showing loading...');
    return <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Đang xác thực...</p>
      </div>
    </div>;
  }

  // Nếu không có người dùng đăng nhập, chuyển hướng đến trang đăng nhập
  if (!currentUser) {
    console.log('ProtectedRoute - No user, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Nếu token chưa được xác thực, chuyển hướng đến trang đăng nhập
  if (!tokenVerified) {
    console.log('ProtectedRoute - Token not verified, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Nếu có chỉ định roles và người dùng không có role phù hợp
  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
    console.log('ProtectedRoute - User does not have allowed role:', { userRole: currentUser.role, allowedRoles });
    
    // Chuyển hướng dựa vào role
    if (currentUser.role === 'admin' || currentUser.role === 'teacher') {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/user" replace />;
    }
  }

  // Nếu có người dùng đăng nhập và có quyền, hiển thị component con
  console.log('ProtectedRoute - Access granted, rendering children');
  return children;
};

export default ProtectedRoute; 