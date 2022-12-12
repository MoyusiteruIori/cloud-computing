package com.iori.controller;

import com.iori.pojo.Customer;
import com.iori.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;


@Controller
@CrossOrigin
@RequestMapping("/customers")
public class CustomerController {
    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("count")
    @ResponseBody
    public Long getCustomerCount() {
        return this.customerService.getCustomerNumbers();
    }

    @GetMapping("/")
    @ResponseBody
    public List<Customer> getAllCustomers() {
        return this.customerService.getAllCustomers();
    }
}
