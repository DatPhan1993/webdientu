import { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalAccounts: 0,
    monthlyRevenue: 0,
    todayOrders: 0
  });

  useEffect(() => {
    // TODO: Fetch real data from API
    // Dữ liệu mẫu
    setStats({
      totalProducts: 12,
      totalAccounts: 5,
      monthlyRevenue: 45600000,
      todayOrders: 8
    });
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="dashboard">
      <h2 className="page-title">📊 Dashboard</h2>
      
      <Row className="g-4">
        {/* Total Products */}
        <Col md={6} lg={3}>
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-icon products">📦</div>
              <div className="stat-info">
                <h3>{stats.totalProducts}</h3>
                <p>Tổng sản phẩm</p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Total Accounts */}
        <Col md={6} lg={3}>
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-icon accounts">👥</div>
              <div className="stat-info">
                <h3>{stats.totalAccounts}</h3>
                <p>Tài khoản</p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Monthly Revenue */}
        <Col md={6} lg={3}>
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-icon revenue">💰</div>
              <div className="stat-info">
                <h3>{formatCurrency(stats.monthlyRevenue)}</h3>
                <p>Doanh thu tháng này</p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Today Orders */}
        <Col md={6} lg={3}>
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-icon orders">🛒</div>
              <div className="stat-info">
                <h3>{stats.todayOrders}</h3>
                <p>Đơn hàng hôm nay</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Activity */}
      <Row className="mt-4">
        <Col lg={8}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">📈 Doanh thu theo tháng</h5>
            </Card.Header>
            <Card.Body>
              <div className="revenue-chart">
                <p className="text-center text-muted py-5">
                  Biểu đồ doanh thu sẽ được hiển thị ở đây
                  <br />
                  <small>(Có thể tích hợp Chart.js hoặc Recharts)</small>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">🔥 Hoạt động gần đây</h5>
            </Card.Header>
            <Card.Body>
              <div className="activity-list">
                <div className="activity-item">
                  <span className="activity-icon">📦</span>
                  <div className="activity-content">
                    <p className="mb-1">Sản phẩm mới được thêm</p>
                    <small className="text-muted">2 giờ trước</small>
                  </div>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">👤</span>
                  <div className="activity-content">
                    <p className="mb-1">Tài khoản mới đăng ký</p>
                    <small className="text-muted">5 giờ trước</small>
                  </div>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">🛒</span>
                  <div className="activity-content">
                    <p className="mb-1">Đơn hàng #1234 hoàn thành</p>
                    <small className="text-muted">1 ngày trước</small>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">⚡ Thao tác nhanh</h5>
            </Card.Header>
            <Card.Body>
            <div className="quick-actions">
                <button className="action-btn" onClick={() => window.location.href = '/admin/products'}>
                  <span>📦</span>
                  <span>Thêm sản phẩm</span>
                </button>
                <button className="action-btn" onClick={() => window.location.href = '/admin/accounts'}>
                  <span>👤</span>
                  <span>Tạo tài khoản</span>
                </button>
              <button className="action-btn" onClick={() => window.location.href = '/admin/reports'}>
                  <span>📊</span>
                  <span>Xem báo cáo</span>
                </button>
              <button className="action-btn" onClick={() => window.location.href = '/admin/settings'}>
                  <span>⚙️</span>
                  <span>Cài đặt</span>
                </button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

