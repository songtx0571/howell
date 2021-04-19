package com.howei.pojo;

/**
 * 岗位等级
 */
public class PostGrade {
    private Integer id;
    private Integer postId;//岗位Id
    private String created;
    private String gradeName;//等级名称
    private double PostGradeWage;//岗位等级工资
    private Integer companyId;//公司id
    private String month;//应用月份
    //虚字段
    private String postName;//岗位名称

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPostId() {
        return postId;
    }

    public void setPostId(Integer postId) {
        this.postId = postId;
    }

    public String getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created = created;
    }

    public double getPostGradeWage() {
        return PostGradeWage;
    }

    public void setPostGradeWage(double postGradeWage) {
        PostGradeWage = postGradeWage;
    }

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public String getPostName() {
        return postName;
    }

    public void setPostName(String postName) {
        this.postName = postName;
    }

    public String getGradeName() {
        return gradeName;
    }

    public void setGradeName(String gradeName) {
        this.gradeName = gradeName;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }
}
