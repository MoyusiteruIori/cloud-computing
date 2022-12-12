package com.iori.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.iori.pojo.Product;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ProductMapper extends BaseMapper<Product> {

}
