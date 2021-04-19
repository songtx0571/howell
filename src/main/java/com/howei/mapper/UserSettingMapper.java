package com.howei.mapper;

import com.howei.pojo.UserSetting;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSettingMapper {
    UserSetting getByEmployeeId(@Param("employeeId") Integer employeeId);

    int updateById(@Param("record") UserSetting record);

    int insert(@Param("record") UserSetting record);
}
