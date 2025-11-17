import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Badge, Dropdown } from 'react-bootstrap';
import { FaShoppingCart, FaHeart, FaUser, FaSignOutAlt, FaBox } from 'react-icons/fa';
import { useApp } from '../contexts/AppContext';
import './Header.css';

const Header = () => {
  const { isAuthenticated, user, logout, getCartCount, favorites } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
          <FaBox className="me-2" />
          NhiepShop
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className="px-3">
              Trang chủ
            </Nav.Link>
            
            <Nav.Link as={Link} to="/products" className="px-3">
              Sản phẩm
            </Nav.Link>

            <Nav.Link as={Link} to="/favorites" className="px-3 position-relative">
              <FaHeart className="fs-5" />
              {favorites.length > 0 && (
                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                  {favorites.length}
                </Badge>
              )}
            </Nav.Link>

            <Nav.Link as={Link} to="/cart" className="px-3 position-relative">
              <FaShoppingCart className="fs-5" />
              {getCartCount() > 0 && (
                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                  {getCartCount()}
                </Badge>
              )}
            </Nav.Link>

            {isAuthenticated ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-light" id="dropdown-basic" className="ms-2">
                  <FaUser className="me-2" />
                  {user?.username || 'User'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">
                    Tài khoản
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/orders">
                    Đơn hàng
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    <FaSignOutAlt className="me-2" />
                    Đăng xuất
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link as={Link} to="/login" className="btn btn-outline-light ms-2">
                <FaUser className="me-2" />
                Đăng nhập
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

