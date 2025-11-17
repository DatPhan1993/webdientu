package com.webdientu.controller;

import com.webdientu.DTO.ProductShopcartDTO;
import com.webdientu.entity.ShopCart;
import com.webdientu.form.CreateLoveProductForm;
import com.webdientu.form.CreateShopcartForm;
import com.webdientu.service.IProductLoveService;
import com.webdientu.service.IShopCartService;
import com.webdientu.service.ShopCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/product-love")
@CrossOrigin("*")
public class ProductLoveController {
    @Autowired
    private IProductLoveService productLoveService;

    @GetMapping("/{id}")
    public List<ProductShopcartDTO> getAllShopcartById(@PathVariable(name = "id") int id) {
        return productLoveService.getAllProductLoveByUserId(id);
    }
    @PostMapping(consumes = "application/json")
    public ResponseEntity<?> createShopcart (@RequestBody CreateLoveProductForm form) {
        System.out.println(form.getUserId());
        System.out.println(form.getOptionId());
        productLoveService.createProductLove(form);
        return ResponseEntity.ok("Thêm thành công");
    }

    @DeleteMapping("/{userId}/{optionId}")
    public ResponseEntity<?> deleteShopcart(
            @PathVariable int userId,
            @PathVariable int optionId
    ) {
        productLoveService.deleteProductLove(userId, optionId);
        return ResponseEntity.ok("Delete successfully");
    }
}
