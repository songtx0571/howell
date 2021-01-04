package com.howei.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.howei.pojo.*;
import com.howei.service.CompanyService;
import com.howei.service.PostService;
import com.howei.service.RoleService;
import com.howei.service.UserService;
import com.howei.util.*;
import org.apache.catalina.User;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.*;

import static org.apache.shiro.authz.annotation.Logical.OR;

@Controller
@RequestMapping("/user")
@CrossOrigin(origins={"http://192.168.1.27:8080","http:localhost:8080"},allowCredentials = "true")
public class UsersController {

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private RoleService roleService;

    private Map<Integer,Object> companyMap;
    private Map<Integer,Object> departmentMap;
    private Map<Integer,Object> postMap;

    void init(){
        companyMap=companyService.getCompanyMap("0");
        departmentMap=companyService.getCompanyMap(null);
        postMap=postService.getPostMap();
    }


    public Users getPrincipal(){
        Subject subject=SecurityUtils.getSubject();
        Users users=(Users) subject.getPrincipal();
        return users;
    }

    @RequestMapping("/getPrincipal")
    @ResponseBody
    public String getPrincipal1(){
        Subject subject=SecurityUtils.getSubject();
        Users users=(Users) subject.getPrincipal();
        return users.getUserName();
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
        Users users=this.getPrincipal();
        List<Company> list=null;
        if(parent!=null&&!parent.equals("")){
            list=companyService.getCompanyList(parent);
        }else{
            if(users!=null){
                list=companyService.getCompanyList(users.getCompanyId()+"");
            }
        }

        Result result=new Result() ;
        result.setMsg("");
        result.setCode(0);
        result.setData(list);
        return JSON.toJSONString(result);
    }

