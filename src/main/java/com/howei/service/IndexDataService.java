package com.howei.service;

import com.howei.pojo.Defect;
import com.howei.pojo.Maintain;
import com.howei.pojo.MaintainRecord;
import com.howei.pojo.ScrDaily;

import java.util.List;
import java.util.Map;

public interface IndexDataService {
    /**
     * 维护日志查询
     *
     * @param map
     * @return
     */
    List<MaintainRecord> getMaintainRecordByMap(Map<String, Object> map);

    /**
     * 缺陷日志查询
     *
     * date 查询日期
     * departmentId 部门id
     * isToDo  0待分配或待确认,1待执行或待反馈
     *
     * @return
     */
    List<Defect> getDefectByMap(Map<String, Object> map);

    /**
     * 运行日志查询
     *
     * @param map
     * @return
     */
    List<ScrDaily> getScrDailyByMap(Map<String, Object> map);

    /**
     * 检修次数和检修点数
     *
     * @param map
     * @return
     */
    List<Map<String, Object>> getPostPeratorDataMapByMap(Map<String, Object> map);

    /**
     * 维护配置数据
     *
     * @param map
     * @return
     */
    List<Maintain> getMintainByMap(Map<String, Object> map);
}
