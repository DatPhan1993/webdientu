package com.webdientu.service;

import com.webdientu.entity.ProductOption;
import com.webdientu.form.CreateProductOptionForm;
import com.webdientu.form.UpdateProductOptionForm;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface IProductOptionService {
    List<ProductOption> getProductOptionsByProductId(int id);
    ProductOption createNewProductOption(CreateProductOptionForm form);
    ProductOption updateProductOption(int id, UpdateProductOptionForm form);
    void deleteProductOptionById(int id);
    void deleteProductOptionByProductId(int productId);

    String saveImage(MultipartFile file);
}
