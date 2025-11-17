package com.webdientu.service;

import com.webdientu.DTO.ProductShopcartDTO;
import com.webdientu.entity.Account;
import com.webdientu.entity.ProductLove;
import com.webdientu.entity.ProductOption;
import com.webdientu.entity.ShopCart;
import com.webdientu.form.CreateLoveProductForm;
import com.webdientu.form.CreateShopcartForm;
import com.webdientu.repository.IAccountRepository;
import com.webdientu.repository.ILoveProductRepository;
import com.webdientu.repository.IProductOptionRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProduceLoveService implements IProductLoveService{
    @Autowired
    private IAccountRepository accountRepository;

    @Autowired
    private IProductOptionRepository productOptionRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private ILoveProductRepository iLoveProductRepository;
    public List<ProductShopcartDTO> getAllProductLoveByUserId(int userId) {
        List<ProductLove> productLoves = iLoveProductRepository.findByAccountId(userId);
        List<ProductShopcartDTO> productShopcartDTOS = productLoves.stream()
                .map(shopCart -> modelMapper.map(shopCart.getProductOption(), ProductShopcartDTO.class))
                .collect(Collectors.toList());
        return productShopcartDTOS;
    }

    @Override
    public ProductLove createProductLove(CreateLoveProductForm form) {
        Account account = accountRepository.findById(form.getUserId()).orElseThrow(() -> new RuntimeException("Not found"));
        ProductOption option = productOptionRepository.findById(form.getOptionId()).orElseThrow(() -> new RuntimeException("Not found"));
        ProductLove productLove = new ProductLove(account, option);
        iLoveProductRepository.save(productLove);
        return productLove;
    }
    @Override
    public void deleteProductLove(int userId, int optionId) {
        Account account = accountRepository.findById(userId).get();
        ProductOption productOption = productOptionRepository.findById(optionId).get();
        Optional<ProductLove> loveOptional = iLoveProductRepository.findByAccountAndProductOption(account, productOption);
        ProductLove productLove = loveOptional.get();
        iLoveProductRepository.delete(productLove);
    }
}
