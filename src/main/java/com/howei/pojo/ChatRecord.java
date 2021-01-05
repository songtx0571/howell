package com.howei.pojo;

/**
 * 聊天记录
 */
public class ChatRecord {

    private Integer id;
    private Integer sendId;//发送人
    private Integer sendToId;//接收人
    private String content;//消息内容
    private Integer type;//1:单聊；2:群聊
    private long longTime;//发送毫秒数
    private String sendTime;//发送时间

    //虚字段
    private String userName;//发送人
    private String sendToUserName;//接收人

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getSendId() {
        return sendId;
    }

    public void setSendId(Integer sendId) {
        this.sendId = sendId;
    }

    public Integer getSendToId() {
        return sendToId;
    }

    public void setSendToId(Integer sendToId) {
        this.sendToId = sendToId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public long getLongTime() {
        return longTime;
    }

    public void setLongTime(long longTime) {
        this.longTime = longTime;
    }

    public String getSendTime() {
        return sendTime;
    }

    public void setSendTime(String sendTime) {
        this.sendTime = sendTime;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getSendToUserName() {
        return sendToUserName;
    }

    public void setSendToUserName(String sendToUserName) {
        this.sendToUserName = sendToUserName;
    }
}
