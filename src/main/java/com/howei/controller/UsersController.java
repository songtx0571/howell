package com.howei.controller;

import com.alibaba.fastjson.JSON;
import com.howei.pojo.Company;
import com.howei.pojo.Post;
import com.howei.pojo.Users;
import com.howei.service.CompanyService;
import com.howei.service.PostService;
import com.howei.service.UserService;
import com.howei.util.MD5;
import com.howei.util.Page;
import com.howei.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/user")
public class UsersController {

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @Autowired
    private CompanyService companyService;

    private Map<Integer,Object> companyMap;
    private Map<Integer,Object> departmentMap;
    private Map<Integer,Object> postMap;

    void init(){
        companyMap=companyService.getCompanyMap("0");
        departmentMap=companyService.getCompanyMap(null);
        postMap=postService.getPostMap();
    }
    /**
     * 获取公司|部门列表
     * @param request
     * @return
     */
    @RequestMapping("/getCompanyList")
    @ResponseBody
    public String getCompanyList(HttpServletRequest request){
        String parent=request.getParameter("parent");
        List<Company> list=companyService.getCompanyList(parent);
        Result result=new Result() ;
        result.setMsg("");
        result.setCode(0);
        result.setData(list);
        return JSON.toJSONString(result);
    }

    /**
     * 获取代号列表
     * @param request
     * @return
     */
    @RequestMapping("/getCodeNameList")
    @ResponseBody
    public String getCodeNameList(HttpServletRequest request){
        String companyId=request.getParameter("companyId");
        List<Company> list=null;
        if(companyId==null||companyId.equals("")){
            list=companyService.getCompanyList("0");
        }else{
            list=companyService.getCodeNameList(companyId);
        }
        List result=new ArrayList();
        if(list!=null){
            for (int i=0;i<list.size();i++) {
                Map map=new HashMap();
                Company com=list.get(i);
                map.put("id",i);
                map.put("value",com.getCodeName());
                map.put("text",com.getName());
                result.add(map);
            }
        }
        return JSON.toJSONString(result);
    }

    /**
     * 获取岗位列表
     * @param request
     * @return
     */
    @RequestMapping("/getPostList")
    @ResponseBody
    public String getPostList(HttpServletRequest request){
        String companyId=request.getParameter("companyId");
        List<Post> list=postService.getPostList(companyId);
        Result result=new Result();
        result.setData(list);
        result.setCode(0);
        return JSON.toJSONString(list);
    }

    /**
     * 获取员工列表
     * @param request
     * @return
     */
    @RequestMapping("/getUserList")
    @ResponseBody
    public String getUserList(HttpServletRequest request){
        init();
        String companyId=request.getParameter("companyId");
        String page=request.getParameter("page");
        String pageSize=request.getParameter("limit");
        int rows=Page.getOffSet(page,pageSize);
        Map map=new HashMap();
        map.put("companyId",companyId);
        List<Users> total=userService.getUserList(map);
        map.put("page",rows);
        map.put("rows",pageSize);
        List<Users> list=userService.getUserList(map);
        for (Users u:list) {
            int sex=u.getSex();
            if(sex==1){
                u.setSexName("男");
            }else{
                u.setSexName("女");
            }
            int state=u.getState();
            if(state==1){
                u.setStateName("在职");
            }else{
                u.setStateName("离职");
            }
            String companyName=companyMap.get(u.getCompanyId())+"";
            u.setCompanyName(companyName);
            String postName=postMap.get(u.getPostId())+"";
            u.setPostName(postName);
            String departName=departmentMap.get(u.getDepartmentId())+"";
            u.setDepartName(departName);
        }
        Result result=new Result();
        result.setData(list);
        result.setCode(0);
        result.setMsg("");
        result.setCount(total.size());
        return JSON.toJSONString(result);
    }

    /**
     * 根据id获取用户
     * @param request
     * @return
     */
    @RequestMapping("/getUser")
    @ResponseBody
    public String getUser(HttpServletRequest request){
        String userId=request.getParameter("userId");
        if(userId!=null){
            Users user=userService.getUserById(userId);
            return JSON.toJSONString(user);
        }else{
            return JSON.toJSONString("查询无结果");
        }
    }

