package com.howei.util;

import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * 菜单树
 */
public class LayuiTree {
    //"id":"001",//id
    //  "title": "湖南省",//标题
    //  "level": "1",//层级
    //  "parentId": "0",//父级的id  最外层是0
    //  "checkArr": [{"type": "0", "checked": "1"}],//type:复选框标记（开启复选框，从0开始）  checked: //是否选中（开启复选框，0-未选中，1-选中）
    //  "children":[{
    //    "id":"001001",
    //    "title": "长沙市",
    //    "parentId": "001",
    //    "checkArr": [{"type": "0", "checked": "1"}],
    //    "level": "2"
    //  }]
    private Integer id;
    private String title; //父节点id
    private Integer parentId;//父id
    private Integer level;//深度
    private List<Map<String,String>> checkArr;
    private List<LayuiTree> children; //子节点数据

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public List<Map<String, String>> getCheckArr() {
        return checkArr;
    }

    public void setCheckArr(List<Map<String, String>> checkArr) {
        this.checkArr = checkArr;
    }

    public List<LayuiTree> getChildren() {
        return children;
    }

    public void setChildren(List<LayuiTree> children) {
        this.children = children;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LayuiTree layuiTree = (LayuiTree) o;
        return Objects.equals(id, layuiTree.id);
    }
}
