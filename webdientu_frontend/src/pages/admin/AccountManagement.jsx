import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, InputGroup, Badge } from 'react-bootstrap';
import api from '../../services/api';
import './AccountManagement.css';

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: 'User',
    status: 'active'
  });

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        const res = await api.getAllUsers();
        const data = Array.isArray(res.data) ? res.data : [];
        // Map backend entity to UI shape, synthesize status (backend chưa có)
        const mapped = data.map(acc => ({
          id: acc.id,
          username: acc.username,
          email: acc.email,
          role: acc.role === 'Admin' || acc.role === 'ADMIN' ? 'Admin' : 'User',
          status: 'active'
        }));
        setAccounts(mapped);
      } catch (err) {
        console.error('Error fetching accounts:', err);
        const status = err?.response?.status;
        if (status === 401 || status === 403) {
          alert('Phiên đăng nhập không hợp lệ hoặc thiếu quyền Admin. Vui lòng đăng xuất và đăng nhập lại tài khoản Admin.');
          // ép người dùng đăng nhập lại để nhận token mới
          localStorage.removeItem('token');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  const handleAdd = () => {
    setEditingAccount(null);
    setFormData({
      username: '',
      password: '',
      email: '',
      role: 'User',
      status: 'active'
    });
    setShowModal(true);
  };

  const handleEdit = (account) => {
    setEditingAccount(account);
    setFormData({
      username: account.username,
      password: '',
      email: account.email,
      role: account.role,
      status: account.status
    });
    setShowModal(true);
  };

  const handleDelete = async (accountId) => {
    if (!window.confirm('Bạn có chắc muốn xóa tài khoản này?')) return;
    
    try {
      // TODO: Implement delete API
      setAccounts(accounts.filter(acc => acc.id !== accountId));
      alert('Đã xóa tài khoản (Demo)');
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Lỗi khi xóa tài khoản');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingAccount) {
        // Update existing account
        setAccounts(accounts.map(acc => 
          acc.id === editingAccount.id 
            ? { ...acc, ...formData, password: formData.password || acc.password }
            : acc
        ));
        alert('Đã cập nhật tài khoản (Demo)');
      } else {
        // Create new account
        const newAccount = {
          id: Math.max(...accounts.map(a => a.id)) + 1,
          ...formData
        };
        setAccounts([...accounts, newAccount]);
        alert('Đã thêm tài khoản mới (Demo)');
      }
      
      setShowModal(false);
    } catch (error) {
      console.error('Error saving account:', error);
      alert('Lỗi khi lưu tài khoản');
    }
  };

  const filteredAccounts = accounts.filter(account =>
    account.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="account-management">
      <div className="page-header">
        <h2 className="page-title">👥 Quản lý tài khoản</h2>
        <Button variant="primary" onClick={handleAdd}>
          ➕ Thêm tài khoản
        </Button>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <InputGroup>
          <InputGroup.Text>🔍</InputGroup.Text>
          <Form.Control
            placeholder="Tìm kiếm theo username hoặc email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>

      {/* Accounts Table */}
      <div className="table-container">
        <Table hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Trạng thái</th>
              <th className="text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center text-muted">Đang tải...</td>
              </tr>
            ) : filteredAccounts.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  Không có tài khoản nào
                </td>
              </tr>
            ) : (
              filteredAccounts.map((account) => (
                <tr key={account.id}>
                  <td>{account.id}</td>
                  <td><strong>{account.username}</strong></td>
                  <td>{account.email}</td>
                  <td>
                    <Badge bg={account.role === 'Admin' ? 'danger' : 'primary'}>
                      {account.role}
                    </Badge>
                  </td>
                  <td>
                    <Badge bg={account.status === 'active' ? 'success' : 'secondary'}>
                      {account.status === 'active' ? 'Hoạt động' : 'Ngừng hoạt động'}
                    </Badge>
                  </td>
                  <td className="text-center">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(account)}
                    >
                      ✏️ Sửa
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(account.id)}
                      disabled={account.id === 999}
                    >
                      🗑️ Xóa
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingAccount ? '✏️ Sửa tài khoản' : '➕ Thêm tài khoản mới'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                disabled={editingAccount}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Password {editingAccount && <small className="text-muted">(để trống nếu không đổi)</small>}
              </Form.Label>
              <Form.Control
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required={!editingAccount}
                placeholder={editingAccount ? '••••••••' : ''}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Trạng thái</Form.Label>
              <Form.Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="active">Hoạt động</option>
                <option value="inactive">Ngừng hoạt động</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Hủy
              </Button>
              <Button variant="primary" type="submit">
                {editingAccount ? 'Cập nhật' : 'Thêm mới'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AccountManagement;

