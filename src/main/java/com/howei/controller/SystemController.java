package com.howei.controller;

import com.alibaba.fastjson.JSON;
import com.howei.pojo.SysVersion;
import com.howei.service.SysVersionService;
import com.howei.util.Result;
import com.howei.util.Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/sysVersion")
@CrossOrigin(origins = {"http://localhost:8080"}, allowCredentials = "true")
public class SystemController {
    @Autowired
    private SysVersionService svService;

    @GetMapping("/list")
    public Result getSysVersionList() {
        Result result = new Result();
        List<SysVersion> sysVersionList = svService.getAll();
        if (sysVersionList == null || sysVersionList.size() == 0) {
            sysVersionList = new ArrayList<>();
        }
        result.setCode(0);
        result.setCount(sysVersionList.size());
        result.setData(sysVersionList);
        result.setMsg("查询成功");
        return result;
    }

    @PostMapping("/add")
    public String addSysVersion(String releaseDate, String content,String title) {
        SysVersion sysVersion = new SysVersion();
        sysVersion.setReleaseDate(releaseDate);
        sysVersion.setContent(content);
        sysVersion.setTitle(title);
        int count = svService.insert(sysVersion);
        if (count > 0) {
            return JSON.toJSONString(Type.SUCCESS);
        } else {
            return JSON.toJSONString(Type.ERROR);
        }
    }


}
