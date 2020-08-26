package com.howei.service;

import com.howei.pojo.Permission;
import com.howei.pojo.RolePermission;

import java.util.List;

public interface AuthorityService {

    List<Permission> getPermissionByparentId(String parentId);

    List<RolePermission> getRolePermissionByRoleId(String roleId);

    int changRolePermissionTypeByRoleId(String roleId);

    int addRolePermission(String roleId, String permissionId);

    int getCountRolePermission(String roleId, String permissionId);

    int changRolePermissionTypeByPermissionId(String roleId, String permissionId);
}
