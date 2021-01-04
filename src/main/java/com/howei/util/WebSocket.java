package com.howei.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.howei.pojo.Employee;
import com.howei.service.EmployeeService;
import org.springframework.stereotype.Controller;

@ServerEndpoint(value = "/socket/{userId}")
@Controller
public class WebSocket {

    public static EmployeeService employeeService;

    public void setEmployeeService(EmployeeService employeeService) {
        WebSocket.employeeService = employeeService;
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
        // 推送上线通知给加我为好友的在线用户
        sendMessageToFriend("online");
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
        System.out.println(data);
        if(type.equals("all")){
            // 推送给所有在线用户
            sendMessageAll(messageJson);
        }else if(type.equals("group")){
            // 推送给群在线用户
            Employee employee=JSONObject.toJavaObject(data, Employee.class);
            sendMessageGroup(messageJson, employee.getToId(), false);
        }else if(type.equals("friend")){
            // 推送给固定用户
            Employee employee=JSONObject.toJavaObject(data, Employee.class);
            if(employee!=null){
                sendMessageTo(messageJson, String.valueOf(employee.getToId()));
            }
        }
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

    public void sendMessageTo(String message, String To) throws IOException {
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
        String filterId = "," + To + ",";
        if(isWhole){
            for (WebSocket item : clients.values()) {
                String groupIds = clientGroup.get(item.userId);
                if(groupIds.indexOf(filterId)>=0){
                    item.session.getAsyncRemote().sendText(message);
                }
            }
        }else{
            for (WebSocket item : clients.values()) {
                if(!this.userId.equals(item.userId)){
                    item.session.getAsyncRemote().sendText(message);
                }
            }
        }
    }

   /* *
     * 推送给加我为好友的用户
     * @param lineState 在线状态(在线：online,离线：offline*/

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
