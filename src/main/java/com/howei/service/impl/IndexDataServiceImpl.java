package com.howei.service.impl;

import com.howei.mapper.IndexDataMapper;
import com.howei.pojo.Defect;
import com.howei.pojo.Maintain;
import com.howei.pojo.MaintainRecord;
import com.howei.pojo.ScrDaily;
import com.howei.service.IndexDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class IndexDataServiceImpl  implements IndexDataService {

    @Autowired
    IndexDataMapper mapper;

    @Override
    public List<MaintainRecord> getMaintainRecordByMap(Map<String, Object> map) {
        return mapper.getMaintainRecordByMap(map);
    }

    @Override
    public List<Defect> getDefectByMap(Map<String, Object> map) {
        return mapper.getDefectByMap(map);
    }

    @Override
    public List<ScrDaily> getScrDailyByMap(Map<String, Object> map) {
        return mapper.getScrDailyByMap(map);
    }

    @Override
    public List<Map<String, Object>> getPostPeratorDataMapByMap(Map<String, Object> map) {
        return mapper.getPostPeratorDataMapByMap(map);
    }

    @Override
    public List<Maintain> getMintainByMap(Map<String, Object> map) {
        return mapper.getMaintainByMap(map);

    }

}
