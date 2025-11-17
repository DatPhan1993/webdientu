package com.webdientu.service;


import com.webdientu.DTO.ProductDTO;
import com.webdientu.entity.Product;
import com.webdientu.form.CreateProductForm;
import com.webdientu.form.ProductFilterForm;
import com.webdientu.form.UpdateProductForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface IProductService {
    Page<Product> getAllProducts(Pageable pageable, ProductFilterForm form);
    Page<ProductDTO> getProductByCategoryId(Pageable pageable, int categoryId);
    Page<ProductDTO> getProductByBrand(Pageable pageable, int brandId);
    Page<ProductDTO> getProductByCategoryName(Pageable pageable, String name);
    Product createNewProduct(CreateProductForm createProductForm);
    Product updateProductById(int productId, UpdateProductForm updateProductForm);
    void deleteProductById(int productId);
    Product getProductById(int id);
    void deleteProducts(List<Integer> productIds);
}
