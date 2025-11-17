import { Card, Row, Col, Badge } from 'react-bootstrap';
import { useApp } from '../contexts/AppContext';

const Profile = () => {
  const { user, isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return (
      <div className="container py-4">
        <Card className="p-4">
          <h4 className="mb-0">Bạn cần đăng nhập để xem trang này.</h4>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Tài khoản</h2>
      <Row>
        <Col lg={6}>
          <Card className="p-4">
            <h5 className="mb-3">Thông tin người dùng</h5>
            <div className="mb-2">
              <strong>Username:</strong> <Badge bg="secondary">{user?.username}</Badge>
            </div>
            <div className="mb-2">
              <strong>Role:</strong> <Badge bg="info">{user?.role || 'User'}</Badge>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;


