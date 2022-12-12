package com.iori;

import com.iori.mapper.CustomerMapper;
import com.iori.pojo.Customer;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@SpringBootTest
@RunWith(SpringRunner.class)
public class MyBatisPlusTest {
    @Autowired
    private CustomerMapper customerMapper;

    @Test
    public void testSelectList() {
        List<Customer> list = this.customerMapper.selectList(null);
        for (int i = 0; i < 10; i++) {
            System.out.println(list.get(i));
        }
    }
}
