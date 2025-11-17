import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import { useApp } from '../contexts/AppContext';

const Favorites = () => {
  const { favorites } = useApp();

  if (favorites.length === 0) {
    return (
      <Container className="text-center py-5">
        <div className="empty-favorites" style={{ padding: '100px 0' }}>
          <FaHeart size={100} className="text-muted mb-4" />
          <h3>Chưa có sản phẩm yêu thích</h3>
          <p className="text-muted">Hãy thêm sản phẩm vào danh sách yêu thích</p>
          <Link to="/products" className="btn btn-primary btn-lg mt-3">
            Khám phá sản phẩm
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '60px 0',
        color: 'white',
        marginBottom: '2rem'
      }}>
        <Container>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.5rem' }}>Sản phẩm yêu thích</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>{favorites.length} sản phẩm</p>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="g-4">
          {favorites.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Favorites;

