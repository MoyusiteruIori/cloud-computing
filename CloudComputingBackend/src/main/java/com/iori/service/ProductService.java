package com.iori.service;

import com.iori.pojo.Product;

import java.util.List;

public interface ProductService {
    public List<Product> getProductByName(String name);

    public List<Product> getProductByPriceRange(Integer low, Integer high);
}
