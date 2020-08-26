package com.howei.service.impl;

import com.howei.mapper.RoleMapper;
import com.howei.pojo.Role;
import com.howei.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    RoleMapper roleMapper;

    @Override
    public List<Role> selectRole() {
        return roleMapper.selectRole();
    }

    @Override
    public Role getRoleById(String id) {
        return roleMapper.getRoleById(id);
    }

    @Override
    public int updateRole(Role role) {
        return roleMapper.updateRole(role);
    }

    @Override
    public int addRole(Role role) {
        return roleMapper.addRole(role);
    }

    @Override
    public void deleteRole(String roleId) {
        roleMapper.deleteRole(roleId);
    }
}
