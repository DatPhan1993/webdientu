import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, InputGroup, Badge, Image } from 'react-bootstrap';
import api from '../../services/api';
import './ProductManagement.css';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    brandId: '',
    categoryId: '',
    image: '', // primary image of first option
  });

  useEffect(() => {
    fetchProducts();
    fetchMeta();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.getAllProducts(0, 100);
      setProducts(response.data.content || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchMeta = async () => {
    try {
      const [brandsRes, categoriesRes] = await Promise.all([
        api.getAllBrands(),
        api.getAllCategories(0, 200),
      ]);
      setBrands(Array.isArray(brandsRes.data) ? brandsRes.data : []);
      const catContent = categoriesRes.data?.content || categoriesRes.data || [];
      setCategories(Array.isArray(catContent) ? catContent : []);
    } catch (error) {
      console.error('Error fetching brands/categories:', error);
    }
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({ name: '', brandId: '', categoryId: '', image: '' });
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    const primaryOption = product?.productOptions && product.productOptions.length > 0
      ? product.productOptions[0]
      : null;
    setFormData({
      name: product.productName || product.name || '',
      brandId: product.brand?.id || '',
      categoryId: product.category?.id || '',
      image: primaryOption?.image || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;
    
    try {
      // TODO: Implement delete API
      // await api.deleteProduct(productId);
      alert('Chức năng xóa sẽ được triển khai với API backend');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Lỗi khi xóa sản phẩm');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // TODO: Implement create/update API
      if (editingProduct) {
        // If product has options, update the first option's image
        const primaryOption = editingProduct?.productOptions && editingProduct.productOptions.length > 0
          ? editingProduct.productOptions[0]
          : null;
        if (primaryOption) {
          await api.updateProductOption(primaryOption.optionId, {
            // backend expects quantity, ram, image in UpdateProductOptionForm
            quantity: primaryOption.quantity,
            ram: primaryOption.ram,
            image: formData.image
          });
          alert('Đã cập nhật hình ảnh sản phẩm');
        } else {
          alert('Sản phẩm chưa có Option để cập nhật hình ảnh');
        }
      } else {
        // await api.createProduct(formData);
        alert('Chức năng thêm mới sẽ được triển khai với API backend');
      }
      
      setShowModal(false);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Lỗi khi lưu sản phẩm');
    }
  };

  const safeProducts = Array.isArray(products) ? products : [];
  const filteredProducts = safeProducts.filter((product) => {
    const productName = (product?.productName || product?.name || '').toLowerCase();
    return productName.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="product-management">
      <div className="page-header">
        <h2 className="page-title">📦 Quản lý sản phẩm</h2>
        <Button variant="primary" onClick={handleAdd}>
          ➕ Thêm sản phẩm
        </Button>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <InputGroup>
          <InputGroup.Text>🔍</InputGroup.Text>
          <Form.Control
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>

      {/* Products Table */}
      <div className="table-container">
        <Table hover responsive>
          <thead>
            <tr>
              <th>Ảnh</th>
              <th>ID</th>
              <th>Tên sản phẩm</th>
              <th>Thương hiệu</th>
              <th>Danh mục</th>
              <th className="text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  Không có sản phẩm nào
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <Image
                      src={product?.productOptions?.[0]?.image || 'https://via.placeholder.com/60?text=No+Img'}
                      alt={product.productName || product.name}
                      rounded
                      style={{ width: 60, height: 60, objectFit: 'cover' }}
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/60?text=No+Img'; }}
                    />
                  </td>
                  <td>{product.id}</td>
                  <td><strong>{product.productName || product.name}</strong></td>
                  <td>
                    <Badge bg="info">{product.brand?.name || 'N/A'}</Badge>
                  </td>
                  <td>
                    <Badge bg="secondary">{product.category?.name || 'N/A'}</Badge>
                  </td>
                  <td className="text-center">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(product)}
                    >
                      ✏️ Sửa
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      🗑️ Xóa
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProduct ? '✏️ Sửa sản phẩm' : '➕ Thêm sản phẩm mới'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tên sản phẩm</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Thương hiệu</Form.Label>
              <Form.Select
                value={formData.brandId}
                onChange={(e) => setFormData({ ...formData, brandId: e.target.value })}
                required
              >
                <option value="">-- Chọn thương hiệu --</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Danh mục</Form.Label>
              <Form.Select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                required
              >
                <option value="">-- Chọn danh mục --</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ảnh sản phẩm (URL)</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://..."
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
              <div className="mt-2">
                <Image
                  src={formData.image || 'https://via.placeholder.com/200x140?text=Preview'}
                  alt="Preview"
                  rounded
                  style={{ width: 200, height: 140, objectFit: 'cover' }}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/200x140?text=Preview'; }}
                />
              </div>
              {editingProduct && (
                <Form.Text className="text-muted">
                  Thay đổi ảnh của Option đầu tiên của sản phẩm.
                </Form.Text>
              )}
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Hủy
              </Button>
              <Button variant="primary" type="submit">
                {editingProduct ? 'Cập nhật' : 'Thêm mới'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductManagement;

