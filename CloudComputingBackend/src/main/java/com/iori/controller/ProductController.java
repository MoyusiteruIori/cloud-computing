package com.iori.controller;

import com.iori.pojo.Product;
import com.iori.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
@CrossOrigin
@RequestMapping("/product")
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/byName")
    @ResponseBody
    public List<Product> getProductByName(@RequestParam String name) {
        return this.productService.getProductByName(name);
    }

    @GetMapping("/byCostRange")
    @ResponseBody
    public List<Product> getProductByPriceRange(@RequestParam Integer low, @RequestParam Integer high) {
        return this.productService.getProductByPriceRange(low, high);
    }
}
