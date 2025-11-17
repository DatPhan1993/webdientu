import { Card, Form, Button } from 'react-bootstrap';
import { useState } from 'react';

const Settings = () => {
  const [storeName, setStoreName] = useState('NhiepShop');
  const [currency, setCurrency] = useState('VND');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Lưu cài đặt (demo). Sau này sẽ kết nối API.');
  };

  return (
    <div className="settings">
      <h2 className="page-title">⚙️ Cài đặt</h2>
      <Card className="p-4">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tên cửa hàng</Form.Label>
            <Form.Control
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Đơn vị tiền tệ</Form.Label>
            <Form.Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="VND">VND</option>
              <option value="USD">USD</option>
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button type="submit" variant="primary">Lưu</Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Settings;


