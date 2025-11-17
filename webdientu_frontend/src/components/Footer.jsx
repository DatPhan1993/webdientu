import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light pt-5 pb-3 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h5 className="fw-bold mb-3">NhiepShop</h5>
            <p className="text-muted">
              Chuyên cung cấp các sản phẩm điện tử chính hãng với giá cả cạnh tranh nhất thị trường.
            </p>
            <div className="social-icons mt-3">
              <a href="#" className="text-light me-3"><FaFacebook size={24} /></a>
              <a href="#" className="text-light me-3"><FaTwitter size={24} /></a>
              <a href="#" className="text-light me-3"><FaInstagram size={24} /></a>
              <a href="#" className="text-light"><FaYoutube size={24} /></a>
            </div>
          </Col>

          <Col md={4} className="mb-4">
            <h5 className="fw-bold mb-3">Liên kết nhanh</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="/" className="text-muted text-decoration-none">Trang chủ</a></li>
              <li className="mb-2"><a href="/products" className="text-muted text-decoration-none">Sản phẩm</a></li>
              <li className="mb-2"><a href="/about" className="text-muted text-decoration-none">Giới thiệu</a></li>
              <li className="mb-2"><a href="/contact" className="text-muted text-decoration-none">Liên hệ</a></li>
            </ul>
          </Col>

          <Col md={4} className="mb-4">
            <h5 className="fw-bold mb-3">Liên hệ</h5>
            <ul className="list-unstyled">
              <li className="mb-2 text-muted">
                <FaMapMarkerAlt className="me-2" />
                Hà Nội, Việt Nam
              </li>
              <li className="mb-2 text-muted">
                <FaPhone className="me-2" />
                0858-250-715
              </li>
              <li className="mb-2 text-muted">
                <FaEnvelope className="me-2" />
                contact@nhiepshop.com
              </li>
            </ul>
          </Col>
        </Row>

        <Row className="mt-4 pt-3 border-top border-secondary">
          <Col className="text-center text-muted">
            <p className="mb-0">© 2025 NhiepShop. All rights reserved. Made with ❤️ by XuanHieu</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

