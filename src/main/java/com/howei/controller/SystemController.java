package com.howei.controller;

import com.alibaba.fastjson.JSON;
import com.howei.pojo.SysVersion;
import com.howei.pojo.UserSetting;
import com.howei.pojo.Users;
import com.howei.service.SysVersionService;
import com.howei.service.UserSettingService;
import com.howei.util.Result;
import com.howei.util.Type;
import org.apache.catalina.User;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:8080"}, allowCredentials = "true")
public class SystemController {
    @Autowired
    private SysVersionService svService;
    @Autowired
    private UserSettingService usService;


    @GetMapping("/sysVersion/list")
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

    @GetMapping("/setting/get")
    public Result getUserSetting(@RequestParam(required = false) Integer employeeId) {

        Result result = new Result();
        Subject subject = SecurityUtils.getSubject();
        Users users = (Users) subject.getPrincipal();


        if (users == null) {
            result.setCode(0);
            result.setCount(0);
            result.setMsg("用户失效,请重新登录");
            return result;
        }
        if (employeeId == null) {
            employeeId = users.getEmployeeId();
        }
        UserSetting userSetting = usService.getByEmployeeId(employeeId);
        if(userSetting==null){
            userSetting= UserSetting.init(employeeId);
        }
        result.setData(userSetting);
        result.setMsg("成功");
        result.setCount(1);
        result.setCode(1);
        return result;
    }

    @PostMapping("/setting/save")
    public Result updateUserSetting(@RequestBody UserSetting userSetting) {
        Result result = new Result();
        Subject subject = SecurityUtils.getSubject();
        Users users = (Users) subject.getPrincipal();


        if (users == null) {
            result.setCode(0);
            result.setCount(0);
            result.setMsg("用户失效,请重新登录");
            return result;
        }
        Integer usId = userSetting.getId();
        userSetting.setUpdateTime(new Date());
        if(usId==null||usId==0){
            usService.insert(userSetting);
        }else{
            usService.updateById(userSetting);
        }

        result.setMsg("成功");
        result.setCount(1);
        result.setCode(1);
        return result;
    }


}
