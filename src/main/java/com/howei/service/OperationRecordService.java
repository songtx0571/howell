package com.howei.service;

import com.howei.pojo.OperationRecord;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

public interface OperationRecordService {

    Integer insert(OperationRecord record);

    List<OperationRecord> getByReceiveIdAndIsRead(Integer receiveId, Integer isRead);

    int updateIsReadById(Integer id);

    OperationRecord getByExample(OperationRecord record);

    Integer getMaxId();

    int deleteByChildrenId(int employeeId);

    List<Integer> getReceiveUserIdsByAuthorityName(String type);
}
