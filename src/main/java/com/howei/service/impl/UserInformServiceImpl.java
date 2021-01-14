package com.howei.service.impl;

import com.howei.mapper.UserInformMapper;
import com.howei.pojo.UserInform;
import com.howei.service.UserInformService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserInformServiceImpl implements UserInformService {

    @Autowired
    private UserInformMapper userInformMapper;

    @Override
    public int addUserInform(UserInform userInform) {
        return userInformMapper.addUserInform(userInform);
    }

    @Override
    public int updateRdStatusByInformId(String id) {
        return userInformMapper.updateRdStatusByInformId(id);

    }
}
