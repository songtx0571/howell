package com.howei.service.impl;

import com.howei.mapper.UsersMapper;
import com.howei.pojo.Inform;
import com.howei.pojo.Users;
import com.howei.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UsersMapper usersMapper;

    @Override
    public Users findUser(String userNumber, String password) {
        return usersMapper.findUser(userNumber,password);
    }

    @Override
    public List<Users> getUserList(Map map) {
        return usersMapper.getUserList(map);
    }

    @Override
    public List<Users> getUserByParam(Users users) {
        return usersMapper.getUserByParam(users);
    }

    @Override
    public Users getUserById(String userId) {
        return usersMapper.getUserById(userId);
    }

    @Override
    public int addUser(Users user) {
        return usersMapper.addUser(user);
    }

    @Override
    public int updateUser(Users users) {
        return usersMapper.updateUser(users);
    }

    @Override
    public Map<Integer, String> getUsersMap() {
        List<Users> list=usersMapper.getUsersMap();
        Map<Integer,String> map=new HashMap<>();
        for (Users users:list) {
            map.put(users.getId(),users.getUserName());
        }
        return map;
    }

    @Override
    public List<Map<String, String>> getUsersList(Map m) {
        List<Users> list=usersMapper.getUsersList(m);
        List<Map<String, String>> result=new ArrayList<>();
        if(list!=null){
            for (Users users:list) {
                Map<String,String> map=new HashMap<>();
                map.put("id",users.getId()+"");
                map.put("name",users.getUserName());
                result.add(map);
            }
        }
        return result;
    }

    @Override
    public List<Map> selSeen(String informId) {
        return usersMapper.selSeen(informId);
    }

    @Override
    public String selSeenUser(String name) {
        return usersMapper.selSeenUser(name);
    }
}
