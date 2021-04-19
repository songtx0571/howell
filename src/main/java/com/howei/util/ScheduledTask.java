package com.howei.util;

import com.howei.service.OperationRecordService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.*;

@Component
public class ScheduledTask {

    Logger logger = LoggerFactory.getLogger(ScheduledTask.class);

    @Autowired
    private OperationRecordService orService;

    @Scheduled(cron = "1 * * * * ?") //每10秒执行一次
    public void scheduledTaskByCorn() {
        Date date=new Date();
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm");
        String dateTime = sdf.format(date);
        logger.info("时间为 "+sdf.format(date)+" 的动态信息设置成已读");
        int count=orService.updateIsReadByConfirmTime(dateTime+"%");
    }



}