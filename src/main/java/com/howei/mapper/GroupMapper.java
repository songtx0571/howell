package com.howei.mapper;

import com.howei.pojo.ChatRecord;
import com.howei.pojo.Employee;
import com.howei.pojo.EmployeeGroup;
import com.howei.pojo.Group;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface GroupMapper {

    List<Group> getGroupList(Map map);

    Group findByGroupName(@Param("groupName") String groupName);

    int addGroup(Group group);

    Group findByGroupNameAndId(@Param("groupName")String groupName,@Param("id") Integer id);

    int updGroup(Group group);

    void delGroup(String id);

    List<Employee> getGroupUsersList(Map map);

    int addGroupUsers(List<EmployeeGroup> list);

    int delGroupUser(@Param("groupId") String groupId,@Param("employeeId") String employeeId);

    List<Employee> getEmpListByGroup(@Param("groupName") String groupName);

    Group getCreatedByGroup(@Param("id") String id);

    int saveMessage(ChatRecord chatRecord);

    List<ChatRecord> getChatRecord(Map map);
}
