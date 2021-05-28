package com.howei.pojo;

import java.util.List;

/**
 * 系统菜单
 */
public class Menu {
    @Override
    public String toString() {
        return "Menu{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", parent=" + parent +
                ", active='" + active + '\'' +
                ", url='" + url + '\'' +
                ", template='" + template + '\'' +
                ", priority='" + priority + '\'' +
                '}';
    }

    private int id;
    private String name;//菜单名称
    private int parent;//父类菜单
    private String active;//是否活跃
    private String url;//模板路径
    private Integer priority;////设置优先级
    private Integer template;//菜单类型
    private Integer typeValue;
    private List<Menu> children;//子菜单

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getParent() {
        return parent;
    }

    public void setParent(int parent) {
        this.parent = parent;
    }

    public String getActive() {
        return active;
    }

    public void setActive(String active) {
        this.active = active;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public Integer getTemplate() {
        return template;
    }

    public void setTemplate(Integer template) {
        this.template = template;
    }

    public List<Menu> getChildren() {
        return children;
    }

    public void setChildren(List<Menu> children) {
        this.children = children;
    }

    public Integer getTypeValue() {
        return typeValue;
    }

    public void setTypeValue(Integer typeValue) {
        this.typeValue = typeValue;
    }
}
