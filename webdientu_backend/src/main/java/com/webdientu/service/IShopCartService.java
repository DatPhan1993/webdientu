package com.webdientu.service;

import com.webdientu.DTO.ProductShopcartDTO;
import com.webdientu.entity.ShopCart;
import com.webdientu.form.CreateShopcartForm;
import com.webdientu.form.UpdateShopcartForm;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;

@Service
public interface IShopCartService {
    ShopCart createShopcart(CreateShopcartForm form);

    List<ProductShopcartDTO> getAllProductShopcartByUserId(int userId);

    void updateShopCart(UpdateShopcartForm form);

    void deleteShopCart(int userId, int optionId);
}
