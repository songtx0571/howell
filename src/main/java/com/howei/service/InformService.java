package com.howei.service;

import com.howei.pojo.Inform;
import com.howei.pojo.InformType;
import com.howei.pojo.ReadStatus;
import com.howei.pojo.UserInform;

import java.util.List;
import java.util.Map;

public interface InformService {

    List<InformType> getInformType(Map map);

    int addInformType(InformType informType);

    InformType getInformTypeByParam(InformType informType);

    int updateInformType(InformType informType);

    InformType getInformTypeById(String id);

    Map<Integer,String> getInformTypeMap();

    List<Inform> getInformList(Map map);

    int addInform(Inform inform);

    Inform getInformByParam(Inform inform);

    int updateInform(Inform inform);

    Inform getInformById(String id);

    int updateStatus(UserInform userInform);
}
