package com.iori.pojo;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
@TableName("purchase")
public class Order {
    @TableId(value = "o_id")
    private Long oId;
    private Date oTime;
    private Integer num;
    private String cId;
    private String cName;
    private String cSex;
    private String pId;
    private String pName;
    private String pCategory;
    private Integer cost;
    private Integer price;
}
