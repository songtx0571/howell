package com.howei.controller;

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.howei.config.redis.MyRedisManager;
import com.howei.realm.LoginRealm;
import com.howei.util.MD5;
import com.howei.util.MenuTree;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;

import com.alibaba.fastjson.JSON;

import com.howei.pojo.Menu;
import com.howei.pojo.Users;
import com.howei.service.MenuService;
import com.howei.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.*;

import static org.apache.shiro.authz.annotation.Logical.OR;

@Controller
@CrossOrigin(origins = {"http://192.168.1.27:8080", "http:localhost:8080", "http://192.168.1.27:8848"}, allowCredentials = "true")
public class HomeController {

    @Autowired
    MenuService menuService;

    @Autowired
    UserService userService;

    /*存入session里的用户名称*/
    public static final String SESSION_USER = "sessionUser";
    public ObjectMapper jsonTranster = new ObjectMapper();


    // 左菜单
    @RequestMapping("/leftMenu")
    public String toLeftMenu() {
        return "leftMenu";
    }

    @RequestMapping("/index")
    public String toIndex() {
        return "index";
    }

    @RequestMapping("/log")
    @ResponseBody
    public String log() {
        return "您没有权限访问";
    }

    // 信息
    @RequestMapping("/homePopup")
    public String toHomePopup() {
        return "homePopup";
    }

    // 角色管理
    @RequiresPermissions(value = {"角色管理"}, logical = OR)
    @RequestMapping("/roleManagement")
    public String toRoleManagement() {
        return "roleManagement";
    }

    // 部门管理
    @RequiresPermissions(value = {"部门管理"}, logical = OR)
    @RequestMapping("/departmentManagement")
    public String toDepartmentManagement() {
        return "departmentManagement";
    }

    // 账户管理
    @RequestMapping("/accountManagement")
    public String toAccountManagement() {
        return "accountManagement";
    }

    // 岗位管理
    @RequiresPermissions(value = {"岗位管理"}, logical = OR)
    @RequestMapping("/postManagement")
    public String toPostManagement() {
        return "postManagement";
    }

    // 通知管理
    @RequiresPermissions(value = {"通知管理"}, logical = OR)
    @RequestMapping("/noticeManagement")
    public String toNoticeManagement() {
        return "noticeManagement";
    }

    // 权限管理
    @RequestMapping("/authorityManagement")
    public String toAuthorityManagement() {
        return "authorityManagement";
    }

    // 通讯管理
    @RequestMapping("/messageManagement")
    public String toMessageManagement() {
        return "messageManagement";
    }

    // 群组管理
    @RequestMapping("/groupManagement")
    public String toGroupManagement() {
        return "groupManagement";
    }

    // LayIM部门管理
    @RequestMapping("/LayIMManagement")
    public String toLayIMManagement() {
        return "LayIMManagement";
    }

    // 版本管理
    @RequestMapping("/versionManagement")
    public String toVersionManagement() {
        return "versionManagement";
    }

    // 菜单管理
    @RequestMapping("/menuManagement")
    public String toMenuManagement() {
        return "menuManagement";
    }

    /**
     *
     * @return  动态区域管理
     */
    @GetMapping("/dynamicRegion")
    public String toOperationPaget() {
        return "dynamicRegion";
    }

    @RequestMapping("/")
    public String index(HttpSession session) {
        if (session.getAttribute("userId") != null) {
            return "home";
        }
        return "login";
    }

    @RequestMapping("/login")
    public String login(HttpSession session) {
        if (session.getAttribute("userId") != null) {
            return "home";
        }
        return "login";
    }

    /**
     * 系统登出
     *
     * @return
     */
    @RequestMapping("/logout")
    public String logOut(HttpServletResponse response) {
        Subject subject = SecurityUtils.getSubject();
        PrincipalCollection principalCollection=(PrincipalCollection)subject.getPrincipal();
        response.setStatus(302);
        if (subject.isAuthenticated()) {
            subject.logout();
            return "login";
        }
        LoginRealm loginRealm=new LoginRealm();
        loginRealm.clearCache(principalCollection);
        loginRealm.clearCachedAuthenticationInfo(principalCollection);
        loginRealm.clearCachedAuthorizationInfo(principalCollection);
        subject.logout();
        return "login";
    }

