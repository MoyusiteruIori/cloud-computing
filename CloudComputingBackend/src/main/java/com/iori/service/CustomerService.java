package com.iori.service;

import com.iori.pojo.Customer;

import java.util.List;

public interface CustomerService {
    public Long getCustomerNumbers();

    public List<Customer> getAllCustomers();
}