    @RequestMapping("/getUsersList")
    @ResponseBody
    public String getUsersList(HttpServletRequest request){
        String parent=request.getParameter("parent");
        List<Map<String,String>> result=null;
        Map map=new HashMap();
        if(parent!=null){
            map.put("companyId",parent);
        }
        result=userService.getUsersList(map);
        Result result1=new Result();
        result1.setCount(1000);
        result1.setCode(0);
        result1.setMsg("");
        result1.setData(result);
        return JSON.toJSONString(result1);
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
        Users users=this.getPrincipal();
        List<Post> list=null;
        if(companyId!=null&&!companyId.equals("")){
            list=postService.getPostList(companyId);
        }else{
            if(users!=null){
                list=postService.getPostList(users.getCompanyId()+"");
            }
        }
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
    //@RequiresPermissions(value = {"账户查看"},logical = OR)
    @RequestMapping("/getUserList")
    @ResponseBody
    public String getUserList(HttpServletRequest request){
        String companyId=request.getParameter("companyId");
        String page=request.getParameter("page");
        String limit=request.getParameter("limit");
        int rows=Page.getOffSet(page,limit);
        Users users=this.getPrincipal();

        Map map=new HashMap();
        if(companyId!=null&&!companyId.equals("")){
            map.put("companyId",companyId);
        }else{
            if(users!=null){
                map.put("companyId",users.getCompanyId());
            }
        }
        List<Users> total=userService.getUserList(map);
        map.put("pageSize",limit);
        map.put("page",rows);
        List<Users> list=userService.getUserList(map);
        if(list!=null){
            for (Users user:list) {
                List<Role> rolesList=user.getRoles();
                String roles="";
                for(int i=0;i<rolesList.size();i++){
                    Role role=rolesList.get(i);
                    if(i<3){
                        roles+=role.getRoleName()+",";
                    }
                }
                if(!roles.equals("")){
                    roles=roles.substring(0,roles.length()-1);
                }
                user.setRoleName(roles);
            }
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
    //@RequiresPermissions(value = {"添加新账户"},logical = OR)
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
        String entryDate=request.getParameter("entryDate");

        Users users=this.getPrincipal();
        Integer employeeId=null;
        if(users!=null){
            employeeId=users.getEmployeeId();
        }
        Users user=new Users();
        Employee employee=new Employee();
        if(companyId!=null&&!companyId.equals("")){
            user.setCompanyId(Integer.parseInt(companyId));
        }else{
            if(users!=null){
                user.setCompanyId(users.getCompanyId());
            }
        }
        if(userNumber!=null&&!userNumber.equals("")){
            user.setUserNumber(userNumber);
            employee.setUserNumber(userNumber);
        }
        List<Users> list=userService.getUserByParam(user);
        if(list!=null&&list.size()>0){
            return JSON.toJSONString("haveNumber");
        }
        if(departmentId!=null&&!departmentId.equals("")){
            user.setDepartmentId(Integer.parseInt(departmentId));
        }
        if(userName!=null&&!userName.equals("")){
            user.setUserName(userName);
            employee.setName(userName);
        }
        if(state!=null&&!state.equals("")){
            user.setState(Integer.parseInt(state));
        }else{
            user.setState(1);
        }
        if(entryDate!=null&&!entryDate.equals("")){
            user.setEntryDate(entryDate);
        }
        if(phone!=null&&!phone.equals("")){
            user.setPhone(phone);
        }
        if(email!=null&&!email.equals("")){
            user.setEmail(email);
        }
        if(sex!=null&&!sex.equals("")){
            user.setSex(Integer.parseInt(sex));
        }
        if(postId!=null&&!postId.equals("")){
            user.setPostId(Integer.parseInt(postId));
        }
        employee.setCreated(DateFormat.getYMDHMS(new Date()));
        if(employeeId!=null){
            employee.setCreatedBy(employeeId);//管理员
        }
        try {
            MD5 md5=new MD5();
            String password=md5.EncoderByMd5("123456");
            user.setPassword(password);
        }catch (Exception e){
            return JSON.toJSONString("操作失败,请联系技术人员");
        }
        userService.addEmployee(employee);
        if(employee.getId()!=-1){
            user.setEmployeeId(employee.getId());
            userService.addUser(user);
        }
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
    //@RequiresPermissions(value = {"修改账户信息"},logical = OR)
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
        String roles=request.getParameter("roles");
        //查询用户信息
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
            //修改用户角色
            addUserRole(Integer.parseInt(id),roles);
            return JSON.toJSONString("success");
        }
        return JSON.toJSONString("no");
    }

    /**
     * 查询用户列表
     * @param request
     * @return
     */
    @RequestMapping("/searchUsersList")
    @ResponseBody
    public String searchUsersList(HttpServletRequest request){
        String companyId=request.getParameter("companyId");
        String search=request.getParameter("search");
        String page=request.getParameter("page");
        String pageSize=request.getParameter("limit");
        int rows=Page.getOffSet(page,pageSize);

        Map map=new HashMap();
        if(companyId!=null&&!companyId.equals("")){
            map.put("companyId",companyId);
        }
        if(search!=null&&!search.equals("")){
            map.put("search",search);
        }
        List<Users> total=userService.searchUsersList(map);
        map.put("page",rows);
        map.put("pageSize",pageSize);
        List<Users> list=userService.searchUsersList(map);
        if(list!=null){
            for (Users user:list) {
                List<Role> rolesList=user.getRoles();
                String roles="";
                for(int i=0;i<rolesList.size();i++){
                    Role role=rolesList.get(i);
                    if(i<3){
                        roles+=role.getRoleName()+",";
                    }
                }
                if(!roles.equals("")){
                    roles=roles.substring(0,roles.length()-1);
                }
                user.setRoleName(roles);
            }
        }
        Result result=new Result();
        result.setCode(0);
        result.setCount(total.size());
        result.setData(list);
        return JSON.toJSONString(result);
    }

    /**--------------------------------------用户分配角色------------------------------------- */

    /**
     * 员工下拉框
     * @return
     */
    @RequestMapping("/getUserMap")
    @ResponseBody
    public String getUserMap(){
        List<Map<String,String>> result=userService.getUsersList(new HashMap());
        return JSON.toJSONString(result);
    }

    /**
     * 角色下拉框
     * @return
     */
    @RequestMapping("/getRolesMap")
    @ResponseBody
    public String getRolesMap(){
        List<Map<String,String>> map=roleService.getRolesMap();
        return  JSON.toJSONString(map);
    }

    /**
     * 获取此用户的所有角色
     * @param request
     * @return
     */
    @RequestMapping("/getUserRoles")
    @ResponseBody
    public String getUserRoles(HttpServletRequest request){
        String userId=request.getParameter("userId");
        List<Role> roles=null;
        if(userId!=null&&!userId.equals("")){
            roles=userService.getUserRoles(userId);
        }
        return JSON.toJSONString(roles);
    }

    /**
     * 查询用户角色列表
     * @param request
     * @return
     */
    @RequiresPermissions(value = {"查看用户所有角色"},logical = OR)
    @RequestMapping("/getUserRoleList")
    @ResponseBody
    public String getUserRoleList(HttpServletRequest request){
        String userId=request.getParameter("userId");
        Map map=new HashMap();
        if(userId!=null&&!userId.equals("")&&!userId.equals("0")){
            map.put("userId",userId);
        }
        List<Users> list=userService.getUserRoleList(map);
        Result result=new Result();
        result.setCode(0);
        result.setData(list);
        result.setCount(list.size());
        return JSON.toJSONString(result);
    }

    /**
     * 为用户分配权限
     * @param
     * @return
     */
    //@RequiresPermissions(value = {"为用户分配角色"},logical = OR)
    //@RequestMapping(value = "/distributeUserRoles")
    //@ResponseBody
    public String addUserRole(Integer userId,String roles){
        JSONArray roleArr=JSON.parseArray(roles);
        UserRole userRole=new UserRole();
        Subject subject=SecurityUtils.getSubject();
        Users user=(Users)subject.getPrincipal();

        if(userId!=null&&!userId.equals("")){
            userRole.setUserId(userId);
            //删除此用户的所有角色
            userService.deleteUserRole(userId);
        }else{
            return Type.ERROR+"";
        }
        if(user!=null){
            userRole.setCreatedBy(user.getId());
        }else{
            return Type.ERROR+"";
        }
        userRole.setCreated(DateFormat.getYMDHMS(new Date()));
        try {
            for(int i=0;i<roleArr.size();i++){
                Integer roleId=(Integer)roleArr.get(i);
                userRole.setRoleId(roleId);
                userService.addUserRole(userRole);
            }
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return Type.ERROR+"";
        } catch (Exception e) {
            e.printStackTrace();
            return Type.ERROR+"";
        }
        return Type.SUCCESS+"";
    }

    /**
     * 修改密码
     * @param request
     * @return
     */
    @RequestMapping("/updPassword")
    @ResponseBody
    public String updPassword(HttpServletRequest request,HttpSession session){
        String password=request.getParameter("password");
        String userId=request.getParameter("userId");
        System.out.println(request.getSession().getId());

        Subject subject=SecurityUtils.getSubject();
        Users user=(Users)subject.getPrincipal();
        Integer updUserId=null;
        if(userId!=null&&!userId.equals("")){
            updUserId=Integer.parseInt(userId);
        }else{
            if(user!=null){
                updUserId=user.getId();
            }
        }
        if(password!=null&&!password.trim().equals("")){
            try {
                MD5 md5=new MD5();
                password=md5.EncoderByMd5(password);
                user.setPassword(password);
            }catch (Exception e){
                return JSON.toJSONString(Type.ERROR);
            }
            int result=userService.updPassword(updUserId,password);
            return JSON.toJSONString(Type.SUCCESS);
        }
        return JSON.toJSONString(Type.ERROR);
    }


}
