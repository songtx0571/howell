package com.howei.service;

import com.howei.pojo.Menu;

import java.util.List;
import java.util.Map;

public interface MenuService {

    /**
     * 获取菜单
     * @param map
     * @return 当前级别的菜单
     */
    List<Menu> getMenuTree(Map map);

    List<Map<String, Object>> getMenuMap(Map map);

    Menu findMenu(String name, Integer template);

    int addMenu(Menu menu);

    Menu getMenuById(Integer id);

    List<Menu> getMenuChild(Integer template);

    void updMenu(Menu menu1);
}
