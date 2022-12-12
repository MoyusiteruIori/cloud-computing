package com.iori.controller;

import com.iori.pojo.Order;
import com.iori.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@CrossOrigin
@RequestMapping("orders")
public class OrderController {
    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/byProductID")
    @ResponseBody
    public List<Order> getOrdersByProductID(@RequestParam String p_id) {
        return this.orderService.getOrdersByProductID(p_id);
    }

    @GetMapping("/yearlyStatistics")
    @ResponseBody
    public List<Map<String, Object>> getYearlyStatistics() {
        return this.orderService.getYearlyOrderStatistics();
    }

    @GetMapping("/")
    @ResponseBody
    public List<Order> getAllOrders() {
        return this.orderService.getAllOrders();
    }

    @GetMapping("/sexStatistics")
    @ResponseBody
    public List<Map<String, Object>> getStatisticsBySex(@RequestParam String sex) {
        return this.orderService.getOrderStatisticsBySex(sex);
    }

    @GetMapping("/categoryStatistics")
    @ResponseBody
    public List<Map<String, Object>> getStatisticsByProductCategory() {
        return this.orderService.getOrderStatisticsByProductCategory();
    }

    @GetMapping("/bestCustomers")
    @ResponseBody
    public List<Map<String, Object>> getBestCustomers() {
        return this.orderService.getBestCustomers();
    }

    @GetMapping("/byProductName")
    @ResponseBody
    public List<Order> getOrdersByProductName(@RequestParam String p_name) {
        return this.orderService.getOrdersByProductName(p_name);
    }
}
