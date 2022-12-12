package com.iori.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.iori.mapper.ProductMapper;
import com.iori.pojo.Product;
import com.iori.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductMapper productMapper;

    @Autowired
    public ProductServiceImpl(ProductMapper productMapper) {
        this.productMapper = productMapper;
    }

    @Override
    public List<Product> getProductByName(String name) {
        QueryWrapper<Product> wrapper = new QueryWrapper<>();
        wrapper.like("p_name", name);
        return this.productMapper.selectList(wrapper);
    }

    @Override
    public List<Product> getProductByPriceRange(Integer low, Integer high) {
        QueryWrapper<Product> wrapper = new QueryWrapper<>();
        wrapper.between("price", low, high);
        return this.productMapper.selectList(wrapper);
    }
}
