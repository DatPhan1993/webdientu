import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useApp } from '../contexts/AppContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart, addToFavorites, removeFromFavorites, isFavorite } = useApp();

  // Get lowest price option
  const getLowestPrice = () => {
    if (!product.productOptions || product.productOptions.length === 0) {
      return { price: 0, priceSale: 0 };
    }
    
    const lowestPriceOption = product.productOptions.reduce((min, option) => {
      const currentPrice = option.priceSale > 0 ? option.priceSale : option.price;
      const minPrice = min.priceSale > 0 ? min.priceSale : min.price;
      return currentPrice < minPrice ? option : min;
    }, product.productOptions[0]);

    return lowestPriceOption;
  };

  const lowestPriceOption = getLowestPrice();
  const displayPrice = lowestPriceOption.priceSale > 0 ? lowestPriceOption.priceSale : lowestPriceOption.price;
  const hasDiscount = lowestPriceOption.priceSale > 0 && lowestPriceOption.priceSale < lowestPriceOption.price;
  const discountPercent = hasDiscount 
    ? Math.round(((lowestPriceOption.price - lowestPriceOption.priceSale) / lowestPriceOption.price) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.productOptions && product.productOptions.length > 0) {
      const cartItem = {
        ...lowestPriceOption,
        productName: product.productName,
        productId: product.id,
        brand: product.brand,
        category: product.category,
      };
      addToCart(cartItem);
    }
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
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

  return (
    <Card className="product-card h-100 shadow-sm">
      <Link to={`/product/${product.id}`} className="text-decoration-none">
        <div className="product-image-wrapper">
          {hasDiscount && (
            <Badge bg="danger" className="discount-badge">
              -{discountPercent}%
            </Badge>
          )}
          <Button
            variant="light"
            className="favorite-btn"
            onClick={handleToggleFavorite}
          >
            {isFavorite(product.id) ? (
              <FaHeart className="text-danger" />
            ) : (
              <FaRegHeart />
            )}
          </Button>
          <Card.Img
            variant="top"
            src={lowestPriceOption.image || 'https://via.placeholder.com/300x200?text=No+Image'}
            alt={product.productName}
            className="product-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
            }}
          />
        </div>

        <Card.Body className="d-flex flex-column">
          <div className="mb-2">
            <Badge bg="info" className="me-2">{product.brand?.name}</Badge>
            <Badge bg="secondary">{product.category?.name}</Badge>
          </div>

          <Card.Title className="product-title">
            {product.productName}
          </Card.Title>

          <div className="mt-auto">
            <div className="price-section mb-3">
              {hasDiscount ? (
                <>
                  <div className="price-sale">{formatPrice(displayPrice)}</div>
                  <div className="price-original text-decoration-line-through text-muted">
                    {formatPrice(lowestPriceOption.price)}
                  </div>
                </>
              ) : (
                <div className="price-sale">{formatPrice(displayPrice)}</div>
              )}
            </div>

            <Button
              variant="primary"
              className="w-100 add-to-cart-btn"
              onClick={handleAddToCart}
            >
              <FaShoppingCart className="me-2" />
              Thêm vào giỏ
            </Button>
          </div>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default ProductCard;

