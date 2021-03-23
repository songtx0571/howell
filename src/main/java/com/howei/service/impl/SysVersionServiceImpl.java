package com.howei.service.impl;

import com.howei.mapper.SysVersionMapper;
import com.howei.pojo.SysVersion;
import com.howei.service.SysVersionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SysVersionServiceImpl implements SysVersionService {

    @Autowired
    private SysVersionMapper mapper;

    @Override
    public List<SysVersion> getAll() {
       return mapper.getAll();
    }

    @Override
    public int insert(SysVersion sysVersion) {
        return mapper.insert(sysVersion);
    }
}
