import { useEffect, useState } from 'react';
import { Table, Card, Modal, Button, Image, Badge } from 'react-bootstrap';
import { useApp } from '../contexts/AppContext';
import api from '../services/api';

const Orders = () => {
  const { isAuthenticated, user } = useApp();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;
    const fetchOrders = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.getOrders(user.id);
        setOrders(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Không thể tải danh sách đơn hàng.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [isAuthenticated, user?.id]);

  if (!isAuthenticated) {
    return (
      <div className="container py-4">
        <Card className="p-4">
          <h4 className="mb-0">Bạn cần đăng nhập để xem trang này.</h4>
        </Card>
      </div>
    );
  }

  const formatCurrency = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const getDisplayPrice = (item) => (item.priceSale > 0 ? item.priceSale : item.price);

  const totalAmount = orders.reduce((sum, item) => sum + getDisplayPrice(item) * (item.total || 1), 0);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Đơn hàng</h2>

      <Card className="p-3">
        {loading && <div className="p-3">Đang tải...</div>}
        {error && <div className="alert alert-danger m-2">{error}</div>}
        {!loading && !error && (
          <>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Ảnh</th>
                  <th>Sản phẩm</th>
                  <th>Phiên bản</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center text-muted">
                      Chưa có đơn hàng
                    </td>
                  </tr>
                ) : (
                  orders.map((item) => {
                    const price = getDisplayPrice(item);
                    const lineTotal = price * (item.total || 1);
                    return (
                      <tr key={item.optionId}>
                        <td>
                          <Image
                            src={item.image || 'https://via.placeholder.com/60?text=No+Img'}
                            alt={item.productName}
                            rounded
                            style={{ width: 60, height: 60, objectFit: 'cover' }}
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/60?text=No+Img'; }}
                          />
                        </td>
                        <td><strong>{item.productName}</strong></td>
                        <td>
                          <Badge bg="secondary" className="me-2">{item.color}</Badge>
                          <Badge bg="info">{item.ram} GB</Badge>
                        </td>
                        <td>{formatCurrency(price)}</td>
                        <td>{item.total || 1}</td>
                        <td><strong>{formatCurrency(lineTotal)}</strong></td>
                        <td className="text-end">
                          <Button size="sm" variant="outline-primary" onClick={() => setSelectedItem(item)}>
                            Chi tiết
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </Table>
            <div className="d-flex justify-content-end pe-2">
              <div className="fw-bold">Tổng cộng: {formatCurrency(totalAmount)}</div>
            </div>
          </>
        )}
      </Card>

      <Modal show={!!selectedItem} onHide={() => setSelectedItem(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <div className="d-flex">
              <Image
                src={selectedItem.image || 'https://via.placeholder.com/120?text=No+Img'}
                alt={selectedItem.productName}
                rounded
                style={{ width: 120, height: 120, objectFit: 'cover' }}
                className="me-3"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/120?text=No+Img'; }}
              />
              <div>
                <h5 className="mb-1">{selectedItem.productName}</h5>
                <div className="mb-2">
                  <Badge bg="secondary" className="me-2">{selectedItem.color}</Badge>
                  <Badge bg="info">{selectedItem.ram} GB</Badge>
                </div>
                <div>Đơn giá: <strong>{formatCurrency(getDisplayPrice(selectedItem))}</strong></div>
                <div>Số lượng: <strong>{selectedItem.total || 1}</strong></div>
                <div className="mt-2">Thành tiền: <strong>{formatCurrency(getDisplayPrice(selectedItem) * (selectedItem.total || 1))}</strong></div>
                <div className="text-muted mt-2">
                  Option ID: {selectedItem.optionId}
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedItem(null)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Orders;