    /**
     * 添加用户
     * @param request
     * @return
     */
    @RequestMapping("/addUser")
    @ResponseBody
    public String addUser(HttpServletRequest request){
        String userName=request.getParameter("userName");
        String state=request.getParameter("state");
        String sex=request.getParameter("sex");
        String phone=request.getParameter("phone");
        String email=request.getParameter("email");
        String companyId=request.getParameter("companyId");
        String departmentId=request.getParameter("departmentId");
        String postId=request.getParameter("postId");
        String userNumber=request.getParameter("userNumber");
        Users user=new Users();
        if(userName!=null&&!userName.equals("")){
            user.setUserName(userName);
        }
        if(state!=null&&!state.equals("")){
            user.setState(Integer.parseInt(state));
        }else{
            user.setState(1);
        }
        if(sex!=null&&!sex.equals("")){
            user.setSex(Integer.parseInt(sex));
        }
        if(phone!=null&&!phone.equals("")){
            user.setPhone(phone);
        }
        if(email!=null&&!email.equals("")){
            user.setEmail(email);
        }
        if(companyId!=null&&!companyId.equals("")){
            user.setCompanyId(Integer.parseInt(companyId));
        }
        if(departmentId!=null&&!departmentId.equals("")){
            user.setDepartmentId(Integer.parseInt(departmentId));
        }
        if(postId!=null&&!postId.equals("")){
            user.setPostId(Integer.parseInt(postId));
        }
        if(userNumber!=null&&!userNumber.equals("")){
            user.setUserNumber(userNumber);
        }
        try {
            MD5 md5=new MD5();
            String password=md5.EncoderByMd5("123456");
            user.setPassword(password);
        }catch (Exception e){
            return JSON.toJSONString("操作失败,请联系技术人员");
        }
        userService.addUser(user);
        if(user.getId()>0){
            return JSON.toJSONString("success");
        }else {
            return JSON.toJSONString("error");
        }
    }

    /**
     * 修改user
     * @param request
     * @return
     */
    @RequestMapping("/updateUser")
    @ResponseBody
    public String updateUser(HttpServletRequest request){
        String id=request.getParameter("id");
        String userName=request.getParameter("userName");
        String state=request.getParameter("state");
        String sex=request.getParameter("sex");
        String phone=request.getParameter("phone");
        String email=request.getParameter("email");
        String companyId=request.getParameter("companyId");
        String departmentId=request.getParameter("departmentId");
        String postId=request.getParameter("postId");
        String password=request.getParameter("password");
        Users users=userService.getUserById(id);
        if(users!=null){
            if(userName!=null&&!userName.equals("")){
                users.setUserName(userName);
            }
            if(state!=null&&!state.equals("")){
                users.setState(Integer.parseInt(state));
            }
            if(sex!=null&&!sex.equals("")){
                users.setSex(Integer.parseInt(sex));
            }
            if(phone!=null&&!phone.equals("")){
                users.setPhone(phone);
            }
            if(email!=null&&!email.equals("")){
                users.setEmail(email);
            }
            if(companyId!=null&&!companyId.equals("")){
                users.setCompanyId(Integer.parseInt(companyId));
            }
            if(departmentId!=null&&!departmentId.equals("")) {
                users.setDepartmentId(Integer.parseInt(departmentId));
            }
            if(postId!=null&&!postId.equals("")) {
                users.setPostId(Integer.parseInt(postId));
            }
            if(password!=null&&!password.equals("")){
                MD5 md5=new MD5();
                try {
                    password=md5.EncoderByMd5(password);
                }catch (Exception e){
                    return JSON.toJSONString("操作失败,请联系技术人员");
                }
                users.setPassword(password);
            }
            userService.updateUser(users);
            return JSON.toJSONString("success");
        }
        return JSON.toJSONString("no");
    }


}
