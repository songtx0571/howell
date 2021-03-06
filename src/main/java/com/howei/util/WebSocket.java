package com.howei.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.howei.pojo.ChatRecord;
import com.howei.pojo.Employee;
import com.howei.service.EmployeeService;
import com.howei.service.GroupService;
import org.springframework.stereotype.Controller;

@ServerEndpoint(value = "/socket/{userId}")
@Controller
public class WebSocket {

    public static EmployeeService employeeService;

    public static GroupService groupService;

    public void setEmployeeService(EmployeeService employeeService) {
        WebSocket.employeeService = employeeService;
    }

    public void setGroupService(GroupService groupService) {
        WebSocket.groupService = groupService;
    }

    // 在线人数
    private static int onlineCount = 0;
    // 在线用户列表
    private static Map<String, WebSocket> clients = new ConcurrentHashMap<String, WebSocket>();
    // 在线用户对应群聊编号集合
    private static Map<String, String> clientGroup = new ConcurrentHashMap<String, String>();
    private Session session;
    private String userId;

    // 连接Socket触发
    @OnOpen
    public void onOpen(@PathParam("userId") String userId, Session session) throws IOException {
        this.userId = userId;
        this.session = session;
        // 在线人数+1
        addOnlineCount();
        // 把当前用户添加到在线用户列表
        clients.put(userId, this);
        // 访问数据库获取该用户所有群聊编号集合
        Map map=new HashMap();
        map.put("state",1);
        List<Employee> employeeList=employeeService.getEmployeeMap(map);
        String usersId="";
        for (Employee employee:employeeList) {
            usersId+=employee.getId()+",";
        }
        usersId=usersId.equals("") ? usersId:usersId.substring(0,usersId.length()-1);
        clientGroup.put(userId, usersId);
        // 推送上线通知给在线用户
        sendMessageToFriend("online");
        //推送未读信息
        sendHistoryMessageToFriend();
    }

    // 离线或关闭窗口、异常关闭浏览器触发
    @OnClose
    public void onClose() throws IOException {
        // 将当前用户从在线用户列表中移除
        clients.remove(userId);
        // 在线人数-1
        subOnlineCount();
        // 推送离线通知给加我为好友的在线用户
        sendMessageToFriend("offline");
    }

    // 服务端向客户端推送消息
    @OnMessage
    public void onMessage(String messageJson) throws IOException {
        JSONObject json = JSONObject.parseObject(messageJson);
        String type = json.getString("type").toLowerCase();
        JSONObject data = json.getJSONObject("data");

        if(type.equals("all")){
            // 推送给所有在线用户
            sendMessageAll(messageJson);
        }else if(type.equals("group")){
            // 推送给群在线用户
            Employee employee=JSONObject.toJavaObject(data, Employee.class);
            if(employee!=null){
                //保存消息记录
                String content=employee.getContent();
                Integer send=employee.getId();
                Integer sendToId=Integer.parseInt(employee.getToId());
                ChatRecord chatRecord=new ChatRecord();
                chatRecord.setSendId(send);
                chatRecord.setSendToId(sendToId);
                chatRecord.setType(2);
                chatRecord.setContent(content);
                chatRecord.setSendTime(DateFormat.getYMDHMS(new Date()));
                chatRecord.setLongTime(DateFormat.getLongTime());
                groupService.saveMessage(chatRecord);//保存记录
            }
            sendMessageGroup(messageJson, employee.getToId(), false);
        }else if(type.equals("friend")){
            //推送给固定用户
            Employee employee=JSONObject.toJavaObject(data, Employee.class);
            if(employee!=null){
                //保存消息记录
                String content=employee.getContent();
                Integer send=employee.getId();
                Integer sendToId=Integer.parseInt(employee.getToId());
                ChatRecord chatRecord=new ChatRecord();
                chatRecord.setSendId(send);
                chatRecord.setSendToId(sendToId);
                chatRecord.setType(1);
                chatRecord.setContent(content);
                chatRecord.setSendTime(DateFormat.getYMDHMS(new Date()));
                chatRecord.setLongTime(DateFormat.getLongTime());
                chatRecord.setRead(0);
                groupService.saveMessage(chatRecord);//保存记录
                sendMessageTo(messageJson, String.valueOf(employee.getToId()));
            }
        } else if(type.equals("history")){//历史未读信息
            int result=updHistoryMessage(data);
        }
    }

