import { Card, Row, Col } from 'react-bootstrap';

const Reports = () => {
  return (
    <div className="reports">
      <h2 className="page-title">📊 Báo cáo</h2>
      <Row className="g-4">
        <Col lg={8}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Doanh thu theo tháng</h5>
            </Card.Header>
            <Card.Body>
              <div className="py-5 text-center text-muted">
                Khu vực hiển thị biểu đồ (Chart.js / Recharts)
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Tóm tắt</h5>
            </Card.Header>
            <Card.Body>
              <ul className="mb-0">
                <li>Doanh thu tháng này: đang cập nhật...</li>
                <li>Số đơn hàng: đang cập nhật...</li>
                <li>Top danh mục: đang cập nhật...</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Reports;


