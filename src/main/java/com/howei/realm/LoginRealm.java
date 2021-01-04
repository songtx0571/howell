package com.howei.realm;

import com.howei.pojo.Authority;
import com.howei.pojo.Permission;
import com.howei.pojo.Role;
import com.howei.pojo.Users;
import com.howei.service.RoleService;
import com.howei.service.UserService;
import com.howei.util.MD5;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LoginRealm extends AuthorizingRealm {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    //授权
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        //获取登录用户名
        Users users=(Users) principalCollection.getPrimaryPrincipal();
        String userNumber= users.getUserNumber();
        //查询用户名称
        Users user= userService.getUserRolesByName(userNumber);
        //添加角色和权限
        SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();
        for (Role role:user.getRoles()) {
            //添加角色
            simpleAuthorizationInfo.addRole(role.getRoleName());
            Integer roleId=role.getId();
            List<Authority> list=roleService.getRoleAuthoritys(roleId+"");
            role.setAuthoritys(list);
            for (Authority p:role.getAuthoritys()) {
                //添加权限
                simpleAuthorizationInfo.addStringPermission(p.getName());
            }
        }
        return simpleAuthorizationInfo;
    }

    //认证
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        UsernamePasswordToken token=(UsernamePasswordToken)authenticationToken;
        String userNumber=token.getUsername();
        String password=String.copyValueOf(token.getPassword());
        if(userNumber!=null){
            Users user= userService.loginUserNumber(userNumber,password);
            if(user == null){
                throw new AuthenticationException("no_user");
            }
            return new SimpleAuthenticationInfo(user,user.getPassword(),getName());

        }
        return null;
    }
}