    /**
     * 登录页面
     * @return
     */
    @GetMapping(value = "/loginPage")
    public ModelAndView loginPage() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("login");
        return modelAndView;
    }

    /**
     * 登录
     *
     * @param request
     * @return
     */
    @PostMapping(value = "/loginPage")
    public ModelAndView loginadmin(HttpServletRequest request) {
        String username = request.getParameter("userNumber").toUpperCase();
        String password = request.getParameter("password");
        MD5 md5 = new MD5();
        try {
            password = md5.EncoderByMd5(password);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        //储存用户名与密码
        UsernamePasswordToken token = new UsernamePasswordToken(username, password);
        Subject subject = SecurityUtils.getSubject();
        ModelAndView mode = new ModelAndView();
        try {
            subject.login(token);
        } catch (Exception e) {
            e.printStackTrace();
            if ("no_user".equals(e.getMessage())) {
                mode.setViewName("login");
                mode.addObject("no_user", "账号不存在");
                return mode;
            } else if ("no_permission".equals(e.getMessage())) {
                mode.setViewName("login");
                mode.addObject("no_permission", "密码错误");
                return mode;
            } else if ("no_status".equals(e.getMessage())) {
                mode.addObject("no_status", "账号已过期");

                mode.setViewName("login");
                return mode;
            }
        }
        Users user = userService.loginUserNumber(username, password);
        //token
        Serializable id = subject.getSession().getId();
        //将token放入redis
        MyRedisManager manager = MyRedisManager.getRedisSingleton();
        manager.setHost("localhost");
        manager.setPort(6379);
        manager.setTimeout(1800);
        manager.setPassword("12345");
        manager.init();
        manager.set(id.toString(),user.getId().toString(),60*30);//半小时
        //防止同一个账号同时登录
        manager.set(user.getId().toString(), id.toString(),60*30);
        //用户信息
        manager.set(user.getId().toString(), JSONObject.toJSONString(user),60*30);
        long timeout = SecurityUtils.getSubject().getSession().getTimeout();
        System.out.println("设置前:"+timeout+"毫秒");
        //SecurityUtils.getSubject().getSession().setTimeout(10000);
        timeout = SecurityUtils.getSubject().getSession().getTimeout();
        System.out.println("设置后:"+timeout+"毫秒");
        mode.setViewName("home");
        return mode;
    }

    @RequestMapping("/getMenuTree")
    @ResponseBody
    public String getMenuTree(HttpServletRequest request) {
        String rootMenuId = request.getParameter("rootMenuId");
        Subject subject = SecurityUtils.getSubject();
        Map map = new HashMap();
        if (rootMenuId != null && rootMenuId.equals("25")) {//WA项目
            map.put("template", "2");
        } else if (rootMenuId != null && rootMenuId.equals("23")) {//Guide项目
            map.put("template", "1");
        } else if (rootMenuId != null && rootMenuId.equals("24")) {//AI项目
            map.put("template", "3");
        } else if (rootMenuId != null && rootMenuId.equals("26")) {//Exam项目
            map.put("template", "5");
        } else if (rootMenuId != null && rootMenuId.equals("27")) {//defect项目
            map.put("template", "6");
        } else if (rootMenuId != null && rootMenuId.equals("27")) {//Exam项目
            map.put("template", "6");
        }
        map.put("parent", 0);
        List<Menu> rootMenuList = menuService.getMenuTree(map);
        Iterator<Menu> iterator = rootMenuList.iterator();
        while (iterator.hasNext()) {
            Menu menu = iterator.next();
            if (!subject.isPermitted(menu.getName())) {
                iterator.remove();
            }
        }

        List<Menu> resultList = new ArrayList<>();
        for (Menu menu : rootMenuList) {
            Integer id = menu.getId();
            map.put("parent", id);
            List<Menu> menuList = menuService.getMenuTree(map);
            if (menuList != null && menuList.size() > 0) {
                iterator = menuList.iterator();
                while (iterator.hasNext()) {
                    Menu menu1 = iterator.next();
                    if (!subject.isPermitted(menu1.getName())) {
                        iterator.remove();
                    }
                }
                menu.setChildren(getMenuTree(id, menuList));
                resultList.add(menu);
            }
        }
       /* for (Menu menu : rootMenuList) {
            Integer id = menu.getId();
            map.put("parent", id);
            List<Menu> menuList = menuService.getMenuTree(map);
            if (menuList != null && menuList.size() > 0) {
                iterator = menuList.iterator();
                while (iterator.hasNext()) {
                    Menu menu1 = iterator.next();
                    if (!subject.isPermitted(menu1.getName())) {
                        iterator.remove();
                    }
                }
                MenuTree menuTree = new MenuTree();
                menuTree.setId(String.valueOf(menu.getId()));
                menuTree.setText(menu.getName());
                menuTree.setpId(String.valueOf(menu.getParent()));
                menuTree.setUrl(menu.getUrl());
                menuTree.setChildren(getMenuTree(id, menuList));
                resultList.add(menuTree);
            }
        }*/
        String json = JSON.toJSONString(resultList);
        return json;
    }

    /**
     * 获取菜单列表
     *
     * @return
     */
    public List<Menu> getMenuTree(Integer id, List<Menu> menuList) {
        List<Menu> list = new ArrayList<>();
        for (Menu menu : menuList) {
            if (menu.getParent() == id) {
                list.add(menu);
            }
        }
        return list;
    }

    @RequestMapping(value = "/getLoginInf")
    @ResponseBody
    public String getLoginInf() {
        Subject subject = SecurityUtils.getSubject();
        Users users = (Users) subject.getPrincipal();
        Integer userId = users.getId();
        return JSON.toJSONString(userId);
    }

    @RequestMapping(value="/getUserInfo")
    @ResponseBody
    public String getUserInfo(){
        Subject subject=SecurityUtils.getSubject();
        Users users=(Users) subject.getPrincipal();
        Integer employeeId=users.getEmployeeId();
        return JSON.toJSONString(employeeId);
    }

    /**
     * 获取当前登录人信息
     * @return
     */
    @RequestMapping("/getLoginUserInfo")
    @ResponseBody
    public Map getLoginUserInfo(){
        Subject subject=SecurityUtils.getSubject();
        Users users=(Users) subject.getPrincipal();
        Map<String,Object> map=new HashMap<>();
        if(users!=null){
            map.put("id",users.getEmployeeId());
            map.put("userName",users.getUserName());
            map.put("userNumber",users.getUserNumber());
            map.put("departmentId",users.getDepartmentId());
        }
        return map;
    }

}
