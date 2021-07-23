package com.howei.mapper;

import com.howei.pojo.Defect;
import com.howei.pojo.Maintain;
import com.howei.pojo.MaintainRecord;
import com.howei.pojo.ScrDaily;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface IndexDataMapper {
    List<MaintainRecord> getMaintainRecordByMap(Map<String, Object> map);

    List<Defect> getDefectByMap(Map<String, Object> map);

    List<ScrDaily> getScrDailyByMap(Map<String, Object> map);

    List<Map<String, Object>> getPostPeratorDataMapByMap(Map<String, Object> map);

    List<Maintain> getMaintainByMap(Map<String, Object> map);
}
