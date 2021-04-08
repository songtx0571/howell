package com.howei.pojo;

import com.howei.util.Result;

import java.util.Date;

/**
 * 用户自定义设置
 */
public class UserSetting {
    private Integer id;
    private Integer employeeId;
    private String rollingTime ;
    private String howeiLevel ;
    private String guideLevel;
    private String aiLevel ;
    private String waLevel ;
    private String examLevel;
    private String defectLevel;
    private Date updateTime;


    @Override
    public String toString() {
        return "UserSetting{" +
                "id=" + id +
                ", employeeId=" + employeeId +
                ", rollingTime='" + rollingTime + '\'' +
                ", howeiLevel='" + howeiLevel + '\'' +
                ", guideLevel='" + guideLevel + '\'' +
                ", aiLevel='" + aiLevel + '\'' +
                ", waLevel='" + waLevel + '\'' +
                ", examLevel='" + examLevel + '\'' +
                ", defectLevel='" + defectLevel + '\'' +
                ", updateTime='" + updateTime + '\'' +
                '}';
    }

    public static UserSetting init(Integer employeeId) {
        UserSetting userSetting = new UserSetting();
        userSetting.setEmployeeId(employeeId);
        userSetting.setRollingTime("10000");
        userSetting.setHoweiLevel("#000");
        userSetting.setGuideLevel("#000");
        userSetting.setAiLevel("#000");
        userSetting.setWaLevel("#000");
        userSetting.setExamLevel("#000");
        userSetting.setDefectLevel("#000");
        userSetting.setUpdateTime(new Date());
        return userSetting;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Integer employeeId) {
        this.employeeId = employeeId;
    }

    public String getRollingTime() {
        return rollingTime;
    }

    public void setRollingTime(String rollingTime) {
        this.rollingTime = rollingTime;
    }

    public String getHoweiLevel() {
        return howeiLevel;
    }

    public void setHoweiLevel(String howeiLevel) {
        this.howeiLevel = howeiLevel;
    }

    public String getGuideLevel() {
        return guideLevel;
    }

    public void setGuideLevel(String guideLevel) {
        this.guideLevel = guideLevel;
    }

    public String getAiLevel() {
        return aiLevel;
    }

    public void setAiLevel(String aiLevel) {
        this.aiLevel = aiLevel;
    }

    public String getWaLevel() {
        return waLevel;
    }

    public void setWaLevel(String waLevel) {
        this.waLevel = waLevel;
    }

    public String getExamLevel() {
        return examLevel;
    }

    public void setExamLevel(String examLevel) {
        this.examLevel = examLevel;
    }

    public String getDefectLevel() {
        return defectLevel;
    }

    public void setDefectLevel(String defectLevel) {
        this.defectLevel = defectLevel;
    }
}
