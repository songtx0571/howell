package com.howei.controller;

import com.alibaba.fastjson.JSON;
import com.howei.pojo.Permission;
import com.howei.pojo.Role;
import com.howei.pojo.RolePermission;
import com.howei.service.AuthorityService;
import com.howei.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 角色
 */
@Controller
public class RoleController {

    @Autowired
    private RoleService roleService;

    @Autowired
    private AuthorityService authorityService;

    /**
     * 获取角色信息
     */
    @ResponseBody
    @RequestMapping("/getRole")
    /*List<Role> getRole() {
        return roleService.selectRole();
    }*/
    String getRole() {
        List<Role> list=roleService.selectRole();
        return JSON.toJSONString(list);
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
     * @param request
     * @return
     */
    @RequestMapping("/updateRole")
    @ResponseBody
    String updateRole(HttpServletRequest request){
        String roleName=request.getParameter("roleName");
        String roleId=request.getParameter("id");
        Role role=new Role();
        role.setId(Integer.parseInt(roleId));
        role.setRoleName(roleName);
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
     * @param request
     * @return
     */
    @RequestMapping("/addRole")
    @ResponseBody
    String addRole(HttpServletRequest request){
        String roleName=request.getParameter("roleName");
        Role role=new Role();
        role.setRoleName(roleName);
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

    /**
     * 根据父id查询权限
     * @param request
     * @return
     */
    @ResponseBody
    @RequestMapping("/getPermissionByparentId")
    /*public List<Permission> getPermissionByparentId(HttpServletRequest request) {
        String parentId=request.getParameter("parentId");
        return authorityService.getPermissionByparentId(parentId);
    }*/
    public String getPermissionByparentId(HttpServletRequest request) {
        String parentId=request.getParameter("parentId");
        List<Permission> list=authorityService.getPermissionByparentId(parentId);
        if(list!=null&&list.size()>0){
            return JSON.toJSONString(list);
        }else{
            return JSON.toJSONString("");
        }
    }

    /**
     *
     * @param request
     * @return
     */
    @ResponseBody
    @RequestMapping("/getRolePermissionByRoleId")
    public String getRolePermissionByRoleId(HttpServletRequest request){
        String roleId=request.getParameter("roleId");
        List<RolePermission> list=authorityService.getRolePermissionByRoleId(roleId);
        if(list!=null&&list.size()>0){
            return JSON.toJSONString(list);
        }else{
            return JSON.toJSONString("");
        }
    }

    /**
     * 修改角色权限
     * @param request
     * @return
     */
    @RequestMapping("/updateRolePermission")
    @ResponseBody
    public String updateRolePermission(HttpServletRequest request){
        String roleId=request.getParameter("roleId");
        String permissionIds=request.getParameter("permissionIds");
        authorityService.changRolePermissionTypeByRoleId(roleId);
        String[] PermissionId = permissionIds.split(",");
        for (String permissionId : PermissionId) {
            int num = authorityService.getCountRolePermission(roleId, permissionId);
            if (num == 0) {
                authorityService.addRolePermission(roleId, permissionId);
            } else {
                authorityService.changRolePermissionTypeByPermissionId(roleId, permissionId);
            }
        }
        return "success";
    }
}
