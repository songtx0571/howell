package com.howei;

import com.github.pagehelper.PageHelper;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Properties;
import java.util.Random;

@SpringBootApplication
@MapperScan("com.howei.mapper")
public class HoweiApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(HoweiApplication.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(HoweiApplication.class,args);
    }

}
