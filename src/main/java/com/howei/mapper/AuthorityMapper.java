package com.howei.mapper;

import com.howei.pojo.Permission;
import com.howei.pojo.RolePermission;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface AuthorityMapper {
    List<Permission> getPermissionByparentId(String parentId);

    List<RolePermission> getRolePermissionByRoleId(String roleId);

    int changRolePermissionTypeByRoleId(@Param("roleId") String roleId);

    int getCountRolePermission(@Param("roleId") String roleId, @Param("permissionId") String permissionId);

    int addRolePermission(@Param("roleId") String roleId, @Param("permissionId") String permissionId);

    int changRolePermissionTypeByPermissionId(@Param("roleId") String roleId, @Param("permissionId") String permissionId);
}
