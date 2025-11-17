import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Pagination } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import api from '../services/api';
import './Products.css';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  useEffect(() => {
    const category = searchParams.get('category') || '';
    const brand = searchParams.get('brand') || '';
    setSelectedCategory(category);
    setSelectedBrand(brand);
    fetchProducts(0, category, brand);
  }, [searchParams]);

  const fetchCategories = async () => {
    try {
      const response = await api.getAllCategories();
      setCategories(response.data.content || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await api.getAllBrands();
      setBrands(response.data || []);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const fetchProducts = async (page = 0, category = '', brand = '') => {
    setLoading(true);
    try {
      let response;
      
      if (category) {
        response = await api.getProductsByCategoryName(category, page, 12);
      } else if (brand) {
        response = await api.getProductsByBrand(brand, page, 12);
      } else {
        response = await api.getAllProducts(page, 12);
      }

      setProducts(response.data.content || []);
      setTotalPages(response.data.totalPages || 0);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  const handleBrandChange = (e) => {
    const brand = e.target.value;
    setSelectedBrand(brand);
    if (brand) {
      setSearchParams({ brand });
    } else {
      setSearchParams({});
    }
  };

  const handlePageChange = (page) => {
    fetchProducts(page, selectedCategory, selectedBrand);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setSearchParams({});
    fetchProducts(0, '', '');
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <Container>
          <h1 className="page-title">Sản phẩm</h1>
          <p className="page-subtitle">Khám phá bộ sưu tập sản phẩm điện tử đa dạng</p>
        </Container>
      </div>

      <Container className="py-5">
        <Row>
          {/* Filters Sidebar */}
          <Col lg={3} className="mb-4">
            <div className="filters-sidebar">
              <h5 className="filter-title">Bộ lọc</h5>

              {/* Category Filter */}
              <div className="filter-group">
                <Form.Label className="fw-bold">Danh mục</Form.Label>
                <Form.Select value={selectedCategory} onChange={handleCategoryChange}>
                  <option value="">Tất cả danh mục</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </div>

              {/* Brand Filter */}
              <div className="filter-group">
                <Form.Label className="fw-bold">Thương hiệu</Form.Label>
                <Form.Select value={selectedBrand} onChange={handleBrandChange}>
                  <option value="">Tất cả thương hiệu</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </Form.Select>
              </div>

              {(selectedCategory || selectedBrand) && (
                <Button variant="outline-danger" className="w-100 mt-3" onClick={handleClearFilters}>
                  Xóa bộ lọc
                </Button>
              )}
            </div>
          </Col>

          {/* Products Grid */}
          <Col lg={9}>
            {loading ? (
              <Loading />
            ) : products.length > 0 ? (
              <>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="text-muted mb-0">
                    Hiển thị {products.length} sản phẩm
                  </p>
                </div>

                <Row className="g-4">
                  {products.map((product) => (
                    <Col key={product.id} xs={12} sm={6} md={4}>
                      <ProductCard product={product} />
                    </Col>
                  ))}
                </Row>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="d-flex justify-content-center mt-5">
                    <Pagination>
                      <Pagination.First 
                        onClick={() => handlePageChange(0)} 
                        disabled={currentPage === 0} 
                      />
                      <Pagination.Prev 
                        onClick={() => handlePageChange(currentPage - 1)} 
                        disabled={currentPage === 0} 
                      />

                      {[...Array(totalPages)].map((_, index) => (
                        <Pagination.Item
                          key={index}
                          active={index === currentPage}
                          onClick={() => handlePageChange(index)}
                        >
                          {index + 1}
                        </Pagination.Item>
                      ))}

                      <Pagination.Next 
                        onClick={() => handlePageChange(currentPage + 1)} 
                        disabled={currentPage === totalPages - 1} 
                      />
                      <Pagination.Last 
                        onClick={() => handlePageChange(totalPages - 1)} 
                        disabled={currentPage === totalPages - 1} 
                      />
                    </Pagination>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-5">
                <h4>Không tìm thấy sản phẩm nào</h4>
                <p className="text-muted">Vui lòng thử lại với bộ lọc khác</p>
                <Button variant="primary" onClick={handleClearFilters}>
                  Xóa bộ lọc
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Products;

