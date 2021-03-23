package com.howei.service;

import com.howei.pojo.SysVersion;

import java.util.List;

public interface SysVersionService {
    List<SysVersion> getAll();

    int insert(SysVersion sysVersion);
}
