package com.howei.pojo;

/**
 * 通知接受人
 */
public class UserInform {
    private Integer id;
    private Integer userId;//接受人
    private Integer informId;//通知Id
    private String created;//创建时间
    private Integer rdStatus;//是否已读
    private String rdDateTime;//阅读时间

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getInformId() {
        return informId;
    }

    public void setInformId(Integer informId) {
        this.informId = informId;
    }

    public String getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created = created;
    }

    public Integer getRdStatus() {
        return rdStatus;
    }

    public void setRdStatus(Integer rdStatus) {
        this.rdStatus = rdStatus;
    }

    public String getRdDateTime() {
        return rdDateTime;
    }

    public void setRdDateTime(String rdDateTime) {
        this.rdDateTime = rdDateTime;
    }
}
