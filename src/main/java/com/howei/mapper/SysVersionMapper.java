package com.howei.mapper;

import com.howei.pojo.SysVersion;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface SysVersionMapper {
    List<SysVersion> getAll();

    int insert( SysVersion sysVersion);
}
