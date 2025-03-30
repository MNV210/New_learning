import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Hook kiểm tra quyền của người dùng
 * @param {string[]} allowedRoles - Mảng các role được phép truy cập
 * @param {string} redirectTo - Đường dẫn chuyển hướng nếu không có quyền
 */
export const useRoleCheck = (allowedRoles = [], redirectTo = '/') => {
  const { currentUser, checkAccess } = useAuth();
  const location = useLocation();
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setHasPermission(false);
      return;
    }

    // Kiểm tra quyền truy cập cho đường dẫn hiện tại
    const hasAccess = checkAccess(location.pathname);
    
    // Kiểm tra role được phép
    const hasRole = allowedRoles.length === 0 || allowedRoles.includes(currentUser.role);
    
    setHasPermission(hasAccess && hasRole);
  }, [currentUser, allowedRoles, location.pathname, checkAccess]);

  return { hasPermission };
};

/**
 * Hook kiểm tra xem người dùng có phải là admin
 */
export const useIsAdmin = () => {
  const { currentUser } = useAuth();
  return { isAdmin: currentUser?.role === 'admin' };
};

/**
 * Hook kiểm tra xem người dùng có phải là teacher
 */
export const useIsTeacher = () => {
  const { currentUser } = useAuth();
  return { isTeacher: currentUser?.role === 'teacher' };
};

/**
 * Hook kiểm tra xem người dùng có phải là student
 */
export const useIsStudent = () => {
  const { currentUser } = useAuth();
  return { isStudent: currentUser?.role === 'student' };
};

export default useRoleCheck; 