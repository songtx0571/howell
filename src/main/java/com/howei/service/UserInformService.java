package com.howei.service;

import com.howei.pojo.UserInform;

public interface UserInformService {

    int addUserInform(UserInform userInform);

    int updateRdStatusByInformId(String id);
}
