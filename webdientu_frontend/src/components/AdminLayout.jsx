import { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { useApp } from '../contexts/AppContext';
import './AdminLayout.css';

const AdminLayout = () => {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/admin', icon: '📊', label: 'Dashboard' },
    { path: '/admin/products', icon: '📦', label: 'Quản lý sản phẩm' },
    { path: '/admin/accounts', icon: '👥', label: 'Quản lý tài khoản' },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h3>⚡ NhiepShop</h3>
          <span className="admin-badge">Admin</span>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {sidebarOpen && <span className="nav-label">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <button 
          className="toggle-sidebar"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? '◀' : '▶'}
        </button>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        {/* Top Navbar */}
        <Navbar bg="white" className="admin-navbar shadow-sm">
          <Container fluid>
            <Navbar.Brand>
              <h5 className="mb-0">
                {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
              </h5>
            </Navbar.Brand>
            
            <div className="d-flex align-items-center">
              <span className="me-3">👋 Xin chào, <strong>{user?.username}</strong></span>
              <Dropdown>
                <Dropdown.Toggle variant="outline-primary" size="sm">
                  Tài khoản
                </Dropdown.Toggle>
                <Dropdown.Menu align="end">
                  <Dropdown.Item onClick={() => navigate('/')}>
                    🏠 Về trang chủ
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    🚪 Đăng xuất
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Container>
        </Navbar>

        {/* Page Content */}
        <div className="admin-content">
          <Container fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

