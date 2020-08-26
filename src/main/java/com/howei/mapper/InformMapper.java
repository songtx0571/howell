package com.howei.mapper;

import com.howei.pojo.Inform;
import com.howei.pojo.InformType;
import com.howei.pojo.ReadStatus;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface InformMapper {

    List<InformType> getInformType(Map map);

    int addInformType(InformType informType);

    InformType getInformTypeByParam(InformType informType);

    int updateInformType(InformType informType);

    InformType getInformTypeById(String id);

    List<InformType> getInformTypeMap();

    List<Inform> getInformList(Map map);

    int addInform(Inform inform);

    Inform getInformByParam(Inform inform);

    int updateInform(Inform inform);

    Inform getInformById(String id);

    int updateStatus(ReadStatus readStatus);
}
