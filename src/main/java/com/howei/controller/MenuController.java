package com.howei.controller;

import com.alibaba.fastjson.JSON;
import com.howei.pojo.Inform;
import com.howei.pojo.Menu;
import com.howei.pojo.Users;
import com.howei.service.MenuService;
import com.howei.util.Result;
import com.howei.util.Type;
import com.mysql.cj.exceptions.MysqlErrorNumbers;
import org.apache.catalina.User;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * 菜单管理
 */
@RestController
@RequestMapping("/menu")
public class MenuController {

    @Autowired
    MenuService menuService;

    public Users getPrincipal() {
        Subject subject = SecurityUtils.getSubject();
        Users users = (Users) subject.getPrincipal();
        return users;
    }

    /**
     * --------------------------首页上部菜单加载--------------------------
     */

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

    /** -----------------------------菜单管理-----------------------------*/

    @RequestMapping("getMenuList")
    public Result getMenuList(Integer template) {
        //判断用户是否过期
        Users users = this.getPrincipal();
        if (users == null) {
            return new Result(0, null, 0, JSON.toJSONString(Type.noUser));
        }
        Map map = new HashMap();
        if (template != null && template==23) {//Guide项目
            map.put("template", "1");
        } else if (template != null && template==24) {//AI项目
            map.put("template", "3");
        } else if (template != null && template==25) {//WA项目
            map.put("template", "2");
        } else if (template != null && template==26) {//Exam项目
            map.put("template", "5");
        }
        map.put("parent", 0);
        List<Menu> rootMenuList = menuService.getMenuTree(map);
        /*List<Menu> resultList = new ArrayList<>();
        for (Menu menu : rootMenuList) {
            Integer id = menu.getId();
            map.put("parent", id);
            List<Menu> menuList = menuService.getMenuTree(map);
            if (menuList != null && menuList.size() > 0) {
                menu.setChildren(getMenuTree(id, menuList));
                resultList.add(menu);
            }
        }*/
        return new Result(rootMenuList.size(),rootMenuList,0,"success");
    }

    /**
     * 添加菜单
     * @param menu
     * @return wrongParameter 参数有误
     * @return havaRecord 存在同名
     * @return success 成功
     */
    @RequestMapping("addMenu")
    public String addMenu(@RequestBody Menu menu){
        if(menu!=null){
            String name=menu.getName();
            Integer template=menu.getTemplate();
            if(name==null||name.equals("")||template==null||template.equals("")){
                return JSON.toJSONString(Type.wrongParameter);//参数有误
            }
            //判断同名
            Menu menu1=menuService.findMenu(name,template);
            if(menu1!=null){
                return JSON.toJSONString(Type.havaRecord);//存在同名，返回结果
            }
            menu.setActive("true");
            menuService.addMenu(menu);
            return JSON.toJSONString(Type.success);//成功
        }
        return JSON.toJSONString(Type.wrongParameter);
    }


    public String updMenu(Menu menu){
        if(menu!=null){
            String name=menu.getName();
            Integer template=menu.getTemplate();
            if(name==null||name.equals("")||template==null||template.equals("")){
                return JSON.toJSONString(Type.wrongParameter);//参数有误
            }
            //判断同名
            menu.setActive("true");
            menuService.addMenu(menu);
            return JSON.toJSONString(Type.success);//成功
        }
        return JSON.toJSONString(Type.wrongParameter);
    }


    @RequestMapping("updPriority")
    public String updPriority(Integer id,Integer template){
        if(id==null||template==null){
            return JSON.toJSONString(Type.wrongParameter);//参数有误
        }
        int priority=0;
        //获取此菜单优先级
        Menu menu=menuService.getMenuById(id);
        if(menu!=null){
            priority=menu.getPriority();
            //不可操作
            if(priority==1){
                return JSON.toJSONString(Type.notOperational);
            }
            //获取同级菜单
            List<Menu> list=menuService.getMenuChild(template);
            if(list!=null){
                for (Menu menu1:list) {
                    //修改上一个优先级
                    if (menu1.getPriority()+1==priority) {
                        menu1.setPriority(menu1.getPriority()+1);
                        menuService.updMenu(menu1);
                    }
                }
            }
            menu.setPriority(priority-1);
            menuService.updMenu(menu);
            return JSON.toJSONString(Type.success);
        }else{
            return JSON.toJSONString(Type.noRecord);//记录不存在
        }
    }

    /** ------------------------------获取下拉框-----------------------------------*/

    @RequestMapping("getMenuMap")
    public List<Map<String, Object>> getMenuMap(Integer template,Integer parent) {
        Map map=new HashMap();
        map.put("template",template);
        map.put("parent",parent);
        List<Map<String, Object>> list = menuService.getMenuMap(map);
        return list;
    }

}
