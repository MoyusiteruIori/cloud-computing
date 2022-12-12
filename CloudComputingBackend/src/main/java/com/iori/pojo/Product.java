package com.iori.pojo;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@TableName("product")
public class Product {
    @TableId(value = "p_id")
    private String pId;
    private String pName;
    private String pCategory;
    private Integer cost;
    private Integer price;
}
