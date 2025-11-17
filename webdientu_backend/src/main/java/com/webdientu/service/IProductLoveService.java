package com.webdientu.service;

import com.webdientu.DTO.ProductShopcartDTO;
import com.webdientu.entity.ProductLove;
import com.webdientu.entity.ShopCart;
import com.webdientu.form.CreateLoveProductForm;
import com.webdientu.form.CreateShopcartForm;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IProductLoveService {
    ProductLove createProductLove(CreateLoveProductForm form);

    List<ProductShopcartDTO> getAllProductLoveByUserId(int userId);
    public void deleteProductLove(int userId, int optionId);

    }
