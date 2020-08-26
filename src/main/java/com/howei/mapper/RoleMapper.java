package com.howei.mapper;

import com.howei.pojo.Role;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface RoleMapper {
    List<Role> selectRole();

    Role getRoleById(String id);

    int updateRole(Role role);

    int addRole(Role role);

    void deleteRole(String roleId);
}
