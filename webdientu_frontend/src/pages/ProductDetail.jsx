import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Badge, Form } from 'react-bootstrap';
import { FaShoppingCart, FaHeart, FaRegHeart, FaArrowLeft } from 'react-icons/fa';
import { useApp } from '../contexts/AppContext';
import Loading from '../components/Loading';
import api from '../services/api';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, addToFavorites, removeFromFavorites, isFavorite } = useApp();
  const [product, setProduct] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.getProductById(id);
      setProduct(response.data);
      if (response.data.productOptions && response.data.productOptions.length > 0) {
        setSelectedOption(response.data.productOptions[0]);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (selectedOption) {
      const cartItem = {
        ...selectedOption,
        productName: product.productName,
        productId: product.id,
        brand: product.brand,
        category: product.category,
      };
      for (let i = 0; i < quantity; i++) {
        addToCart(cartItem);
      }
    }
  };

  const handleToggleFavorite = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  if (loading) {
    return <Loading fullScreen />;
  }

  if (!product) {
    return (
      <Container className="text-center py-5">
        <h3>Không tìm thấy sản phẩm</h3>
        <Link to="/products" className="btn btn-primary mt-3">
          <FaArrowLeft className="me-2" />
          Quay lại
        </Link>
      </Container>
    );
  }

  const displayPrice = selectedOption?.priceSale > 0 ? selectedOption.priceSale : selectedOption?.price;
  const hasDiscount = selectedOption?.priceSale > 0 && selectedOption.priceSale < selectedOption.price;
  const discountPercent = hasDiscount 
    ? Math.round(((selectedOption.price - selectedOption.priceSale) / selectedOption.price) * 100)
    : 0;

  return (
    <div className="product-detail-page">
      <Container className="py-5">
        <Link to="/products" className="back-link mb-4 d-inline-block">
          <FaArrowLeft className="me-2" />
          Quay lại danh sách
        </Link>

        <Row className="g-5">
          {/* Product Image */}
          <Col lg={6}>
            <div className="product-detail-image">
              {hasDiscount && (
                <Badge bg="danger" className="discount-badge-detail">
                  -{discountPercent}%
                </Badge>
              )}
              <img 
                src={selectedOption?.image || 'https://via.placeholder.com/500'} 
                alt={product.productName}
                className="img-fluid"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500?text=No+Image';
                }}
              />
            </div>
          </Col>

          {/* Product Info */}
          <Col lg={6}>
            <div className="product-detail-info">
              <div className="mb-3">
                <Badge bg="info" className="me-2">{product.brand?.name}</Badge>
                <Badge bg="secondary">{product.category?.name}</Badge>
              </div>

              <h1 className="product-detail-title">{product.productName}</h1>

              <div className="price-section-detail mb-4">
                {hasDiscount ? (
                  <>
                    <div className="price-sale-detail">{formatPrice(displayPrice)}</div>
                    <div className="price-original-detail text-decoration-line-through text-muted">
                      {formatPrice(selectedOption.price)}
                    </div>
                    <Badge bg="danger" className="ms-2">Tiết kiệm {formatPrice(selectedOption.price - selectedOption.priceSale)}</Badge>
                  </>
                ) : (
                  <div className="price-sale-detail">{formatPrice(displayPrice)}</div>
                )}
              </div>

              {/* Options Selection */}
              {product.productOptions && product.productOptions.length > 1 && (
                <div className="options-section mb-4">
                  <h5 className="mb-3">Chọn phiên bản:</h5>
                  <div className="d-flex flex-wrap gap-2">
                    {product.productOptions.map((option) => (
                      <Button
                        key={option.optionId}
                        variant={selectedOption?.optionId === option.optionId ? 'primary' : 'outline-primary'}
                        onClick={() => setSelectedOption(option)}
                        className="option-btn"
                      >
                        {option.color} - {option.ram}GB
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="quantity-section mb-4">
                <h5 className="mb-3">Số lượng:</h5>
                <div className="d-flex align-items-center gap-3">
                  <Button
                    variant="outline-secondary"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <Form.Control
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="quantity-input text-center"
                    min="1"
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                  <span className="text-muted">
                    (Còn {selectedOption?.quantity} sản phẩm)
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="product-actions">
                <Button
                  variant="primary"
                  size="lg"
                  className="add-to-cart-btn-detail me-3"
                  onClick={handleAddToCart}
                  disabled={!selectedOption || selectedOption.quantity === 0}
                >
                  <FaShoppingCart className="me-2" />
                  Thêm vào giỏ hàng
                </Button>

                <Button
                  variant={isFavorite(product.id) ? 'danger' : 'outline-danger'}
                  size="lg"
                  className="favorite-btn-detail"
                  onClick={handleToggleFavorite}
                >
                  {isFavorite(product.id) ? <FaHeart /> : <FaRegHeart />}
                </Button>
              </div>

              {/* Product Specs */}
              {selectedOption && (
                <div className="product-specs mt-4">
                  <h5 className="mb-3">Thông số kỹ thuật:</h5>
                  <ul className="specs-list">
                    <li><strong>Màu sắc:</strong> {selectedOption.color}</li>
                    <li><strong>Bộ nhớ:</strong> {selectedOption.ram}GB</li>
                    <li><strong>Thương hiệu:</strong> {product.brand?.name}</li>
                    <li><strong>Danh mục:</strong> {product.category?.name}</li>
                  </ul>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetail;

