package com.webdientu.service;

import com.webdientu.DTO.ProductShopcartDTO;
import com.webdientu.entity.Account;
import com.webdientu.entity.ProductOption;
import com.webdientu.entity.ShopCart;
import com.webdientu.form.CreateShopcartForm;
import com.webdientu.form.UpdateShopcartForm;
import com.webdientu.repository.IAccountRepository;
import com.webdientu.repository.IProductOptionRepository;
import com.webdientu.repository.ShopCartRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ShopCartService implements IShopCartService{
    @Autowired
    private IAccountRepository accountRepository;

    @Autowired
    private IProductOptionRepository productOptionRepository;

    @Autowired
    private ShopCartRepository shopCartRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ShopCart createShopcart(CreateShopcartForm form) {
        Account account = accountRepository.findById(form.getUserId()).orElseThrow(() -> new RuntimeException("Not found"));
        ProductOption option = productOptionRepository.findById(form.getOptionId()).orElseThrow(() -> new RuntimeException("Not found"));
        ShopCart shopCart = new ShopCart(account, option, form.getTotal());
        List<ShopCart> shopCarts = shopCartRepository.findByAccountId(form.getUserId());
        Optional<ShopCart> existingShopCart = shopCarts.stream()
                .filter(cart -> cart.getProductOption().getOptionId() == form.getOptionId())
                .findFirst();
        if (existingShopCart.isPresent()) {
            // ShopCart already exists, update the total
            ShopCart shopCartToUpdate = existingShopCart.get();
            int newTotal = shopCartToUpdate.getTotal() + form.getTotal();
            shopCartToUpdate.setTotal(newTotal);
            shopCartRepository.save(shopCartToUpdate);
            return shopCartToUpdate;
        } else {
            // ShopCart doesn't exist, create a new one
            ShopCart newShopCart = new ShopCart(account, option, form.getTotal());
            shopCartRepository.save(newShopCart);
            return newShopCart;
        }
    }

    @Override
    public List<ProductShopcartDTO> getAllProductShopcartByUserId(int userId) {
        List<ShopCart> shopCarts = shopCartRepository.findByAccountId(userId);
        List<ProductShopcartDTO> productShopcartDTOS = shopCarts.stream()
                .map(shopCart -> {
                    ProductShopcartDTO productShopcartDTO = modelMapper.map(shopCart.getProductOption(), ProductShopcartDTO.class);
                    productShopcartDTO.setTotal(shopCart.getTotal());
                    return productShopcartDTO;
                })
                .collect(Collectors.toList());
        return productShopcartDTOS;
    }

    @Override
    public void updateShopCart(UpdateShopcartForm form) {
        Account account = accountRepository.findById(form.getUserId()).get();
        ProductOption productOption = productOptionRepository.findById(form.getOptionId()).get();
        Optional<ShopCart> optionalShopCart = shopCartRepository.findByAccountAndProductOption(account, productOption);
        ShopCart shopCart = optionalShopCart.get();
        shopCart.setTotal(form.getTotal());
        shopCartRepository.save(shopCart);
    }

    @Override
    public void deleteShopCart(int userId, int optionId) {
        Account account = accountRepository.findById(userId).get();
        ProductOption productOption = productOptionRepository.findById(optionId).get();
        Optional<ShopCart> optionalShopCart = shopCartRepository.findByAccountAndProductOption(account, productOption);
        ShopCart shopCart = optionalShopCart.get();
        shopCartRepository.delete(shopCart);
    }
}
