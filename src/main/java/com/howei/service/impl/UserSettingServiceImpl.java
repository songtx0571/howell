package com.howei.service.impl;

import com.howei.mapper.UserSettingMapper;
import com.howei.pojo.UserSetting;
import com.howei.service.UserSettingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author jayun
 *
 */
@Service
public class UserSettingServiceImpl implements UserSettingService {
    @Autowired
    private UserSettingMapper mapper;
    @Override
    public UserSetting getByEmployeeId(Integer employeeId) {
        return mapper.getByEmployeeId(employeeId);
    }

    @Override
    public int updateById(UserSetting userSetting) {
        return mapper.updateById(userSetting);
    }

    @Override
    public int insert(UserSetting record) {
        return mapper.insert(record);
    }
}
