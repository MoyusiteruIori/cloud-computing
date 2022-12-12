package com.iori.pojo;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@TableName("customers")
public class Customer {
    @TableId(value = "c_id")
    private Integer cId;
    private String cName;
    private String cSex;
}
