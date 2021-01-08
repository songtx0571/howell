package com.howei.service;

import com.howei.pojo.ChatRecord;
import com.howei.pojo.Employee;
import com.howei.pojo.EmployeeGroup;
import com.howei.pojo.Group;

import java.util.List;
import java.util.Map;

public interface GroupService {

    List<Group> getGroupList(Map map);

    Group findByGroupName(String groupName);

    int addGroup(Group group);

    Group findByGroupNameAndId(String groupName, Integer id);

    int updGroup(Group group);

    void delGroup(String id);

    List<Employee> getGroupUsersList(Map map);

    int addGroupUsers(List<EmployeeGroup> list);

    int delGroupUser(String groupId,String employeeId);

    List<Employee> getEmpListByGroup(String groupName);

    Group getCreatedByGroup(String id);

    int saveMessage(ChatRecord chatRecord);

    List<ChatRecord> getChatRecord(Map map);

    List<ChatRecord> getUnReadList(Map map2);

    List<Group> getEmpInGroupList(String id);

    int updHistoryMessage(Map map);
}
