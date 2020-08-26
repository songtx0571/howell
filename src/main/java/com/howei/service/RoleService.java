package com.howei.service;

import com.howei.pojo.Role;

import java.util.List;
import java.util.Map;

public interface RoleService {
     List<Role> selectRole();

    Role getRoleById(String id);

    int updateRole(Role role);

    int addRole(Role role);

    void deleteRole(String roleId);
}
