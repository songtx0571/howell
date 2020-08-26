package com.howei.service.impl;

import com.howei.mapper.InformMapper;
import com.howei.pojo.Inform;
import com.howei.pojo.InformType;
import com.howei.pojo.ReadStatus;
import com.howei.service.InformService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class InformServiceImpl implements InformService {

    @Autowired
    InformMapper informMapper;

    @Override
    public List<InformType> getInformType(Map map) {
        return informMapper.getInformType(map);
    }

    @Override
    public int addInformType(InformType informType) {
        return informMapper.addInformType(informType);
    }

    @Override
    public InformType getInformTypeByParam(InformType informType) {
        return informMapper.getInformTypeByParam(informType);
    }

    @Override
    public int updateInformType(InformType informType) {
        return informMapper.updateInformType(informType);
    }

    @Override
    public InformType getInformTypeById(String id) {
        return informMapper.getInformTypeById(id);
    }

    @Override
    public Map<Integer, String> getInformTypeMap() {
        List<InformType> list=informMapper.getInformTypeMap();
        Map<Integer,String> map=new HashMap<>();
        for (InformType informType:list){
            map.put(informType.getId(),informType.getName());
        }
        return map;
    }

    @Override
    public List<Inform> getInformList(Map map) {
        return informMapper.getInformList(map);
    }

    @Override
    public int addInform(Inform inform) {
        return informMapper.addInform(inform);
    }

    @Override
    public Inform getInformByParam(Inform inform) {
        return informMapper.getInformByParam(inform);
    }

    @Override
    public int updateInform(Inform inform) {
        return informMapper.updateInform(inform);
    }

    @Override
    public Inform getInformById(String id) {
        return informMapper.getInformById(id);
    }

    @Override
    public int updateStatus(ReadStatus readStatus) {
        return informMapper.updateStatus(readStatus);
    }
}
