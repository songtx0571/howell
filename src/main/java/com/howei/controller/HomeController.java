package com.howei.controller;


import org.springframework.stereotype.Controller;

import com.alibaba.fastjson.JSON;

import com.alibaba.fastjson.JSONArray;
import com.howei.pojo.Menu;
import com.howei.pojo.Users;
import com.howei.service.MenuService;
import com.howei.service.UserService;
import com.howei.util.MD5;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class HomeController {

    @Autowired
    MenuService menuService;

    @Autowired
    UserService userService;

    @RequestMapping("/")
    public String toLogin(){
        return "login";
    }

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

    @RequestMapping("/login")
    public String index(HttpSession session, HttpServletRequest request){
        if(session.getAttribute("userId")!=null){
            return "home";
        }
        return "login";
    }

    @RequestMapping(value = "/loginPage")
    @ResponseBody
    public String loginadmin(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
        String userNumber = request.getParameter("userNumber").toUpperCase();
        String password = request.getParameter("password");
        MD5 md5=new MD5();
        Users users = null;
        try{
            password=md5.EncoderByMd5(password);
            users=userService.findUser(userNumber, password);
        }catch (Exception e){
            e.printStackTrace();
        }
        if (users!=null) {
            session.setAttribute("userId", users.getId());//编号
            session.setAttribute("companyId",users.getCompanyId());//所属公司
            session.setAttribute("departmentId",users.getDepartmentId());//部门
            session.setAttribute("postId",users.getPostId());//岗位
            //return "home";
            return JSON.toJSONString("home");
        } else {
            return JSON.toJSONString("");
            //return "login";
            //return "redirect:/login";
        }
    }

    @RequestMapping(value = "/getMenu",method={RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public String getMenuTree(HttpSession session, HttpServletRequest request, HttpServletResponse response){
        String parentId=request.getParameter("parent");
        Map map=new HashMap();
        map.put("parentId",parentId);
        List<Menu> result=menuService.getMenuTree(map);
        return JSON.toJSONString(result);
    }
}
