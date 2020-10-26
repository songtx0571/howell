package com.howei.mapper;

import com.howei.pojo.UserInform;
import org.springframework.stereotype.Component;

@Component
public interface UserInformMapper {

    int addUserInform(UserInform userInform);
}
