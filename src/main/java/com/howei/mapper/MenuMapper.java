package com.howei.mapper;

import com.howei.pojo.Menu;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface MenuMapper {

    List<Menu> getMenuTree(Map map);


    List<Menu> getMenuMap(Map map);

    Menu findMenu(@Param("name")String name,@Param("template") Integer template);

    int addMenu(Menu menu);

    Menu getMenuById(@Param("id") Integer id);

    List<Menu> getMenuChild(@Param("template")Integer template);

    void updMenu(Menu menu);
}
