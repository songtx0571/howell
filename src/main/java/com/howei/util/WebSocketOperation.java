package com.howei.util;

import com.alibaba.fastjson.JSONObject;
import com.howei.pojo.OperationRecord;
import com.howei.service.OperationRecordService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@ServerEndpoint(value = "/operation/{userId}")
@Controller
public class WebSocketOperation {


    public static OperationRecordService orService;

    private final static Logger log = LoggerFactory.getLogger(WebSocketOperation.class);
    /**
     * 存活的session集合（使用线程安全的map保存）
     */
    private static Map<String, Session> livingSessions = new ConcurrentHashMap<>();
    /**
     * 未发送出的消息
     */
    public static Map<String, Map<String, String>> unSensMessages = new ConcurrentHashMap<>();

    /**
     * 建立连接的回调方法
     *
     * @param session 与客户端的WebSocket连接会话
     * @param userId  用户名，WebSocket支持路径参数
     */
    @OnOpen
    public void onOpen(Session session, @PathParam("userId") Integer userId) {
        // 建立连接时 保存当前登陆人到已登录集合中
        livingSessions.put(userId.toString(), session);
        // 判断当前登陆人是否有未读的消息  有则发送


        System.out.println("service:" + orService);

        List<OperationRecord> list = new ArrayList<>();
        try {
            list = orService.getByReceiveIdAndIsRead(userId, 0);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        if (list != null && list.size() > 0) {
            for (OperationRecord record : list) {
                System.out.println("record::" + record);
                sendMessage(session, record.toString());
            }
        }

    }

    @OnMessage
    public void onMessage(String message, Session session, @PathParam("userId") String userId) {
        log.info(userId + " : " + message);
        //sendMessageToAll(userId + " : " + message);


    }


    @OnError
    public void onError(Session session, Throwable error) {
        log.error("发生错误:" + error.getStackTrace() + "");
    }


    @OnClose
    public void onClose(Session session, @PathParam("userId") String userId) {
        livingSessions.remove(userId);
        log.info("用户" + userId + " 关闭连接");
    }

    /**
     * 单独发送消息
     *
     * @param session
     * @param message
     */
    public void sendMessage(Session session, String message) {
        try {
            session.getBasicRemote().sendText(message.replace('\"', '\''));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 群发消息
     * userIds 是需要接收消息的用户id集合 可单发，可群发
     *
     * @param message
     */
    public void sendMessageToAll(String message) {
        // 将json字符串转为message类
        OperationRecord record = JSONObject.parseObject(message, OperationRecord.class);
        String type = record.getType();
        if (type != null && !"".equals(type.trim())) {

            List<Integer> userList = orService.getReceiveUserIdsByAuthorityName("显示"+type+"项目记录");
            // 遍历需要发送到的人
            for (Integer userId : userList) {
                record.setReceiveId(userId);
                //插入
                Integer count = orService.insert(record);
                Integer nowId =orService.getMaxId();
                record.setId(nowId);
                //System.out.println("record2:::" + record);
                // 当前已登录的人
                if (livingSessions.get(String.valueOf(userId)) != null) {
                    //当前user已登录，发送消息
                    sendMessage(livingSessions.get(String.valueOf(userId)), record.toString());
                }
            }

        }

    }

}
