package com.iori.service.impl;

import com.iori.mapper.CustomerMapper;
import com.iori.pojo.Customer;
import com.iori.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerMapper customerMapper;

    @Autowired
    public CustomerServiceImpl(CustomerMapper customerMapper) {
        this.customerMapper = customerMapper;
    }

    @Override
    public Long getCustomerNumbers() {
        return this.customerMapper.selectCount(null);
    }

    @Override
    public List<Customer> getAllCustomers() {
        return this.customerMapper.selectList(null);
    }
}
