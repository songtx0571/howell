package com.howei.service.impl;

import com.howei.mapper.GroupMapper;
import com.howei.pojo.ChatRecord;
import com.howei.pojo.Employee;
import com.howei.pojo.EmployeeGroup;
import com.howei.pojo.Group;
import com.howei.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class GroupServiceImpl implements GroupService {

    @Autowired
    private GroupMapper groupMapper;

    @Override
    public List<Group> getGroupList(Map map) {
        return groupMapper.getGroupList(map);
    }

    @Override
    public Group findByGroupName(String groupName) {
        return groupMapper.findByGroupName(groupName);
    }

    @Override
    public int addGroup(Group group) {
        return groupMapper.addGroup(group);
    }

    @Override
    public Group findByGroupNameAndId(String groupName, Integer id) {
        return groupMapper.findByGroupNameAndId(groupName,id);
    }

    @Override
    public int updGroup(Group group) {
        return groupMapper.updGroup(group);
    }

    @Override
    public void delGroup(String id) {
        groupMapper.delGroup(id);
    }

    @Override
    public List<Employee> getGroupUsersList(Map map) {
        return groupMapper.getGroupUsersList(map);
    }

    @Override
    public int addGroupUsers(List<EmployeeGroup> list) {
        return groupMapper.addGroupUsers(list);
    }

    @Override
    public int delGroupUser(String groupId,String employeeId) {
        return groupMapper.delGroupUser(groupId,employeeId);
    }

    @Override
    public List<Employee> getEmpListByGroup(String groupName) {
        return groupMapper.getEmpListByGroup(groupName);
    }

    @Override
    public Group getCreatedByGroup(String id) {
        return groupMapper.getCreatedByGroup(id);
    }

    @Override
    public int saveMessage(ChatRecord chatRecord) {
        return groupMapper.saveMessage(chatRecord);
    }

    @Override
    public List<ChatRecord> getChatRecord(Map map) {
        return groupMapper.getChatRecord(map);
    }
}
