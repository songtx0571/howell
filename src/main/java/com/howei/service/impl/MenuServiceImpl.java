package com.howei.service.impl;

import com.howei.mapper.MenuMapper;
import com.howei.pojo.Inform;
import com.howei.pojo.Menu;
import com.howei.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MenuServiceImpl implements MenuService {

    @Autowired
    MenuMapper menuMapper;

    @Override
    public List<Menu> getMenuTree(Map map) {
        return menuMapper.getMenuTree(map);
    }

    @Override
    public List<Map<String, Object>> getMenuMap(Map map) {
        List<Menu> list=menuMapper.getMenuMap(map);
        List<Map<String, Object>> result=new ArrayList<>();
        for(Menu menu:list){
            Map<String, Object> map1=new HashMap<>();
            map1.put("id",menu.getId());
            map1.put("name",menu.getName());
            map1.put("template",menu.getTypeValue());
            result.add(map1);
        }
        return result;
    }

    @Override
    public Menu findMenu(String name, Integer template) {
        return menuMapper.findMenu(name,template);
    }

    @Override
    public int addMenu(Menu menu) {
        return menuMapper.addMenu(menu);
    }

    @Override
    public Menu getMenuById(Integer id) {
        return menuMapper.getMenuById(id);
    }

    @Override
    public List<Menu> getMenuChild(Integer template) {
        return menuMapper.getMenuChild(template);
    }

    @Override
    public void updMenu(Menu menu) {
        menuMapper.updMenu(menu);
    }
}