    /**
     * 未读信息修改为已读
     * @param data
     * @return
     */
    private int updHistoryMessage(JSONObject data) {
        Mine mine=JSONObject.toJavaObject(data, Mine.class);
        if(mine.getId()!=null&&mine.getToId()!=null){
            Map map=new HashMap();
            map.put("sendId",mine.getId());
            map.put("sendToId",mine.getToId());
            groupService.updHistoryMessage(map);
        }
        return 0;
    }

    // 异常接收
    @OnError
    public void onError(Session session, Throwable error) {

    }

    /**
     * 推送给所有在线用户
     * @param message 推送信息
     */
    public void sendMessageAll(String message) throws IOException {
        for (WebSocket item : clients.values()) {
            item.session.getAsyncRemote().sendText(message);
        }
    }

    /**
     * 推送给固定用户
     * @param message 推送信息
     * @param To 好友编号
     */

    public synchronized void sendMessageTo(String message, String To) throws IOException {
        for (WebSocket item : clients.values()) {
            if (item.userId.equals(To)){
                item.session.getAsyncRemote().sendText(message);
            }
        }
    }

    /**
     * 推送给群聊成员
     * @param message 推送信息
     * @param To 群聊编号
     * @param isWhole 推送状态(1推送给所有成员，0推送给非自己外的所有成员)*/

    public void sendMessageGroup(String message, String To, boolean isWhole) throws IOException {
        for (WebSocket item : clients.values()) {
            if(!this.userId.equals(item.userId)){
                item.session.getAsyncRemote().sendText(message);
            }
        }
    }

    private void sendHistoryMessageToFriend() throws IOException{
        Map map1=new HashMap();
        map1.put("state",1);
        List<Employee> employeeList=employeeService.getEmployeeMap(map1);
        for(Employee employee:employeeList){
            Integer sendId=employee.getId();
            String sendToId=userId;
            Map map=new HashMap();
            map.put("sendId",sendId);
            map.put("sendToId",sendToId);
            List<ChatRecord> list=groupService.getUnReadList(map);
            if(list!=null){
                for (int i=0;i<list.size();i++){
                    ChatRecord chatRecord=list.get(i);
                    Mine mine=new Mine();
                    mine.setType("friend");
                    mine.setToId(chatRecord.getSendToId()+"");
                    mine.setAvatar("../../img/logo.png");
                    mine.setId(chatRecord.getSendId()+"");
                    mine.setSign("这个人很懒");
                    mine.setStatus("online");
                    mine.setUsername(chatRecord.getUserName());
                    mine.setContent(chatRecord.getContent());
                    mine.setTimestamp(chatRecord.getLongTime());
                    Map map2=new HashMap();
                    map2.put("type","friend");
                    map2.put("data",mine);
                    String messageJson=JSON.toJSONString(map2);
                    sendMessageTo(messageJson, sendToId);
                }
            }
        }
    }

    /* *
     * 推送给加我为好友的用户
     * @param lineState 在线状态(在线：online,离线：offline
     */

    public void sendMessageToFriend(String lineState) throws IOException {
        String mineId = userId;
        Employee employee1=employeeService.getLoginEmployee(mineId);
        // 登录用户信息，实际应用请根据userId查用户信息
        Map<String, Object> user = new HashMap<String, Object>();
        user.put("id", mineId);
        user.put("username", employee1.getName());
        // 获取加我为好友的在线用户集合
        Map map=new HashMap();
        map.put("state",1);
        List<Employee> employeeList=employeeService.getEmployeeMap(map);
        String usersId="";
        for (Employee employee:employeeList) {
            usersId+=employee.getId()+",";
        }
        usersId=usersId.equals("") ? usersId:usersId.substring(0,usersId.length()-1);
        Map<String, Object> revertMap = new HashMap<String, Object>();
        revertMap.put("type", "chatLineState");
        revertMap.put("status", lineState);
        revertMap.put("mine", user);
        String message = JSON.toJSONString(revertMap, SerializerFeature.WriteMapNullValue);
        for (WebSocket item : clients.values()) {
            item.session.getAsyncRemote().sendText(message);
        }
    }

    public static synchronized int getOnlineCount() {
        return onlineCount;
    }
    public static synchronized void addOnlineCount() {
        WebSocket.onlineCount++;
    }
    public static synchronized void subOnlineCount() {
        WebSocket.onlineCount--;
    }
    public static synchronized Map<String, WebSocket> getClients() {
        return clients;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
