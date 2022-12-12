package com.iori.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.iori.pojo.Customer;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CustomerMapper extends BaseMapper<Customer> {

}
