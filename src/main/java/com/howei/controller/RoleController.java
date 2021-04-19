package com.howei.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.howei.pojo.*;
import com.howei.service.AuthorityService;
import com.howei.service.CompanyService;
import com.howei.service.RoleService;
import com.howei.util.DateFormat;
import com.howei.util.LayuiTree;
import com.howei.util.Result;
import com.howei.util.Type;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

import static org.apache.shiro.authz.annotation.Logical.OR;

/**
 * 角色
 */
@Controller
@CrossOrigin(origins={"http://192.168.1.27:8080","http:localhost:8080"},allowCredentials = "true")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @Autowired
    private AuthorityService authorityService;

    @Autowired
    private CompanyService companyService;

    private boolean bool=false;

    /**
     * 获取角色信息
     */
    @ResponseBody
    @RequestMapping("/getRole")
    String getRole() {
        List<Role> list=roleService.selectRole();
        return JSON.toJSONString(list);
    }

    @RequestMapping("/getDepartmentMap")
    @ResponseBody
    public String getDepartmentMap(){
        Subject subject=SecurityUtils.getSubject();
        Users users=(Users)subject.getPrincipal();
        if(users!=null){
            List<Map<String,String>> list=companyService.getDepartmentMap(users.getCompanyId());
            if(list!=null&&list.size()>0){
                return JSON.toJSONString(list);
            }
        }else{
            List<Map<String,String>> list=companyService.getDepartmentMap(1);
            if(list!=null&&list.size()>0){
                return JSON.toJSONString(list);
            }
            JSON.toJSONString(Type.INVALID);//登录过期
        }
        return JSON.toJSONString(Type.CANCEL);
    }

    /**
     * 根据角色id查询
     * @param request
     * @return
     */
    @RequestMapping("/getRoleById")
    @ResponseBody
    String getRoleById(HttpServletRequest request){
        String id=request.getParameter("id");
        Role role=roleService.getRoleById(id);
        return JSON.toJSONString(role);
    }

    /**
     * 修改角色
     * @param role
     * @return
     */
    @RequiresPermissions(value = {"更新角色"},logical = OR)
    @RequestMapping(value = "/updateRole",method = {RequestMethod.POST})
    @ResponseBody
    String updateRole(@RequestBody Role role){
        int count=roleService.updateRole(role);
        String result="";
        if(count>0){
            result="success";
        }else{
            result="error";
        }
        return JSON.toJSONString(result);
    }

    /**
     * 添加角色
     * @param role
     * @return success/error
     */
    @RequiresPermissions(value = {"添加角色"},logical = OR)
    @RequestMapping(value = "/addRole",method = {RequestMethod.POST})
    @ResponseBody
    String addRole(@RequestBody Role role){
        int count=roleService.addRole(role);
        String result="";
        if(count>0){
            result="success";
        }else{
            result="error";
        }
        return JSON.toJSONString(result);
    }

    /**
     * 删除角色
     * @param request
     * @return
     */
    @RequiresPermissions(value = {"移除角色"},logical = OR)
    @RequestMapping("/deleteRole")
    @ResponseBody
    String deleteRole(HttpServletRequest request){
        String roleId=request.getParameter("id");
        roleService.deleteRole(roleId);
        Role role=roleService.getRoleById(roleId);
        String result="";
        if(role==null){
            result="success";
        }else{
            result="error";
        }
        return JSON.toJSONString(result);
    }

    /**------------------------------------------角色权限分配------------------------------------*/

    /**
     * 获取角色权限列表
     * @return
     */
    //@RequiresPermissions(value = {"查看角色所有权限"},logical = OR)
    @RequestMapping("/getRoleAuthorityList")
    @ResponseBody
    public String getRoleAuthorityList(){
        Map map=new HashMap();
        List<Role> list=roleService.getRoleAuthorityList(map);
        Result result=new Result();
        result.setCode(0);
        result.setData(list);
        result.setCount(list.size());
        return JSON.toJSONString(result);
    }

    /**
     * 搜索权限路径下拉框
     * @return
     */
    @RequestMapping("/getAuthorityMap")
    @ResponseBody
    public String getAuthorityMap(HttpServletRequest request){
        String id=request.getParameter("id");
        Map map1=new HashMap();
        if(id!=null&&!id.equals("")){
            map1.put("id",id);
        }
        List<Map<String,String>> map=roleService.getAuthorityMap(map1);
        return  JSON.toJSONString(map);
    }

    /**
     * 权限下拉框
     * @return
     */
    //@RequiresPermissions(value = {"查看角色所拥有的权限"},logical = OR)
    @RequestMapping("/getAuthorityURLMap")
    @ResponseBody
    public String testQueryMenuList(HttpServletRequest request) {
        String roleId=request.getParameter("id");
        List<LayuiTree> rootMenu = roleService.getURLList("");
        List<LayuiTree> menuList = new ArrayList<>();
        for (int i = 0; i < rootMenu.size(); i++) {
            LayuiTree layuiTree=rootMenu.get(i);
            List<Map<String,String>> listMap=new ArrayList<>();
            Map<String,String> map=new HashMap<>();
            map.put("checked","0");
            map.put("type","0");
            listMap.add(map);
            layuiTree.setCheckArr(listMap);
            if (layuiTree.getParentId()==-1) {
                menuList.add(layuiTree);
            }
        }
        List<Authority> authorities=roleService.getAuthIdByRoleId(roleId);
        for (LayuiTree layuiTree : menuList) {
            layuiTree.setChildren(getChild(layuiTree.getId()+"", rootMenu,authorities));
            if(bool){
                List<Map<String,String>> listMap=new ArrayList<>();
                Map<String,String> map=new HashMap<>();
                map.put("checked","1");
                map.put("type","0");
                listMap.add(map);
                layuiTree.setCheckArr(listMap);
            }
            bool=false;
        }
        return JSON.toJSONString(menuList);
    }

    private List<LayuiTree> getChild(String id, List<LayuiTree> rootMenu,List<Authority> authorities) {
        List<LayuiTree> childList = new ArrayList<>();
        for (LayuiTree layuiTree : rootMenu) {
            if (layuiTree.getParentId()!=-1) {
                if ((layuiTree.getParentId()+"").equals(id)) {
                    List<Map<String, String>> listMap = new ArrayList<>();
                    Map<String, String> map = new HashMap<>();
                    map.put("checked", "0");
                    map.put("type", "0");
                    listMap.add(map);
                    layuiTree.setCheckArr(listMap);
                }
            }
        }
        for (LayuiTree layuiTree : rootMenu) {
            if (layuiTree.getParentId()!=-1) {
                if ((layuiTree.getParentId()+"").equals(id)) {
                    for(Authority authority:authorities){
                        if(layuiTree.getId().equals(authority.getId())){
                            List<Map<String,String>> listMap=new ArrayList<>();
                            Map<String,String> map=new HashMap<>();
                            map.put("checked","1");
                            map.put("type","0");
                            listMap.add(map);
                            layuiTree.setCheckArr(listMap);
                            bool=true;
                        }
                    }
                    childList.add(layuiTree);
                }
            }
        }
        for (LayuiTree layuiTree : childList) {
            layuiTree.setChildren(getChild(layuiTree.getId()+"", rootMenu,authorities));
        }
        if (childList.size() == 0) {
            return null;
        }
        return childList;
    }

    /**
     * 为角色分配权限
     * @return
     */
    @RequestMapping(value = "/distributeRoleAuthority")
    @ResponseBody
    public String distributeRoleAuthority(@RequestParam("roleId") Integer roleId,@RequestParam("authoritys")String authoritys){
        System.out.println("权限开始: "+DateFormat.getYMDHMS(new Date()));
        Subject subject=SecurityUtils.getSubject();
        Users user=(Users)subject.getPrincipal();
        if(user==null){
            return JSON.toJSONString(Type.noUser);//用户信息过期
        }
        if(roleId==null||roleId==-1){
            return JSON.toJSONString(Type.ERROR);//信息传递错误
        }
        //根据roleId获取权限集合
        List<Authority> authorityPojo=roleService.getAuthIdByRoleId(roleId.toString());
        List<Integer> authorityBe=new ArrayList<>();
        for(Authority authority1:authorityPojo){
            authorityBe.add(authority1.getId());
        }
        //将前台传入权限信息转换为List
        JSONArray authorityArr=JSON.parseArray(authoritys);
        List<Integer> authorityAf=authorityArr.toJavaList(Integer.class);
        //将List转换为Set集合
        Set<Integer> set1=new HashSet<>(authorityAf);
        Set<Integer> set2=new HashSet<>(authorityBe);
        //获取像个集合不同的元素
        Set<Integer> result1=compare1(set1, set2);
        //获取两个集合新增的元素: 新增的权限
        Set<Integer> result2=compare2(set1,result1);
        //获取两个集合删减的元素: 删减的权限
        Set<Integer> result3=compare3(set2,result1);
        List delList=new ArrayList(result3);
        List addList=new ArrayList(result2);
        //删除权限
        Integer[] authorityIds=new Integer[delList.size()];
        for (int i=0;i<delList.size();i++){
            Integer authorityId=(Integer)delList.get(i);
            authorityIds[i]=authorityId;
        }
        if(delList!=null&&delList.size()>0){
            roleService.delRoleAuthoritys(roleId,authorityIds);
        }
        //新增权限
        List<RoleAuthority> listRoleAuthority=new ArrayList<>();
        for (int i = 0; i < addList.size(); i++) {
            RoleAuthority roleAuthority=new RoleAuthority();
            roleAuthority.setRoleId(Integer.parseInt(roleId.toString()));
            roleAuthority.setCreated(DateFormat.getYMDHMS(new Date()));
            roleAuthority.setCreatedBy(user.getId());
            Integer authorityId = (Integer) addList.get(i);
            roleAuthority.setAuthorityId(authorityId);
            listRoleAuthority.add(roleAuthority);
        }
        if(listRoleAuthority!=null&&listRoleAuthority.size()>0){
            roleService.addRoleAuthority(listRoleAuthority);
        }
        System.out.println("权限结束: "+DateFormat.getYMDHMS(new Date()));
        return JSON.toJSONString(Type.SUCCESS);
    }

    public static Set<Integer> compare1(Set<Integer> set1,Set<Integer> set2) {
        Set<Integer> set3 = new HashSet<>(set2);
        Set<Integer> set4 = new HashSet<>(set1);
        set3.addAll(set4);
        set4.retainAll(set2);
        set3.removeAll(set4);
        return set3;
    }

    //set3与set1比较，获取交集：即新增的权限
    public static Set<Integer> compare2(Set<Integer> set1,Set<Integer> set2){
        Set<Integer> set3 = new HashSet<>(set2);
        set3.retainAll(set1);
        return set3;
    }

    //set3与set2比较，获取交集：即删减的权限
    public static Set<Integer> compare3(Set<Integer> set2,Set<Integer> set1) {
        Set<Integer> set3 = new HashSet<>(set1);
        set3.retainAll(set2);
        return set3;
    }

    /**
     * 获取此角色所有的权限
     * @param request
     * @return
     */
    @RequestMapping("/getRoleAuthoritys")
    @ResponseBody
    public String getRoleAuthoritys(HttpServletRequest request){
        String roleId=request.getParameter("roleId");
        List<Authority> list=null;
        if(roleId!=null&&!roleId.equals("")){
            list=roleService.getRoleAuthoritys(roleId);
        }
        return JSON.toJSONString(list);
    }

    public boolean isBool() {
        return bool;
    }

    public void setBool(boolean bool) {
        this.bool = bool;
    }
}
