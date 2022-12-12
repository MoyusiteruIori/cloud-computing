package com.iori.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.iori.mapper.OrderMapper;
import com.iori.pojo.Order;
import com.iori.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrderMapper orderMapper;

    @Autowired
    public OrderServiceImpl(OrderMapper orderMapper) {
        this.orderMapper = orderMapper;
    }

    public List<Order> getOrdersByProductID(String productID) {
        QueryWrapper<Order> wrapper = new QueryWrapper<>();
        wrapper.eq("p_id", productID);
        wrapper.isNotNull("o_id");
        return this.orderMapper.selectList(wrapper);
    }

    @Override
    public List<Map<String, Object>> getYearlyOrderStatistics() {
        QueryWrapper<Order> wrapper = new QueryWrapper<>();
        wrapper.select(
                "count(*) as volume, sum(cost) as cost, sum(price) as price, year(o_time) as year"
        );
        wrapper.groupBy("year(o_time)");
        wrapper.having("year is not null");
        return this.orderMapper.selectMaps(wrapper);
    }

    @Override
    public List<Order> getAllOrders() {
        return this.orderMapper.selectList(null);
    }

    @Override
    public List<Map<String, Object>> getOrderStatisticsBySex(String sex) {
        QueryWrapper<Order> wrapper = new QueryWrapper<>();
        wrapper.select(
                "c_sex, p_id, p_name, p_category, count(*) as count, sum(cost) as cost, sum(price) as price, sum(price) - sum(cost) as profit"
        );
        wrapper.isNotNull("purchase.cost");
        wrapper.isNotNull("purchase.price");
        wrapper.isNotNull("purchase.p_id");
        wrapper.isNotNull("p_name");
        wrapper.isNotNull("p_category");
        wrapper.groupBy("c_sex, p_id, p_name, p_category");
        wrapper.having("c_sex ='" + sex + "'");
        wrapper.orderByDesc("count");
        return this.orderMapper.selectMaps(wrapper);
    }

    @Override
    public List<Map<String, Object>> getOrderStatisticsByProductCategory() {
        QueryWrapper<Order> wrapper = new QueryWrapper<>();
        wrapper.select(
                "p_category, count(*) as count, sum(cost) as cost, sum(price) as price, sum(price) - sum(cost) as profit"
        );
        wrapper.isNotNull("p_category");
        wrapper.isNotNull("price");
        wrapper.isNotNull("cost");
        wrapper.groupBy("p_category");
        wrapper.orderByDesc("count");
        return this.orderMapper.selectMaps(wrapper);
    }

    @Override
    public List<Map<String, Object>> getBestCustomers() {
        QueryWrapper<Order> wrapper = new QueryWrapper<>();
        wrapper.select(
                "c_id, c_name, c_sex, count(*) as count"
        );
        wrapper.isNotNull("c_id");
        wrapper.isNotNull("c_name");
        wrapper.isNotNull("c_sex");
        wrapper.groupBy("c_id, c_name, c_sex");
        wrapper.orderByDesc("count");
        return this.orderMapper.selectMaps(wrapper);
    }

    @Override
    public List<Order> getOrdersByProductName(String productName) {
        QueryWrapper<Order> wrapper = new QueryWrapper<>();
        wrapper.like("p_name", productName);
        wrapper.isNotNull("o_id");
        wrapper.isNotNull("p_id");
        wrapper.isNotNull("p_name");
        wrapper.isNotNull("p_category");
        return this.orderMapper.selectList(wrapper);
    }
}
