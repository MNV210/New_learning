import { createContext, useContext, useState, useEffect } from 'react';
import userService from '../services/userService';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children, onNavigate }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tokenVerified, setTokenVerified] = useState(false);

  // Xác thực token và lấy thông tin người dùng từ server
  const verifyToken = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      console.log('Verifying token with server...');
      const response = await userService.getCurrentUser();
      console.log('User verification response:', response);

      if (response.data) {
        const userData = response.data;
        
        // Cập nhật thông tin người dùng từ server
        const userToSet = {
          token,
          role: userData.role,
          id: userData.id,
          name: userData.name,
          email: userData.email,
          avatar: userData.avatar,
          ...userData
        };
        
        console.log('User verified from server:', userToSet);
        
        // Cập nhật localStorage với thông tin mới nhất từ server
        localStorage.setItem('role', userData.role);
        localStorage.setItem('user', JSON.stringify({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          avatar: userData.avatar,
          ...userData
        }));
        
        setCurrentUser(userToSet);
        setTokenVerified(true);
      } else {
        // Token không hợp lệ, xóa khỏi localStorage
        console.error('Token invalid, logging out');
        logout();
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      // Lỗi xác thực, xóa token
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Tải thông tin ban đầu từ localStorage
    const loadInitialState = () => {
      try {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('role');
        const userData = localStorage.getItem('user');

        console.log('Loading initial state from localStorage:', { token, userRole });

        if (token) {
          let parsedUserData = {};
          
          // Phân tích userData
          if (userData) {
            try {
              parsedUserData = JSON.parse(userData);
            } catch (e) {
              console.error('Error parsing user data from localStorage:', e);
            }
          }

          // Đặt thông tin người dùng tạm thời từ localStorage
          setCurrentUser({
            token,
            role: userRole || 'student',
            ...parsedUserData
          });
          
          // Xác thực thông tin với server
          verifyToken();
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error loading auth data from localStorage:', error);
        setLoading(false);
      }
    };

    loadInitialState();
  }, []);

  // Kiểm tra quyền truy cập của người dùng
  const checkAccess = (pathname) => {
    // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
    if (!currentUser || !currentUser.token) {
      onNavigate('/login');
      return false;
    }

    // Nếu token chưa được xác thực từ server, không cho phép truy cập
    if (!tokenVerified && pathname !== '/login') {
      console.warn('Token not verified yet, redirecting to login');
      onNavigate('/login');
      return false;
    }

    // Kiểm tra role và path
    const isAdminRoute = pathname.includes('/admin');
    
    // Nếu là student, không thể truy cập đường dẫn /admin
    if (currentUser.role === 'student' && isAdminRoute) {
      console.warn('Student attempting to access admin route, redirecting');
      onNavigate('/user');
      return false;
    }
    
    // Nếu là teacher, chỉ có thể truy cập /admin/courses và /admin/categories
    if (currentUser.role === 'teacher' && isAdminRoute) {
      const allowedTeacherPaths = ['/admin/courses', '/admin/categories'];
      const isAllowed = allowedTeacherPaths.some(path => pathname.startsWith(path));
      
      if (!isAllowed) {
        console.warn('Teacher attempting to access unauthorized admin route, redirecting');
        onNavigate('/admin/courses');
        return false;
      }
    }

    return true;
  };

  const login = async (userData) => {
    console.log('Login called with userData:', userData);
    
    if (!userData || !userData.token) {
      console.error('Invalid userData provided to login function');
      return;
    }
    
    const { token, role, ...userInfo } = userData;
    
    // Lưu thông tin vào localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('role', role || 'student');
    localStorage.setItem('user', JSON.stringify(userInfo));
    
    const userToSet = {
      token,
      role: role || 'student',
      ...userInfo
    };
    
    console.log('Setting currentUser to:', userToSet);
    setCurrentUser(userToSet);
    setTokenVerified(true);

    // Chuyển hướng dựa vào role
    if (role === 'admin' || role === 'teacher') {
      onNavigate('/admin');
    } else {
      onNavigate('/user');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    setCurrentUser(null);
    setTokenVerified(false);
    onNavigate('/login');
  };

  const value = {
    currentUser,
    login,
    logout,
    checkAccess,
    verifyToken,
    tokenVerified
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 