package com.howei.mapper;

import com.howei.pojo.UserInform;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

@Component
public interface UserInformMapper {

    int addUserInform(UserInform userInform);

    int updateRdStatusByInformId(@Param("informId") String informId);
}
