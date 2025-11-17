import { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Modal, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaShoppingBag, FaCheckCircle } from 'react-icons/fa';
import { useApp } from '../contexts/AppContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity, getCartTotal, clearCart, isAuthenticated } = useApp();
  const navigate = useNavigate();
  
  // Checkout Modal State
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    note: '',
    paymentMethod: 'COD'
  });
  const [formErrors, setFormErrors] = useState({});
  const [orderNumber, setOrderNumber] = useState('');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckoutForm(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!checkoutForm.fullName.trim()) {
      errors.fullName = 'Vui lòng nhập họ tên';
    }
    
    if (!checkoutForm.phone.trim()) {
      errors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10}$/.test(checkoutForm.phone.replace(/\s/g, ''))) {
      errors.phone = 'Số điện thoại không hợp lệ (10 số)';
    }
    
    if (!checkoutForm.email.trim()) {
      errors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(checkoutForm.email)) {
      errors.email = 'Email không hợp lệ';
    }
    
    if (!checkoutForm.address.trim()) {
      errors.address = 'Vui lòng nhập địa chỉ';
    }
    
    if (!checkoutForm.city.trim()) {
      errors.city = 'Vui lòng chọn tỉnh/thành phố';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle checkout button click
  const handleCheckoutClick = () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      if (window.confirm('Bạn cần đăng nhập để thanh toán. Chuyển đến trang đăng nhập?')) {
        navigate('/login');
      }
      return;
    }
    setShowCheckoutModal(true);
  };

  // Handle submit order
  const handleSubmitOrder = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Generate order number
    const orderNum = 'DH' + Date.now();
    setOrderNumber(orderNum);

    // Simulate API call
    setTimeout(() => {
      // Close checkout modal
      setShowCheckoutModal(false);
      
      // Show success modal
      setShowSuccessModal(true);
      
      // Clear cart after 2 seconds
      setTimeout(() => {
        clearCart();
        setShowSuccessModal(false);
        navigate('/');
      }, 3000);
    }, 1000);
  };

  const vietnamCities = [
    'Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ',
    'An Giang', 'Bà Rịa-Vũng Tàu', 'Bắc Giang', 'Bắc Kạn', 'Bạc Liêu',
    'Bắc Ninh', 'Bến Tre', 'Bình Định', 'Bình Dương', 'Bình Phước',
    'Bình Thuận', 'Cà Mau', 'Cao Bằng', 'Đắk Lắk', 'Đắk Nông',
    'Điện Biên', 'Đồng Nai', 'Đồng Tháp', 'Gia Lai', 'Hà Giang',
    'Hà Nam', 'Hà Tĩnh', 'Hải Dương', 'Hậu Giang', 'Hòa Bình',
    'Hưng Yên', 'Khánh Hòa', 'Kiên Giang', 'Kon Tum', 'Lai Châu',
    'Lâm Đồng', 'Lạng Sơn', 'Lào Cai', 'Long An', 'Nam Định',
    'Nghệ An', 'Ninh Bình', 'Ninh Thuận', 'Phú Thọ', 'Quảng Bình',
    'Quảng Nam', 'Quảng Ngãi', 'Quảng Ninh', 'Quảng Trị', 'Sóc Trăng',
    'Sơn La', 'Tây Ninh', 'Thái Bình', 'Thái Nguyên', 'Thanh Hóa',
    'Thừa Thiên Huế', 'Tiền Giang', 'Trà Vinh', 'Tuyên Quang', 'Vĩnh Long',
    'Vĩnh Phúc', 'Yên Bái'
  ];

  if (cart.length === 0) {
    return (
      <Container className="text-center py-5">
        <div className="empty-cart">
          <FaShoppingBag size={100} className="text-muted mb-4" />
          <h3>Giỏ hàng trống</h3>
          <p className="text-muted">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
          <Link to="/products" className="btn btn-primary btn-lg mt-3">
            Mua sắm ngay
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <Container>
          <h1 className="page-title">Giỏ hàng của bạn</h1>
          <p className="page-subtitle">{cart.length} sản phẩm</p>
        </Container>
      </div>

      <Container className="py-5">
        <Row>
          <Col lg={8}>
            {cart.map((item) => {
              const price = item.priceSale > 0 ? item.priceSale : item.price;
              return (
                <Card key={item.optionId} className="cart-item mb-3">
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col md={2}>
                        <img 
                          src={item.image} 
                          alt={item.productName}
                          className="cart-item-image"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/100';
                          }}
                        />
                      </Col>
                      <Col md={4}>
                        <h5 className="cart-item-title">{item.productName}</h5>
                        <div>
                          <Badge bg="info" className="me-2">{item.brand?.name}</Badge>
                          <Badge bg="secondary">{item.color}</Badge>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="cart-item-price">{formatPrice(price)}</div>
                      </Col>
                      <Col md={2}>
                        <div className="quantity-controls">
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            onClick={() => updateCartQuantity(item.optionId, Math.max(1, item.quantity - 1))}
                          >
                            -
                          </Button>
                          <Form.Control
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateCartQuantity(item.optionId, Math.max(1, parseInt(e.target.value) || 1))}
                            className="quantity-input-cart"
                            min="1"
                          />
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            onClick={() => updateCartQuantity(item.optionId, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </Col>
                      <Col md={1}>
                        <div className="cart-item-total fw-bold">
                          {formatPrice(price * item.quantity)}
                        </div>
                      </Col>
                      <Col md={1}>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeFromCart(item.optionId)}
                        >
                          <FaTrash />
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              );
            })}

            <Button variant="outline-danger" onClick={clearCart} className="mt-3">
              Xóa tất cả
            </Button>
          </Col>

          <Col lg={4}>
            <Card className="cart-summary sticky-top">
              <Card.Body>
                <h4 className="mb-4">Tổng đơn hàng</h4>
                
                <div className="summary-row">
                  <span>Tạm tính:</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
                
                <div className="summary-row">
                  <span>Phí vận chuyển:</span>
                  <span className="text-success">Miễn phí</span>
                </div>
                
                <hr />
                
                <div className="summary-row total-row">
                  <span>Tổng cộng:</span>
                  <span className="total-price">{formatPrice(getCartTotal())}</span>
                </div>

                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-100 mt-4 checkout-btn"
                  onClick={handleCheckoutClick}
                >
                  Thanh toán
                </Button>

                <Link to="/products" className="btn btn-outline-primary w-100 mt-2">
                  Tiếp tục mua sắm
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Checkout Modal */}
      <Modal 
        show={showCheckoutModal} 
        onHide={() => setShowCheckoutModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin giao hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitOrder}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Họ và tên <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={checkoutForm.fullName}
                    onChange={handleInputChange}
                    isInvalid={!!formErrors.fullName}
                    placeholder="Nhập họ tên"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.fullName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Số điện thoại <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={checkoutForm.phone}
                    onChange={handleInputChange}
                    isInvalid={!!formErrors.phone}
                    placeholder="Nhập số điện thoại"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={checkoutForm.email}
                    onChange={handleInputChange}
                    isInvalid={!!formErrors.email}
                    placeholder="Nhập email"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Địa chỉ <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={checkoutForm.address}
                    onChange={handleInputChange}
                    isInvalid={!!formErrors.address}
                    placeholder="Số nhà, tên đường..."
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.address}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tỉnh/Thành phố <span className="text-danger">*</span></Form.Label>
                  <Form.Select
                    name="city"
                    value={checkoutForm.city}
                    onChange={handleInputChange}
                    isInvalid={!!formErrors.city}
                  >
                    <option value="">Chọn tỉnh/thành phố</option>
                    {vietnamCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formErrors.city}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phương thức thanh toán</Form.Label>
                  <Form.Select
                    name="paymentMethod"
                    value={checkoutForm.paymentMethod}
                    onChange={handleInputChange}
                  >
                    <option value="COD">Thanh toán khi nhận hàng (COD)</option>
                    <option value="Banking">Chuyển khoản ngân hàng</option>
                    <option value="Momo">Ví MoMo</option>
                    <option value="VNPay">VNPay</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Ghi chú</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="note"
                    value={checkoutForm.note}
                    onChange={handleInputChange}
                    placeholder="Ghi chú cho đơn hàng (không bắt buộc)"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Alert variant="info" className="mt-3">
              <strong>Tổng thanh toán: {formatPrice(getCartTotal())}</strong>
            </Alert>

            <div className="d-flex gap-2 justify-content-end">
              <Button variant="secondary" onClick={() => setShowCheckoutModal(false)}>
                Hủy
              </Button>
              <Button variant="primary" type="submit">
                Xác nhận đặt hàng
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Success Modal */}
      <Modal
        show={showSuccessModal}
        onHide={() => {}}
        centered
        backdrop="static"
      >
        <Modal.Body className="text-center py-5">
          <FaCheckCircle size={80} className="text-success mb-3" />
          <h3>Đặt hàng thành công!</h3>
          <p className="text-muted">Mã đơn hàng: <strong>{orderNumber}</strong></p>
          <p>Cảm ơn bạn đã mua hàng. Chúng tôi sẽ liên hệ với bạn sớm nhất!</p>
          <div className="mt-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 text-muted small">Đang chuyển hướng...</p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Cart;

