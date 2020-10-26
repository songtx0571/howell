package com.howei.controller;

import com.alibaba.fastjson.JSON;
import com.howei.pojo.Authority;
import com.howei.service.AuthorityService;
import com.howei.util.DateFormat;
import com.howei.util.Result;
import com.howei.util.Type;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

import static org.apache.shiro.authz.annotation.Logical.OR;

/**
 * 权限管理
 */
@Controller
@RequestMapping("/authority")
@CrossOrigin(origins={"http://192.168.1.27:8080","http:localhost:8080"},allowCredentials = "true")
public class AuthorityController {

    @Autowired
    private AuthorityService authorityService;

    /**
     * 开发人员分配URL路径
     * @return
     */
    @RequiresPermissions(value = {"创建权限"},logical = OR)
    @RequestMapping(value = "/addAistributeURL",method = {RequestMethod.POST})
    @ResponseBody
    public String addAistributeURL(@RequestBody Authority authority){
        authority.setCreated(DateFormat.getYMDHMS(new Date()));
        int result=authorityService.addAistributeURL(authority);
        if(result>=0){
            return JSON.toJSONString(Type.SUCCESS);
        }
        return JSON.toJSONString(Type.ERROR);
    }

    /**
     * 查询指定路径
     * @param request
     * @return
     */
    @RequestMapping("/getById")
    @ResponseBody
    public String getById(HttpServletRequest request){
        String id=request.getParameter("id");
        if(id!=null&&!id.equals("")){
            Authority authority=authorityService.getUrlById(id);
            return JSON.toJSONString(authority);
        }
        return JSON.toJSONString(Type.ERROR);
    }

    /**
     * 获取所有Url路径
     * @param
     * @return
     */
    @RequiresPermissions(value = {"开发人员"},logical = OR)
    @RequestMapping("/getURLList")
    @ResponseBody
    public String getURLList(){
        Map map=new HashMap();
        List<Authority> list= null;
        try {
            //map.put("parentId",0);
            list = authorityService.getURLList(map);
            for (Authority authority:list){
                authority.setMenuIcon("layui-icon-set");
                authority.setAuthorityId(authority.getId());
                authority.setOpen(true);
                /*Integer id=authority.getId();
                List<Authority> children = getAuthorityChildren(list,id);
                authority.setChildren(children);*/
            }
        } catch (Exception e) {
            e.printStackTrace();
            return JSON.toJSONString(Type.ERROR);
        }
        Result result=new Result();
        result.setCode(0);
        result.setMsg("success");
        result.setCount(0);
        result.setData(list);
        return JSON.toJSONString(result);
    }

    /**
     * 获取权限
     * @return
     */
    public List<Authority> getAuthorityChildren( List<Authority> listB , Integer pid){
        List<Authority> authorities=new ArrayList<>();
        for(Authority authority:listB){
            if(authority.getParentId()==pid){
                authority.setMenuIcon("layui-icon-set");
                authority.setAuthorityId(authority.getId());
                authority.setOpen(true);
                authorities.add(authority);
                getAuthorityChildren(listB,Integer.valueOf(authority.getId()));
            }
        }
        return authorities;
    }

    /**
     * 修改URL
     * @param authority
     * @return
     */
    @RequiresPermissions(value = {"更新权限信息"},logical = OR)
    @RequestMapping(value = "/updAistributeURL")
    @ResponseBody
    public String updAistributeURL(@RequestBody Authority authority){
        if(authority.getId()!=null){
            int result=authorityService.updAistributeURL(authority);
            if(result>=0){
                return JSON.toJSONString(Type.SUCCESS);
            }
            return JSON.toJSONString(Type.ERROR);
        }
        return JSON.toJSONString(Type.CANCEL);
    }
}
