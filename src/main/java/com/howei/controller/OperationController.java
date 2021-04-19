package com.howei.controller;

import com.howei.config.rabbitmq.Sender;
import com.howei.pojo.OperationRecord;
import com.howei.pojo.Users;
import com.howei.service.EmployeeService;
import com.howei.service.OperationRecordService;
import com.howei.util.DateFormat;
import com.howei.util.Result;
import com.howei.util.WebSocketOperation;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/operation")
public class OperationController {
    @Autowired
    private Sender sender;
    @Autowired
    private OperationRecordService orService;



    @PostMapping("/send")
    @ResponseBody
    public String sendRecord(
            @RequestParam(required = false) String verb,
            @RequestParam(required = false) String content,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String remark) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        Subject subject = SecurityUtils.getSubject();
        Users users = (Users) subject.getPrincipal();
        if(users==null){
            return "FALSE,用户失效";
        }
        int sendId = users.getEmployeeId();
        String userName = users.getUserName();
        Long timeMillis = System.currentTimeMillis();
        OperationRecord record = new OperationRecord();
        record.setSendId(sendId);
        record.setSendName(userName);
        record.setVerb(verb);
        record.setContent(content);
        record.setType(type);
        record.setRemark(remark);
        record.setLongTime(timeMillis.toString());
        record.setCreateTime(sdf.format(timeMillis));
        try {
            sender.send(record);
            //webSocketOperation.sendMessageToAll(record.toString());
            return "SUCCESSS";
        } catch (Exception e) {

            return "FALSE";
        }

    }

    @GetMapping("/isRead/{id}")
    @ResponseBody
    public String updateRecordIsRead(@PathVariable Integer id) {
        int flag = orService.updateIsReadById(id);
        if (flag > 0) {
            return "SUCCESS";
        } else {
            return "FALSE";
        }
    }

    @GetMapping("/all")
    @ResponseBody
    public Result all(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer limit
    ){
        Result result=new Result();
        Subject subject = SecurityUtils.getSubject();
        Users users = (Users) subject.getPrincipal();
        if(users==null){
            result.setMsg("用户失效,请重新登录");
            return result;
        }
        int employeeId = users.getEmployeeId();
        Map<String ,Object> map=new HashMap<>();
        map.put("receiveId",employeeId);
        List<OperationRecord> list = orService.getByMap(map);
        if(page!=null&&limit!=null){
            map.put("startRow",page*limit);
            map.put("limit",limit);
        }
        List<OperationRecord> list1 = orService.getByMap(map);
        result.setMsg("成功");
        result.setData(list1);
        result.setCode(0);
        result.setCount(list.size());
        return result;
    }


}
