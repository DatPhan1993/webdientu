import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaMobileAlt, FaLaptop, FaTabletAlt, FaClock, FaTv, FaDesktop } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import api from '../services/api';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes, brandsRes] = await Promise.all([
        api.getAllProducts(0, 8),
        api.getAllCategories(),
        api.getAllBrands()
      ]);

      setProducts(productsRes.data.content || []);
      setCategories(categoriesRes.data.content || []);
      setBrands(brandsRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (categoryName) => {
    const icons = {
      mobilephone: <FaMobileAlt />,
      laptop: <FaLaptop />,
      tablet: <FaTabletAlt />,
      clock: <FaClock />,
      'smart TV': <FaTv />,
      screen: <FaDesktop />
    };
    return icons[categoryName] || <FaMobileAlt />;
  };

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="hero-content">
              <Badge bg="primary" className="mb-3 px-3 py-2">Khuyến mãi đặc biệt 🔥</Badge>
              <h1 className="hero-title">
                Sản phẩm điện tử
                <br />
                <span className="gradient-text">Chính hãng, Giá tốt</span>
              </h1>
              <p className="hero-description">
                Khám phá bộ sưu tập sản phẩm điện tử từ những thương hiệu hàng đầu thế giới.
                Cam kết chất lượng, giá cả cạnh tranh nhất thị trường.
              </p>
              <div className="hero-buttons">
                <Button as={Link} to="/products" variant="primary" size="lg" className="me-3">
                  Mua sắm ngay <FaArrowRight className="ms-2" />
                </Button>
                <Button as={Link} to="/products" variant="outline-primary" size="lg">
                  Xem sản phẩm
                </Button>
              </div>

              {/* Stats */}
              <Row className="mt-5 stats-section">
                <Col xs={4}>
                  <h3 className="stat-number">{products.length}+</h3>
                  <p className="stat-label">Sản phẩm</p>
                </Col>
                <Col xs={4}>
                  <h3 className="stat-number">{brands.length}</h3>
                  <p className="stat-label">Thương hiệu</p>
                </Col>
                <Col xs={4}>
                  <h3 className="stat-number">100%</h3>
                  <p className="stat-label">Chính hãng</p>
                </Col>
              </Row>
            </Col>

            <Col lg={6} className="hero-image-wrapper">
              <div className="hero-image">
                <img 
                  src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800" 
                  alt="Electronics" 
                  className="img-fluid"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="categories-section py-5">
        <Container>
          <h2 className="section-title text-center mb-5">
            Danh mục sản phẩm
          </h2>
          <Row className="g-4">
            {categories.map((category) => (
              <Col key={category.id} xs={6} md={4} lg={2}>
                <Link to={`/products?category=${category.name}`} className="text-decoration-none">
                  <div className="category-card">
                    <div className="category-icon">
                      {getCategoryIcon(category.name)}
                    </div>
                    <h5 className="category-name">{category.name}</h5>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Brands Section */}
      <section className="brands-section py-5 bg-light">
        <Container>
          <h2 className="section-title text-center mb-5">
            Thương hiệu nổi bật
          </h2>
          <Row className="justify-content-center g-4">
            {brands.map((brand) => (
              <Col key={brand.id} xs={6} md={4} lg={2}>
                <Link to={`/products?brand=${brand.id}`} className="text-decoration-none">
                  <div className="brand-card">
                    <h5 className="brand-name text-capitalize">{brand.name}</h5>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products-section py-5">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h2 className="section-title mb-0">Sản phẩm nổi bật</h2>
            <Button as={Link} to="/products" variant="outline-primary">
              Xem tất cả <FaArrowRight className="ms-2" />
            </Button>
          </div>

          <Row className="g-4">
            {products.map((product) => (
              <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5">
        <Container>
          <div className="cta-content text-center">
            <h2 className="cta-title">Bạn đang tìm kiếm gì?</h2>
            <p className="cta-description">
              Khám phá hàng trăm sản phẩm điện tử chính hãng với giá tốt nhất
            </p>
            <Button as={Link} to="/products" variant="light" size="lg">
              Khám phá ngay
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;

