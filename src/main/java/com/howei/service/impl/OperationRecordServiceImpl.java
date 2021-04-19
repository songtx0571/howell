package com.howei.service.impl;

import com.howei.mapper.OperationRecordMapper;
import com.howei.pojo.OperationRecord;
import com.howei.service.OperationRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class OperationRecordServiceImpl implements OperationRecordService {


    @Autowired
    private OperationRecordMapper orMapper;


    @Override
    public Integer insert(OperationRecord record) {
       return  orMapper.insert(record);
    }

    @Override
    public List<OperationRecord> getByReceiveIdAndIsRead(Integer receiveId, Integer isRead) {

        return orMapper.getByRecordByReceiveId(receiveId,isRead);

    }

    @Override
    public int updateIsReadById(Integer id) {
        return orMapper.updateIsReadById(id);
    }

    @Override
    public OperationRecord getByExample(OperationRecord record) {
        return orMapper.getByExample(record);
    }

    @Override
    public Integer getMaxId() {
        return orMapper.getMaxId();
    }

    @Override
    public int deleteByChildrenId(int employeeId) {
        return orMapper.deleteByChildrenId(employeeId);
    }

    @Override
    public List<Integer> getReceiveUserIdsByAuthorityNameAndSendId(String type, Integer sendId) {

        return orMapper.getReceiveUserIdsByAuthorityNameAndSendId( type,  sendId);
    }

    @Override
    public int updateIsReadByConfirmTime(String confirmTime) {
        return orMapper.updateIsReadByConfirmTime(confirmTime);
    }

    @Override
    public Map<String, Object> getUserSettingByEmployeeId(Integer employeeId) {
        return orMapper.getUserSettingByEmployeeId(employeeId);
    }

    @Override
    public List<OperationRecord> getByMap(Map<String, Object> map) {
        return orMapper.getByMap(map);
    }

}
