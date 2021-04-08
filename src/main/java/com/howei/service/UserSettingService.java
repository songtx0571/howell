package com.howei.service;

import com.howei.pojo.UserSetting;

public interface UserSettingService {
    UserSetting getByEmployeeId(Integer employeeId);

    int updateById(UserSetting userSetting);

    int insert(UserSetting record);
}
