package com.howei.mapper;

import com.howei.pojo.OperationRecord;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface OperationRecordMapper {

    int insert(@Param("record") OperationRecord record);

    List<OperationRecord> getByRecordByReceiveId(@Param("receiveId") Integer receiveId, @Param("isRead") Integer isRead);

    int updateIsReadById(@Param("id") Integer id);

    OperationRecord getByExample(@Param("record") OperationRecord record);

    Integer getMaxId();

    int deleteByChildrenId(@Param("employeeId") int employeeId);

    List<Integer> getReceiveUserIdsByAuthorityName(@Param("type") String type);

    List<Integer> getReceiveUserIdsByAuthorityNameAndSendId(@Param("type") String type, @Param("sendId") Integer sendId);

    int updateIsReadByConfirmTime(@Param("confirmTime") String confirmTime);

    Map<String, Object> getUserSettingByEmployeeId(@Param("employeeId") Integer employeeId);

    List<OperationRecord> getByMap(@Param("map") Map<String, Object> map);
}
