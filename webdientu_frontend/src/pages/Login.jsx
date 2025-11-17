import { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import api from '../services/api';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('🚀 Đang gửi login request...', { username, password });
      const response = await api.login({ username, password });
      console.log('✅ Response nhận được:', response);
      
      // Backend returns: "id/role/username/jwt"
      const responseData = response.data;
      console.log('📦 Response data:', responseData);
      
      const [id, role, user, token] = responseData.split('/');
      console.log('🔑 Parsed:', { id, role, user, token: token?.substring(0, 30) + '...' });
      
      const userObj = {
        id: parseInt(id),
        username: user,
        role: role
      };
      
      login(userObj, token);
      
      // Sau đăng nhập, luôn về trang chủ
      navigate('/');
    } catch (error) {
      console.error('❌ Login error:', error);
      console.error('❌ Error response:', error.response);
      console.error('❌ Error message:', error.message);
      
      // Hiển thị lỗi chi tiết hơn
      if (error.response) {
        setError(`Lỗi ${error.response.status}: ${error.response.data || 'Không đúng thông tin'}`);
      } else if (error.request) {
        setError('Không thể kết nối đến server. Kiểm tra backend có đang chạy không?');
      } else {
        setError(`Lỗi: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Container>
        <div className="login-wrapper">
          <Card className="login-card">
            <Card.Body className="p-5">
              <h2 className="text-center mb-4">Đăng nhập</h2>
              
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Tên đăng nhập</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 login-btn"
                  disabled={loading}
                >
                  {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </Button>
              </Form>

              <div className="text-center mt-4">
                <p className="mb-0">
                  Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default Login;

