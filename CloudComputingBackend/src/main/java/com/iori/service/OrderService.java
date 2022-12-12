package com.iori.service;


import com.iori.pojo.Order;

import java.util.List;
import java.util.Map;

public interface OrderService {
    public List<Order> getOrdersByProductID(String productID);

    public List<Map<String, Object>> getYearlyOrderStatistics();

    public List<Order> getAllOrders();

    public List<Map<String, Object>> getOrderStatisticsBySex(String sex);

    public List<Map<String, Object>> getOrderStatisticsByProductCategory();

    public List<Map<String, Object>> getBestCustomers();

    public List<Order> getOrdersByProductName(String productName);
}
