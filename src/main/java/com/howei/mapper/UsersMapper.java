package com.howei.mapper;

import com.howei.pojo.Users;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface UsersMapper {

    /**
     * 登陆验证
     * @param userNumber
     * @param password
     * @return
     */
    Users findUser(@Param("userNumber") String userNumber, @Param("password") String password);

    List<Users> getUserList(Map map);

    List<Users> getUserByParam(Users users);

    Users getUserById(String userId);

    int addUser(Users user);

    int updateUser(Users users);

    List<Users> getUsersMap();

    List<Users> getUsersList(Map map);

    List<Map> selSeen(String informId);

    String selSeenUser(@Param("userId") String userId);
}
