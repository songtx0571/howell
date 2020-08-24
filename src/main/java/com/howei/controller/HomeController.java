package com.howei.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
    // 登录
    @RequestMapping("/")
    public String toLogin(){
        return "login";
    }
    // 综合
    @RequestMapping("/home")
    public String toHome(){
        return "home";
    }
    // 主页（动态区域）
    @RequestMapping("/index")
    public String toIndex(){
        return "index";
    }
    // 左菜单
    @RequestMapping("/leftMenu")
    public String toLeftMenu(){
        return "leftMenu";
    }
    // 角色管理
    @RequestMapping("/roleManagement")
    public String toRoleManagement(){
        return "roleManagement";
    }
    // 部门管理
    @RequestMapping("/departmentManagement")
    public String toDepartmentManagement(){
        return "departmentManagement";
    }
    // 账户管理
    @RequestMapping("/accountManagement")
    public String toAccountManagement(){
        return "accountManagement";
    }
    // 岗位管理
    @RequestMapping("/postManagement")
    public String toPostManagement(){
        return "postManagement";
    }
    // 通知管理
    @RequestMapping("/noticeManagement")
    public String toNoticeManagement(){
        return "noticeManagement";
    }

}
